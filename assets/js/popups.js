
const dropdownToggle = document.querySelector(".dropdown-toggle1 ");
const dropdownContent = document.querySelector(".dropdown-content1");
const dropdownContent2 = document.querySelector(".dropdown-content2")


dropdownToggle.addEventListener("click", function () {
    if (dropdownContent.style.display === "block" && !active) {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
});

document.addEventListener("click", function (event) {
    if (!dropdownToggle.contains(event.target) && dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    }
});

dropdownToggle.addEventListener("mouseover", function () {
    dropdownContent2.style.display = "block"
    document.addEventListener("mouseout", function () {
        dropdownContent2.style.display = "none"

    })
})
