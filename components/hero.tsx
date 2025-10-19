import { Section } from "./section"

export function Hero() {
  return (
    <Section id="home" className="pt-8 md:pt-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-pretty text-4xl md:text-5xl font-semibold">
              I&apos;m <span className="text-primary">Alex Smith</span>, a Designer &amp; Developer
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I craft clean, performant web experiences. Explore my work, skills, and experience below.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-primary-foreground hover:opacity-90"
              >
                Hire me
              </a>
              <a
                href="#resume"
                className="inline-flex items-center justify-center rounded-md border px-5 py-2 hover:bg-accent"
              >
                Download CV
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl border bg-muted" />
          </div>
        </div>
      </div>
    </Section>
  )
}
