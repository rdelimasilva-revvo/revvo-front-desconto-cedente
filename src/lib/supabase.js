import { createClient } from '@supabase/supabase-js'
import { createOfflineClient } from './supabase-offline'

// Modo offline/demo: roda a UI sem nenhuma conexao com o Supabase.
// Ligado apenas quando VITE_OFFLINE=true, definido em .env.local (dev local)
// ou em .env.demo, usado pelo `npm run build:demo`.
// O `npm run build` normal nao define a flag e continua exigindo login.
const OFFLINE = import.meta.env.VITE_OFFLINE === 'true'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabaseServiceRole = import.meta.env.VITE_SUPABASE_SERVICE_ROLE

const retryConfig = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error) => {
    return error.message === 'Failed to fetch' || error.code === 'ECONNREFUSED'
  }
}

function getOrCreateClient(key, url, token) {
  if (OFFLINE) {
    if (!globalThis[key]) {
      globalThis[key] = createOfflineClient()
    }
    return globalThis[key]
  }

  if (!globalThis[key]) {
    globalThis[key] = createClient(url, token, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        fetch: async (...args) => {
          let lastError;
          for (let i = 0; i <= retryConfig.retries; i++) {
            try {
              return await fetch(...args);
            } catch (error) {
              lastError = error;
              if (i === retryConfig.retries || !retryConfig.retryCondition(error)) {
                throw error;
              }
              await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay));
            }
          }
          throw lastError;
        }
      }
    })
  }
  return globalThis[key]
}

export const supabase = getOrCreateClient('_supabase', supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = getOrCreateClient('_supabaseAdmin', supabaseUrl, supabaseServiceRole)