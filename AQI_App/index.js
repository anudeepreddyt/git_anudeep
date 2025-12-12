const submit=document.getElementById("submit");
const cityName=document.getElementById("cityName");
const container2=document.getElementById("container2");
const apiKey="5fdda81fce4ba8469dad953ccd72d043";

function hideContainer(){
    container2.innerHTML="";
    container2.style.display="none";
}

function showContainer()
{
    container2.style.display="block";
}

function errorMsg(msg)
{
    container2.innerHTML=`<p class="error" >${msg}</p>`;
    showContainer();
}
async function getL(name) {
    const city=name;
    const url1= `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(name)}&limit=1&appid=${apiKey}`;
    const response1= await fetch(url1);

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
async function getData(lat,lon) {

    const url=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response=await fetch(url);
    if(!response.ok)
    {
        throw new Error("City not found!");
    }

    const data1= await response.json();
    return data1;
}

submit.onclick= async function() {
    const name=cityName.value.trim();
    if(!name)
    {
        errorMsg("City name can't be found!");
        return;
    }
    hideContainer();

    try{
    const {lat,lon, name:resolvedName}= await getL(name);
    const aqiData=await getData(lat,lon);
    console.log(aqiData,resolvedName);
    showResult(aqiData,resolvedName);
    }
    catch(error)
    {
        console.error(error);
        errorMsg(error.message||"something went wrong!");
    }
   
    
};
function showResult(aqiData,name)
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
        <p>PM2.5: ${comp.pm2_5??"N/S"}</p>
        <p>PM10: ${comp.pm10??"N/S"}</p>
        <p>NO₂: ${comp.no2??"N/S"}</p>
        <p>O₃: ${comp.o3??"N/S"}</p>
        
        </div>
    `;
    
 showContainer();

}

cityName.addEventListener("keydown",(e)=>{
    if(e.key==="Enter")
    {
        submit.click();
    }
});

hideContainer();




