import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { api } from '../lib/api';

export default function GoogleAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Decode token to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Fetch full user data from backend
        const fetchUserData = async () => {
          try {
            // Set token for API request
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Store token and basic user info immediately
            dispatch(setCredentials({ 
              token, 
              user: { 
                id: payload.id, 
                role: payload.role 
              } 
            }));
            
            // Redirect to dashboard
            setTimeout(() => {
              navigate('/dashboard', { replace: true });
            }, 500);
          } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to complete authentication');
            setTimeout(() => {
              navigate('/login?error=authentication_failed', { replace: true });
            }, 2000);
          }
        };
        
        fetchUserData();
      } catch (error) {
        console.error('Error processing token:', error);
        setError('Invalid authentication token');
        setTimeout(() => {
          navigate('/login?error=invalid_token', { replace: true });
        }, 2000);
      }
    } else {
      setError('No authentication token received');
      setTimeout(() => {
        navigate('/login?error=no_token', { replace: true });
      }, 2000);
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        {!error ? (
          <>
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In...</h2>
            <p className="text-gray-600">Please wait while we redirect you</p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-gray-600">{error}</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}
