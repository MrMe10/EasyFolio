"use client"

import { useState, useEffect } from "react"
import { JobCard } from "@/components/job-post-card"
import { supabaseBrowser } from "@/lib/supabase"

interface Job {
  id: number
  title: string
  location: string
  location_type: string
  employment_type: string
  phone_number?: string
  description: string
  created_at: string
  author_id: number
}

interface User {
  id: number
  account_type: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobsAndUser()
  }, [])

  async function fetchJobsAndUser() {
    try {
      const supabase = supabaseBrowser()
      
      // Get current user info
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      let userInfo = null
      if (authUser) {
        const { data: customUser } = await supabase
          .from('customuser')
          .select('id, account_type')
          .eq('supabase_user_id', authUser.id)
          .single()
        
        if (customUser) {
          userInfo = customUser
        }
      }
      
      // Get all jobs
      const { data: jobsData, error } = await supabase
        .from('post')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching jobs:', error)
      } else {
        setJobs(jobsData || [])
      }
      
      setCurrentUser(userInfo)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
      
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No jobs available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              currentUserId={currentUser?.id}
              currentUserAccountType={currentUser?.account_type}
            />
          ))}
        </div>
      )}
    </div>
  )
}