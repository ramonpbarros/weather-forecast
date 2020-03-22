$(function () {

    var searchInput;

    $("#searchBtn").on("click", function (e) {
        e.preventDefault();

        searchInput = $("#searchInput").val();

        if (searchInput === "") {
            return;
        } else {  

            var apiKey = "a360aaabade6248b33523e2e88f37cff"
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var cityTemp = response.main.temp;
                var windSpeed = response.wind.speed;
                var icon = response.weather[0].icon;
                var cityLat = response.coord.lat;
                var cityLon = response.coord.lon;
                var dateMili = new Date(response.dt * 1000);
                var month = dateMili.getMonth();
                var day = dateMili.getDate();
                var year = dateMili.getFullYear();

                cityTemp = (((cityTemp - 273.15) * 1.8) + 32).toFixed(2);
                windSpeed = (windSpeed * 2.237).toFixed(1);


                $("#cityName").text(response.name + " (" + month + "/" + day + "/" + year + ")");
                $("#imgMainCard").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                $("#temp").text("Temperature: " + cityTemp + " °F");
                $("#humidity").text("Humidity: " + response.main.humidity + " %");
                $("#wind").text("Wind Speed: " + windSpeed + " MPH");

                var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLon;
                $.ajax({
                    url: uvURL,
                    method: "GET"
                }).then(function (result) {
                    $("#uvIndexValue").text(" " + result.value);
                });

                var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + apiKey;
                $.ajax({
                    url: forecastURL,
                    method: "GET"
                }).then(function (forecastResponse) {
                    var forecastIcon0 = forecastResponse.list[5].weather[0].icon;
                    var forecastIcon1 = forecastResponse.list[13].weather[0].icon;
                    var forecastIcon2 = forecastResponse.list[21].weather[0].icon;
                    var forecastIcon3 = forecastResponse.list[29].weather[0].icon;
                    var forecastIcon4 = forecastResponse.list[37].weather[0].icon;

                    var forecastTemp0 = forecastResponse.list[5].main.temp;
                    var forecastTemp1 = forecastResponse.list[13].main.temp;
                    var forecastTemp2 = forecastResponse.list[21].main.temp;
                    var forecastTemp3 = forecastResponse.list[29].main.temp;
                    var forecastTemp4 = forecastResponse.list[37].main.temp;

                    var forecastDate0 = (forecastResponse.list[5].dt_txt).split(" ")[0];
                    var forecastDate1 = (forecastResponse.list[13].dt_txt).split(" ")[0];
                    var forecastDate2 = (forecastResponse.list[21].dt_txt).split(" ")[0];
                    var forecastDate3 = (forecastResponse.list[29].dt_txt).split(" ")[0];
                    var forecastDate4 = (forecastResponse.list[37].dt_txt).split(" ")[0];

                    convertTemp(forecastTemp0, $("#tempForecast0"));
                    convertTemp(forecastTemp1, $("#tempForecast1"));
                    convertTemp(forecastTemp2, $("#tempForecast2"));
                    convertTemp(forecastTemp3, $("#tempForecast3"));
                    convertTemp(forecastTemp4, $("#tempForecast4"));
                    function convertTemp(variable, id) {
                        variable = (((variable - 273.15) * 1.8) + 32).toFixed(2)
                        id.text("Temp: " + variable + " °F")
                    }

                    convertDate(forecastDate0, $("#cityForecast0"));
                    convertDate(forecastDate1, $("#cityForecast1"));
                    convertDate(forecastDate2, $("#cityForecast2"));
                    convertDate(forecastDate3, $("#cityForecast3"));
                    convertDate(forecastDate4, $("#cityForecast4"));
                    function convertDate(dateVar, dateId) {
                        dateVar = dateVar.replace(/(....).(..).(..)/, "$2/$3/$1");
                        dateId.text(dateVar);
                    }

                    $("#imgForecast0").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon0 + ".png");
                    $("#imgForecast1").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon1 + ".png");
                    $("#imgForecast2").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon2 + ".png");
                    $("#imgForecast3").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon3 + ".png");
                    $("#imgForecast4").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon4 + ".png");

                    $("#humForecast0").text("Humidity: " + forecastResponse.list[5].main.humidity + "%");
                    $("#humForecast1").text("Humidity: " + forecastResponse.list[13].main.humidity + "%");
                    $("#humForecast2").text("Humidity: " + forecastResponse.list[21].main.humidity + "%");
                    $("#humForecast3").text("Humidity: " + forecastResponse.list[29].main.humidity + "%");
                    $("#humForecast4").text("Humidity: " + forecastResponse.list[37].main.humidity + "%");


                });
            });

            var dataIndex = searchInput;
            console.log(dataIndex);

            var newLi = $("<button>");
            newLi.addClass("list-group-item list");
            newLi.attr({style: "text-align: left", "data-value": dataIndex});
            newLi.text(searchInput);

            $("#unorderedList").append(newLi);


            $("#content").css("visibility", "visible")


            // $("#unorderedList button").on("click", function () {
            //     searchInput =  $(this).attr("data-value");
            //     console.log(searchInput);


            //     // searchInput = ($(this)[0].innerText);
            //     // console.log(searchInput);

            //     var apiKey = "a360aaabade6248b33523e2e88f37cff"
            //     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + apiKey;

            //     $.ajax({
            //         url: queryURL,
            //         method: "GET"
            //     }).then(function (response) {
            //         var cityTemp = response.main.temp;
            //         var windSpeed = response.wind.speed;
            //         var icon = response.weather[0].icon;
            //         var cityLat = response.coord.lat;
            //         var cityLon = response.coord.lon;
            //         var dateMili = new Date(response.dt * 1000);
            //         var month = dateMili.getMonth();
            //         var day = dateMili.getDate();
            //         var year = dateMili.getFullYear();

            //         cityTemp = (((cityTemp - 273.15) * 1.8) + 32).toFixed(2);
            //         windSpeed = (windSpeed * 2.237).toFixed(1);


            //         $("#cityName").text(response.name + " (" + month + "/" + day + "/" + year + ")");
            //         $("#imgMainCard").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
            //         $("#temp").text("Temperature: " + cityTemp + " °F");
            //         $("#humidity").text("Humidity: " + response.main.humidity + " %");
            //         $("#wind").text("Wind Speed: " + windSpeed + " MPH");

            //         var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLon;
            //         $.ajax({
            //             url: uvURL,
            //             method: "GET"
            //         }).then(function (result) {
            //             $("#uvIndexValue").text(" " + result.value);
            //         });

            //         var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + apiKey;
            //         $.ajax({
            //             url: forecastURL,
            //             method: "GET"
            //         }).then(function (forecastResponse) {
            //             var forecastIcon0 = forecastResponse.list[5].weather[0].icon;
            //             var forecastIcon1 = forecastResponse.list[13].weather[0].icon;
            //             var forecastIcon2 = forecastResponse.list[21].weather[0].icon;
            //             var forecastIcon3 = forecastResponse.list[29].weather[0].icon;
            //             var forecastIcon4 = forecastResponse.list[37].weather[0].icon;

            //             var forecastTemp0 = forecastResponse.list[5].main.temp;
            //             var forecastTemp1 = forecastResponse.list[13].main.temp;
            //             var forecastTemp2 = forecastResponse.list[21].main.temp;
            //             var forecastTemp3 = forecastResponse.list[29].main.temp;
            //             var forecastTemp4 = forecastResponse.list[37].main.temp;

            //             var forecastDate0 = (forecastResponse.list[5].dt_txt).split(" ")[0];
            //             var forecastDate1 = (forecastResponse.list[13].dt_txt).split(" ")[0];
            //             var forecastDate2 = (forecastResponse.list[21].dt_txt).split(" ")[0];
            //             var forecastDate3 = (forecastResponse.list[29].dt_txt).split(" ")[0];
            //             var forecastDate4 = (forecastResponse.list[37].dt_txt).split(" ")[0];

            //             convertTemp(forecastTemp0, $("#tempForecast0"));
            //             convertTemp(forecastTemp1, $("#tempForecast1"));
            //             convertTemp(forecastTemp2, $("#tempForecast2"));
            //             convertTemp(forecastTemp3, $("#tempForecast3"));
            //             convertTemp(forecastTemp4, $("#tempForecast4"));
            //             function convertTemp(variable, id) {
            //                 variable = (((variable - 273.15) * 1.8) + 32).toFixed(2)
            //                 id.text("Temp: " + variable + " °F")
            //             }

            //             convertDate(forecastDate0, $("#cityForecast0"));
            //             convertDate(forecastDate1, $("#cityForecast1"));
            //             convertDate(forecastDate2, $("#cityForecast2"));
            //             convertDate(forecastDate3, $("#cityForecast3"));
            //             convertDate(forecastDate4, $("#cityForecast4"));
            //             function convertDate(dateVar, dateId) {
            //                 dateVar = dateVar.replace(/(....).(..).(..)/, "$2/$3/$1");
            //                 dateId.text(dateVar);
            //             }

            //             $("#imgForecast0").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon0 + ".png");
            //             $("#imgForecast1").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon1 + ".png");
            //             $("#imgForecast2").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon2 + ".png");
            //             $("#imgForecast3").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon3 + ".png");
            //             $("#imgForecast4").attr("src", "http://openweathermap.org/img/wn/" + forecastIcon4 + ".png");

            //             $("#humForecast0").text("Humidity: " + forecastResponse.list[5].main.humidity + "%");
            //             $("#humForecast1").text("Humidity: " + forecastResponse.list[13].main.humidity + "%");
            //             $("#humForecast2").text("Humidity: " + forecastResponse.list[21].main.humidity + "%");
            //             $("#humForecast3").text("Humidity: " + forecastResponse.list[29].main.humidity + "%");
            //             $("#humForecast4").text("Humidity: " + forecastResponse.list[37].main.humidity + "%");

            //         });
            //         searchInput = "t";
            //     });

            // })

        }

    });

});