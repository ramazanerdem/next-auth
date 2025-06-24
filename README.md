# 🔐 Kayra Auth Sistemi

Modern web uygulamaları için kapsamlı kimlik doğrulama sistemi. Next.js 15, Auth.js v5, TypeScript ve Docker ile geliştirilmiştir.

## ✨ Özellikler

- 🔐 **Multi-Provider Auth:** Google, GitHub, Auth0 desteği
- 🛡️ **Role-Based Access Control:** Admin/User rol yönetimi
- 🏢 **Enterprise Ready:** Auth0 entegrasyonu
- ⚡ **Modern Stack:** Next.js 15 + Auth.js v5
- 🐳 **Docker Ready:** Konteyner tabanlı deployment
- 🎨 **Modern UI:** Tailwind CSS ile responsive tasarım

## 🚀 Hızlı Başlangıç

### 1. Projeyi İndirin

```bash
git clone https://github.com/ramazanerdem/next-auth.git
cd next-auth
```

### 2. Environment Ayarları

`.env.local` dosyasını oluşturun:

```env
NODE_ENV=development

# Auth.js
AUTH_URL=http://localhost:3000
AUTH_SECRET=your-32-character-secret-key-here

# Google OAuth Provider
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth Provider
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Auth0
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
```

### 3. Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

## 🐳 Docker ile Çalıştırma

### Basit Yöntem (Docker Compose)

```bash
docker-compose up -d
```

### Manuel Docker

```bash
# Build
docker build -t kayra-auth:latest .

# Run
docker run -d -p 3000:3000 --name kayra-auth kayra-auth:latest
```

## 📖 Test Kullanıcıları

- **Admin:** admin / admin
- **OAuth:** Google/GitHub hesabınızla giriş yapabilirsiniz

## 🛠️ Teknoloji Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Authentication:** Auth.js v5 (NextAuth.js)
- **Runtime:** Node.js 20 Alpine
- **Deployment:** Docker, Multi-stage build

## 📁 Proje Yapısı

```
app/
├── (auth)/          # Giriş sayfaları
├── (protected)/     # Korumalı kullanıcı alanı
├── (admin)/         # Admin paneli
├── components/      # Yeniden kullanılabilir bileşenler
└── lib/            # Utilities ve helpers
```

## 🔧 Geliştirme

```bash
# Development server
npm run dev

# Build
npm run build

# Production server
npm start

# Linting
npm run lint
```

## 📋 API Endpoints

- `GET /api/auth/providers` - Mevcut auth providers
- `POST /api/auth/signin` - Giriş işlemi
- `POST /api/auth/signout` - Çıkış işlemi
- `GET /api/admin/users` - Kullanıcı listesi (Admin)

## 🔐 Güvenlik

- Non-root Docker user
- JWT session management
- CSRF protection
- Environment variable security
- Role-based access control

## 📄 Dokumentasyon

Detaylı teknik rapor için `TEKNIK_RAPOR.md` dosyasını inceleyiniz.

## 🤝 Katkıda Bulunma

Bu proje iş başvurusu kapsamında geliştirilmiştir.

## 📞 İletişim

- **Geliştirici:** Ramazan ERDEM
- **Email:** info@ramo.network & ramazan.erdem.du@gmail.com

---

**Versiyon:** 1.0.0  
**Durum:** Production Ready ✅
