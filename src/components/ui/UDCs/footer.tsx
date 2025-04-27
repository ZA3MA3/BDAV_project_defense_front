import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';

  return (
    isLoginPage ? (
      // Footer for the login page "/"
      <footer className="absolute bottom-0 left-0 right-0 p-4 bg-gray-100 text-center text-sm text-gray-500 border-t z-999">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p>&copy; {new Date().getFullYear()} Defense Manager. All rights reserved.</p>
          <p>Made by G04.</p>
        </div>
      </footer>
    ) : (
      // Footer for dashboard pages
      <footer className="w-full mt-10 p-4 bg-gray-100 text-center text-sm text-gray-500 border-t">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p>&copy; {new Date().getFullYear()} Defense Manager. All rights reserved.</p>
          <p>Made by G04.</p>
        </div>
      </footer>
    )
  );
}
