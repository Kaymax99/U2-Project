let slider = document.getElementById('slider-round');
noUiSlider.create(slider, {
    start: 20,
    connect: 'lower',
    range: {
        'min': 0,
        'max': 100
    }


});