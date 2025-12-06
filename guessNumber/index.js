const submit=document.getElementById("mySubmit");
const textip1=document.getElementById("textip1");
const textip2=document.getElementById("textip2");
const text3=document.getElementById("text3");
const mynum=document.getElementById("mynum");

let x,y,z;

submit.onclick=function(){
    x=Number(textip1.value);
    y=Number(textip2.value);
    z=Number(mynum.value);


let randomNumber=Math.floor(Math.random()*(y-x))+x;

if(randomNumber==z)
{
    text3.textContent=`YOU HAVE GUESSED CRT`;
    return;
}
if(randomNumber<z)
{
    text3.textContent=`Enter lesser number`;
    return;
}
if(randomNumber>z)
{
    text3.textContent=`Enter greater number`;
    return;
}
};

document.getElementById("myReset").onclick=function(){
    textip1.value=``;
    textip2.value=``;
    text3.textContent=``;
    mynum.value=``;
};
