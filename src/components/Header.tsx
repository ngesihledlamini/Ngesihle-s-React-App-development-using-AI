import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
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
    </header>
  )
}

export default Header
