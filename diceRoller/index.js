const dicenum=document.getElementById("dicenum");
const submit=document.getElementById("submit");
const text1=document.getElementById("text1");
const diceimg=document.getElementById("diceimg");
const reset=document.getElementById("reset");


submit.onclick=function()
{
    let x=Number(dicenum.value);
    let rolls=[];
    let img=[];
    x=Number(x);
    for(let i=0;i<x;i++)
    {
        let y=Math.floor(Math.random()*6)+1;
        y=Number(y);
        rolls.push(y);
        img.push(`<img src="/images/${y}.png" alt="Dice:${y}">`);
    }
    text1.textContent=`After rolling the numbers are ${rolls.join(", ")}`;
    diceimg.innerHTML=img.join("");


}
reset.onclick = function () {
    dicenum.value = "";
    text1.textContent = "";
    diceimg.innerHTML = "";
};
