import { LoginForm } from "@/features/auth/components/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel | Login",
  description: "Admin panel with clean architecture consuming Fake Store API",
    generator: 'v0.dev'
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to Admin Panel</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Use: admin@example.com / admin123</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
