import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { db } from "@/lib/database"; // Commented out for now - will use when database is set up

// Define UserRole enum locally
enum UserRole {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE"
}

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role as UserRole;
        token.id = (user as any).id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as UserRole;
      }
      return session;
    },
    async signIn() { return true; },
  },
  providers: [
    Credentials({
      name: "Dev Login",
      credentials: { email: { label: "Email", type: "text" }, name: { label: "Name", type: "text" } },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const name = credentials?.name?.trim() || "User";
        if (!email) return null;
        
        try {
          // For now, create a simple user object without database
          // This will be replaced with database queries once MySQL is set up
          const user = {
            id: `user_${Date.now()}`,
            email: email,
            name: name,
            role: 'EMPLOYEE' as UserRole,
            image: null
          };
          
          console.log('Auth: Created user without database:', user);
          return user;
          
          // TODO: Uncomment this when database is set up
          /*
          // Check if user exists
          const existingUsers = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
          ) as any[];
          
          if (existingUsers.length > 0) {
            return existingUsers[0];
          }
          
          // Create new user
          const result = await db.query(
            'INSERT INTO users (email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
            [email, name, 'EMPLOYEE']
          ) as any;
          
          // Get the created user
          const newUsers = await db.query(
            'SELECT * FROM users WHERE id = ?',
            [result.insertId]
          ) as any[];
          
          return newUsers[0];
          */
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// Create NextAuth instance
const handler = NextAuth(authConfig);

// Export handlers
export const GET = handler;
export const POST = handler;

// Export auth function - create a separate instance for auth
export const auth = NextAuth(authConfig);