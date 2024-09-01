// src/app/hooks/useAuth.js
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
          method: 'POST',  // Use POST for more secure data transfer
          credentials: 'include', // Ensure cookies are sent with the request
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          router.push('/login'); // Redirect on invalid token or error
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
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
