kill -9 $(lsof -t -i:8080)
cd next/js
yarn build
nohup yarn start &
wait-on http://localhost:3000
cd ../../
npx cypress run --headless --browser chrome
kill -9 $(lsof -t -i:3000)