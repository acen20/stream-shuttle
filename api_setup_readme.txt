1. Note down your client secret and client id from Spotify API Dashboard.
2. Go to https://www.base64encode.org/ and put your client id and client secret in this format
client_id:client_secret
3. Copy the encoded data.
4. Open your browser and enter this in the address bar

https://accounts.spotify.com/authorize?client_id=your_client_id_here&redirect_uri=http://localhost:3000&response_type=code

5. You will be navigated to an authorization page. Login here.
6. After this, you may be navigated to "Page not found". It does not matter. What matters is that you will see a code=some_code in the address bar. Copy this code.

7. By now you will have the following:
-base64_encoded_data
-client_id
-client_secret
-code

8.Open a terminal/command prompt on your pc and enter the following(put your base64_encoded_data and code):

curl -H "Authorization: Basic base64_encoded_data_here" -d grant_type=authorization_code -d code=code_here -d redirect_uri=http://localhost:3000 https://accounts.spotify.com/api/token

9. You will get a response. Copy the refresh token.

10. Open the api.js file and change the value of refresh token to newly generated.
