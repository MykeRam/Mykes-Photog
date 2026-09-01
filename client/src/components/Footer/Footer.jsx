import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {year} Developed by Michael Ramirez</p>
      </div>
    </footer>
  )
}
