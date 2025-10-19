"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Facebook, Instagram, Linkedin, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#resume", label: "Resume" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = supabaseBrowser()
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = supabaseBrowser()
    await supabase.auth.signOut()
    setOpen(false)
  }

  // Get user's display name (first name or email prefix)
  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 
                      user?.email?.split('@')[0] || 
                      'Account'

  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="#" className="font-semibold text-xl tracking-tight">
              <span className="text-primary">Easy</span>Folio
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    item.href === "#home" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}

              <div className="ml-2 hidden md:flex items-center gap-3 text-muted-foreground">
                <a aria-label="Facebook" href="#" className="hover:text-primary">
                  <Facebook className="h-4 w-4" />
                </a>
                <a aria-label="Instagram" href="#" className="hover:text-primary">
                  <Instagram className="h-4 w-4" />
                </a>
                <a aria-label="LinkedIn" href="#" className="hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>

              {/* Auth buttons - desktop */}
              <div className="flex items-center gap-2 ml-4">
                {loading ? (
                  <div className="h-9 w-20 animate-pulse bg-muted rounded-md" />
                ) : user ? (
                  <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/account">
                      <User className="h-4 w-4 mr-1" />
                      {displayName}
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSignOut}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Logout
                  </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/log_in">Login</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/sign_up">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>

            <button
              aria-label="Toggle menu"
              className="md:hidden inline-flex items-center justify-center rounded-md border px-2 py-2 text-foreground hover:bg-accent"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* mobile menu */}
          {open && (
            <div className="md:hidden border-t px-4 pb-4">
              <nav className="grid gap-2 pt-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent"
                  >
                    {item.label}
                  </a>
                ))}

                {/* Auth buttons - mobile */}
                <div className="border-t pt-2 mt-2">
                  {loading ? (
                    <div className="h-9 animate-pulse bg-muted rounded-md" />
                  ) : user ? (
                    <div className="grid gap-2">
                      <Button variant="outline" className="justify-start" asChild>
                        <Link href="/account" onClick={() => setOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          {displayName}
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start bg-yellow-500 hover:bg-yellow-600 text-black" 
                        onClick={handleSignOut}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link href="/log_in" onClick={() => setOpen(false)}>
                          Login
                        </Link>
                      </Button>
                      <Button className="justify-start" asChild>
                        <Link href="/sign_up" onClick={() => setOpen(false)}>
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 px-3 pt-2 text-muted-foreground">
                  <a aria-label="Facebook" href="#" className="hover:text-primary">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a aria-label="Instagram" href="#" className="hover:text-primary">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a aria-label="LinkedIn" href="#" className="hover:text-primary">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}