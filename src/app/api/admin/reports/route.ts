import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";
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

    // Calculate overall stats
    const totalCourses = await prisma.course.count({ where: { isActive: true } });
    const totalAssignments = assignments.length;
    const completedAssignments = progress.filter(p => p.status === "COMPLETED").length;
    const pendingAssignments = progress.filter(p => p.status === "IN_PROGRESS").length;
    const overdueAssignments = assignments.filter(a => {
      if (!a.dueDate) return false;
      const isOverdue = new Date(a.dueDate) < new Date();
      const userProgress = progress.find(p => p.userId === a.userId && p.courseId === a.courseId);
      return isOverdue && userProgress?.status !== "COMPLETED";
    }).length;

    const completionRate = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;

    // Calculate course stats
    const courseStats = await Promise.all(
      (await prisma.course.findMany({ where: { isActive: true } })).map(async (course) => {
        const courseAssignments = assignments.filter(a => a.courseId === course.id);
        const courseProgress = progress.filter(p => p.courseId === course.id);
        
        const totalAssigned = courseAssignments.length;
        const completed = courseProgress.filter(p => p.status === "COMPLETED").length;
        const pending = courseProgress.filter(p => p.status === "IN_PROGRESS").length;
        const overdue = courseAssignments.filter(a => {
          if (!a.dueDate) return false;
          const isOverdue = new Date(a.dueDate) < new Date();
          const userProgress = courseProgress.find(p => p.userId === a.userId);
          return isOverdue && userProgress?.status !== "COMPLETED";
        }).length;

        return {
          courseId: course.id,
          courseTitle: course.title,
          totalAssigned,
          completed,
          pending,
          overdue,
          completionRate: totalAssigned > 0 ? (completed / totalAssigned) * 100 : 0,
        };
      })
    );

    // Calculate user stats
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });

    const userStats = users.map(user => {
      const userAssignments = assignments.filter(a => a.userId === user.id);
      const userProgress = progress.filter(p => p.userId === user.id);
      
      const totalAssigned = userAssignments.length;
      const completed = userProgress.filter(p => p.status === "COMPLETED").length;
      const pending = userProgress.filter(p => p.status === "IN_PROGRESS").length;
      const overdue = userAssignments.filter(a => {
        if (!a.dueDate) return false;
        const isOverdue = new Date(a.dueDate) < new Date();
        const userProgressItem = userProgress.find(p => p.courseId === a.courseId);
        return isOverdue && userProgressItem?.status !== "COMPLETED";
      }).length;

      return {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        totalAssigned,
        completed,
        pending,
        overdue,
        completionRate: totalAssigned > 0 ? (completed / totalAssigned) * 100 : 0,
      };
    });

    return NextResponse.json({
      totalCourses,
      totalAssignments,
      completedAssignments,
      pendingAssignments,
      overdueAssignments,
      completionRate,
      courseStats,
      userStats,
    });
  } catch (error) {
    console.error("Error generating reports:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

