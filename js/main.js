let form = document.getElementById('searchForm');


form.addEventListener('submit', handleFormSubmit);


async function handleFormSubmit(event){
    event.preventDefault();
    // console.log(event);
    let locationName = event.target.locationName.value;
    console.log(locationName);

    let locationData = await getLocationData(locationName);
    console.log(locationData);

    buildWeatherCard(locationData)


    event.target.locationName.value = '';
};





async function getLocationData(locationName){
    try{
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationName}`)
        let data = await response.json();   
        return data;
    }catch(error){
        console.log(error);
    };

};


function buildWeatherCard(locationObj){

    let card = document.createElement('div');
    card.className = 'card ';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let weatherLocation = document.createElement('h5');
    weatherLocation.innerHTML = locationObj.location.name;
    weatherLocation.className = 'card-title';

    let weatherDescription = document.createElement('p');
    weatherDescription.innerHTML = locationObj.current.condition.text;
    weatherDescription.className = 'card-text';

    let currentTemp = document.createElement('h1');
    currentTemp.innerHTML = `${locationObj.current.temp_f}&#176;F`;
    currentTemp.className = 'large-font ml-auto mr-4';

    let time = new Date(locationObj.location.localtime);
    let formattedTime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    let formattedDate = time.toLocaleDateString([], {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'});

    let timeText = document.createElement('p');
    timeText.innerHTML = `${formattedTime} <span class="sm-font">${time.toLocaleTimeString([], {hour12: true}).split(' ')[1]}</span>`;
    timeText.className = 'time-font mb-0 ml-4 mt-auto';

    let weatherIcon = document.createElement('img');
    weatherIcon.src = `https:${locationObj.current.condition.icon}`;
    weatherIcon.alt = locationObj.current.condition.text;
    weatherIcon.className = 'card-img-top weather-icon';

    let dateText = document.createElement('p');
    dateText.innerHTML = formattedDate;
    dateText.className = 'ml-4 mb-4';

    let feelsLike = document.createElement('p');
    feelsLike.innerHTML = `Feels like: ${locationObj.current.feelslike_f}&#176;F`;
    feelsLike.className = 'large-font ml-auto mr-4';

    cardBody.append(weatherLocation);
    cardBody.append(weatherDescription);
    cardBody.append(currentTemp);
    cardBody.append(timeText);
    cardBody.append(dateText);
    cardBody.append(feelsLike);
    card.append(weatherIcon);

    card.append(cardBody);

    let col = document.createElement('div');
    col.className = 'col-md-8';

    col.append(card);

    let weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.append(col);

    // add the provided HTML code to the weatherDisplay div
    let container = document.createElement('div');
    container.className = 'container-fluid px-1 px-md-4 py-5 mx-auto';

    let row = document.createElement('div');
    row.className = 'row d-flex justify-content-center px-3';

    row.append(col);

    container.append(row);

    weatherDisplay.append(container);
};
