# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos essenciais
COPY package.json package-lock.json* pnpm-lock.yaml* ./

RUN npm install --production

# Copia todo o código do projeto
COPY . .

# Gera o build do Next.js
RUN npm run build

# Executa as migrations do Prisma e o seed
RUN npx prisma migrate dev --name init && npx prisma db seed

# Etapa de runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Copia apenas os arquivos necessários para rodar a aplicação
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/prisma prisma
COPY --from=builder /app/dev.sqlite dev.sqlite

EXPOSE 3000

CMD ["npm", "run", "start"]
