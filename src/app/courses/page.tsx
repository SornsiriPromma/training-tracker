'use client';

import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function CoursesPage() {
  // Filter state
  const [filters, setFilters] = useState({
    category: '',
    skillLevel: '',
    mandatory: '',
    status: '',
    resourceType: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Add course modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    category: '',
    skillLevel: '',
    mandatory: '',
    title: '',
    daysAfterJoin: '',
    resourceType: '',
    resourceName: '',
    duration: '',
    url: '',
    note: ''
  });

  // Edit course modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editCourse, setEditCourse] = useState({
    category: '',
    skillLevel: '',
    mandatory: '',
    title: '',
    daysAfterJoin: '',
    resourceType: '',
    resourceName: '',
    duration: '',
    url: '',
    note: ''
  });

  // Selected course state
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Sample courses data
  const [courses, setCourses] = useState([
    {
      id: 1,
      category: 'Technical Skills',
      skillLevel: 'Beginner',
      mandatory: 'Yes',
      title: 'Introduction to React',
      status: 'Completed',
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
      status: 'In Progress',
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
      status: 'Not Started',
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
      status: 'Completed',
      daysAfterJoin: 60,
      resourceType: 'Video Course',
      resourceName: 'SQL Mastery',
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
      status: 'Not Started',
      daysAfterJoin: 45,
      resourceType: 'Interactive Module',
      resourceName: 'Presentation Skills',
      duration: '1.5 hours',
      url: 'https://example.com/presentations',
      note: 'Improve communication skills'
    }
  ]);

  // Get unique values for filters
  const categories = [...new Set(courses.map(course => course.category))];
  const skillLevels = [...new Set(courses.map(course => course.skillLevel))];
  const statuses = [...new Set(courses.map(course => course.status))];
  const resourceTypes = [...new Set(courses.map(course => course.resourceType))];

  // Filter courses based on current filters
  const filteredCourses = courses.filter(course => {
    return (
      (!filters.category || course.category === filters.category) &&
      (!filters.skillLevel || course.skillLevel === filters.skillLevel) &&
      (!filters.mandatory || course.mandatory === filters.mandatory) &&
      (!filters.status || course.status === filters.status) &&
      (!filters.resourceType || course.resourceType === filters.resourceType)
    );
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }

    return 0;
  });

  // Handle sorting
  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  // Handle adding new course
  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.category || !newCourse.skillLevel) {
      alert('Please fill in required fields: Title, Category, and Skill Level');
      return;
    }

    const course = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      category: newCourse.category,
      skillLevel: newCourse.skillLevel,
      mandatory: newCourse.mandatory || 'No',
      title: newCourse.title,
      status: 'Not Started',
      daysAfterJoin: parseInt(newCourse.daysAfterJoin) || 30,
      startedDate: null,
      completedDate: null,
      resourceType: newCourse.resourceType || 'Video Course',
      resourceName: newCourse.resourceName || '',
      duration: newCourse.duration || '1 hour',
      url: newCourse.url || '',
      note: newCourse.note || ''
    };

    setCourses([...courses, course]);
    setShowAddModal(false);
    setNewCourse({
      category: '',
      skillLevel: '',
      mandatory: '',
      title: '',
      daysAfterJoin: '',
      resourceType: '',
      resourceName: '',
      duration: '',
      url: '',
      note: ''
    });
  };

  // Handle editing course
  const handleEditCourse = (courseId: number) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setEditingCourseId(courseId);
      setShowEditModal(true);
      setEditCourse({
        category: course.category,
        skillLevel: course.skillLevel,
        mandatory: course.mandatory,
        title: course.title,
        daysAfterJoin: course.daysAfterJoin.toString(),
        resourceType: course.resourceType,
        resourceName: course.resourceName,
        duration: course.duration,
        url: course.url,
        note: course.note
      });
    }
  };

  // Handle saving edited course
  const handleSaveEdit = () => {
    if (!editCourse.title || !editCourse.category || !editCourse.skillLevel) {
      alert('Please fill in required fields: Title, Category, and Skill Level');
      return;
    }

    setCourses(courses.map(course => 
      course.id === editingCourseId 
        ? {
            ...course,
            category: editCourse.category,
            skillLevel: editCourse.skillLevel,
            mandatory: editCourse.mandatory,
            title: editCourse.title,
            daysAfterJoin: parseInt(editCourse.daysAfterJoin) || 30,
            resourceType: editCourse.resourceType,
            resourceName: editCourse.resourceName,
            duration: editCourse.duration,
            url: editCourse.url,
            note: editCourse.note
          }
        : course
    ));
    
    setShowEditModal(false);
    setEditingCourseId(null);
    setSelectedCourse(null);
    setEditCourse({
      category: '',
      skillLevel: '',
      mandatory: '',
      title: '',
      daysAfterJoin: '',
      resourceType: '',
      resourceName: '',
      duration: '',
      url: '',
      note: ''
    });
  };

  // Handle canceling edit
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingCourseId(null);
    setSelectedCourse(null);
    setEditCourse({
      category: '',
      skillLevel: '',
      mandatory: '',
      title: '',
      daysAfterJoin: '',
      resourceType: '',
      resourceName: '',
      duration: '',
      url: '',
      note: ''
    });
  };

  // Handle deleting course
  const handleDeleteCourse = (courseId: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
      setSelectedCourse(null); // Clear selection after deletion
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
                <p className="text-sm text-gray-500">Manage and track training courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              Filter Courses
            </button>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Course
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Category Filter */}
              <Menu as="div" className="relative inline-block w-full">
                <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {filters.category || 'All Categories'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setFilters({...filters, category: ''})}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filters.category === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Categories
                      </button>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category}>
                        <button
                          onClick={() => setFilters({...filters, category: category})}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            filters.category === category ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {category}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Skill Level Filter */}
              <Menu as="div" className="relative inline-block w-full">
                <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {filters.skillLevel || 'All Skill Levels'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setFilters({...filters, skillLevel: ''})}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filters.skillLevel === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Skill Levels
                      </button>
                    </MenuItem>
                    {skillLevels.map((level) => (
                      <MenuItem key={level}>
                        <button
                          onClick={() => setFilters({...filters, skillLevel: level})}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            filters.skillLevel === level ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {level}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Mandatory Filter */}
              <Menu as="div" className="relative inline-block w-full">
                <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {filters.mandatory || 'All Mandatory'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setFilters({...filters, mandatory: ''})}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filters.mandatory === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Mandatory
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => setFilters({...filters, mandatory: 'Yes'})}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filters.mandatory === 'Yes' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Mandatory
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => setFilters({...filters, mandatory: 'No'})}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filters.mandatory === 'No' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Optional
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

              {/* Status Filter */}
              <Menu as="div" className="relative inline-block w-full">
                <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {filters.status || 'All Status'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setFilters({...filters, status: ''})}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filters.status === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Status
                      </button>
                    </MenuItem>
                    {statuses.map((status) => (
                      <MenuItem key={status}>
                        <button
                          onClick={() => setFilters({...filters, status: status})}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            filters.status === status ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {status}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Resource Type Filter */}
              <Menu as="div" className="relative inline-block w-full">
                <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {filters.resourceType || 'All Resource Types'}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        onClick={() => setFilters({...filters, resourceType: ''})}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filters.resourceType === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Resource Types
                      </button>
                    </MenuItem>
                    {resourceTypes.map((type) => (
                      <MenuItem key={type}>
                        <button
                          onClick={() => setFilters({...filters, resourceType: type})}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            filters.resourceType === type ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {type}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        )}

        {/* Available Courses Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Available Courses</h2>
                <p className="text-sm text-gray-500">Manage and track all training courses</p>
              </div>
              {selectedCourse && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditCourse(selectedCourse)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit Course
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(selectedCourse)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete Course
                  </button>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('category')}
                  >
                    Category
                    {sortConfig?.key === 'category' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('skillLevel')}
                  >
                    Skill Level
                    {sortConfig?.key === 'skillLevel' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('mandatory')}
                  >
                    Mandatory
                    {sortConfig?.key === 'mandatory' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('title')}
                  >
                    Title
                    {sortConfig?.key === 'title' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('daysAfterJoin')}
                  >
                    Days After Join
                    {sortConfig?.key === 'daysAfterJoin' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('resourceType')}
                  >
                    Resource Type
                    {sortConfig?.key === 'resourceType' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('resourceName')}
                  >
                    Resource Name
                    {sortConfig?.key === 'resourceName' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('duration')}
                  >
                    Duration
                    {sortConfig?.key === 'duration' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('url')}
                  >
                    URL
                    {sortConfig?.key === 'url' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('note')}
                  >
                    Note
                    {sortConfig?.key === 'note' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCourses.map((course) => (
                  <tr 
                    key={course.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedCourse === course.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSkillLevelColor(course.skillLevel)}`}>
                        {course.skillLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.mandatory}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <a href={course.url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline">
                        {course.title}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.daysAfterJoin} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.resourceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.resourceName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.url ? (
                        <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline">
                          {course.url}
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-6 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            {/* Close Button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-3">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Course</h3>
              
              <div className="space-y-4">
                {/* Full Width Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    placeholder="Enter course title"
                  />
                </div>

                {/* Two Column Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {newCourse.category || 'Select category'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, category: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.category === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select category
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, category: 'Technical Skills'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.category === 'Technical Skills' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Technical Skills
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, category: 'Safety Training'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.category === 'Safety Training' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Safety Training
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, category: 'Leadership'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.category === 'Leadership' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Leadership
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, category: 'Communication'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.category === 'Communication' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Communication
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level *</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {newCourse.skillLevel || 'Select skill level'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, skillLevel: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.skillLevel === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select skill level
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, skillLevel: 'Beginner'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.skillLevel === 'Beginner' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Beginner
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, skillLevel: 'Intermediate'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.skillLevel === 'Intermediate' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Intermediate
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, skillLevel: 'Advanced'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.skillLevel === 'Advanced' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Advanced
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, skillLevel: 'All Levels'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.skillLevel === 'All Levels' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                All Levels
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mandatory</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {newCourse.mandatory || 'Select mandatory status'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, mandatory: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.mandatory === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select mandatory status
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, mandatory: 'Yes'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.mandatory === 'Yes' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Yes
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, mandatory: 'No'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.mandatory === 'No' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                No
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Days After Join</label>
                      <input
                        type="number"
                        value={newCourse.daysAfterJoin}
                        onChange={(e) => setNewCourse({...newCourse, daysAfterJoin: e.target.value})}
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 [&::placeholder]:text-gray-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {newCourse.resourceType || 'Select resource type'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, resourceType: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.resourceType === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select resource type
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, resourceType: 'Video Course'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.resourceType === 'Video Course' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Video Course
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, resourceType: 'Interactive Module'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.resourceType === 'Interactive Module' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Interactive Module
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, resourceType: 'Workshop'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.resourceType === 'Workshop' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Workshop
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setNewCourse({...newCourse, resourceType: 'Documentation'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  newCourse.resourceType === 'Documentation' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Documentation
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resource Name</label>
                      <input
                        type="text"
                        value={newCourse.resourceName}
                        onChange={(e) => setNewCourse({...newCourse, resourceName: e.target.value})}
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        placeholder="Enter resource name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        placeholder="1 hour"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Width Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={newCourse.url}
                    onChange={(e) => setNewCourse({...newCourse, url: e.target.value})}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    value={newCourse.note}
                    onChange={(e) => setNewCourse({...newCourse, note: e.target.value})}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    placeholder="Enter additional notes"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCourse}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500/50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-6 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            {/* Close Button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-3">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Course</h3>
              
              <div className="space-y-4">
                {/* Full Width Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={editCourse.title}
                    onChange={(e) => setEditCourse({...editCourse, title: e.target.value})}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    placeholder="Enter course title"
                  />
                </div>

                {/* Two Column Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {editCourse.category || 'Select category'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setEditCourse({...editCourse, category: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  editCourse.category === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select category
                              </button>
                            </MenuItem>
                            {categories.map((category) => (
                              <MenuItem key={category}>
                                <button
                                  onClick={() => setEditCourse({...editCourse, category})}
                                  className={`block w-full px-4 py-2 text-left text-sm ${
                                    editCourse.category === category ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  {category}
                                </button>
                              </MenuItem>
                            ))}
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level *</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {editCourse.skillLevel || 'Select skill level'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setEditCourse({...editCourse, skillLevel: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  editCourse.skillLevel === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select skill level
                              </button>
                            </MenuItem>
                            {skillLevels.map((level) => (
                              <MenuItem key={level}>
                                <button
                                  onClick={() => setEditCourse({...editCourse, skillLevel: level})}
                                  className={`block w-full px-4 py-2 text-left text-sm ${
                                    editCourse.skillLevel === level ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  {level}
                                </button>
                              </MenuItem>
                            ))}
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mandatory</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {editCourse.mandatory || 'Select mandatory'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setEditCourse({...editCourse, mandatory: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  editCourse.mandatory === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select mandatory
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setEditCourse({...editCourse, mandatory: 'Yes'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  editCourse.mandatory === 'Yes' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Yes
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() => setEditCourse({...editCourse, mandatory: 'No'})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  editCourse.mandatory === 'No' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                No
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Days After Join</label>
                      <input
                        type="number"
                        value={editCourse.daysAfterJoin}
                        onChange={(e) => setEditCourse({...editCourse, daysAfterJoin: e.target.value})}
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 [&::placeholder]:text-gray-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                      <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {editCourse.resourceType || 'Select resource type'}
                          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-300 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => setEditCourse({...editCourse, resourceType: ''})}
                                className={`block w-full px-4 py-2 text-left text-sm ${
                                  editCourse.resourceType === '' ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                Select resource type
                              </button>
                            </MenuItem>
                            {resourceTypes.map((type) => (
                              <MenuItem key={type}>
                                <button
                                  onClick={() => setEditCourse({...editCourse, resourceType: type})}
                                  className={`block w-full px-4 py-2 text-left text-sm ${
                                    editCourse.resourceType === type ? 'bg-blue-50 text-blue-900' : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                >
                                  {type}
                                </button>
                              </MenuItem>
                            ))}
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resource Name</label>
                      <input
                        type="text"
                        value={editCourse.resourceName}
                        onChange={(e) => setEditCourse({...editCourse, resourceName: e.target.value})}
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        placeholder="Enter resource name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={editCourse.duration}
                        onChange={(e) => setEditCourse({...editCourse, duration: e.target.value})}
                        className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        placeholder="1 hour"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Width Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={editCourse.url}
                    onChange={(e) => setEditCourse({...editCourse, url: e.target.value})}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    value={editCourse.note}
                    onChange={(e) => setEditCourse({...editCourse, note: e.target.value})}
                    className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                    placeholder="Enter additional notes"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
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