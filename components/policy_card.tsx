"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone } from "lucide-react"

interface PolicyCardProps {
  policy: {
    id: string
    name: string
    description: string
    phoneNumber: string
  }
}

export function PolicyCard({ policy }: PolicyCardProps) {
  const { toast } = useToast()
  const [applying, setApplying] = React.useState(false)

  async function handleApply() {
    try {
      setApplying(true)
      // Simulate API call
      await new Promise((r) => setTimeout(r, 800))

      console.log("[v0] Applied to policy:", policy.id)

      toast({
        title: "Application submitted",
        description: `You've applied to ${policy.name}.`,
      })
    } catch {
      toast({
        title: "Something went wrong",
        description: "We couldn't process your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setApplying(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-pretty line-clamp-2">{policy.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{policy.description}</p>

        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <a href={`tel:${policy.phoneNumber}`} className="text-primary hover:underline">
            {policy.phoneNumber}
          </a>
        </div>

        <Button onClick={handleApply} disabled={applying} className="w-full">
          {applying ? "Applying..." : "Apply"}
        </Button>
      </CardContent>
    </Card>
  )
}
