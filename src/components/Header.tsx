import { NavLink } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, authLoading, logout } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to logout:', err)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <header className="header">
      <div className="header-brand">Movie Finder</div>
      <nav className="header-nav">
        <NavLink to="/" className="header-nav-link" end onClick={() => window.dispatchEvent(new Event('home:reload'))}>
          Home
        </NavLink>
        <NavLink to="/favourites" className="header-nav-link">
          Favourites
        </NavLink>
      </nav>
      <form className="header-search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          className="header-search-input"
          placeholder="Search movies..."
          aria-label="Search movies"
        />
        <button type="submit" className="header-search-button">
          Search
        </button>
      </form>

      {user && (
        <div className="header-actions">
          <button
            type="button"
            onClick={handleLogout}
            disabled={authLoading || loggingOut}
            className="header-logout-button"
          >
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
