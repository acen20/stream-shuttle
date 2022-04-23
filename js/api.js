const token_url = "https://accounts.spotify.com/api/token";
const refresh_token =
  "AQCRuyroUKYrTcgs9bIENonEwPhVd-JreXs3KsYUuwhGxJDuP0dwasyZN38kueriIBG_5hi3WBG-ap5Ta23sj3Yb_QTgXEi11N2x_ZLSjurTcTKdru9KrqzOF5e0IiCahfM";
let token = "";
const encoded_client =
  "ODdhNmEyNWIxZjVjNDE3NWIwYjM4MDc4OTFlNzc2YTQ6MGZkMDI1YmUzZjYxNDNkOTg2YTliNWMxNjIwMWNjYTE=";
const client_id = "87a6a25b1f5c4175b0b3807891e776a4";

var xhr = new XMLHttpRequest();
xhr.open("POST", token_url);

xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Authorization", `Basic ${encoded_client}`);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    token = JSON.parse(xhr.responseText)["access_token"];
  }
};

var data = `refresh_token=${refresh_token}&grant_type=refresh_token&client_id=${client_id}`;

xhr.send(data);
