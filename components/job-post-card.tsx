"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { MapPin, Clock, Briefcase, Phone } from "lucide-react"

type JobPost = {
  id: string
  title: string
  location?: string
  location_type?: string  // matches DB column
  seniority?: string
  description?: string
  phone_number?: string   // matches DB column
  employment_type?: string // matches DB column
  created_at?: string
  updated_at?: string
}

export function JobPostCard({
  id,
  title,
  location,
  location_type,
  seniority,
  description,
  phone_number,
  employment_type,
  created_at,
  updated_at,
  className,
}: JobPost & { className?: string }) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border bg-card text-card-foreground",
        "rounded-xl p-6 md:p-8 min-h-40 flex flex-col justify-between",
        "shadow-sm hover:shadow transition-shadow",
        className,
      )}
      role="article"
      aria-label={title}
    >
      <div className="space-y-2">
        <h3 className="text-pretty text-lg md:text-xl font-semibold leading-6">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {[location, location_type, seniority].filter(Boolean).join(" • ")}
        </p>
      </div>

      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" aria-label={`View ${title}`}>
              View details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription className="text-base">
                Complete job details and requirements
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Job Overview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Job Information</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-sm">Location</span>
                        <p className="text-sm text-muted-foreground">{location || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-sm">Employment Type</span>
                        <p className="text-sm text-muted-foreground">{employment_type || "Not specified"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-sm">Location Type</span>
                        <p className="text-sm text-muted-foreground">{location_type || "Not specified"}</p>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg border-b pb-2">Contact & Details</h4>
                  
                  <div className="space-y-3">
                    {phone_number && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-sm">Phone Number</span>
                          <p className="text-sm text-muted-foreground">{phone_number}</p>
                        </div>
                      </div>
                    )}
                    
                    {created_at && (
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-sm">Posted</span>
                          <p className="text-sm text-muted-foreground">
                            {new Date(created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              {description && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg border-b pb-2">Job Description</h4>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {description}
                    </p>
                  </div>
                </div>
              )}

              {/* Apply Section */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button className="flex-1" size="lg">
                  Apply Now
                </Button>
                <Button variant="outline" size="lg">
                  Save Job
                </Button>
                <Button variant="ghost" size="lg">
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  )
}