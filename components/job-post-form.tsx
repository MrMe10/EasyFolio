"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { createJobPost } from "@/lib/job-posts"

type FormState = {
  jobTitle: string
  jobDescription: string
  location: string
  locationType: "on-site" | "hybrid" | "remote" | ""
  phoneNumber: string
  employmentType: "full-time" | "part-time" | "contract" | "internship" | "temporary" | ""
}

export function JobPostForm() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = React.useState(false)
  const [form, setForm] = React.useState<FormState>({
    jobTitle: "",
    jobDescription: "",
    location: "",
    locationType: "",
    phoneNumber: "",
    employmentType: "",
  })

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate(): { ok: boolean; message?: string } {
    if (!form.jobTitle.trim()) return { ok: false, message: "Job Title is required." }
    if (form.jobTitle.trim().length < 3) return { ok: false, message: "Job Title must be at least 3 characters long." }
    if (form.jobTitle.trim().length > 100) return { ok: false, message: "Job Title must be less than 100 characters." }
    
    if (!form.jobDescription.trim()) return { ok: false, message: "Job Description is required." }
    if (form.jobDescription.trim().length < 10) return { ok: false, message: "Job Description must be at least 10 characters long." }
    
    if (!form.location.trim()) return { ok: false, message: "Location is required." }
    if (form.location.trim().length < 2) return { ok: false, message: "Location must be at least 2 characters long." }
    
    if (!form.locationType) return { ok: false, message: "Please select a Location Type." }
    if (!form.employmentType) return { ok: false, message: "Please select an Employment Type." }

    // Enhanced phone validation
    const phoneRegex = /^[+]?[(]?[\d\s\-().]{7,20}$/
    if (!form.phoneNumber.trim()) return { ok: false, message: "Phone Number is required." }
    if (!phoneRegex.test(form.phoneNumber.trim())) {
      return { ok: false, message: "Please enter a valid Phone Number (7-20 characters, digits, spaces, +, -, (, ) allowed)." }
    }

    return { ok: true }
  }

  // KEEP ONLY THIS onSubmit function, remove the duplicate
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const validation = validate()
    if (!validation.ok) {
      toast({
        title: "Validation Error",
        description: validation.message ?? "Please review the form fields.",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmitting(true)
      
      console.log('Form data before sending:', {
        jobTitle: form.jobTitle.trim(),
        jobDescription: form.jobDescription.trim(),
        location: form.location.trim(),
        locationType: form.locationType,
        phoneNumber: form.phoneNumber.trim(),
        employmentType: form.employmentType,
      })
      
      const result = await createJobPost({
        jobTitle: form.jobTitle.trim(),
        jobDescription: form.jobDescription.trim(),
        location: form.location.trim(),
        locationType: form.locationType,
        phoneNumber: form.phoneNumber.trim(),
        employmentType: form.employmentType,
      })

      console.log('Result from server action:', result)

      if (result.success) {
        toast({
          title: "Success!",
          description: "Job post created successfully.",
        })

        // Reset form after success
        setForm({
          jobTitle: "",
          jobDescription: "",
          location: "",
          locationType: "",
          phoneNumber: "",
          employmentType: "",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create job post.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Something went wrong",
        description: "We couldn't save your job right now. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm({
      jobTitle: "",
      jobDescription: "",
      location: "",
      locationType: "",
      phoneNumber: "",
      employmentType: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">Job Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* ... rest of your form JSX stays the same ... */}
          <div className="grid gap-2">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              placeholder="e.g., Senior Frontend Engineer"
              value={form.jobTitle}
              onChange={(e) => update("jobTitle", e.target.value)}
              required
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {form.jobTitle.length}/100 characters
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Describe responsibilities, requirements, and perks..."
              value={form.jobDescription}
              onChange={(e) => update("jobDescription", e.target.value)}
              required
              rows={6}
              minLength={10}
            />
            <p className="text-xs text-muted-foreground">
              Minimum 10 characters ({form.jobDescription.length} characters)
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Nairobi, Kenya"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              required
              minLength={2}
            />
          </div>

          <div className="grid gap-2">
            <Label>Location Type *</Label>
            <Select
              value={form.locationType}
              onValueChange={(val: FormState["locationType"]) => update("locationType", val)}
            >
              <SelectTrigger aria-label="Select location type">
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on-site">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="+254 700 000 000"
              value={form.phoneNumber}
              onChange={(e) => update("phoneNumber", e.target.value)}
              aria-describedby="phoneHelp"
              required
            />
            <p id="phoneHelp" className="text-xs text-muted-foreground">
              Include country code if applicable. Allowed: digits, spaces, +, -, ( )
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Employment Type *</Label>
            <Select
              value={form.employmentType}
              onValueChange={(val: FormState["employmentType"]) => update("employmentType", val)}
            >
              <SelectTrigger aria-label="Select employment type">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create Job Post"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={resetForm}
              disabled={submitting}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}