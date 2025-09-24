'use client';

import { useState } from 'react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  BookOpenIcon, 
  CogIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Mock data for admin dashboard
const adminData = {
  totalEmployees: 5,
  totalCourses: 5,
  activeCourses: 3,
  completedCourses: 12,
  pendingApprovals: 1,
  systemHealth: 98.5,
  recentActivity: [
    { type: "course_created", user: "Sarah Johnson", course: "Advanced React", time: "2 hours ago" },
    { type: "completion", user: "Emily Davis", course: "Project Management", time: "6 hours ago" },
    { type: "completion", user: "John Smith", course: "Introduction to React", time: "1 day ago" },
    { type: "system_alert", message: "System running smoothly", time: "2 days ago" }
  ],
  departmentStats: [
    { name: "Engineering", employees: 2, completionRate: 85, avgTime: 12 },
    { name: "Product", employees: 1, completionRate: 90, avgTime: 8 },
    { name: "Design", employees: 1, completionRate: 75, avgTime: 15 },
    { name: "Analytics", employees: 1, completionRate: 80, avgTime: 10 }
  ],
  coursePerformance: [
    { name: "Introduction to React", completions: 3, avgRating: 4.8, difficulty: "Medium" },
    { name: "Workplace Safety", completions: 4, avgRating: 4.6, difficulty: "Easy" },
    { name: "Team Management", completions: 2, avgRating: 4.4, difficulty: "Hard" },
    { name: "Database Design", completions: 2, avgRating: 4.7, difficulty: "Medium" },
    { name: "Effective Presentations", completions: 1, avgRating: 4.5, difficulty: "Easy" }
  ]
};

const StatCard = ({ title, value, change, icon: Icon, color = "red" }: { 
  title: string;
  value: string | number; 
  change?: string; 
  icon: any; 
  color?: string;
}) => {
  const colorClasses = {
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500"
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }: { activity: any }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_created': return <BookOpenIcon className="w-5 h-5 text-blue-500" />;
      case 'employee_registered': return <UserGroupIcon className="w-5 h-5 text-green-500" />;
      case 'completion': return <CheckCircleIcon className="w-5 h-5 text-purple-500" />;
      case 'system_alert': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default: return <ChartBarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'course_created': return `${activity.user} created "${activity.course}"`;
      case 'employee_registered': return `${activity.user} joined ${activity.department}`;
      case 'completion': return `${activity.user} completed "${activity.course}"`;
      case 'system_alert': return activity.message;
      default: return 'Unknown activity';
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
      {getActivityIcon(activity.type)}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{getActivityText(activity)}</p>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEmployee, setSelectedEmployee] = useState(1);
  const [editingModules, setEditingModules] = useState(false);
  const [modules, setModules] = useState([
    { id: 1, title: "Introduction to Databricks", type: "Video", duration: "2 hours", status: "Available" },
    { id: 2, title: "SQL Fundamentals", type: "Interactive", duration: "3 hours", status: "Available" },
    { id: 3, title: "Data Visualization", type: "Hands-on", duration: "2 hours", status: "Available" },
    { id: 4, title: "Advanced Analytics", type: "Project", duration: "3 hours", status: "Available" },
    { id: 5, title: "Certification Prep", type: "Practice", duration: "2 hours", status: "Available" }
  ]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [draggedModule, setDraggedModule] = useState(null);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, module: any) => {
    setDraggedModule(module);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetModule: any) => {
    e.preventDefault();
    if (!draggedModule || draggedModule.id === targetModule.id) {
      setDraggedModule(null);
      return;
    }

    const newModules = [...modules];
    const draggedIndex = newModules.findIndex(m => m.id === draggedModule.id);
    const targetIndex = newModules.findIndex(m => m.id === targetModule.id);

    // Remove dragged module and insert at new position
    newModules.splice(draggedIndex, 1);
    newModules.splice(targetIndex, 0, draggedModule);

    setModules(newModules);
    setDraggedModule(null);
  };

  // Available courses that can be added to learning paths
  const availableCourses = [
    { id: 1, title: "Introduction to React", category: "Technical Skills", duration: "2 hours", type: "Video Course" },
    { id: 2, title: "Workplace Safety", category: "Safety Training", duration: "1 hour", type: "Interactive Module" },
    { id: 3, title: "Team Management", category: "Leadership", duration: "4 hours", type: "Workshop" },
    { id: 4, title: "Database Design", category: "Technical Skills", duration: "3 hours", type: "Video Course" },
    { id: 5, title: "Effective Presentations", category: "Communication", duration: "1.5 hours", type: "Interactive Module" },
    { id: 6, title: "Project Management Fundamentals", category: "Leadership", duration: "3 hours", type: "Video Course" },
    { id: 7, title: "Data Analysis with Python", category: "Technical Skills", duration: "4 hours", type: "Hands-on" },
    { id: 8, title: "Agile Methodology", category: "Project Management", duration: "2.5 hours", type: "Interactive Module" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
                <CogIcon className="w-6 h-6 text-white" />
              </div>
    <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">System Administration & Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">Arcbricks</div>
                <div className="text-xs text-gray-500">Company</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
            { id: 'employees', label: 'Employee', icon: UserGroupIcon },
            { id: 'courses', label: 'Course Management', icon: BookOpenIcon },
            { id: 'learning-paths', label: 'Learning Paths', icon: ClockIcon }
          ].map((tab) => (
        <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
        </button>
          ))}
      </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Employees"
                value={adminData.totalEmployees}
                change="+1 this month"
                icon={UserGroupIcon}
                color="red"
              />
              <StatCard
                title="Active Courses"
                value={adminData.activeCourses}
                change="+1 this week"
                icon={BookOpenIcon}
                color="red"
              />
              <StatCard
                title="Completed Courses"
                value={adminData.completedCourses}
                change="+3 this week"
                icon={CheckCircleIcon}
                color="red"
              />
              <StatCard
                title="Pending Approvals"
                value={adminData.pendingApprovals}
                icon={ExclamationTriangleIcon}
                color="yellow"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-3">
                {adminData.recentActivity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))}
          </div>
        </div>

            {/* Department Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
              </div>
              <div className="p-6">
          <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time (days)</th>
                </tr>
              </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {adminData.departmentStats.map((dept, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.employees}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              dept.completionRate >= 90 ? 'bg-green-100 text-green-800' :
                              dept.completionRate >= 80 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {dept.completionRate}%
                      </span>
                    </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Employee Management Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Employee Management</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Add New Employee
                  </button>
                </div>
              </div>
            </div>

            {/* Employee List and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Employee List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Employees</h2>
                    <p className="text-sm text-gray-500">Select an employee to view their progress</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      { id: 1, name: "John Smith", position: "Software Developer", department: "Engineering", joinDate: "2024-01-15", status: "Active", avatar: "JS" },
                      { id: 2, name: "Sarah Johnson", position: "Project Manager", department: "Product", joinDate: "2024-02-01", status: "Active", avatar: "SJ" },
                      { id: 3, name: "Mike Wilson", position: "UX Designer", department: "Design", joinDate: "2024-01-20", status: "Active", avatar: "MW" },
                      { id: 4, name: "Emily Davis", position: "Data Analyst", department: "Analytics", joinDate: "2024-03-01", status: "Active", avatar: "ED" },
                      { id: 5, name: "Alex Rodriguez", position: "Marketing Specialist", department: "Marketing", joinDate: "2024-02-15", status: "Active", avatar: "AR" }
                    ].map((employee) => (
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
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center">
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
                <div className="space-y-6">
                  {/* Employee Info */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    {(() => {
                      const employee = [
                        { id: 1, name: "John Smith", position: "Software Developer", department: "Engineering", joinDate: "2024-01-15", avatar: "JS" },
                        { id: 2, name: "Sarah Johnson", position: "Project Manager", department: "Product", joinDate: "2024-02-01", avatar: "SJ" },
                        { id: 3, name: "Mike Wilson", position: "UX Designer", department: "Design", joinDate: "2024-01-20", avatar: "MW" },
                        { id: 4, name: "Emily Davis", position: "Data Analyst", department: "Analytics", joinDate: "2024-03-01", avatar: "ED" },
                        { id: 5, name: "Alex Rodriguez", position: "Marketing Specialist", department: "Marketing", joinDate: "2024-02-15", avatar: "AR" }
                      ].find(emp => emp.id === selectedEmployee);
                      
                      return (
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xl">{employee?.avatar}</span>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{employee?.name}</h2>
                            <p className="text-lg text-gray-600">{employee?.position}</p>
                            <p className="text-sm text-gray-500">{employee?.department} • Joined {employee?.joinDate}</p>
                          </div>
                        </div>
                      );
                    })()}
        </div>

                  {/* Course Progress */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Course Progress</h3>
                      <p className="text-sm text-gray-500">Training courses and completion status</p>
                    </div>
          <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days After Join</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[
                            { course: "Introduction to React", category: "Technical Skills", status: "Completed", daysAfterJoin: 30, duration: "2 hours" },
                            { course: "Workplace Safety", category: "Safety Training", status: "In Progress", daysAfterJoin: 7, duration: "1 hour" },
                            { course: "Team Management", category: "Leadership", status: "Not Started", daysAfterJoin: 90, duration: "4 hours" }
                          ].map((course, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.course}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  course.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                  course.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {course.status}
                      </span>
                    </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.daysAfterJoin} days</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Course Management Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Add New Course
                  </button>
                </div>
              </div>
            </div>

            {/* Available Courses Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
          <div>
                    <h2 className="text-lg font-medium text-gray-900">Available Courses</h2>
                    <p className="text-sm text-gray-500">Manage and track all training courses</p>
          </div>
          </div>
          </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mandatory</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days After Join</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        id: 1,
                        category: 'Technical Skills',
                        skillLevel: 'Beginner',
                        mandatory: 'Yes',
                        title: 'Introduction to React',
                        daysAfterJoin: 30,
                        resourceType: 'Video Course',
                        resourceName: 'React Fundamentals',
                        duration: '2 hours',
                        url: 'https://example.com/react-intro',
                        note: 'Essential for frontend developers'
                      },
                      {
                        id: 2,
                        category: 'Safety Training',
                        skillLevel: 'All Levels',
                        mandatory: 'Yes',
                        title: 'Workplace Safety',
                        daysAfterJoin: 7,
                        resourceType: 'Interactive Module',
                        resourceName: 'Safety First',
                        duration: '1 hour',
                        url: 'https://example.com/safety',
                        note: 'Required for all employees'
                      },
                      {
                        id: 3,
                        category: 'Leadership',
                        skillLevel: 'Advanced',
                        mandatory: 'No',
                        title: 'Team Management',
                        daysAfterJoin: 90,
                        resourceType: 'Workshop',
                        resourceName: 'Leadership Excellence',
                        duration: '4 hours',
                        url: 'https://example.com/leadership',
                        note: 'For managers and team leads'
                      },
                      {
                        id: 4,
                        category: 'Technical Skills',
                        skillLevel: 'Intermediate',
                        mandatory: 'Yes',
                        title: 'Database Design',
                        daysAfterJoin: 45,
                        resourceType: 'Video Course',
                        resourceName: 'SQL Fundamentals',
                        duration: '3 hours',
                        url: 'https://example.com/database',
                        note: 'Backend development essential'
                      },
                      {
                        id: 5,
                        category: 'Communication',
                        skillLevel: 'All Levels',
                        mandatory: 'No',
                        title: 'Effective Presentations',
                        daysAfterJoin: 60,
                        resourceType: 'Interactive Module',
                        resourceName: 'Presentation Skills',
                        duration: '1.5 hours',
                        url: 'https://example.com/presentations',
                        note: 'Improve communication skills'
                      }
                    ].map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.skillLevel}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.mandatory === 'Yes' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {course.mandatory}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <a 
                            href={course.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            {course.title}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.daysAfterJoin} days</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.resourceType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.resourceName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:text-blue-700 hover:underline">
                          <a href={course.url} target="_blank" rel="noopener noreferrer">
                            {course.url}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          </div>
          </div>
          </div>
        )}

        {/* Learning Paths Tab */}
        {activeTab === 'learning-paths' && (
          <div className="space-y-6">
            {/* Learning Path Management Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Learning Path Management</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Create New Path
                  </button>
                </div>
              </div>
            </div>

            {/* Learning Path List and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Learning Path List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Learning Paths</h2>
                    <p className="text-sm text-gray-500">Select a path to view details</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      { id: 1, name: "Databricks Data Analyst", modules: 6, duration: "12 hours" },
                      { id: 2, name: "Databricks Data Engineer", modules: 8, duration: "16 hours" },
                      { id: 3, name: "Databricks ML Engineer", modules: 7, duration: "14 hours" },
                      { id: 4, name: "Databricks GenAI Engineer", modules: 5, duration: "10 hours" },
                      { id: 5, name: "Databricks Platform Admin", modules: 6, duration: "12 hours" },
                      { id: 6, name: "Databricks Platform Architect", modules: 8, duration: "16 hours" }
                    ].map((path) => (
                      <div
                        key={path.id}
                        onClick={() => setSelectedEmployee(path.id)} // Reusing selectedEmployee state for selected path
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedEmployee === path.id
                            ? 'bg-blue-50 border-r-4 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {path.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {path.modules} modules • {path.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Path Details */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Path Info */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    {(() => {
                      const paths = [
                        { id: 1, name: "Databricks Data Analyst", description: "Certified Data Analyst Associate - Databricks SQL and analytics", modules: 6, duration: "12 hours", level: "Associate" },
                        { id: 2, name: "Databricks Data Engineer", description: "Professional Data Engineer - Data pipelines and Lakehouse platform", modules: 8, duration: "16 hours", level: "Professional" },
                        { id: 3, name: "Databricks ML Engineer", description: "Professional Machine Learning Engineer - ML models and pipelines", modules: 7, duration: "14 hours", level: "Professional" },
                        { id: 4, name: "Databricks GenAI Engineer", description: "Associate GenAI Engineer - Building and deploying AI solutions", modules: 5, duration: "10 hours", level: "Associate" },
                        { id: 5, name: "Databricks Platform Admin", description: "Professional Platform Administrator - Configuration and management", modules: 6, duration: "12 hours", level: "Professional" },
                        { id: 6, name: "Databricks Platform Architect", description: "Professional Platform Architect - Cloud platform best practices", modules: 8, duration: "16 hours", level: "Professional" }
                      ];
                      const selectedPath = paths.find(path => path.id === selectedEmployee);

  return (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-xl">DB</span>
          </div>
          <div>
                              <h2 className="text-2xl font-bold text-gray-900">{selectedPath?.name}</h2>
                              <p className="text-lg text-gray-600">{selectedPath?.description}</p>
                              <p className="text-sm text-gray-500">{selectedPath?.level} Level • {selectedPath?.modules} modules • {selectedPath?.duration}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
          </div>

                  {/* Path Modules */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Learning Modules</h3>
                      <p className="text-sm text-gray-500">Course modules and progression</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {editingModules && (
                        <button
                          onClick={() => setShowCourseModal(true)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          + Add Course
                        </button>
                      )}
                      <button
                        onClick={() => setEditingModules(!editingModules)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {editingModules ? 'Save' : 'Edit Modules'}
                      </button>
                    </div>
                  </div>
                </div>
                    <div className="p-6 space-y-4">

                  {/* Modules List */}
                  {modules.map((module, index) => (
                    <div 
                      key={module.id} 
                      draggable={editingModules}
                      onDragStart={(e) => handleDragStart(e, module)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, module)}
                      className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-200 ${
                        editingModules ? 'cursor-move hover:bg-gray-100' : ''
                      } ${
                        draggedModule?.id === module.id ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          editingModules ? 'bg-blue-500' : 'bg-gray-300'
                        }`}>
                          <span className="text-white font-medium text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{module.title}</h4>
                          <p className="text-sm text-gray-500">{module.type} • {module.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {module.status}
                        </span>
                        {editingModules && (
                          <button
                            onClick={() => setModules(modules.filter(m => m.id !== module.id))}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                    </div>
                  </div>
          </div>
          </div>
          </div>
          </div>
        )}

          </div>

      {/* Course Selection Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Select Course to Add</h3>
            <button
                  onClick={() => {
                    setShowCourseModal(false);
                    setSelectedCourse(null);
                    setCourseStatus('Available');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
            </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {availableCourses
                  .filter(course => !modules.some(module => module.title === course.title))
                  .map(course => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedCourse?.id === course.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          {course.category}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{course.type}</p>
                        <p>Duration: {course.duration}</p>
                      </div>
                    </div>
                  ))}
              </div>


              {/* Modal Actions */}
              <div className="flex justify-end space-x-3">
            <button
                  onClick={() => {
                    setShowCourseModal(false);
                    setSelectedCourse(null);
                    setCourseStatus('Available');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
                <button
                  onClick={() => {
                    if (selectedCourse) {
                      const newId = Math.max(...modules.map(m => m.id)) + 1;
                      const newModuleData = {
                        id: newId,
                        title: selectedCourse.title,
                        type: selectedCourse.type,
                        duration: selectedCourse.duration,
                        status: 'Available'
                      };
                      setModules([...modules, newModuleData]);
                      setShowCourseModal(false);
                      setSelectedCourse(null);
                    }
                  }}
                  disabled={!selectedCourse}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
          </div>
      )}

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