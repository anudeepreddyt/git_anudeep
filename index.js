const clock=document.getElementById("clock");

function updateClock(){
    const now= new Date();
    let hour=now.getHours().toString().padStart(2,0);
    const merdian=hour>=12? "PM":"AM";
    hour=hour%12||12;
    const min=now.getMinutes().toString().padStart(2,0);
    const sec=now.getSeconds().toString().padStart(2,0);
    const time= `${hour}:${min}:${sec}${merdian}`;
    clock.textContent=time;
}

setInterval(updateClock,1000);

/* if we want 24 hrs clock just remove 6,7 lines and make change in time by removing merdian object */