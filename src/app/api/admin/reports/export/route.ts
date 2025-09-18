import { NextResponse } from "next/server";
import { auth } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get all assignments with progress
    const assignments = await prisma.courseAssignment.findMany({
      include: {
        course: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    const progress = await prisma.courseProgress.findMany({
      include: {
        course: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });

    // Create CSV content
    const csvHeaders = [
      "User Name",
      "User Email", 
      "Course Title",
      "Course Category",
      "Skill Level",
      "Mandatory",
      "Resource Type",
      "Duration (minutes)",
      "Due Date",
      "Status",
      "Started Date",
      "Completed Date",
      "Assigned Date"
    ];

    const csvRows = assignments.map(assignment => {
      const userProgress = progress.find(p => 
        p.userId === assignment.userId && p.courseId === assignment.courseId
      );
      
      return [
        assignment.user.name || "",
        assignment.user.email,
        assignment.course.title,
        assignment.course.category,
        assignment.course.skillLevel,
        assignment.course.mandatory ? "Yes" : "No",
        assignment.course.resourceType,
        assignment.course.durationMinutes?.toString() || "",
        assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : "",
        userProgress?.status?.replace("_", " ") || "NOT STARTED",
        userProgress?.startedAt ? new Date(userProgress.startedAt).toLocaleDateString() : "",
        userProgress?.completedAt ? new Date(userProgress.completedAt).toLocaleDateString() : "",
        new Date(assignment.createdAt).toLocaleDateString()
      ];
    });

    // Combine headers and rows
    const csvContent = [csvHeaders, ...csvRows]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="training-report-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

