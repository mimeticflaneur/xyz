# Guía de Despliegue

## Opciones de Despliegue

### 1. Vercel (Recomendado - Gratis)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

O simplemente conecta tu repositorio de GitHub en [vercel.com](https://vercel.com)

### 2. Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Desplegar
netlify deploy --prod --dir=dist
```

O arrastra la carpeta `dist/` en [app.netlify.com](https://app.netlify.com)

### 3. GitHub Pages

1. Modifica `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/real-estate-analyzer/', // Reemplaza con tu repo name
})
```

2. Instala gh-pages:

```bash
npm install --save-dev gh-pages
```

3. Agrega scripts en `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Despliega:

```bash
npm run deploy
```

### 4. Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build imagen
docker build -t real-estate-analyzer .

# Run
docker run -p 3000:80 real-estate-analyzer
```

## Variables de Entorno

Este proyecto no requiere variables de entorno por ahora. Si agregas APIs externas:

```bash
# .env.local
VITE_API_KEY=tu_clave_aqui
```

## Optimizaciones de Producción

El build de Vite ya incluye:
- ✅ Minificación
- ✅ Tree-shaking
- ✅ Code splitting
- ✅ Asset optimization

## Performance

- Lighthouse Score objetivo: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Total Bundle Size: < 200KB

## Monitoreo

Considera agregar:
- **Google Analytics** para tracking de uso
- **Sentry** para error tracking
- **LogRocket** para session replay

## CI/CD

GitHub Actions ejemplo (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
