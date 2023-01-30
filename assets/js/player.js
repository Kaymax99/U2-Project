const greenLine = document.querySelector("#slider-round")
const greenLine2 = document.querySelector("#slider-round2")



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


// ***hover animations player***


greenLine.addEventListener("mouseover", circleOn)
greenLine.addEventListener("mouseout", circleOff)


// greenLine2.addEventListener("mouseover", circleOn2)
// greenLine2.addEventListener("mouseout", circleOff2)




function circleOn() {
    const circle = document.querySelector(".noUi-handle")
    const bgSlider = document.querySelector(".noUi-connect")

    // // if (circle.closest===) {
    // console.log(circle.closest)
    circle.style.display = "block"
    bgSlider.style.backgroundColor = "#1DB954";
    console.log("greenline hover mouse")

    // }
}

function circleOff() {
    const circle = document.querySelector(".noUi-handle")
    const bgSlider = document.querySelector(".noUi-connect")


    // if (parent.circle === greenLine) 
    circle.style.display = "none"
    bgSlider.style.backgroundColor = "white";
    console.log("greenline outmouse")
}


// function circleOn2() {
//     const circle2 = document.querySelector(".noUi-handle")
//     const bgSlider2 = document.querySelector(".noUi-connect")

//     // if (parent.circle === greenLine) 
//     circle2.style.display = "block"
//     bgSlider2.style.backgroundColor = "#1DB954";
//     console.log("greenline hover mouse")
// }

// function circleOff2() {
//     const circle2 = document.querySelector(".noUi-handle")
//     const bgSlider2 = document.querySelector(".noUi-connect")


//     // if (parent.circle === greenLine) 
//     circle2.style.display = "none"
//     bgSlider2.style.backgroundColor = "white";
//     console.log("greenline outmouse")
// }