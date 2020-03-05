//import { colors, quotes } from "./quotes.js";

function load() { 
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("page").style.background = randomColor;
  document.getElementById("tweet-quote").style.background = randomColor;
  document.getElementById("new-quote").style.background = randomColor;
  document.getElementById("quote-box").style.color = randomColor;
  document.getElementById("text").innerHTML = randomQuote.text;
  document.getElementById("author").innerHTML = randomQuote.author;
}
function myQuotes() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("page").style.background = randomColor;
  document.getElementById("tweet-quote").style.background = randomColor;
  document.getElementById("new-quote").style.background = randomColor;
  document.getElementById("quote-box").style.color = randomColor;
  document.getElementById("text").innerHTML = randomQuote.text;
  document.getElementById("author").innerHTML = randomQuote.author;
}

