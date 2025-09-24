'use client';

import { useState } from 'react';
import { 
  TrophyIcon, 
  FireIcon, 
  StarIcon, 
  ChartBarIcon,
  ClockIcon,
  BookOpenIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

// Mock data for employee dashboard
const employeeData = {
  name: "John Smith",
  department: "Engineering",
  currentStreak: 12,
  longestStreak: 28,
  coursesCompleted: 8,
  coursesInProgress: 2,
  achievements: [
    { id: 1, name: "First Steps", description: "Complete your first course", icon: "🎯", earned: true },
    { id: 2, name: "Speed Learner", description: "Complete 3 courses in one week", icon: "⚡", earned: true },
    { id: 3, name: "Consistent Performer", description: "7-day learning streak", icon: "🔥", earned: true },
    { id: 4, name: "Knowledge Seeker", description: "Complete 10 courses", icon: "📚", earned: false },
    { id: 5, name: "Databricks Data Analyst", description: "Certified in Databricks SQL and analytics", icon: "📊", earned: false, badge: "https://images.credly.com/images/00634f82-b07f-48bb-8bbd-a610c5c83eb8/Databricks_Certified_Data_Analyst_Associate_badge.png" },
    { id: 6, name: "Databricks Data Engineer", description: "Expert in data pipelines and Lakehouse", icon: "🔧", earned: false, badge: "https://images.credly.com/images/00634f82-b07f-48bb-8bbd-a610c5c83eb8/Databricks_Certified_Data_Engineer_Professional_badge.png" },
    { id: 7, name: "Databricks ML Engineer", description: "Machine Learning specialist certification", icon: "🤖", earned: false, badge: "https://images.credly.com/images/00634f82-b07f-48bb-8bbd-a610c5c83eb8/Databricks_Certified_Machine_Learning_Professional_badge.png" },
    { id: 8, name: "Databricks GenAI Engineer", description: "Generative AI solutions expert", icon: "✨", earned: false, badge: "https://images.credly.com/images/00634f82-b07f-48bb-8bbd-a610c5c83eb8/Databricks_Certified_GenAI_Engineer_Associate_badge.png" },
    { id: 9, name: "Databricks Platform Admin", description: "Platform configuration and management", icon: "⚙️", earned: false, badge: "https://images.credly.com/images/00634f82-b07f-48bb-8bbd-a610c5c83eb8/Databricks_Certified_Platform_Administrator_Professional_badge.png" },
    { id: 10, name: "Databricks Platform Architect", description: "Cloud platform architecture expert", icon: "🏗️", earned: false, badge: "https://images.credly.com/images/00634f82-b07f-48bb-8bbd-a610c5c83eb8/Databricks_Certified_Platform_Architect_Professional_badge.png" }
  ],
  recentActivity: [
    { type: "course_completed", course: "Databricks SQL Fundamentals", time: "2 hours ago" },
    { type: "achievement_earned", achievement: "Speed Learner", time: "1 day ago" },
    { type: "streak_milestone", milestone: "10 day streak", time: "3 days ago" }
  ],
  assignedCourses: [
    { id: 1, title: "Databricks SQL Fundamentals", difficulty: "Medium", progress: 75, dueDate: "2024-01-15" },
    { id: 2, title: "Databricks Data Engineering", difficulty: "Hard", progress: 30, dueDate: "2024-01-20" },
    { id: 3, title: "Databricks Machine Learning", difficulty: "Hard", progress: 0, dueDate: "2024-01-25" },
    { id: 4, title: "Databricks Lakehouse Platform", difficulty: "Medium", progress: 45, dueDate: "2024-01-30" }
  ],
  leaderboard: [
    { rank: 1, name: "Sarah Johnson", department: "Engineering", coursesCompleted: 15 },
    { rank: 2, name: "Mike Chen", department: "Engineering", coursesCompleted: 12 },
    { rank: 3, name: "John Smith", department: "Engineering", coursesCompleted: 8 },
    { rank: 4, name: "Emily Davis", department: "Marketing", coursesCompleted: 7 },
    { rank: 5, name: "Alex Rodriguez", department: "Sales", coursesCompleted: 6 }
  ]
};

// Gamification Components
const ProgressBar = ({ current, total, label, color = "blue" }: { current: number; total: number; label: string; color?: string }) => {
  const percentage = (current / total) * 100;
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500", 
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    purple: "bg-purple-500"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const BadgeDisplay = ({ achievement }: { achievement: any }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
      achievement.earned 
        ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100' 
        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
    }`}>
      {achievement.badge && !imageError ? (
        <div className={`w-12 h-12 rounded-lg overflow-hidden ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
          <img 
            src={achievement.badge} 
            alt={`${achievement.name} badge`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>
      )}
      <div className="flex-1">
        <h4 className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
          {achievement.name}
        </h4>
        <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
          {achievement.description}
        </p>
      </div>
      {achievement.earned && (
        <CheckCircleIcon className="w-5 h-5 text-green-500" />
      )}
    </div>
  );
};

const ActivityItem = ({ activity }: { activity: any }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_completed': return <BookOpenIcon className="w-5 h-5 text-green-500" />;
      case 'achievement_earned': return <TrophyIcon className="w-5 h-5 text-yellow-500" />;
      case 'streak_milestone': return <FireIcon className="w-5 h-5 text-orange-500" />;
      default: return <StarIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'course_completed': return `Completed "${activity.course}"`;
      case 'achievement_earned': return `Earned "${activity.achievement}" badge`;
      case 'streak_milestone': return `Reached ${activity.milestone}`;
      default: return 'New activity';
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      {getActivityIcon(activity.type)}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{getActivityText(activity)}</p>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  );
};

const LeaderboardItem = ({ user, isCurrentUser = false }: { user: any; isCurrentUser?: boolean }) => (
  <div className={`flex items-center space-x-3 p-3 rounded-lg ${
    isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white border border-gray-200'
  }`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
      user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
      user.rank === 2 ? 'bg-gray-300 text-gray-700' :
      user.rank === 3 ? 'bg-orange-400 text-orange-900' :
      'bg-gray-200 text-gray-600'
    }`}>
      {user.rank}
    </div>
    <div className="flex-1">
      <p className={`font-medium ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
        {user.name}
      </p>
      <p className="text-sm text-gray-500">{user.department}</p>
    </div>
    <div className="text-right">
      <p className="font-bold text-gray-900">{user.coursesCompleted} courses</p>
      <p className="text-sm text-gray-500">Completed</p>
    </div>
  </div>
);

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [moduleStatus, setModuleStatus] = useState<{[key: string]: 'pending' | 'in-progress' | 'completed'}>({
    '1-TypeScript Fundamentals': 'completed',
    '1-Advanced Types & Generics': 'completed',
  });
  const [showNotification, setShowNotification] = useState<{
    show: boolean;
    type: 'start' | 'complete';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'start',
    title: '',
    message: ''
  });

  const handleStartModule = (courseId: number, moduleTitle: string) => {
    const moduleKey = `${courseId}-${moduleTitle}`;
    setModuleStatus(prev => ({
      ...prev,
      [moduleKey]: 'in-progress'
    }));
    
    // Show medal notification
    setShowNotification({
      show: true,
      type: 'start',
      title: 'Learning Started!',
      message: `You've begun "${moduleTitle}". Keep up the momentum!`
    });
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setShowNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Hub</h1>
                <p className="text-gray-600">Welcome back, {employeeData.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{employeeData.coursesCompleted}</div>
                <div className="text-sm text-gray-500">Courses Completed</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-orange-600">{employeeData.currentStreak}</div>
                <div className="text-sm text-gray-500">Day Streak</div>
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
            { id: 'courses', label: 'My Courses', icon: BookOpenIcon },
            { id: 'achievements', label: 'Achievements', icon: TrophyIcon },
            { id: 'leaderboard', label: 'Leaderboard', icon: UserGroupIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                    <p className="text-2xl font-bold text-orange-600">{employeeData.currentStreak} days</p>
                  </div>
                  <FireIcon className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Best: {employeeData.longestStreak} days</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Courses Completed</p>
                    <p className="text-2xl font-bold text-green-600">{employeeData.coursesCompleted}</p>
                  </div>
                  <CheckCircleIcon className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">{employeeData.coursesInProgress} in progress</p>
              </div>

            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-3">
                {employeeData.recentActivity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {/* General Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Learning Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employeeData.achievements.filter(achievement => !achievement.name.includes('Databricks')).map((achievement) => (
                  <BadgeDisplay key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>

            {/* Databricks Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DB</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Databricks Certifications</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Professional certifications in Databricks technologies</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {employeeData.achievements.filter(achievement => achievement.name.includes('Databricks')).map((achievement) => (
                  <BadgeDisplay key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Leaderboard</h3>
              <div className="space-y-3">
                {employeeData.leaderboard.map((user) => (
                  <LeaderboardItem 
                    key={user.rank} 
                    user={user} 
                    isCurrentUser={user.name === employeeData.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* My Learning Path Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">My Learning Path</h3>
              <p className="text-sm text-gray-500">Select a course to view detailed information</p>
            </div>

            {/* Course List and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Available Courses</h2>
                    <p className="text-sm text-gray-500">Your assigned learning materials</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {employeeData.assignedCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourse(course.id)}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedCourse === course.id
                            ? 'bg-blue-50 border-r-4 border-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                              <BookOpenIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {course.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {course.difficulty}
                            </p>
                            <div className="mt-1">
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div 
                                  className="bg-green-500 h-1 rounded-full transition-all duration-300"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{course.progress}% complete</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Course Info */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    {(() => {
                      const course = employeeData.assignedCourses.find(c => c.id === selectedCourse);
                      return (
                        <>
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                              <BookOpenIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">{course?.title}</h2>
                              <p className="text-lg text-gray-600">Databricks Certification Course</p>
                              <p className="text-sm text-gray-500">Difficulty: {course?.difficulty}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-6">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 mb-2">Course Progress</h3>
                              {(() => {
                                const courseModules = course?.title === "Databricks SQL Fundamentals" ? [
                                  "SQL Basics & Syntax", "Databricks SQL Workspace", "Query Optimization", 
                                  "Data Visualization", "Advanced SQL Functions"
                                ] : course?.title === "Databricks Data Engineering" ? [
                                  "Data Pipeline Design", "ETL Processes", "Data Quality & Validation", 
                                  "Streaming Data Processing", "Performance Tuning"
                                ] : course?.title === "Databricks Machine Learning" ? [
                                  "ML Fundamentals", "Feature Engineering", "Model Training & Evaluation", 
                                  "MLflow Integration", "Model Deployment"
                                ] : [
                                  "Lakehouse Architecture", "Delta Lake Features", "Data Governance", 
                                  "Security & Access Control", "Platform Administration"
                                ];
                                const completedCount = courseModules.filter(moduleTitle => 
                                  moduleStatus[`${selectedCourse}-${moduleTitle}`] === 'completed'
                                ).length;
                                const totalModules = courseModules.length;
                                return (
                                  <ProgressBar 
                                    current={completedCount} 
                                    total={totalModules} 
                                    label={`${completedCount}/${totalModules} modules completed`}
                                    color="green"
                                  />
                                );
                              })()}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Course Details */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Course Details</h3>
                      <p className="text-sm text-gray-500">Comprehensive course information and learning objectives</p>
                    </div>
                    <div className="p-6 space-y-6">
                      {(() => {
                        const course = employeeData.assignedCourses.find(c => c.id === selectedCourse);
                        const courseDetails = course?.title === "Databricks SQL Fundamentals" ? {
                          description: "Master SQL fundamentals and advanced query techniques using Databricks SQL workspace. Learn to write efficient queries, optimize performance, and create compelling data visualizations.",
                          objectives: [
                            "Understand SQL syntax and best practices",
                            "Navigate Databricks SQL workspace effectively", 
                            "Write optimized queries for better performance",
                            "Create interactive data visualizations",
                            "Apply advanced SQL functions and techniques"
                          ],
                          prerequisites: ["Basic understanding of databases", "Familiarity with data concepts"],
                          skills: ["SQL", "Data Analysis", "Query Optimization", "Data Visualization"],
                          certification: "Databricks Certified Data Analyst Associate"
                        } : course?.title === "Databricks Data Engineering" ? {
                          description: "Build robust data pipelines and ETL processes using Databricks. Learn data quality validation, streaming processing, and performance optimization techniques.",
                          objectives: [
                            "Design scalable data pipeline architectures",
                            "Implement ETL processes with best practices",
                            "Ensure data quality and validation",
                            "Process streaming data in real-time",
                            "Optimize pipeline performance and costs"
                          ],
                          prerequisites: ["SQL knowledge", "Basic Python programming", "Understanding of data concepts"],
                          skills: ["Data Engineering", "ETL/ELT", "Apache Spark", "Data Quality", "Streaming"],
                          certification: "Databricks Certified Data Engineer Professional"
                        } : course?.title === "Databricks Machine Learning" ? {
                          description: "Develop and deploy machine learning models using Databricks ML platform. Learn feature engineering, model training, MLflow integration, and production deployment.",
                          objectives: [
                            "Understand machine learning fundamentals",
                            "Master feature engineering techniques",
                            "Train and evaluate ML models effectively",
                            "Integrate MLflow for experiment tracking",
                            "Deploy models to production environments"
                          ],
                          prerequisites: ["Python programming", "Statistics knowledge", "Basic ML concepts"],
                          skills: ["Machine Learning", "Python", "MLflow", "Feature Engineering", "Model Deployment"],
                          certification: "Databricks Certified Machine Learning Professional"
                        } : {
                          description: "Master Databricks Lakehouse platform architecture, Delta Lake features, data governance, security, and platform administration for enterprise-scale deployments.",
                          objectives: [
                            "Understand Lakehouse architecture principles",
                            "Implement Delta Lake features effectively",
                            "Establish data governance frameworks",
                            "Configure security and access controls",
                            "Administer platform operations and monitoring"
                          ],
                          prerequisites: ["Cloud platform knowledge", "Data architecture understanding", "Security concepts"],
                          skills: ["Platform Administration", "Data Governance", "Security", "Delta Lake", "Architecture"],
                          certification: "Databricks Certified Platform Administrator Professional"
                        };
                        
                        return (
                          <div className="space-y-6">
                            {/* Course Description */}
                            <div>
                              <h4 className="text-md font-semibold text-gray-900 mb-3">Course Description</h4>
                              <p className="text-gray-700 leading-relaxed">{courseDetails.description}</p>
                            </div>


                            {/* Prerequisites */}
                            <div>
                              <h4 className="text-md font-semibold text-gray-900 mb-3">Prerequisites</h4>
                              <div className="flex flex-wrap gap-2">
                                {courseDetails.prerequisites.map((prereq, index) => (
                                  <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                    {prereq}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Skills Gained */}
                            <div>
                              <h4 className="text-md font-semibold text-gray-900 mb-3">Skills You'll Gain</h4>
                              <div className="flex flex-wrap gap-2">
                                {courseDetails.skills.map((skill, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Certification */}
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="text-md font-semibold text-blue-900 mb-2">Certification</h4>
                              <p className="text-blue-800 font-medium">{courseDetails.certification}</p>
                              <p className="text-blue-700 text-sm mt-1">Upon completion, you'll be prepared for this industry-recognized certification.</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900">Course Modules</h3>
                      <p className="text-sm text-gray-500">Learning modules and interactive content</p>
                    </div>
                    <div className="p-6 space-y-4">
                      {(() => {
                        const course = employeeData.assignedCourses.find(c => c.id === selectedCourse);
                        const modules = course?.title === "Databricks SQL Fundamentals" ? [
                          { title: "SQL Basics & Syntax", duration: "45 min", type: "Video" },
                          { title: "Databricks SQL Workspace", duration: "60 min", type: "Interactive" },
                          { title: "Query Optimization", duration: "30 min", type: "Video" },
                          { title: "Data Visualization", duration: "25 min", type: "Hands-on" },
                          { title: "Advanced SQL Functions", duration: "40 min", type: "Reading" }
                        ] : course?.title === "Databricks Data Engineering" ? [
                          { title: "Data Pipeline Design", duration: "50 min", type: "Video" },
                          { title: "ETL Processes", duration: "45 min", type: "Interactive" },
                          { title: "Data Quality & Validation", duration: "35 min", type: "Hands-on" },
                          { title: "Streaming Data Processing", duration: "40 min", type: "Video" },
                          { title: "Performance Tuning", duration: "30 min", type: "Reading" }
                        ] : course?.title === "Databricks Machine Learning" ? [
                          { title: "ML Fundamentals", duration: "60 min", type: "Video" },
                          { title: "Feature Engineering", duration: "45 min", type: "Interactive" },
                          { title: "Model Training & Evaluation", duration: "50 min", type: "Hands-on" },
                          { title: "MLflow Integration", duration: "35 min", type: "Video" },
                          { title: "Model Deployment", duration: "40 min", type: "Reading" }
                        ] : [
                          { title: "Lakehouse Architecture", duration: "40 min", type: "Video" },
                          { title: "Delta Lake Features", duration: "45 min", type: "Interactive" },
                          { title: "Data Governance", duration: "30 min", type: "Reading" },
                          { title: "Security & Access Control", duration: "35 min", type: "Hands-on" },
                          { title: "Platform Administration", duration: "25 min", type: "Video" }
                        ];
                        return modules.map((module, index) => {
                          const moduleKey = `${selectedCourse}-${module.title}`;
                          const status = moduleStatus[moduleKey] || 'pending';
                          const isCompleted = status === 'completed';
                          const isInProgress = status === 'in-progress';
                          return (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group" onClick={() => {
                              // Open course content in new tab or handle navigation
                              const courseUrl = `https://learn.databricks.com/course/${module.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
                              window.open(courseUrl, '_blank');
                            }}>
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isCompleted ? 'bg-green-500' : 
                                  isInProgress ? 'bg-blue-500' : 'bg-gray-300'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircleIcon className="w-5 h-5 text-white" />
                                  ) : isInProgress ? (
                                    <ClockIcon className="w-4 h-4 text-white" />
                                  ) : (
                                    <PlayIcon className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{module.title}</h4>
                                  <p className="text-sm text-gray-500">{module.type} • {module.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <div className="flex space-x-2">
                                {status === 'pending' && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStartModule(selectedCourse, module.title);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-colors text-sm font-medium"
                                  >
                                    Start
                                  </button>
                                )}
                                {status === 'in-progress' && (
                                  <>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const moduleKey = `${selectedCourse}-${module.title}`;
                                        setModuleStatus(prev => ({
                                          ...prev,
                                          [moduleKey]: 'completed'
                                        }));
                                        
                                        // Show medal notification
                                        setShowNotification({
                                          show: true,
                                          type: 'complete',
                                          title: 'Module Completed!',
                                          message: `Congratulations! You've mastered "${module.title}"!`
                                        });
                                        
                                        // Auto-hide after 5 seconds
                                        setTimeout(() => {
                                          setShowNotification(prev => ({ ...prev, show: false }));
                                        }, 5000);
                                      }}
                                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-md transition-colors text-sm font-medium"
                                    >
                                      Complete
                                    </button>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const moduleKey = `${selectedCourse}-${module.title}`;
                                        setModuleStatus(prev => ({
                                          ...prev,
                                          [moduleKey]: 'pending'
                                        }));
                                      }}
                                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                    >
                                      Reset
                                    </button>
                                  </>
                                )}
                                {status === 'completed' && (
                                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                                    Completed
                                  </span>
                                )}
                                </div>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>

                  {/* Course Actions */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Course Actions</h3>
                    <div className="flex space-x-4">
                      <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <PlayIcon className="w-5 h-5" />
                        <span>Continue Learning</span>
                      </button>
                      <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        View Resources
                      </button>
                      <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Take Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Medal Notification */}
      {showNotification.show && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-500">
          <div className={`relative bg-white rounded-xl shadow-lg border-2 p-4 max-w-xs ${
            showNotification.type === 'complete' 
              ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' 
              : 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50'
          }`}>
            {/* Close button */}
            <button
              onClick={() => setShowNotification(prev => ({ ...prev, show: false }))}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Medal Icon */}
            <div className="flex items-center justify-center mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                showNotification.type === 'complete' 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600'
              }`}>
                {showNotification.type === 'complete' ? (
                  <TrophyIcon className="w-6 h-6 text-white" />
                ) : (
                  <PlayIcon className="w-6 h-6 text-white" />
                )}
              </div>
            </div>
            
            {/* Notification Content */}
            <div className="text-center">
              <h3 className={`text-sm font-bold mb-1 ${
                showNotification.type === 'complete' ? 'text-yellow-800' : 'text-blue-800'
              }`}>
                {showNotification.title}
              </h3>
              <p className={`text-xs leading-tight ${
                showNotification.type === 'complete' ? 'text-yellow-700' : 'text-blue-700'
              }`}>
                {showNotification.message}
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border border-yellow-400"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full border border-blue-400"></div>
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