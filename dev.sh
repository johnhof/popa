cat ascii.txt

. ./config.env

LAUNCH_DIR=$(pwd)

echo "Launching server..."
cd server
go run main.go &
cd $LAUNCH_DIR

echo "Launching client..."
cd client
yarn start --prefix client &
cd $LAUNCH_DIR
fg
