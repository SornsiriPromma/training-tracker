'use client';

import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function ReportsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Sample analytics data
  const analyticsData = {
    overview: {
      totalEmployees: 5,
      totalCourses: 5,
      completionRate: 78,
      averageCompletionTime: 12,
      complianceRate: 92
    },
    departmentStats: [
      { department: 'Engineering', employees: 2, completedCourses: 4, totalCourses: 10, completionRate: 40, avgDelay: 2 },
      { department: 'Product', employees: 1, completedCourses: 2, totalCourses: 5, completionRate: 40, avgDelay: 1 },
      { department: 'Design', employees: 1, completedCourses: 2, totalCourses: 5, completionRate: 40, avgDelay: 3 },
      { department: 'Analytics', employees: 1, completedCourses: 2, totalCourses: 5, completionRate: 40, avgDelay: 2 }
    ],
    courseStats: [
      { course: 'Introduction to React', assigned: 5, completed: 5, pending: 0, overdue: 0, completionRate: 100 },
      { course: 'Workplace Safety', assigned: 5, completed: 0, pending: 5, overdue: 0, completionRate: 0 },
      { course: 'Team Management', assigned: 5, completed: 0, pending: 5, overdue: 0, completionRate: 0 },
      { course: 'Database Design', assigned: 5, completed: 5, pending: 0, overdue: 0, completionRate: 100 },
      { course: 'Effective Presentations', assigned: 5, completed: 0, pending: 5, overdue: 0, completionRate: 0 }
    ],
    topPerformers: [
      { name: 'John Smith', department: 'Engineering', completedCourses: 2, avgCompletionTime: 10 },
      { name: 'David Brown', department: 'Engineering', completedCourses: 2, avgCompletionTime: 12 },
      { name: 'Sarah Johnson', department: 'Product', completedCourses: 2, avgCompletionTime: 8 }
    ],
    delayedCourses: [
      { employee: 'Mike Wilson', course: 'Team Management', delayDays: 5, department: 'Design' },
      { employee: 'David Brown', course: 'Database Design', delayDays: 3, department: 'Engineering' }
    ],
    monthlyTrends: [
      { month: 'Jan', completions: 8, newAssignments: 12 },
      { month: 'Feb', completions: 15, newAssignments: 8 },
      { month: 'Mar', completions: 12, newAssignments: 10 },
      { month: 'Apr', completions: 18, newAssignments: 6 }
    ]
  };

  // Export functionality
  const exportToCSV = () => {
    const csvData = [
      // Overview data
      ['Metric', 'Value'],
      ['Total Employees', analyticsData.overview.totalEmployees],
      ['Total Courses', analyticsData.overview.totalCourses],
      ['Completion Rate (%)', analyticsData.overview.completionRate],
      ['Average Completion Time (days)', analyticsData.overview.averageCompletionTime],
      ['Compliance Rate (%)', analyticsData.overview.complianceRate],
      ['', ''],
      
      // Department stats
      ['Department', 'Employees', 'Completed Courses', 'Total Courses', 'Completion Rate (%)', 'Avg Delay (days)'],
      ...analyticsData.departmentStats.map(dept => [
        dept.department,
        dept.employees,
        dept.completedCourses,
        dept.totalCourses,
        dept.completionRate,
        dept.avgDelay
      ]),
      ['', ''],
      
      // Course stats
      ['Course', 'Assigned', 'Completed', 'Pending', 'Overdue', 'Completion Rate (%)'],
      ...analyticsData.courseStats.map(course => [
        course.course,
        course.assigned,
        course.completed,
        course.pending,
        course.overdue,
        course.completionRate
      ]),
      ['', ''],
      
      // Top performers
      ['Top Performers', 'Department', 'Completed Courses', 'Avg Completion Time (days)'],
      ...analyticsData.topPerformers.map(performer => [
        performer.name,
        performer.department,
        performer.completedCourses,
        performer.avgCompletionTime
      ]),
      ['', ''],
      
      // Delayed courses
      ['Delayed Courses', 'Employee', 'Course', 'Delay Days', 'Department'],
      ...analyticsData.delayedCourses.map(delayed => [
        delayed.employee,
        delayed.course,
        delayed.delayDays,
        delayed.department
      ])
    ];

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `training-report-${selectedTimeframe}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-sm text-gray-500">Training insights and performance metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Menu as="div" className="relative inline-block">
                <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {selectedTimeframe === '7d' ? 'Last 7 days' : 
                   selectedTimeframe === '30d' ? 'Last 30 days' : 
                   selectedTimeframe === '90d' ? 'Last 90 days' : 
                   selectedTimeframe === '1y' ? 'Last year' : 'Last 30 days'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setSelectedTimeframe('7d')}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          selectedTimeframe === '7d' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Last 7 days
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => setSelectedTimeframe('30d')}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          selectedTimeframe === '30d' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Last 30 days
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => setSelectedTimeframe('90d')}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          selectedTimeframe === '90d' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Last 90 days
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => setSelectedTimeframe('1y')}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          selectedTimeframe === '1y' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Last year
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <button
                onClick={exportToCSV}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Report to CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Courses</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="text-2xl font-semibold text-gray-900">{analyticsData.overview.totalEmployees}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Department Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Delay</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.departmentStats.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.employees}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.completedCourses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.totalCourses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.completionRate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.avgDelay} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.courseStats.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.assigned}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.completed}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.pending}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.overdue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.completionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analyticsData.topPerformers.map((performer, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                    <p className="text-xs text-gray-500">{performer.department}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Completed</p>
                    <p className="font-semibold text-gray-900">{performer.completedCourses} courses</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Time</p>
                    <p className="font-semibold text-gray-900">{performer.avgCompletionTime} days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delayed Courses */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Delayed Courses</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.delayedCourses.map((delayed, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{delayed.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delayed.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delayed.delayDays} days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{delayed.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Assignments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.monthlyTrends.map((trend, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trend.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trend.completions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trend.newAssignments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
