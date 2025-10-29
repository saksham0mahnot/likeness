export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} likeness. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/likeness.0/" target="_blank" className="hover:text-foreground">Instagram</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
