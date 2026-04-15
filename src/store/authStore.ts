import { create } from 'zustand'
import type { User } from '../types'

interface AuthState {
  token: string | null,
  user: User | null
  setAuth: (token: string, user: User) => void
  logout: () => void
  getRole: () => string | null
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  setAuth: (token, user) => {
    set({token, user})
    localStorage.setItem('token', token)
  },
  logout: () => {
    set({token: null, user: null})
    localStorage.removeItem('token')
  },
  getRole: () => {
    const token = localStorage.getItem('token')
    
    if (!token) return null
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.role as string
    } catch {
      return null
    }
  }
}))
