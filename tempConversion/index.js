const text1 = document.getElementById("text1");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const text2 = document.getElementById("text2");


let x, y, res;
function celtofar(x) {
    y = (x * 9 / 5) + 32;
    return y;
}

function fartocel(x) {
    y = (x - 32) * 5 / 9;
    return y;
}


submit.onclick = function () {


    if (x == "") {
        text2.textContent = (`please enter value`);
    }

    else if (isNaN(x)) {
        text2.textContent = (`Invaild input!`);
    }
    x = Number(text1.value);
    let selectedOption = document.querySelector('input[name="temp"]:checked').value;
    if (selectedOption === "CtoF") {

        res = celtofar(x);

        text2.textContent = (`The fahrenheit for enter cel ${x} °C  is ${res} °F`);
    }
    else{
        res=fartocel(x);
        text2.textContent = (`The cel for enter fahrenheit ${x} °F is ${res}°C `);

    }
    

}

reset.onclick = function () {
    text2.textContent = (``);
    text1.value = "";
}