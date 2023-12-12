@echo off

REM Navegue até o diretório do backend
cd backend
npm install
start cmd /k npm run dev

REM Aguarde um momento para garantir que o servidor backend está rodando antes de iniciar o frontend
timeout /t 60

REM Navegue até o diretório do frontend
cd front-end
npm install
start cmd /k npm start
