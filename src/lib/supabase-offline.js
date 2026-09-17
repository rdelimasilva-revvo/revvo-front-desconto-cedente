// Cliente Supabase falso para desenvolvimento local desconectado.
//
// Substitui o cliente real quando VITE_OFFLINE=true em `npm run dev`.
// Nenhuma requisicao de rede sai da maquina: toda consulta resolve vazio e a
// sessao e fabricada localmente, apenas para as telas renderizarem.
//
// Nunca chega em producao: o supabase.js so troca o cliente quando
// import.meta.env.DEV e true, e isso e sempre false em `vite build`.

const FAKE_USER = {
  id: '00000000-0000-4000-8000-000000000001',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'dev@local.test',
  email_confirmed_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  app_metadata: { provider: 'offline' },
  user_metadata: {
    name: 'Dev Local',
    must_change_password: false,
    is_admin: true,
  },
};

const FAKE_SESSION = {
  access_token: 'offline-dev-token',
  refresh_token: 'offline-dev-refresh',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  user: FAKE_USER,
};

const ok = (data) => Promise.resolve({ data, error: null });

// Query builder encadeavel que sempre resolve vazio.
// Aceita qualquer metodo do PostgREST sem quebrar a cadeia.
function createQuery() {
  const result = { data: [], error: null, count: 0, status: 200, statusText: 'OK' };

  const passthrough = [
    'select', 'insert', 'update', 'upsert', 'delete', 'eq', 'neq', 'gt', 'gte',
    'lt', 'lte', 'like', 'ilike', 'is', 'in', 'contains', 'containedBy',
    'rangeGt', 'rangeGte', 'rangeLt', 'rangeLte', 'rangeAdjacent', 'overlaps',
    'textSearch', 'match', 'not', 'or', 'filter', 'order', 'limit', 'range',
    'abortSignal', 'returns', 'overrideTypes', 'throwOnError',
  ];

  const query = {};
  passthrough.forEach((method) => {
    query[method] = () => query;
  });

  query.single = () => Promise.resolve({ data: null, error: null });
  query.maybeSingle = () => Promise.resolve({ data: null, error: null });
  query.csv = () => Promise.resolve({ data: '', error: null });

  // Torna o builder "thenable" para funcionar com await direto.
  query.then = (resolve, reject) => Promise.resolve(result).then(resolve, reject);
  query.catch = (fn) => Promise.resolve(result).catch(fn);
  query.finally = (fn) => Promise.resolve(result).finally(fn);

  return query;
}

function createChannel() {
  const channel = {
    on: () => channel,
    subscribe: (callback) => {
      if (typeof callback === 'function') callback('SUBSCRIBED');
      return channel;
    },
    unsubscribe: () => Promise.resolve('ok'),
    send: () => Promise.resolve('ok'),
  };
  return channel;
}

const auth = {
  getSession: () => ok({ session: FAKE_SESSION }),
  getUser: () => ok({ user: FAKE_USER }),

  onAuthStateChange: (callback) => {
    // Emite a sessao no proximo tick, como o cliente real faz.
    setTimeout(() => callback('SIGNED_IN', FAKE_SESSION), 0);
    return { data: { subscription: { unsubscribe: () => {} } } };
  },

  signInWithPassword: () => ok({ session: FAKE_SESSION, user: FAKE_USER }),
  signInWithOtp: () => ok({ session: FAKE_SESSION, user: FAKE_USER }),
  signUp: () => ok({ session: FAKE_SESSION, user: FAKE_USER }),
  setSession: () => ok({ session: FAKE_SESSION, user: FAKE_USER }),
  refreshSession: () => ok({ session: FAKE_SESSION, user: FAKE_USER }),
  signOut: () => Promise.resolve({ error: null }),
  resetPasswordForEmail: () => ok({}),
  updateUser: () => ok({ user: FAKE_USER }),

  admin: {
    inviteUserByEmail: () => ok({ user: FAKE_USER }),
    createUser: () => ok({ user: FAKE_USER }),
    updateUserById: () => ok({ user: FAKE_USER }),
    deleteUser: () => ok({ user: FAKE_USER }),
    listUsers: () => ok({ users: [FAKE_USER] }),
  },
};

const storage = {
  from: () => ({
    upload: () => ok({ path: 'offline/mock-file' }),
    download: () => ok(new Blob([])),
    remove: () => ok([]),
    list: () => ok([]),
    getPublicUrl: () => ({ data: { publicUrl: '' } }),
    createSignedUrl: () => ok({ signedUrl: '' }),
  }),
};

export function createOfflineClient() {
  return {
    auth,
    storage,
    from: () => createQuery(),
    rpc: () => createQuery(),
    schema: () => ({ from: () => createQuery(), rpc: () => createQuery() }),
    functions: {
      invoke: () => ok(null),
    },
    channel: () => createChannel(),
    removeChannel: () => Promise.resolve('ok'),
    removeAllChannels: () => Promise.resolve([]),
    getChannels: () => [],
  };
}

export const OFFLINE_SESSION = FAKE_SESSION;
export const OFFLINE_USER = FAKE_USER;
