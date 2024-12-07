# ISP-AIDS

To start development server (frontend)

cd frontend
npm i
npm run dev

To start a local database (database name = isp; user = root; password = password; port = 3306). Add/change any lines you need in db_dumps.sql, to adjust tables data, manually insert entries

cd backend
docker-compose up -d

To start a backend server

from backend folder duplicate .env-template and rename to .env

cd backend
npm i
npm start
