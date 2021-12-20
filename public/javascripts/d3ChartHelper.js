var d3 = require("d3"),
    jsdom = require("jsdom");

jsdom.env("https://google.com", function(error, window) {
  if (error) throw error;
  console.log(d3.select(window.document).select("#hplogo").attr("src"));
});