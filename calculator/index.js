const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calc_btn");
const clearBtn = document.querySelector(".clear");


function appendToDisplay(input) {
    display.value += input;
}


function clearDisplay() {
    display.value = "";
}


function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

buttons.forEach(btn => {
    btn.addEventListener(
        "click", () => {
            if (btn.value === "=") { calculate(); }
            else {
                appendToDisplay(btn.value);
            }
        }
    );
});


clearBtn.addEventListener("click", clearDisplay);


