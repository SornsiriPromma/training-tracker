# Database Setup Instructions

## Prisma Removal Complete ✅

Prisma has been successfully removed and replaced with raw SQL using mysql2.

## What Changed

1. **Removed Prisma dependencies**:
   - `@prisma/client`
   - `@auth/prisma-adapter`
   - `prisma` (dev dependency)

2. **Replaced with mysql2**:
   - Direct MySQL connection using mysql2/promise
   - Connection pooling for better performance
   - Raw SQL queries

3. **Updated files**:
   - `src/lib/database.ts` - New database connection
   - `src/app/api/auth/[...nextauth]/route.ts` - Updated auth to use raw SQL
   - `database/schema.sql` - MySQL schema
   - `scripts/init-db.js` - Database initialization script

## Setup Instructions

### 1. Install MySQL
Choose one of these options:

**Option A: XAMPP (Easiest)**
- Download from https://www.apachefriends.org/
- Install and start MySQL from XAMPP control panel

**Option B: Manual MySQL Installation**
- Download from https://dev.mysql.com/downloads/mysql/
- Install MySQL Community Server
- Set root password during installation

**Option C: Cloud MySQL Service**
- Use Railway, PlanetScale, or Supabase
- Get connection details

### 2. Create Environment File
Create a `.env` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=training_tracker

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
```

### 3. Initialize Database
Run the database initialization script:

```bash
npm run db:init
```

### 4. Start the Application
```bash
npm run dev
```

## Database Schema

The database includes these tables:
- `users` - User accounts
- `accounts` - OAuth accounts (NextAuth)
- `sessions` - User sessions (NextAuth)
- `verification_tokens` - Email verification (NextAuth)
- `courses` - Training courses
- `course_assignments` - Course assignments to users
- `course_progress` - User progress on courses

## Benefits of Raw SQL Approach

✅ **Better Performance** - No ORM overhead
✅ **Full Control** - Direct SQL queries
✅ **Easier Debugging** - See exactly what queries run
✅ **No Generation Issues** - No client generation problems
✅ **Simpler Setup** - Just MySQL, no Prisma complexity

## Next Steps

1. Install MySQL using one of the options above
2. Create your `.env` file with database credentials
3. Run `npm run db:init` to create the database schema
4. Start the application with `npm run dev`

The application should now work without any Prisma-related errors!
