

rm -rf public/ionicWeb
cp -R ../mobile-appz/www public/ionicWeb

cf api https://api.ng.bluemix.net

APP_NAME=nearket_api

#login
cf login

#delete old
cf d $APP_NAME -f

#upload
cf push $APP_NAME
