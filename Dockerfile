# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_MOCK_API

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_MOCK_API=$VITE_MOCK_API

# Copiamos solo manifests para cache
COPY package.json package-lock.json ./

# Instalación reproducible
RUN npm ci

# Copiamos el resto del código (solo en el builder)
COPY . .

# Build de producción
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:alpine

# Borramos config default
RUN rm /etc/nginx/conf.d/default.conf

# Configuración SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos SOLO el resultado del build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
