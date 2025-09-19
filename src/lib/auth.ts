import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-key';

export interface AuthUser {
  id: number;
  email: string;
  name?: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      return null;
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      role: user.role,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createAdminUser(): Promise<void> {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@sindhisanchaya.in' },
    });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword('adminpassword@321');
      
      await prisma.user.create({
        data: {
          email: 'admin@sindhisanchaya.in',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin',
          isActive: true,
        },
      });
      
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}
