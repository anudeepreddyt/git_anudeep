const btnGetAqi=document.getElementById("getAqi");
const btnGetWeather=document.getElementById("getWeather");
const cityName=document.getElementById("cityName");
const apiKey="5fdda81fce4ba8469dad953ccd72d043";
const container2 = document.getElementById("container2");
const container3 = document.getElementById("container3");


function hideContainer2(){
    container2.innerHTML="";
    container2.style.display="none";
}
function hideContainer3(){
    container3.innerHTML="";
    container3.style.display="none";
}

function showContainer2()
{
    container2.style.display="block";
}
function showContainer3()
{
    container3.style.display="block";
}

function errorMsgAqi(msg)
{
    container2.innerHTML=`<p class="error" >${msg}</p>`;
    showContainer2();
}
function errorMsgWeather(msg)
{
    container3.innerHTML=`<p class="error" >${msg}</p>`;
    showContainer3();
}

//AQI APP

async function getL(name) {
    const city=name;
    const urlAqi1= `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(name)}&limit=1&appid=${apiKey}`;
    const response1= await fetch(urlAqi1);

    if(!response1.ok)
    {
        throw new Error("City not found");
    }
    const geo= await response1.json();
    if(!geo||geo.length===0){throw new Error("city not found!")}
    const lat=geo[0].lat;
    const lon=geo[0].lon;

    return{lat,lon,name:geo[0].name};
    
}
async function getDataAqi(lat,lon) {

    const urlAqi=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response=await fetch(urlAqi);
    if(!response.ok)
    {
        throw new Error("City not found!");
    }

    const data1= await response.json();
    return data1;
}

btnGetAqi.onclick= async function() {
    hideContainer3();
    const name=cityName.value.trim();
    if(!name)
    {
        errorMsgAqi("City name can't be found!");
        return;
    }
    hideContainer2();

    try{
    const {lat,lon, name:resolvedName}= await getL(name);
    const aqiData=await getDataAqi(lat,lon);
    console.log(aqiData,resolvedName);
    showResultAqi(aqiData,resolvedName);
    }
    catch(error)
    {
        console.error(error);
        errorMsgAqi(error.message||"something went wrong!");
    }
   
    
};

function showResultAqi(aqiData,name)
{
    const aqi=aqiData.list[0].main.aqi;
    const comp=aqiData.list[0].components;
    let apiCategory;
    
    switch(aqi)
    {

        case 1:
            apiCategory="good";
            document.body.style.background="green";
            break;
        case 2:
            apiCategory="fair";
            document.body.style.background="#f1c40f";
            break;
        case 3:
            apiCategory="moderate";
            document.body.style.background="#e67e22";
            break;
        case 4:
            apiCategory="poor";
            document.body.style.background="#e74c3c";
            break;
        case 5:
            apiCategory="very poor";
            document.body.style.background="#8e44ad";
            break;
        default:
            apiCategory="unknown";
            break;
    }

    container2.innerHTML=`
        <p><strong>City:</strong>${name??"N/S"}</p>
        <p><strong>Status:</strong>${apiCategory??"N/S"}</p>
        <div>
        <p><strong>PM2.5:</strong> ${comp.pm2_5??"N/S"}</p>
        <p><strong>PM10:</strong> ${comp.pm10??"N/S"}</p>
        <p><strong>NO₂:</strong> ${comp.no2??"N/S"}</p>
        <p><strong>O₃: </strong>${comp.o3??"N/S"}</p>
        
        </div>
    `;
    
 showContainer2();

}

//weather app

function showResultWeather(data) {
  const city = data.name + (data.sys?.country ? `, ${data.sys.country}` : "");
  const temp = Number(data.main.temp).toFixed(1);
  const condition = data.weather[0].description;
  const humidity = data.main.humidity;

  container3.innerHTML = `
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Temp:</strong> ${temp} °C</p>
    <p><strong>Condition:</strong> ${condition}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
  `;
  showContainer3();
}

async function getWeather(name) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(name)}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);

 if (!res.ok) 
    { throw new Error("City Not Found!"); }
  return res.json();
  
}



btnGetWeather.onclick = async function () {
    hideContainer2();

  const name = cityName.value.trim();
  if (!name) {
    errorMsgWeather("City name cannot be empty");
    return;
  }

  hideContainer3();

  try {
    const data = await getWeather(name);

    if (data && data.main && data.weather) {
      showResultWeather(data);
    } else {
      errorMsgWeather("Unexpected response from API");
    }
  } catch (error) {
    console.error(error);
    errorMsgWeather("City not found — please try a valid city name");
  }
};


