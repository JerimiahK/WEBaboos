const button = $("#btn");
const quoteContainer = $("#quote-container");
const info = $("#info-container");
const characterName = $("#character-name");
const quoteText = $("#quote");
const searchBar = $("#search-bar");
let character = "";
let quote = "";
let image = "";
let userInput = "";
const h3El = document.getElementById("instructions");


button.on("click", function () {
  userInput = $("#search-bar").val();
  $.ajax({
    url: "https://animechan.vercel.app/api/random/anime?title=" + userInput,
  }).then(function (res) {
    character = res.character;
    quote = res.quote;
    characterName.text("-" + character);
    quoteText.text(quote);
    console.log(res);
    // let quoteSave = $("#quote").val(quote);
    localStorage.setItem("Character", character);
    localStorage.setItem("Quote", quote);
    localStorage.setItem("Title", userInput);
  });
  $.ajax({
    url: "https://imdb-api.com/en/API/SearchSeries/k_0dkt756l/" + userInput,
  }).then(function (res) {
    image = res.results[0].image;
    $("#image").attr("src", image);
    localStorage.setItem("Image", image);
    console.log(res);
  });
  h3El.classList.add("hide");
});

searchBar.on("keypress", function (event) {
  if (event.key === "Enter") {
    let userInput = $("#search-bar").val();
    $.ajax({
      url: "https://animechan.vercel.app/api/random/anime?title=" + userInput,
    }).then(function (res) {
      const character = res.character;
      const quote = res.quote;
      characterName.text("-" + character);
      quoteText.text(quote);
      console.log(res);
    });
    $.ajax({
      url: "https://imdb-api.com/en/API/SearchSeries/k_0dkt756l/" + userInput,
    }).then(function (res) {
      const image = res.results[0].image;
      $("#image").attr("src", image);
      console.log(res);
    });
    h3El.classList.add("hide");
  }
});

$(".search-generator #search-bar").val(localStorage.getItem("Title"));
$("#quote").text(localStorage.getItem("Quote"));
$("#character-name").text(localStorage.getItem("Character"));
$("#image").attr("src", localStorage.getItem("Image"));
