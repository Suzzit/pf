# start server

PATH_self=$(realpath "$0")
PATH_pwd=$(dirname "$PATH_self")

npx nodemon "$PATH_pwd/backend/script.js"