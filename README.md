# Volkan Filazi - Terminal Portfolio

A small Nuxt portfolio with a keyboard-first terminal interface.

I built this as a short Vue/Nuxt refresh project and as a simple entry point into my main product work, SignFlow. The portfolio stays focused: profile, experience, skills and a project screen. The SignFlow wormhole adds a small live auth/token demo through local Nuxt API routes.

## What It Includes

- Terminal-style navigation with keyboard and mouse support
- CV-based experience and skills sections
- SignFlow project overview
- Login, refresh token and JWT claim inspection flow
- Server API routes that proxy the SignFlow auth endpoints

## Stack

- Nuxt
- Vue 3
- TypeScript
- Bootstrap
- JWT decode

## Environment

Create a local `.env` file if you need to override the default SignFlow API URL:

```bash
SIGNFLOW_API_BASE_URL=https://api.usesignflow.com
```

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
