"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { supabaseBrowser } from "@/lib/supabase"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage("")
    
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const supabase = supabaseBrowser()
      
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        setMessage(error.message)
      } else if (data.user) {
        setMessage("Login successful! Redirecting...")
        // Redirect to dashboard or home page
        router.push("/")
        router.refresh() // Refresh to update auth state
      }
    } catch (error) {
      console.error('Login error:', error)
      setMessage("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setLoading(true)
    try {
      const supabase = supabaseBrowser()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) {
        setMessage(error.message)
        setLoading(false)
      }
      // Don't set loading to false here - user will be redirected
    } catch (error) {
      setMessage("An unexpected error occurred")
      setLoading(false)
    }
  }

  async function handleForgotPassword() {
    const email = (document.getElementById('email') as HTMLInputElement)?.value
    
    if (!email) {
      setMessage("Please enter your email address first")
      return
    }

    setLoading(true)
    try {
      const supabase = supabaseBrowser()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) {
        setMessage(error.message)
      } else {
        setMessage("Password reset email sent! Check your inbox.")
      }
    } catch (error) {
      setMessage("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.includes("successful") || message.includes("reset email sent")
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {message}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={loading}
                />
              </Field>
              
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary disabled:opacity-50"
                  >
                    Forgot your password?
                  </button>
                </div>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  required 
                  disabled={loading}
                />
              </Field>
              
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </Button>
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? {" "}
                  <Link href="/sign-up" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}