# 🎓 Training Tracker

A comprehensive employee training management platform built with Next.js, designed to streamline organizational learning and development processes.

## 🌟 What This Application Does

Training Tracker is a modern web application that helps organizations manage employee training programs efficiently. Here's what you can do with it:

### 📚 **Course Management**
- **Create & Manage Courses**: Add new training courses with detailed information including category, skill level, duration, and resources
- **Course Timeline**: Visual timeline showing when courses should be completed after joining the company
- **Resource Management**: Track different types of learning resources (videos, workshops, interactive modules)
- **Status Tracking**: Monitor course completion status (Not Started, In Progress, Completed)
- **Edit & Delete**: Modify existing courses or remove outdated ones

### 👥 **Employee Tracking**
- **Individual Progress**: View detailed progress for each employee across all courses
- **Completion Monitoring**: Track which employees have completed specific courses
- **Timeline Analysis**: See when employees started and completed courses
- **Performance Insights**: Identify employees who complete courses on time vs. those with delays

### 📊 **Analytics & Reports**
- **Department Performance**: Compare training completion rates across different departments
- **Course Statistics**: Analyze which courses are most/least completed
- **Completion Trends**: Track monthly training completion patterns
- **Export Reports**: Generate CSV reports for further analysis
- **Top Performers**: Identify employees with the best training completion rates

### 🎯 **Key Features**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with intuitive navigation
- **Real-time Updates**: Instant updates when courses or progress changes
- **Filter & Search**: Easy filtering by category, skill level, status, and more
- **Data Visualization**: Charts and graphs to understand training patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your system
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SornsiriPromma/training-tracker.git
   cd training-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Authentication**: NextAuth.js
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## 📱 Application Structure

```
src/
├── app/
│   ├── page.tsx              # Main dashboard/welcome page
│   ├── courses/page.tsx      # Course management interface
│   ├── employees/page.tsx    # Employee tracking dashboard
│   ├── reports/page.tsx      # Analytics and reporting
│   └── admin/page.tsx        # Administrative functions
├── components/               # Reusable UI components
└── lib/                     # Utility functions and configurations
```

## 🎨 Features Overview

### Dashboard
- **Welcome Page**: Overview of the training system
- **Quick Access**: Direct links to main features
- **Recent Activity**: Latest training updates
- **Statistics**: Key metrics and insights

### Course Management
- **Add Courses**: Create new training programs
- **Edit Courses**: Modify existing course details
- **Filter Courses**: Search and filter by various criteria
- **Timeline View**: Visual representation of course scheduling

### Employee Tracking
- **Progress Monitoring**: Track individual employee progress
- **Completion Status**: Monitor on-time vs. delayed completions
- **Department Analysis**: Compare performance across teams

### Reports & Analytics
- **Performance Metrics**: Comprehensive training statistics
- **Export Functionality**: Download reports in CSV format
- **Visual Charts**: Graphical representation of data
- **Trend Analysis**: Historical performance tracking

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**: Your code is already on GitHub
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import your `training-tracker` repository
   - Deploy automatically

3. **Environment Variables**: Add these in Vercel dashboard:
   ```
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

### Other Deployment Options
- **Netlify**: Static site hosting
- **Railway**: Full-stack deployment
- **AWS/GCP/Azure**: Cloud platform deployment

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### Customization
- **Styling**: Modify Tailwind CSS classes in components
- **Data**: Update sample data in page components
- **Features**: Add new functionality in the respective page files

## 📈 Future Enhancements

- **Database Integration**: Connect to Databricks or other databases
- **Advanced Analytics**: More sophisticated reporting features
- **User Management**: Role-based access control
- **Notifications**: Email/SMS alerts for training deadlines
- **Mobile App**: Native mobile application
- **API Integration**: Connect with external learning platforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**SornsiriPromma** - [GitHub](https://github.com/SornsiriPromma) - sornsiri.promma@arcbricks.com

---

**Training Tracker** - Streamlining organizational learning and development 🚀