import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const storedData = JSON.parse(localStorage.getItem('loginStore') || '{}') as { user: string, userType: string };
  const { user, userType } = storedData;
  const protectedRoutesAfterLogIn = ['/login', '/signup', '/register-institute'];
  const currentPath = useLocation().pathname;

  if (!user) {
    // Redirect to login if user is not logged in
    return <Navigate to={'/login'} />;
  } else if (user && protectedRoutesAfterLogIn.includes(currentPath)) {
    // Redirect to appropriate route based on user type after login
    return <Navigate to={handleUserType()} />;
  } else {
    // Render children for other routes
    return <>{children}</>;
  }

  function handleUserType() {
    // Determine the route based on user type
    if (userType === 'student' || userType === 'proctor') {
      return '/exams'
    } else {
      return '/conduct-exam'
    }
  }
}
