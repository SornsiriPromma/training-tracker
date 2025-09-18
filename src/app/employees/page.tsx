'use client';

import { useState } from 'react';

export default function EmployeesPage() {
  // State for selected employee
  const [selectedEmployee, setSelectedEmployee] = useState(1);

  // Sample employee data
  const employees = [
    {
      id: 1,
      name: "John Smith",
      position: "Software Developer",
      department: "Engineering",
      joinDate: "2024-01-15",
      email: "john.smith@company.com",
      status: "Active",
      avatar: "JS"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Project Manager",
      department: "Product",
      joinDate: "2024-02-01",
      email: "sarah.johnson@company.com",
      status: "Active",
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Mike Wilson",
      position: "UX Designer",
      department: "Design",
      joinDate: "2024-01-20",
      email: "mike.wilson@company.com",
      status: "Active",
      avatar: "MW"
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Data Analyst",
      department: "Analytics",
      joinDate: "2024-03-01",
      email: "emily.davis@company.com",
      status: "Active",
      avatar: "ED"
    },
    {
      id: 5,
      name: "David Brown",
      position: "DevOps Engineer",
      department: "Engineering",
      joinDate: "2024-02-15",
      email: "david.brown@company.com",
      status: "Active",
      avatar: "DB"
    }
  ];

  // Sample course progress data
  const courseProgress = [
    {
      id: 1,
      employeeId: 1,
      courseId: 1,
      category: 'Technical Skills',
      skillLevel: 'Beginner',
      mandatory: 'Yes',
      title: 'Introduction to React',
      status: 'Completed',
      daysAfterJoin: 30,
      startedDate: '2024-01-20',
      completedDate: '2024-01-25',
      resourceType: 'Video Course',
      resourceName: 'React Fundamentals',
      duration: '2 hours',
      url: 'https://example.com/react-intro',
      note: 'Essential for frontend developers'
    },
    {
      id: 2,
      employeeId: 1,
      courseId: 2,
      category: 'Safety Training',
      skillLevel: 'All Levels',
      mandatory: 'Yes',
      title: 'Workplace Safety',
      status: 'In Progress',
      daysAfterJoin: 7,
      startedDate: '2024-01-22',
      completedDate: null,
      resourceType: 'Interactive Module',
      resourceName: 'Safety First',
      duration: '1 hour',
      url: 'https://example.com/safety',
      note: 'Required for all employees'
    },
    {
      id: 3,
      employeeId: 1,
      courseId: 3,
      category: 'Leadership',
      skillLevel: 'Advanced',
      mandatory: 'No',
      title: 'Team Management',
      status: 'Not Started',
      daysAfterJoin: 90,
      startedDate: null,
      completedDate: null,
      resourceType: 'Workshop',
      resourceName: 'Leadership Excellence',
      duration: '4 hours',
      url: 'https://example.com/leadership',
      note: 'For managers and team leads'
    },
    {
      id: 4,
      employeeId: 2,
      courseId: 1,
      category: 'Technical Skills',
      skillLevel: 'Beginner',
      mandatory: 'Yes',
      title: 'Introduction to React',
      status: 'Completed',
      daysAfterJoin: 30,
      startedDate: '2024-02-05',
      completedDate: '2024-02-10',
      resourceType: 'Video Course',
      resourceName: 'React Fundamentals',
      duration: '2 hours',
      url: 'https://example.com/react-intro',
      note: 'Essential for frontend developers'
    },
    {
      id: 5,
      employeeId: 2,
      courseId: 2,
      category: 'Safety Training',
      skillLevel: 'All Levels',
      mandatory: 'Yes',
      title: 'Workplace Safety',
      status: 'Completed',
      daysAfterJoin: 7,
      startedDate: '2024-02-02',
      completedDate: '2024-02-05',
      resourceType: 'Interactive Module',
      resourceName: 'Safety First',
      duration: '1 hour',
      url: 'https://example.com/safety',
      note: 'Required for all employees'
    }
  ];

  // Get selected employee
  const selectedEmployeeData = employees.find(emp => emp.id === selectedEmployee);
  
  // Get courses for selected employee
  const employeeCourses = courseProgress.filter(course => course.employeeId === selectedEmployee);

  // Get skill level color
  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      case 'All Levels': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get completion status
  const getCompletionStatus = (course: any, employee: any) => {
    const joinDate = new Date(employee.joinDate);
    const currentDate = new Date();
    const daysSinceJoin = Math.ceil((currentDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

    // If course is not started yet
    if (course.status === 'Not Started') {
      return { status: '-', color: 'bg-gray-100 text-gray-800' };
    }

    // If course is completed
    if (course.status === 'Completed' && course.completedDate) {
      const completedDate = new Date(course.completedDate);
      const daysToComplete = Math.ceil((completedDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysToComplete <= course.daysAfterJoin) {
        return { status: 'On Time', color: 'bg-green-100 text-green-800' };
      } else {
        const delayDays = daysToComplete - course.daysAfterJoin;
        return { status: `Delayed (${delayDays}d)`, color: 'bg-red-100 text-red-800' };
      }
    }

    // If course is in progress or should have been completed by now
    if (course.status === 'In Progress') {
      if (daysSinceJoin > course.daysAfterJoin) {
        const delayDays = daysSinceJoin - course.daysAfterJoin;
        return { status: `Delay (${delayDays}d)`, color: 'bg-red-100 text-red-800' };
      } else {
        return { status: 'In Progress', color: 'bg-yellow-100 text-yellow-800' };
      }
    }

    // Default case
    return { status: '-', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Employee Tracking</h1>
                <p className="text-sm text-gray-500">Monitor individual progress and course completion</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Employees</h2>
                <p className="text-sm text-gray-500">Select an employee to view their progress</p>
              </div>
              <div className="divide-y divide-gray-200">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    onClick={() => setSelectedEmployee(employee.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedEmployee === employee.id
                        ? 'bg-blue-50 border-r-4 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {employee.avatar}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {employee.position}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {employee.department}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Employee Progress */}
          <div className="lg:col-span-2">
            {selectedEmployeeData && (
              <div className="space-y-6">
                {/* Employee Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-xl">
                        {selectedEmployeeData.avatar}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedEmployeeData.name}
                      </h2>
                      <p className="text-lg text-gray-600">
                        {selectedEmployeeData.position}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedEmployeeData.department} • Joined {selectedEmployeeData.joinDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Progress Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Course Progress</h3>
                    <p className="text-sm text-gray-500">Training courses assigned to this employee</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Skill Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mandatory
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Days After Join
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Started Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Completed Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Completion Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resource Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {employeeCourses.map((course) => {
                          const completionStatus = getCompletionStatus(course, selectedEmployeeData);
                          return (
                            <tr key={course.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {course.title}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {course.category}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSkillLevelColor(course.skillLevel)}`}>
                                  {course.skillLevel}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {course.mandatory}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  course.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                  course.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {course.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {course.daysAfterJoin} days
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {course.startedDate || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {course.completedDate || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${completionStatus.color}`}>
                                  {completionStatus.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {course.resourceType}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {course.duration}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {course.note}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Dashboard Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="/"
          className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
          title="Back to Dashboard"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
      </div>
    </div>
  );
}
