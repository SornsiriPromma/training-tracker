import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateProgressSchema = z.object({
  courseId: z.string(),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || (session.user as any).id;

    // Only allow users to see their own progress unless they're admin
    if (userId !== (session.user as any).id && (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const progress = await prisma.courseProgress.findMany({
      where: { userId },
      include: {
        course: true,
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateProgressSchema.parse(body);
    const userId = (session.user as any).id;

    // Check if user has assignment for this course
    const assignment = await prisma.courseAssignment.findUnique({
      where: { userId_courseId: { userId, courseId: validatedData.courseId } },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Course not assigned to user" }, { status: 403 });
    }

    const now = new Date();
    const updateData: any = {
      status: validatedData.status,
      updatedAt: now,
    };

    // Set timestamps based on status
    if (validatedData.status === "IN_PROGRESS" && !assignment.startedAt) {
      updateData.startedAt = now;
    } else if (validatedData.status === "COMPLETED") {
      updateData.completedAt = now;
      if (!assignment.startedAt) {
        updateData.startedAt = now;
      }
    }

    const progress = await prisma.courseProgress.upsert({
      where: { userId_courseId: { userId, courseId: validatedData.courseId } },
      update: updateData,
      create: {
        userId,
        courseId: validatedData.courseId,
        status: validatedData.status,
        ...updateData,
      },
      include: {
        course: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

