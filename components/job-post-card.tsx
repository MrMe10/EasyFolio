"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Building } from "lucide-react"
import { supabaseBrowser } from "@/lib/supabase"

interface JobCardProps {
  job: {
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
  currentUserId?: number
  currentUserAccountType?: string
}

export function JobCard({ job, currentUserId, currentUserAccountType }: JobCardProps) {
  const [isApplied, setIsApplied] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUserId && currentUserAccountType === 'employee') {
      checkApplicationStatus()
    } else {
      setLoading(false)
    }
  }, [currentUserId, job.id])

  async function checkApplicationStatus() {
    try {
      const supabase = supabaseBrowser()
      const { data } = await supabase
        .from('post_applied_users')
        .select('id')
        .eq('post_id', job.id)
        .eq('customuser_id', currentUserId)
        .single()

      setIsApplied(!!data)
    } catch (error) {
      console.error('Error checking application status:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleApply() {
    if (!currentUserId || currentUserAccountType !== 'employee') {
      return
    }

    setIsApplying(true)
    try {
      const supabase = supabaseBrowser()
      
      // Insert application record
      const { error } = await supabase
        .from('post_applied_users')
        .insert({
          post_id: job.id,
          customuser_id: currentUserId
        })

      if (error) {
        console.error('Error applying to job:', error)
        alert('Failed to apply. Please try again.')
      } else {
        setIsApplied(true)
      }
    } catch (error) {
      console.error('Error applying to job:', error)
      alert('An unexpected error occurred')
    } finally {
      setIsApplying(false)
    }
  }

  const canApply = currentUserAccountType === 'employee' && currentUserId && !isApplied

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <Badge variant="outline">{job.location_type}</Badge>
              <Badge variant="outline">{job.employment_type}</Badge>
            </CardDescription>
          </div>
          <div className="text-xs text-muted-foreground">
            <Clock className="h-3 w-3 inline mr-1" />
            {new Date(job.created_at).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {job.description.length > 150 
            ? `${job.description.substring(0, 150)}...` 
            : job.description
          }
        </p>
        
        {job.phone_number && (
          <p className="text-sm text-muted-foreground mb-4">
            <Building className="h-4 w-4 inline mr-1" />
            Contact: {job.phone_number}
          </p>
        )}

        <div className="mt-auto">
          {!currentUserId ? (
            <Button className="w-full" asChild>
              <a href="/log_in">Login to Apply</a>
            </Button>
          ) : currentUserAccountType !== 'employee' ? (
            <Button className="w-full" disabled>
              Employers Cannot Apply
            </Button>
          ) : loading ? (
            <Button className="w-full" disabled>
              Loading...
            </Button>
          ) : isApplied ? (
            <Button className="w-full" disabled variant="secondary">
              Applied ✓
            </Button>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? "Applying..." : "Apply Now"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}