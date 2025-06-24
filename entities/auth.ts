export interface User {
  id: number
  email: string
  username: string
  role: "admin" | "user"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
