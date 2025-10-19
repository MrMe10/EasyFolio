"use client"

import type { ComponentProps } from "react"
import { useState } from "react"
import Link from "next/link"
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

export function SignupForm({ ...props }: ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage("")
    
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords don't match")
      setLoading(false)
      return
    }

    // Validate password length
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long")
      setLoading(false)
      return
    }

    try {
      const supabase = supabaseBrowser()
      
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      })
      
      if (error) {
        setMessage(error.message)
      } else if (data.user) {
        // Create custom user profile in your database
        const { error: profileError } = await supabase
          .from('customuser')
          .insert({
            supabase_user_id: data.user.id,
            username: email.split('@')[0] + '_' + Date.now(), // Generate unique username
            first_name: name.split(' ')[0] || '',
            last_name: name.split(' ').slice(1).join(' ') || '',
            email: email,
            account_type: 'customer', // or 'job_seeker', 'employer', etc.
            is_staff: false,
            is_active: true,
            is_superuser: false,
            date_joined: new Date().toISOString(),
            password: '', // Not needed since Supabase handles auth
          })
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
          setMessage("Account created but profile setup failed. Please contact support.")
        } else {
          setMessage("Success! Check your email to verify your account.")
        }
      }
    } catch (error) {
      setMessage("An unexpected error occurred")
      console.error('Signup error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignup() {
    setLoading(true)
    try {
      const supabase = supabaseBrowser()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) setMessage(error.message)
    } catch (error) {
      setMessage("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {message && (
              <div className={`p-3 rounded-md text-sm ${
                message.includes("Success") 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {message}
              </div>
            )}
            
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
                id="name" 
                name="name"
                type="text" 
                placeholder="John Doe" 
                required 
                disabled={loading}
              />
            </Field>
            
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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email with anyone else.
              </FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required 
                disabled={loading}
                minLength={8}
              />
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input 
                id="confirm-password" 
                name="confirm-password"
                type="password" 
                required 
                disabled={loading}
                minLength={8}
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            
            <Field>
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={handleGoogleSignup}
                  disabled={loading}
                >
                  Sign up with Google
                </Button>
              </div>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/log_in" className="text-primary hover:underline">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}