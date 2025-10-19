export function SiteFooter() {
  return (
    <footer className="mt-14 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EasyFolio. All rights reserved.</p>
      </div>
    </footer>
  )
}
