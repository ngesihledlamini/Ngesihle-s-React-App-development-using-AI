import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import AuthView from './pages/Auth/AuthView'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    // While auth is being determined, avoid flashing the redirect.
    return <div>Loading authentication…</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function AuthRoute({ children }: { children: JSX.Element }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading authentication…</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <FavouritesView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <AuthView />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
