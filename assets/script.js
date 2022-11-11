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
let titleID = "";
let shortPlot = "";
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
    localStorage.setItem("Character", character);
    localStorage.setItem("Quote", quote);
    localStorage.setItem("Title", userInput);
  });
  $.ajax({
    url: "https://imdb-api.com/en/API/SearchSeries/k_bdu7lhul/" + userInput,
  })
    .then(function (res) {
      console.log(res);
      let time = 0;
      let interval = setInterval(function() {
        if (time < res.results.length) {
            image = res.results[time].image;
            console.log(image);
            $("#image").attr("src", image);
        } 
        else {
          clearInterval(interval);
        }
      time++;
      }, 2000)
      image= res.results[0].image;
      localStorage.setItem("Image", image);
      titleID = res.results[0].id;
    })
    .then(function () {
      $.ajax({
        url: "https://imdb-api.com/en/API/Wikipedia/k_bdu7lhul/" + titleID,
      }).then(function (res) {
        console.log(res);
        shortPlot = res.plotShort.plainText;
        infoWiki = res.url;
        $("#fact").text(shortPlot);
        $("#infoWiki").attr("href", infoWiki);
        $("#infoWiki").text(infoWiki);
        localStorage.setItem("Info", shortPlot);
        localStorage.setItem("Wiki", infoWiki);
      });
    });
  h3El.classList.add("hide");
  info.removeClass("hide");
  quoteContainer.removeClass("hide");
});

searchBar.on("keypress", function (event) {
  if (event.key === "Enter") {
    userInput = $("#search-bar").val();
    $.ajax({
      url: "https://animechan.vercel.app/api/random/anime?title=" + userInput,
    }).then(function (res) {
      character = res.character;
      quote = res.quote;
      characterName.text("-" + character);
      quoteText.text(quote);
      console.log(res);
      localStorage.setItem("Character", character);
      localStorage.setItem("Quote", quote);
      localStorage.setItem("Title", userInput);
    });
    $.ajax({
      url: "https://imdb-api.com/en/API/SearchSeries/k_bdu7lhul/" + userInput,
    })
      .then(function (res) {
        console.log(res);
        let time = 0;
        console.log(res.results.length);
        let interval = setInterval(function() {
          if (time < res.results.length) {
            image = res.results[time].image;
            console.log(image);
            $("#image").attr("src", image);
          } else {
            clearInterval(interval);
          }
          time++;
        }, 2000)
        image= res.results[0].image;
        localStorage.setItem("Image", image);
        titleID = res.results[0].id;
      })
      .then(function () {
        $.ajax({
          url: "https://imdb-api.com/en/API/Wikipedia/k_bdu7lhul/" + titleID,
        }).then(function (res) {
          console.log(res);
          shortPlot = res.plotShort.plainText;
          infoWiki = res.url;
          $("#fact").text(shortPlot);
          $("#infoWiki").attr("href", infoWiki);
          $("#infoWiki").text(infoWiki);
          localStorage.setItem("Info", shortPlot);
          localStorage.setItem("Wiki", infoWiki);
        });
      });
    h3El.classList.add("hide");
    info.removeClass("hide");
    quoteContainer.removeClass("hide");
  }
});

// keeps placeholder image upon page load when their is no local storage in place.
if (
  localStorage.getItem("Character") === null &&
  localStorage.getItem("Quote") === null &&
  localStorage.getItem("Info") === null &&
  localStorage.getItem("Wiki") === null
) {
  info.addClass("hide");
  quoteContainer.addClass("hide");
}

if (localStorage.getItem("Image") !== null) {
  $("#image").attr("src", localStorage.getItem("Image"));
}

if (localStorage.getItem("Wiki") !== null) {
  $("#infoWiki").attr("href", localStorage.getItem("Wiki"));
  $("#infoWiki").text(localStorage.getItem("Wiki"));
}

if (localStorage.getItem("Info") !== null) {
  $("#fact").text(localStorage.getItem("Info"));
  console.log(localStorage.getItem("Info"));
}

$(".search-generator #search-bar").val(localStorage.getItem("Title"));
$("#quote").text(localStorage.getItem("Quote"));
$("#character-name").text(localStorage.getItem("Character"));
