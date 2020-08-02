require("dotenv").config();

const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// Our routes go here:
// home page
app.get("/", (request, response) => {
  response.render("index.hbs");
});

app.get("/artistsearch/:artistname", (request, response) => {
  console.log(" artist search ");
  console.log(request.params);
  result.render("artist-search-results.hbs");
});

res.render("artistsearch-results", { artists: data.body.artists.items });

app.get('/albums/:artistId', (req, res) => {
    let albums = req.params.artistId;
    spotifyApi
    .getArtistAlbums(albums)
    .then((data) => {

    res.render("albums", { cd: data.body.items });
})
.catch(err => console.log('The error while searching artists albums occurred: ', err));


});


app.get('/tracks/:albumId', (req, res) => {
    let tracks = req.params.albumId;
    spotifyApi
    .getAlbumTracks(tracks)
    .then((data) => {
        console.log(data.body);
       res.render('tracks', { song: data.body.items });

    });

  });

const SpotifyWebApi = require('spotify-web-api-node');

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));