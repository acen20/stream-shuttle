var url_string = window.location.href;
var url = new URL(url_string);
var artist_id = url.searchParams.get("artist");
var tops = 6;
var more = false;

const show = (e) => {
  more = !more;
  if (more) {
    tops = 10;
    e.target.innerHTML = "Show less";
  } else {
    tops = 6;
    e.target.innerHTML = "Show more";
  }
  document.querySelector("#top-tracks").classList.toggle("fadeIn");
  get_artist_tops()
    .then((res) => res.json())
    .then((data) => {
      if (!data["error"]) create_artist_tops(data);
    });
};

async function get_artist() {
  let response = await fetch(
    `https://api.spotify.com/v1/artists/${artist_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

const create_artist_profile = (data) => {
  var element = document.querySelector(".artist-profile");
  var avatar = document.querySelector("#avatar");
  var name = data["name"];
  var popularity = data["popularity"];
  var followers = data["followers"].total;
  followers = followers.toLocaleString("ja-JP");
  followers = followers.toString().replaceAll(",", ".");
  var img = data["images"][0]?.url;
  if (!img) {
    img =
      "https://user-images.githubusercontent.com/26250962/42155301-ee1010d6-7ddf-11e8-9915-4fc75f6eab66.png";
  }
  var code = `
  <img class="avatar" src="${img}" />
    <h2 class="artistname">${name}</h2>
    <p class="artistdata">
      Followers: ${followers}<br />
      Popularity: ${popularity}%<img class="icon_flame" src="assets/icon_flame.gif">
    </p>
    `;
  element.innerHTML = code;
  avatar.setAttribute("src", img);
  avatar.style.opacity = 1;
  document.querySelectorAll('link[rel="icon"]').forEach((el) => {
    el.href = img;
    el.style.borderRadius = "50%";
  });
};

async function get_artist_tops() {
  let response = await fetch(
    `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?market=ES`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

const create_artist_tops = (data) => {
  data = data.tracks.sort((track1, track2) =>
    track1.popularity < track2.popularity
      ? 1
      : track2.popularity < track1.popularity
      ? -1
      : 0
  );
  if (data.length > 6) {
    document.querySelector("#show-more-btn").style.display = "inline-block";
  }
  data = data.slice(0, tops);
  var element = document.querySelector("#top-tracks");
  var code = "";
  var iterator = 0;
  data.forEach((track) => {
    iterator++;
    var name = track["name"];
    var cover = track["album"]["images"][track.album.images.length - 2].url;
    var popularity = track["popularity"];
    var class_ = "";
    if (iterator > 6) class_ = "more-track-animate";
    if (iterator == 6) {
      code += `<tr class="divider">
      <td class="divider"></td>
      <td class="divider"></td>
      <td class="divider"></td>
      </tr>`;
      if (tops == 6) class_ = "inactive";
    }
    code += `<tr class="${class_}">
      <td class="position">${iterator}</td>
      <td class="cover"><img src="${cover}" /></td>
      <td class="songdata">${name}<br />Popularity: ${popularity}%<img class="icon_flame" src="assets/icon_flame.gif"></td>
    </tr>`;
  });
  element.innerHTML = code;
};
