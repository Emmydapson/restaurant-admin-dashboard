'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Verifying authentication token...');

        const response = await fetch('https://look-my-app.vercel.app/api/auth/verify-token', {
          method: 'GET', // Use GET to match backend method
          credentials: 'include', // Ensure cookies are sent with the request
        });

        if (response.ok) {
          // Token is valid; user is authenticated
          setAuthenticated(true);
          console.log('Token verification successful. User authenticated.');
        } else {
          // Invalid token or error; user is not authenticated
          setAuthenticated(false);
          console.warn('Token verification failed or token is invalid. Redirecting to login...');
          router.push('/login'); // Redirect to login page if not authenticated
        }
      } catch (error) {
        console.error('Authentication check failed due to network or server error:', error);
        setAuthenticated(false);
        router.push('/login'); // Redirect on error
      } finally {
        // Stop loading whether auth is successful or not
        setLoading(false);
        console.log('Authentication check completed. Loading state updated.');
      }
    };

    checkAuth();
  }, [router]);

  return { loading, authenticated };
};

export default useAuth;
