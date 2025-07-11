# Donly - Frontend

Проект Donly - это платформа для стримеров, которая позволяет им принимать
донаты и управлять вишлистами с использованием блокчейн-технологий.

## Требования

- Node.js 20+
- Git

## Установка

```bash
git clone <URL репозитория>
cd frontend
npm install
```

## Настройка

Создайте `.env`:
```env
VITE_API_BASE_URL=your_api_url
VITE_NETWORK_TESTNET_URL=your_rpc_url
VITE_NETWORK_CHAIN_ID=your_chain_id
VITE_NETWORK_NAME=your_network_name
VITE_NETWORK_EXPLORER_URL=your_explorer_url
```

## Запуск

```bash
npm run dev      # Разработка
npm run build    # Сборка
npm run preview  # Предпросмотр
```

## Docker

```bash
docker build -t donly-frontend .
docker run -p 4173:4173 donly-frontend
```

## Технологии

- React 18 + TypeScript
- Vite
- Redux Toolkit
- Ethers.js (Web3)
- Telegram SDK
- HeroUI + Tailwind CSS

## Структура

```
src/
├── api/          # HTTP запросы
├── components/   # React компоненты
├── config/       # Конфигурация
├── hooks/        # Кастомные хуки
├── stores/       # Redux store
└── types/        # TypeScript типы
```



