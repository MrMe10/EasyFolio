import { JobPostForm } from "@/components/job-post-form"

export const metadata = {
  title: "Create Job Post",
}

export default function JobFormPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <header className="mb-6 md:mb-10">
        <h1 className="text-pretty text-2xl md:text-3xl font-semibold text-yellow-500">Create Job Post</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details below to publish a new job opportunity.
        </p>
      </header>

      <JobPostForm />
    </main>
  )
}