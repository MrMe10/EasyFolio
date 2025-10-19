import { Section } from "./section"
import { Button } from "@/components/ui/button"

const services = [
  { title: "UI/UX Design", desc: "Clean, usable interfaces for web apps." },
  { title: "Frontend Development", desc: "Modern, accessible React apps." },
  { title: "Performance Tuning", desc: "Lighthouse and Core Web Vitals focused." },
  { title: "Design Systems", desc: "Reusable components and tokens." },
]

export function Services() {
  return (
    <Section id="services" eyebrow="Services" title="What I do">
       <div className="flex gap-6 p-8">
      {/* Jobs Box */}
      <div className="flex-1 bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-bold text-foreground mb-3">Find the Best Jobs</h2>
        <p className="text-muted-foreground mb-6">Discover opportunities that match your skills and career goals.</p>
        <Button className="w-full">Search Now</Button>
      </div>

      {/* Policies Box */}
      <div className="flex-1 bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-bold text-foreground mb-3">Find the Best Policies</h2>
        <p className="text-muted-foreground mb-6">Browse and compare policies tailored to your needs.</p>
        <br></br>
        <Button className="w-full">Search Now</Button>
      </div>
    </div>
    </Section>  
  )
}
