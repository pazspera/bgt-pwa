const OIDC_CONFIG = {
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID || 'bgt-auth',
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI || 'https://app.bgt-auth.local/callback',
  scope: import.meta.env.VITE_OIDC_SCOPE || 'openid profile email groups offline_access',
  authorization_endpoint: import.meta.env.VITE_OIDC_AUTH_ENDPOINT || 'https://auth.bgt-auth.local/api/oidc/authorization',
  token_endpoint: import.meta.env.VITE_OIDC_TOKEN_ENDPOINT || 'https://auth.bgt-auth.local/api/oidc/token',
  end_session_endpoint: import.meta.env.VITE_OIDC_LOGOUT_URL || 'https://auth.bgt-auth.local/logout',
  audience: import.meta.env.VITE_OIDC_AUDIENCE || 'bgt-auth',
  response_type: 'code',
  code_challenge_method: 'S256',
};

async function generatePKCE() {
  const verifier = crypto.getRandomValues(new Uint8Array(48))
    .reduce((acc, b) => acc + b.toString(16).padStart(2, '0'), '')
    .substring(0, 64);

  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);
  const challenge = btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return { verifier, challenge };
}

export async function login() {
  console.trace('[Auth] login() called from:');
  const { verifier, challenge } = await generatePKCE();
  sessionStorage.setItem('pkce_verifier', verifier);
  console.log('[Auth] pkce_verifier saved:', verifier ? 'yes' : 'NO');
  console.log('[Auth] code_challenge:', challenge);

  const state = crypto.randomUUID();
  sessionStorage.setItem('oidc_state', state);

  const params = new URLSearchParams({
    client_id: OIDC_CONFIG.client_id,
    response_type: OIDC_CONFIG.response_type,
    redirect_uri: OIDC_CONFIG.redirect_uri,
    scope: OIDC_CONFIG.scope,
    code_challenge: challenge,
    code_challenge_method: OIDC_CONFIG.code_challenge_method,
    state,
    audience: 'bgt-auth',
  });

  window.location.href = `${OIDC_CONFIG.authorization_endpoint}?${params}`;
}

export async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');

  if (error) {
    throw new Error(`${error}: ${params.get('error_description')}`);
  }

  if (state !== sessionStorage.getItem('oidc_state')) {
    throw new Error('Invalid OIDC state');
  }

  const verifier = sessionStorage.getItem('pkce_verifier');
  console.log('[Auth] code_verifier retrieved:', verifier ? 'present' : 'MISSING');

  if (!verifier) {
    throw new Error('PKCE verifier missing - login flow may have been interrupted');
  }

  const response = await fetch(OIDC_CONFIG.token_endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: OIDC_CONFIG.client_id,
      code,
      redirect_uri: OIDC_CONFIG.redirect_uri,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status}`);
  }

  const tokens = await response.json();

  sessionStorage.removeItem('pkce_verifier');
  sessionStorage.removeItem('oidc_state');

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    id_token: tokens.id_token,
    expires_in: tokens.expires_in,
  };
}

export async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) throw new Error('No refresh token');

  const response = await fetch(OIDC_CONFIG.token_endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: OIDC_CONFIG.client_id,
      refresh_token: refreshToken,
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const tokens = await response.json();
  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    id_token: tokens.id_token,
    expires_in: tokens.expires_in,
  };
}

export async function logout() {
  // Revocar refresh token
  await fetch('/auth/api/oidc/revocation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      token: localStorage.getItem('refresh_token'),
      client_id: OIDC_CONFIG.client_id,
    }),
  }).catch(() => {});

  // Limpiar storage local
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token_expiry');
  localStorage.removeItem('id_token');

  // Logout nativo de Authelia (destruye la sesión SSO)
  // Solo usar rd si es https (producción), en http dejamos que Authelia use su default
  const postLogoutUrl = OIDC_CONFIG.redirect_uri.replace('/callback', '');
  const isHttps = postLogoutUrl.startsWith('https://');
  
  const logoutUrl = isHttps
    ? `${OIDC_CONFIG.end_session_endpoint}?rd=${encodeURIComponent(postLogoutUrl)}`
    : OIDC_CONFIG.end_session_endpoint;

  window.location.href = logoutUrl;
}