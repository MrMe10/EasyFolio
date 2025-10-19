"use server"

import { revalidatePath } from "next/cache"
import { supabaseServer } from "@/lib/server"

export async function createJobPost(formData: {
  jobTitle: string
  jobDescription: string
  location: string
  locationType: string
  phoneNumber: string
  employmentType: string
}) {
  try {
    console.log('Creating job post with data:', formData)

    const supabase = supabaseServer()

    const { data, error } = await supabase
    .from('post')
    .insert({
      title: formData.jobTitle,
      description: formData.jobDescription,
      location: formData.location,
      location_type: formData.locationType,
      phone_number: formData.phoneNumber,
      employment_type: formData.employmentType,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author_id: 1, // Changed to number instead of string
    })
    .select()

    console.log('Supabase response:', { data, error })

    if (error) {
      console.error('Supabase error:', error)
      return { 
        success: false, 
        error: error.message || 'Failed to create job post' 
      }
    }

    revalidatePath('/job_posts')

    return { 
      success: true, 
      data: data[0] 
    }

  } catch (error) {
    console.error('Server error:', error)
    return { 
      success: false, 
      error: 'An unexpected error occurred' 
    }
  }
}

export async function getJobPosts() {
  try {
    const supabase = supabaseServer()
    
    const { data, error } = await supabase
      .from('post')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching job posts:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}