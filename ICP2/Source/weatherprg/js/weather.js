
var tempMode = 1;


$(document).ready(function(){
  
  /*EVENT LISTENERS*/
  var cty  = $('#cty');
  var stdcd  = $('#stdcd');
  var stdcode = "";
  var citynm = "Chennai";
  document.getElementById('btn_show_weather').addEventListener('click',getWeatherbyCity); //add listener to manual search button


  function getWeatherbyCity(){
	  citynm = cty.val();
	  stdcode = stdcd.val();
	  getWeather(citynm,stdcode);
	  getWeatherCity(citynm);
  }
  
  
  
  function getWeatherCity(ccity) {
	  var apiURI = "http://api.openweathermap.org/data/2.5/weather?q=" + ccity + "&appid=06170c100199dbae1e223cc3dfad960b";

  $.ajax({
    url: apiURI,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function(resp) {

      $("#tempMode").on("click", function() {
        if (this.checked) {
          $("#temp-text").html(cels.toFixed(1) + " C&deg");
          console.log("checked");
        } else
          $("#temp-text").html(fahr.toFixed(0) + " F&deg");
      });
      console.log(apiURI);
      console.log(resp.name);
      if (resp.name) {
        $("#city-text").html(resp.name + ", " + resp.sys.country);
      }
      if (resp.wind) {
        var knots = resp.wind.speed * 1.9438445;
        $("#wind-text").html(knots.toFixed(1) + " Knots");
      }
      if (resp.main.temp) {
        var fahr = (resp.main.temp * 9 / 5) - 459.67;
        var cels = (resp.main.temp - 273.15);
        if (cels > 24){ 
          $("#temp-text").css("color", "red");
        } else if (cels < 18){
          $("#temp-text").css("color", "blue");
        }
        $("#temp-text").html((tempMode === 1 ? fahr.toFixed(0) + " F&deg" : cels.toFixed(0) + " C&deg"));
      }
      if (resp.weather) {
        var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        console.log(imgURL)
        $("#weatherImg").attr("src", imgURL);
        $("#weather-text").html(resp.weather[0].description);
      }   
    },
    error: function(resp) {

       clearInterval(updateinter);
    }
  });
}
  
function getWeather(ccity,stdcd) {
	  var apiURI = "http://api.openweathermap.org/data/2.5/weather?q=" + ccity + "," + stdcd+ "&appid=06170c100199dbae1e223cc3dfad960b";

  $.ajax({
    url: apiURI,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function(resp) {

      $("#tempMode").on("click", function() {
        if (this.checked) {
          $("#temp-text").html(cels.toFixed(1) + " C&deg");
          console.log("checked");
        } else
          $("#temp-text").html(fahr.toFixed(0) + " F&deg");
      });
      console.log(apiURI);
      console.log(resp.name);
      if (resp.name) {
        $("#city-text").html(resp.name + ", " + resp.sys.country);
      }
      if (resp.wind) {
        var knots = resp.wind.speed * 1.9438445;
        $("#wind-text").html(knots.toFixed(1) + " Knots");
      }
      if (resp.main.temp) {
        var fahr = (resp.main.temp * 9 / 5) - 459.67;
        var cels = (resp.main.temp - 273.15);
        if (cels > 24){ 
          $("#temp-text").css("color", "red");
        } else if (cels < 18){
          $("#temp-text").css("color", "blue");
        }
        $("#temp-text").html((tempMode === 1 ? fahr.toFixed(0) + " F&deg" : cels.toFixed(0) + " C&deg"));
      }
      if (resp.weather) {
        var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        console.log(imgURL)
        $("#weatherImg").attr("src", imgURL);
        $("#weather-text").html(resp.weather[0].description);
      }   
    },
    error: function(resp) {
       
	   getWeatherCity(citynm);
	   
       clearInterval(updateinter);
    }
  });
}

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather("Chennai","TN");
    })
  } else {
    alert("geolocation not available");
    clearInterval(updateinter);
  }
}
var i = 0;
var updateinter = setInterval(function(){
  console.log("iteration# " + i++);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather("Chennai","TN");
    })
  } else {
    alert("geolocation not available");
  }
}, 300000);


getLocation();
});