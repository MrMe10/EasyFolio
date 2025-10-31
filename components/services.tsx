"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Section } from "./section"
import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/supabase"

export function Services() {
  const [accountType, setAccountType] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function getUserAccountType() {
      try {
        const supabase = supabaseBrowser()
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          setIsLoggedIn(true)
          // Get user's account type from customuser table
          const { data: customUser } = await supabase
            .from('customuser')
            .select('account_type')
            .eq('supabase_user_id', user.id)
            .single()
          
          if (customUser) {
            setAccountType(customUser.account_type)
          }
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error('Error fetching user account type:', error)
        setIsLoggedIn(false)
      } finally {
        setIsLoading(false)
      }
    }

    getUserAccountType()
  }, [])

  if (isLoading) {
    return (
      <Section id="services" eyebrow="Services" title="What I do">
        <div className="flex gap-6 p-8">
          <div className="flex-1 bg-card border border-border rounded-lg p-8 shadow-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="flex-1 bg-card border border-border rounded-lg p-8 shadow-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section id="services" eyebrow="Services" title="What I do">
       <div className="flex gap-6 p-8">
      {/* Jobs Box - Content changes based on login status and account type */}
      <div className="flex-1 bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
        {!isLoggedIn ? (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-3">Find the Best Jobs</h2>
            <p className="text-muted-foreground mb-6">Sign in to discover opportunities that match your skills and career goals.</p>
            <Link href="/log_in" className="w-full">
              <Button className="w-full">Login to Continue</Button>
            </Link>
          </>
        ) : accountType === 'employer' ? (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-3">Find the Perfect Hires for your Job</h2>
            <p className="text-muted-foreground mb-6">Connect with qualified candidates who match your job requirements.</p>
            <Link href="/job_form" className="w-full">
              <Button className="w-full">Post a Job</Button>
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-3">Find the Best Jobs</h2>
            <p className="text-muted-foreground mb-6">Discover opportunities that match your skills and career goals.</p>
            <Link href="/job_posts" className="w-full">
              <Button className="w-full">Search Now</Button>
            </Link>
          </>
        )}
      </div>

      {/* Policies Box */}
      <div className="flex-1 bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-bold text-foreground mb-3">Find the Best Policies</h2>
        {!isLoggedIn ? (
          <>
            <p className="text-muted-foreground mb-6">Sign in to browse and compare policies tailored to your needs.</p>
            <Link href="/log_in" className="w-full">
              <Button className="w-full">Login to Continue</Button>
            </Link>
          </>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">Browse and compare policies tailored to your needs.</p>
            <br></br>
            <Link href="/policy_post" className="w-full">
              <Button className="w-full">Search Now</Button>
            </Link>
          </>
        )}
      </div>
    </div>
    </Section>  
  )
}