$(function () {
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();

        var searchInput = $("#searchInput").val();

        if (searchInput === "") {
            return;
        } else {

            // var icon;
            var apiKey = "a360aaabade6248b33523e2e88f37cff"
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput +"&appid=" + apiKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                
                var cityTemp = response.main.temp;
                cityTemp = (((cityTemp - 273.15) * 1.8) +32).toFixed(2);
                var windSpeed = response.wind.speed;
                windSpeed = (windSpeed * 2.237).toFixed(1);
                icon = response.weather[0].icon;
                // console.log(icon);
                
                $("#cityName").text(response.name);
                $("#imgMainCard").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                $("#temp").text("Temperature: " + cityTemp + " °F");
                $("#humidity").text("Humidity: " + response.main.humidity + " %");
                $("#wind").text("Wind Speed: " + windSpeed + " MPH");

                // $(".city").text(response.name);
                // $(".wind").text("Wind speed: " + response.wind.speed);
                // $(".humidity").text("Humidity: " + response.main.humidity);
                // $(".temp").text("Temperature: " + response.main.temp);
            });


            var newLi = $("<li>");
            newLi.addClass("list-group-item list");
            newLi.text(searchInput);
            $("#unorderedList").append(newLi);

            $("#content").css("visibility", "visible")
        }

    });

});