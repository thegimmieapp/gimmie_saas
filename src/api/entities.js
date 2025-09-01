import { api } from './client'
import { supabase } from '@/lib/supabaseClient'

// Auth (client-side via Supabase)
export const User = {
  async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) throw error
    return data
  },
  async loginWithEmail({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },
  async logout() {
    await supabase.auth.signOut()
  },
  async me() {
    // Use backend to verify token and return user profile
    return api.fetch('/auth/me', { method: 'GET' })
  },
  async updateMyUserData(updates) {
    return api.fetch('/users/me', { method: 'PATCH', body: updates })
  },
  async filter(params) {
    return api.fetch('/users/filter', { method: 'POST', body: params })
  },
}

// Generic CRUD helpers for entities
function makeEntity(name) {
  return {
    async list(params = {}) { return api.fetch(`/${name}`, { method: 'GET', headers: {}, body: undefined }) },
    async filter(filters = {}) { return api.fetch(`/${name}/filter`, { method: 'POST', body: filters }) },
    async create(data) { return api.fetch(`/${name}`, { method: 'POST', body: data }) },
    async update(id, data) { return api.fetch(`/${name}/${id}`, { method: 'PATCH', body: data }) },
    async delete(id) { return api.fetch(`/${name}/${id}`, { method: 'DELETE' }) },
    async schema() { return api.fetch(`/${name}/schema`, { method: 'GET' }) },
    async bulkCreate(items) { return api.fetch(`/${name}/bulk`, { method: 'POST', body: { items } }) },
  }
}

export const Store = makeEntity('stores')
export const WidgetConfig = makeEntity('widget-configs')
export const Conversion = makeEntity('conversions')
export const Product = makeEntity('products')
export const Subscription = makeEntity('subscriptions')
export const PaymentMethod = makeEntity('payment-methods')
export const Commission = makeEntity('commissions')
export const RecipientProfile = makeEntity('recipient-profiles')
export const WishlistItem = makeEntity('wishlist-items')
export const Collection = makeEntity('collections')
export const OnboardingProgress = makeEntity('onboarding-progress')
export const Referral = makeEntity('referrals')
export const SupportTicket = makeEntity('support-tickets')
export const Article = makeEntity('articles')
export const Category = makeEntity('categories')
export const Interest = makeEntity('interests')
export const Retailer = makeEntity('retailers')
