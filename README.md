# <div align="center">Blogo</div>

## Introduction

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

A simple personal blog website developed using Next.js + React 18 + TypeScript + Shadcn/ui + Tailwind CSS

## Preview

- Desktop Preview:

  - Frontend: http://actopas.me
  - Admin Panel: http://actopas.me/admin

## Features

- Built with Next.js v14 + React 18 hooks, perfect support for SSR

- Written in TypeScript for type safety and better development experience

- Uses Prisma to simplify database CRUD operations

- Uses Redis + ioredis for PV/UV statistics

- Styles and components written with Tailwind CSS + shadcn/ui

- Form validation with shadcn/form + react-hook-form + zod

- Supports various SVG icons using iconify

- Markdown writing and preview implemented with Bytemd

- Supports light/dark theme switching with next-theme

- Generates site-wide sitemap with next-sitemap, SEO-friendly

- Supports GitHub + Ethereum wallet login for admin panel using the latest next-auth v5 and siwe

- Improves development efficiency with ahooks

- Compresses uploaded images to webp format using sharp, reducing image size

- Uploads images to Alibaba Cloud OSS for faster image access

- Responsive design, adapted for various screen sizes and devices

- Integrated admin panel features such as blog and tag management

## Quick Start

### Environment Preparation

Ensure you have installed:

- Git
- Pnpm
- Node.js >= 20
- Docker, Docker Compose

### Get the Project Code

```shell
git clone https://github.com/actopas/blogo.git
```

### Install Dependencies

Run the following command in the project root directory to install project dependencies:

```shell
pnpm install
```

### Prepare the Database

For the development environment, it's recommended to start a MySQL instance using Docker Compose. The project has prepared a `docker-compose.yaml` file.

#### Mac or Linux

The project has prepared a `Makefile`

Run in the project root directory:

```shell
# Docker Compose to start MySQL only
make run_mysql8

# Docker Compose to start all services
make run_all
```

#### Windows

Run in the project root directory:

```shell
# Docker Compose to start MySQL only
docker-compose up -d mysql8

# Docker Compose to start all services
docker-compose up -d
```

#### More

For more information, check the `docker-compose.yaml` and `Makefile` files in the project

### Prepare env Files and Configuration

#### Configure `.env` File

> The `.env` file is mainly used by Prisma. Prisma reads DATABASE_URL for database connection.

Create a new `.env` file and add the following content:

```.env
# DATABASE_URL format: mysql://username:password@databaseIP:port/databaseName
# Modify according to your actual situation
DATABASE_URL="mysql://root:123456@127.0.0.1:3306/blog2.0"

# Modify according to your actual situation
REDIS_HOST="127.0.0.1"
REDIS_PORT="6379"
```

#### Configure `.env.development` File

> The `.env.development` file is the configuration file for the development environment. Next.js automatically loads the content of .env.development in development mode.

Copy `.env.example` and rename it to `.env.development`, modify the following fields according to your actual situation:

For GitHub login, if not using GitHub login, you can skip this configuration

- `AUTH_GITHUB_ID`: GitHub OAuth application ID
- `AUTH_GITHUB_SECRET`: GitHub OAuth application secret

For Google login, if not using Google login, you can skip this configuration

- `AUTH_GOOGLE_ID`: Google OAuth application ID
- `AUTH_GOOGLE_SECRET`: Google OAuth application secret

Must configure

- `NEXT_PUBLIC_ADMIN_EMAILS`: Admin email list, only emails configured here are allowed to perform add, modify, and delete operations in the admin panel

### Start the Development Server

1. Create tables

```shell
pnpm db:push
```

2. Generate Prisma type files

```shell
pnpm db:gen
```

After this step, restart VS Code (Ctrl/Cmd + Shift + P, then select Reload Window) to reload TypeScript type files

3. Start the development server

```shell
pnpm dev
```

4. Preview

- Access frontend: http://localhost:3333
- Access admin panel: http://localhost:3333/admin

5. View the database

It's recommended to use Prisma Studio to view the data. You can also use database connection software to connect to our database to view the data.

Open a new terminal and run in the project root directory:

```shell
pnpm db:studio
```

After startup, it will automatically open the browser where you can view the data in the database online

### Customize Page Information

If you want to modify the information on the pages, please edit the `constants/info.ts` file
