// import albums from "./homePage.js"

// console.log(albums)
let slider = document.getElementById('slider-round');
noUiSlider.create(slider, {
    start: 20,
    connect: 'lower',
    range: {
        'min': 0,
        'max': 100
    }


});
let slider2 = document.getElementById('slider-round2');
noUiSlider.create(slider2, {
    start: 20,
    connect: 'lower',
    range: {
        'min': 0,
        'max': 100
    }
});
const greenLine1 = document.querySelector("#slider-round");
const greenLine2 = document.querySelector("#slider-round2");
const circle1 = document.querySelector("#slider-round .noUi-handle");
const circle2 = document.querySelector("#slider-round2 .noUi-handle");

const isDragging = {
    slider1: false,
    slider2: false,
};

const handleSliderEvent = (slider, circle, id) => {
    slider.addEventListener("mouseover", function () {
        const bgSlider = slider.querySelector(".noUi-connect");
        circle.style.display = "block";
        bgSlider.style.backgroundColor = "#1DB954";
    });

    slider.addEventListener("mouseout", function () {
        const bgSlider = slider.querySelector(".noUi-connect");
        if (isDragging[id]) {
            circle.style.display = "block";
            bgSlider.style.backgroundColor = "#1DB954";
        } else {
            circle.style.display = "none";
            bgSlider.style.backgroundColor = "white";
        }
    });

    circle.addEventListener("mousedown", function () {
        const bgSlider = slider.querySelector(".noUi-connect");
        isDragging[id] = true;
        circle.style.display = "block";
        bgSlider.style.backgroundColor = "#1DB954";
    });
};

document.addEventListener("mouseup", function () {
    isDragging.slider1 = false;
    isDragging.slider2 = false;

    const bgSlider1 = greenLine1.querySelector(".noUi-connect");
    const bgSlider2 = greenLine2.querySelector(".noUi-connect");
    const circle1 = greenLine1.querySelector(".noUi-handle");
    const circle2 = greenLine2.querySelector(".noUi-handle");

    bgSlider1.style.background = "white";
    bgSlider2.style.background = "white";

    circle1.style.display = "none";
    circle2.style.display = "none";
});

handleSliderEvent(greenLine1, circle1, "slider1");
handleSliderEvent(greenLine2, circle2, "slider2");

// greenLine.addEventListener("mouseout", circleOff)// SSHHHTI.V1;

// greenLine2.addEventListener("mouseover", circleOn2)
// greenLine2.addEventListener("mouseout", circleOff2)



// function circleOff() {
//     const circle = document.querySelector("#slider-round  .noUi-handle")
//     const bgSlider = document.querySelector("#slider-round .noUi-connect")

//     circle.style.display = "none"
//     bgSlider.style.backgroundColor = "white";
//     console.log("greenline outmouse")
// }


// function circleOn2() {
//     const circle = document.querySelector("#slider-round2 .noUi-handle")
//     const bgSlider = document.querySelector(" #slider-round2 .noUi-connect")
//     // // if (circle.closest===) {

//     circle.style.display = "block"
//     bgSlider.style.backgroundColor = "#1DB954";
//     console.log("greenline hover mouse")
//     // }
// }

// function circleOff2() {
//     const circle = document.querySelector("#slider-round2  .noUi-handle")
//     const bgSlider = document.querySelector("#slider-round2 .noUi-connect")

//     circle.style.display = "none"
//     bgSlider.style.backgroundColor = "white";
//     console.log("greenline outmouse")
// }



