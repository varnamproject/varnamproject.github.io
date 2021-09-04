cd varnam-editor
yarn install

export VUE_PUBLIC_PATH="/editor/"
npm run build

sed -i 's+http://127.0.0.1:8123+https://varnam.subinsb.com+g' dist/js/*.js
sed -i 's+http://127.0.0.1:3000+https://varnam.subinsb.com:8124+g' dist/js/*.js

# From offline=true to offline=false
sed -i 's+$VARNAM_OFFLINE=!0+$VARNAM_OFFLINE=!1+g' dist/js/*.js

rm -rf $(realpath ../static/)/editor
mv dist $(realpath ../static/)/editor
