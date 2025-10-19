import { Section } from "./section"

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let’s work together">
      <form className="mt-6 grid gap-4 max-w-2xl">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" required className="h-10 rounded-md border bg-background px-3" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required className="h-10 rounded-md border bg-background px-3" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea id="message" name="message" rows={5} className="rounded-md border bg-background p-3" />
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-primary px-5 py-2 text-primary-foreground hover:opacity-90"
        >
          Send message
        </button>
        <p className="sr-only">This form is a demo and does not submit.</p>
      </form>
    </Section>
  )
}
