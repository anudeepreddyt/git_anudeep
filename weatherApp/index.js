const cityName = document.getElementById("cityName");
const submit = document.getElementById("submit");
const container2 = document.getElementById("container2");
const apikey = "5fdda81fce4ba8469dad953ccd72d043";

function hideContainer() {
  container2.style.display = "none";
  container2.innerHTML = "";
}

function showContainer() {
  container2.style.display = "block";
}

function showError(msg) {
  container2.innerHTML = `<p class="error">${msg}</p>`;
  showContainer();
}

function showResult(data) {
  const city = data.name + (data.sys?.country ? `, ${data.sys.country}` : "");
  const temp = Number(data.main.temp).toFixed(1);
  const condition = data.weather[0].description;
  const humidity = data.main.humidity;

  container2.innerHTML = `
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Temp:</strong> ${temp} °C</p>
    <p><strong>Condition:</strong> ${condition}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
  `;
  showContainer();
}

async function getWeather(name) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(name)}&appid=${apikey}&units=metric`;
  const res = await fetch(url);

 if (!res.ok) 
    { throw new Error("City Not Found!"); }
  return res.json();
}

submit.onclick = async function () {
  const name = cityName.value.trim();
  if (!name) {
    showError("City name cannot be empty");
    return;
  }

  hideContainer();

  try {
    const data = await getWeather(name);

    if (data && data.main && data.weather) {
      showResult(data);
    } else {
      showError("Unexpected response from API");
    }
  } catch (error) {
    console.error(error);
    showError("City not found — please try a valid city name");
  }
};

cityName.addEventListener("keydown", (e) => { 
  if (e.key === "Enter")
    {submit.click(); } 
});

hideContainer();
