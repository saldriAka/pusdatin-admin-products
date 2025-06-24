import type { LoginCredentials, User } from "@/entities/auth"

// Fake authentication service
export class AuthService {
  private static readonly FAKE_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_FAKE_EMAIL || "",
  password: process.env.NEXT_PUBLIC_FAKE_PASSWORD || "",
}

private static readonly FAKE_USER: User = {
  id: 1,
  email: process.env.NEXT_PUBLIC_FAKE_EMAIL || "admin@example.com",
  username: "admin",
  role: "admin",
}

static async login(credentials: LoginCredentials): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (
    credentials.email === this.FAKE_CREDENTIALS.email &&
    credentials.password === this.FAKE_CREDENTIALS.password
  ) {
    localStorage.setItem("auth_token", "fake_jwt_token")
    return this.FAKE_USER
  }

  throw new Error("Invalid credentials")
}

  static async logout(): Promise<void> {
    localStorage.removeItem("auth_token")
  }

  static async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem("auth_token")
    if (token) {
      return this.FAKE_USER
    }
    return null
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("auth_token")
  }
}
