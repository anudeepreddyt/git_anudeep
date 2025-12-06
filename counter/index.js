let count=0;
 myCount=document.getElementById("myCount");
document.getElementById("myIncrease").onclick=function(){
    count++;
    myCount.textContent=count;
}

document.getElementById("myReset").onclick=function(){
    count=0;
    myCount.textContent=count;
}

document.getElementById("myDecrease").onclick=function(){
    if(count<=0)
    {
        count=0;
    }
    else{
        count--;
    }
    myCount.textContent=count;
}
