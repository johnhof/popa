cat ascii.txt

. ./config.env

LAUNCH_DIR=$(pwd)

echo "Launching server..."
cd server
go run main.go &
cd $LAUNCH_DIR

echo "Launching client..."
cd client
yarn start &
cd $LAUNCH_DIR
fg
