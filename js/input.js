var input = document.querySelector("#search");
var dropdown = document.querySelector(".search-dropdown");

const parse_input = () => {
  var search_key = input.value;
  if (search_key.length) {
    if (search_key.includes("/artist")) {
      search_key = search_key.split("?")[0];
      keys = search_key.split("/");
      search_key = keys[keys.length - 1];
    }
    let id = search_key;
    var link = document.querySelector("#search-btn").getAttribute("value");
    window.location.assign(`${link}?artist=` + id);
  }
};

const search_from_results = (id) => {
  input.value = id;
  parse_input();
};

async function search_artists(artist_name) {
  let response = await fetch(
    `https://api.spotify.com/v1/search?q=${artist_name}&type=artist&limit=10`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

const get_artists = (e) => {
  var search = e.target;
  if (e.keyCode != 38 && e.keyCode != 40) {
    var search_drop = document.querySelector(".search-dropdown");
    if (search.value) {
      search_drop.style.display = "block";
      var search_key = encodeURIComponent(search.value);
      search_artists(search_key)
        .then((res) => res.json())
        .then((data) => {
          search_drop.innerHTML = "";
          create_search_results(data);
        });
    } else {
      search_drop.style.display = "none";
      start = null;
    }
  } else {
    let val = search.value;
    search.value = null;
    search.value = val;
  }
};

const create_search_results = (data) => {
  var search_dropdown = document.querySelector(".search-dropdown");
  const artists = data["artists"].items;
  let selected = "selected";
  artists.forEach((artist) => {
    let name = artist.name;
    let img = artist.images[artist.images.length - 1]?.url;
    let link = artist.id;
    let followers = artist.followers.total;
    let popularity = artist.popularity;
    if (!img) {
      img = "https://genesisairway.com/wp-content/uploads/2019/05/no-image.jpg";
    }
    let code = `<li class="search-result ${selected}"
    onclick="javascript:search_from_results('${link}')">
    <div class="img-container-small">
    <img class="img-small" src="${img}"/>
    </div>
    <div class="search-detail">
    <h3 class="search-artist-name">${name}</h3>
    <!-- <p class="search-artist-subtitle"><span><img class="icon_flame" style="width:15px; height:15px; margin-left:-2px; margin-right:3px" src="assets/icon_flame.gif">${popularity}</span></p> -->
    </div>
  </li>`;
    search_dropdown.innerHTML += code;
    selected = "";
  });
  start = document.querySelector(".selected");
};

var start = null;
function dotheneedful(sibling, block) {
  if (sibling != null) {
    start.classList.remove("selected");
    sibling.focus();
    var topPos = sibling.offsetTop;
    dropdown.scrollTop = topPos - 120;
    sibling.classList.add("selected");
    start = sibling;
  }
}

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == "38") {
    // up arrow
    var prev = start.previousElementSibling;
    dotheneedful(prev, "end");
  } else if (e.keyCode == "40") {
    // down arrow
    var next = start.nextElementSibling;
    dotheneedful(next, "start");
  } else if (e.keyCode == 13) {
    if (start) start.click();
  }
}

document.onkeydown = checkKey;
