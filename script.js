const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetail = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
    const APIKey = "929c9af84b7b6cdd425932d019e6fc42";
    const city = document.querySelector(".search-box input").value;

    if (city == "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
        .then((res) => res.json())
        .then((data) => {

            if(data.cod =='404'){
                container.style.height = "400px";
                weatherBox.classList.remove('active');
                weatherDetail.classList.remove('active');
                error404.classList.add('active')
                document.body.style = "background: url(./images/background_3.jpg);";
                return
            }
            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetail.classList.add('active')
            error404.classList.remove('active')

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(
                ".weather-box .temperature"
            );
            const description = document.querySelector(
                ".weather-box .description"
            );
            const humidity = document.querySelector(
                ".weather-details .humidity span"
            );
            const wind = document.querySelector(".weather-details .wind span");

            switch (data.weather[0].main) {
                case "Clear":
                    image.src = "./images/clear.png";
                    document.body.style = "background: url(./images/sunsky.jpg);";
                    break;
                case "Rain":
                    image.src = "./images/rain.png";
                    break;
                case "Snow":
                    image.src = "./images/snow.png";
                    break;
                case "Clouds":
                    image.src = "./images/cloud.png";
                    document.body.style = "background: url(./images/cloudSky.jpeg);"
                    break;
                case "Mist":
                    image.src = "./images/mist.png";
                    break;
                case "Haze":
                    image.src = "./images/mist.png";
                    break;

                default:
                    image.src = "./images/cloud.png";
            }

            console.log(data.main.temp);
            console.log(temperature)
            temperature.innerHTML = `${parseInt( data.main.temp )}<span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
        });
});
