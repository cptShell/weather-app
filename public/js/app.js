const searchForm = document.querySelector('form');
const forecastTitle = document.querySelector('.forecast-title');
const forecastDescription = document.querySelector('.forecast-description');

const setForecastMessage = (title = '', description = '') => {
    forecastTitle.textContent = title;
    forecastDescription.textContent = description;
};

const search = (address) => {
    fetch(`/weather?address=${address}`).then((res) => {
        res.json().then((data) => {
            const {error, location, forecast} = data;
            
            if (error) {
                return setForecastMessage('Error', error);
            }

            setForecastMessage(location, forecast);
        });
    });
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);
    const address = formData.get('address');

    setForecastMessage('Wait please', '');
    search(address);
});