const button = $("#btn");
const quoteContainer = $("#quote-container");
const info = $("#info-container");
const characterName = $("#character-name");
const quoteText = $("#quote");
const searchBar = $("#search-bar");

button.on("click", function () {
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
    url: "https://imdb-api.com/en/API/SearchSeries/k_bdu7lhul/" + userInput,
  }).then(function (res) {
    const image = res.results[0].image;
    $("#image").attr("src", image);
    console.log(res);
  });
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
      url: "https://imdb-api.com/en/API/SearchSeries/k_bdu7lhul/" + userInput,
    }).then(function (res) {
      const image = res.results[0].image;
      $("#image").attr("src", image);
      console.log(res);
    });
  }
});
