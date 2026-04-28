# -------- Build stage --------
FROM node:20-alpine AS builder
WORKDIR /app

# Dependencias primero → mejor cache de capas
COPY package*.json ./
RUN npm ci

# Args con defaults
ARG VITE_API_BASE_URL
ARG VITE_MOCK_API
ARG VITE_OIDC_CLIENT_ID
ARG VITE_OIDC_REDIRECT_URI
ARG VITE_OIDC_SCOPE
ARG VITE_OIDC_AUTH_ENDPOINT
ARG VITE_OIDC_TOKEN_ENDPOINT
ARG VITE_OIDC_AUDIENCE

# Un solo bloque ENV referenciando los ARG
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_API_HEALTH_BASE_URL=$VITE_API_HEALTH_BASE_URL \
    VITE_MOCK_API=$VITE_MOCK_API \
    VITE_OIDC_CLIENT_ID=$VITE_OIDC_CLIENT_ID \
    VITE_OIDC_REDIRECT_URI=$VITE_OIDC_REDIRECT_URI \
    VITE_OIDC_SCOPE=$VITE_OIDC_SCOPE \
    VITE_OIDC_AUTH_ENDPOINT=$VITE_OIDC_AUTH_ENDPOINT \
    VITE_OIDC_TOKEN_ENDPOINT=$VITE_OIDC_TOKEN_ENDPOINT \
    VITE_OIDC_AUDIENCE=$VITE_OIDC_AUDIENCE

COPY . .
RUN npm run build

# -------- Runtime stage --------
FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx:alpine procesa /etc/nginx/templates/*.template automáticamente
# con envsubst al arrancar el contenedor

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]