import { getJobPosts } from "@/lib/job-posts"
import { JobPostCard } from "@/components/job-post-card"

export const metadata = {
  title: "Job Posts",
}

export default async function JobPostsPage() {
  const jobPosts = await getJobPosts()

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <header className="mb-6 md:mb-10">
        <h1 className="text-pretty text-2xl md:text-3xl font-semibold">Open Job Posts</h1>
        <p className="text-muted-foreground mt-2">
          Browse available job opportunities
        </p>
      </header>

      {jobPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No job posts available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {jobPosts.map((job) => (
            <JobPostCard
              key={job.id}
              id={job.id}
              title={job.title}
              location={job.location}
              location_type={job.location_type}
              seniority="Mid"
              description={job.description}
              phone_number={job.phone_number}
              employment_type={job.employment_type}
              created_at={job.created_at}
              updated_at={job.updated_at}
            />
          ))}
        </div>
      )}
    </main>
  )
}