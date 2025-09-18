import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createAssignmentSchema = z.object({
  userId: z.string(),
  courseId: z.string(),
  dueDate: z.string().datetime().optional(),
});

const bulkAssignSchema = z.object({
  userIds: z.array(z.string()),
  courseId: z.string(),
  dueDate: z.string().datetime().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    const assignments = await prisma.courseAssignment.findMany({
      where: {
        ...(userId && { userId }),
        ...(courseId && { courseId }),
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: true,
        assignedBy: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    
    // Check if this is a bulk assignment
    if (body.userIds) {
      const validatedData = bulkAssignSchema.parse(body);
      
      const assignments = await Promise.all(
        validatedData.userIds.map(async (userId) => {
          return prisma.courseAssignment.upsert({
            where: { userId_courseId: { userId, courseId: validatedData.courseId } },
            update: { dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null },
            create: {
              userId,
              courseId: validatedData.courseId,
              dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
              assignedByUserId: (session.user as any).id,
            },
          });
        })
      );

      return NextResponse.json(assignments, { status: 201 });
    } else {
      const validatedData = createAssignmentSchema.parse(body);
      
      const assignment = await prisma.courseAssignment.upsert({
        where: { userId_courseId: { userId: validatedData.userId, courseId: validatedData.courseId } },
        update: { dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null },
        create: {
          userId: validatedData.userId,
          courseId: validatedData.courseId,
          dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
          assignedByUserId: (session.user as any).id,
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
          course: true,
        },
      });

      return NextResponse.json(assignment, { status: 201 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }
    console.error("Error creating assignment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

