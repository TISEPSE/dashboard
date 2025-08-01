"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

const GoogleSignInButton = ({ 
  children = "Se connecter avec Google",
  className = "",
  size = "default", // "default", "large", "small"
  variant = "light" // "light", "dark"
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      console.error('Erreur de connexion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-2 text-xs"
      case "large": 
        return "px-6 py-4 text-base"
      default:
        return "px-4 py-2.5 text-sm"
    }
  }

  const getVariantClasses = () => {
    if (variant === "dark") {
      return "bg-[#2a2d3e] hover:bg-[#3a3d4e] text-white border-gray-600/30 hover:border-gray-500/50"
    }
    return "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400"
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`
        flex items-center justify-center gap-3 
        ${getVariantClasses()}
        ${getSizeClasses()}
        rounded-lg border transition-all duration-200 
        disabled:opacity-50 shadow-sm hover:shadow-md 
        font-medium
        ${className}
      `}
    >
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span className="truncate">
        {isLoading ? 'Connexion...' : children}
      </span>
    </button>
  )
}

export default GoogleSignInButton