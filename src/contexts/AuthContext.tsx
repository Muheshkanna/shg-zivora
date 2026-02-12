import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  aadhaar: string;
  password: string;
  location: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user store
const mockUsers: Array<SignupData & { id: string }> = [
  {
    id: "1",
    name: "Lakshmi Devi",
    email: "lakshmi@example.com",
    phone: "9876543210",
    aadhaar: "234567890123",
    password: "password123",
    location: "Chennai",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const found = mockUsers.find(
      (u) => (u.email === email || u.phone === email) && u.password === password
    );
    if (found) {
      const userData: User = { id: found.id, name: found.name, email: found.email, phone: found.phone, location: found.location };
      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
      localStorage.setItem("auth_token", "mock-jwt-token-" + found.id);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<{ success: boolean; message: string }> => {
    const exists = mockUsers.find((u) => u.email === data.email || u.phone === data.phone);
    if (exists) return { success: false, message: "User already exists" };

    const newUser = { ...data, id: String(mockUsers.length + 1) };
    mockUsers.push(newUser);
    const userData: User = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, location: newUser.location };
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    localStorage.setItem("auth_token", "mock-jwt-token-" + newUser.id);
    return { success: true, message: "Account created successfully" };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
