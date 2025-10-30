import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../features/auth/authSlice'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { loading, error } = useSelector((s) => s.auth)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [oauthError, setOauthError] = useState(null)

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      const errorMessages = {
        google_oauth_not_configured: 'Google Sign-In is not configured yet. Please use email/password or contact the administrator.',
        google_auth_failed: 'Google authentication failed. Please try again.',
        authentication_failed: 'Authentication failed. Please try again.',
        invalid_token: 'Invalid authentication token. Please try again.',
        no_token: 'No authentication token received. Please try again.'
      }
      setOauthError(errorMessages[errorParam] || 'An error occurred during authentication.')
    }
  }, [searchParams])

  const onSubmit = async (e) => {
    e.preventDefault()
    setOauthError(null)
    if (!acceptTerms) {
      alert('Please accept the terms and conditions')
      return
    }
    const res = await dispatch(signup(form))
    if (res.meta.requestStatus === 'fulfilled') navigate('/dashboard')
  }

  const handleGoogleSignup = () => {
    setOauthError(null)
    // Show a friendly message instead of redirecting to unconfigured OAuth
    setOauthError('Google Sign-In is currently being set up. Please use email and password to create your account.')
    // Uncomment below when Google OAuth is configured:
    // window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`
  }

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' }
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
    return { strength, label: labels[strength], color: colors[strength] }
  }

  const passwordStrength = getPasswordStrength(form.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduNexus
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join thousands of learners today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* OAuth Error Message */}
          {oauthError && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{oauthError}</span>
            </div>
          )}

          {/* Google Sign Up Button - Temporarily Disabled */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 border-2 border-gray-300 px-4 py-3 rounded-lg font-semibold text-gray-500 cursor-not-allowed opacity-75"
            title="Google Sign-In is being configured. Please use email/password."
          >
            <FcGoogle className="text-2xl opacity-50" />
            <span>Continue with Google <span className="text-xs">(Coming Soon)</span></span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input 
                  className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  placeholder="John Doe" 
                  value={form.name} 
                  onChange={(e)=>setForm({...form, name:e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input 
                  className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  placeholder="you@example.com" 
                  type="email" 
                  value={form.email} 
                  onChange={(e)=>setForm({...form, email:e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input 
                  className="w-full border border-gray-300 pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                  placeholder="Create a strong password" 
                  type={showPassword ? "text" : "password"}
                  value={form.password} 
                  onChange={(e)=>setForm({...form, password:e.target.value})}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{passwordStrength.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">Use 8+ characters with a mix of letters, numbers & symbols</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({...form, role: 'student'})}
                  className={`px-4 py-3 rounded-lg border-2 transition relative ${
                    form.role === 'student' 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {form.role === 'student' && (
                    <div className="absolute top-2 right-2">
                      <FiCheck className="text-blue-600" />
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎓</div>
                    <div>Student</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({...form, role: 'instructor'})}
                  className={`px-4 py-3 rounded-lg border-2 transition relative ${
                    form.role === 'instructor' 
                      ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {form.role === 'instructor' && (
                    <div className="absolute top-2 right-2">
                      <FiCheck className="text-purple-600" />
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl mb-1">👨‍🏫</div>
                    <div>Instructor</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-purple-600 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-purple-600 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading || !acceptTerms}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link className="text-blue-600 hover:text-purple-600 font-semibold transition" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} EduNexus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


