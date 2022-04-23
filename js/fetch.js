setTimeout(() => {
  get_artist()
    .then((res) => res.json())
    .then((data) => {
      if (!data["error"]) {
        document.querySelector('title').innerHTML += ` - ${data.name.toUpperCase()}`
        document.querySelector("#top-tracks-header").innerHTML = "Top Tracks";
        create_artist_profile(data);
      } else {
        document.querySelector("#error").style.display = "block";
      }
    });
  get_artist_tops()
    .then((res) => res.json())
    .then((data) => {
      if (!data["error"]) create_artist_tops(data);
    });
}, 1000);
