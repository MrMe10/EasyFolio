import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Job Policies",
  description: "Browse available job policies.",
}

// Mock data - replace with API call or database query
const policies = [
  {
    id: "1",
    name: "Senior Developer Policy",
    description:
      "Comprehensive policy for senior development positions including benefits, remote work options, and professional development.",
    phoneNumber: "+254 700 000 001",
  },
  {
    id: "2",
    name: "Marketing Manager Policy",
    description:
      "Policy covering marketing management roles with flexible hours, team collaboration benefits, and career growth opportunities.",
    phoneNumber: "+254 700 000 002",
  },
  {
    id: "3",
    name: "Product Designer Policy",
    description:
      "Design-focused policy with creative freedom, collaborative environment, and access to latest design tools and resources.",
    phoneNumber: "+254 700 000 003",
  },
  {
    id: "4",
    name: "Data Analyst Policy",
    description:
      "Policy for data analytics roles featuring advanced tools access, continuous learning programs, and competitive compensation.",
    phoneNumber: "+254 700 000 004",
  },
  {
    id: "5",
    name: "HR Specialist Policy",
    description:
      "Human resources policy with focus on employee wellness, training programs, and organizational development initiatives.",
    phoneNumber: "+254 700 000 005",
  },
]

export default function PoliciesPage() {
  return (
    <main className="px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-pretty">Job Policies</h1>
          <p className="text-sm text-muted-foreground">Browse and apply to available job policies.</p>
        </header>

        <Accordion type="single" collapsible className="w-full">
          {policies.map((policy) => (
            <AccordionItem key={policy.id} value={policy.id}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-left font-semibold">{policy.name}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                  <div className="flex items-center justify-between">
                    <a href={`tel:${policy.phoneNumber}`} className="text-sm font-medium text-primary hover:underline">
                      {policy.phoneNumber}
                    </a>
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  )
}
