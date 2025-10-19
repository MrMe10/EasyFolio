import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Resume } from "@/components/resume"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"

export default function Page() {
  return (
    <>
      <SiteHeader/>
      <main className="flex flex-col">
        <Hero />
        <About />
        <Resume />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
