# AI Trading System - API Documentation

## Authentication
### Login
POST /api/auth/login
Body: { "email": "user@example.com", "password": "password" }
Response: { "token": "JWT_TOKEN_HERE" }

### Register
POST /api/auth/register
Body: { "name": "John Doe", "email": "user@example.com", "password": "password" }

## Trades
### Execute Trade
POST /api/trade/execute
Body: { "userId": "USER_ID_HERE", "stockSymbol": "RELIANCE", "tradeType": "BUY", "quantity": 10 }

### Get Trade History
GET /api/trade/history?page=1

## AI Insights
### Get AI Trade Strategy
GET /api/ai/strategy/RELIANCE
