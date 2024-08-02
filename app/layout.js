export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="/courses">Courses</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
