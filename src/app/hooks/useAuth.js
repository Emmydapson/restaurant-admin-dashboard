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
        const response = await fetch('https://look-my-app.vercel.app/api/auth/verify-token', {
          method: 'POST',  // Ensure the backend is set up to handle this method
          credentials: 'include', // Send cookies with the request
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push('/login'); // Redirect on invalid token or error
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthenticated(false);
        router.push('/login'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { loading, authenticated };
};

export default useAuth;
