const body = document.body;
const imageContainer = document.querySelector(".imageContainer");
const imageLocation = imageContainer.querySelector(".location");
const imageDescription = imageContainer.querySelector(".description");
const photographer = imageContainer.querySelector(".photographer");
const IMAGE_API_KEY = "98d152191e0d4b61da62ce9ddac2a6ccbb29d9f37549db2b961a8dddc234ebd9";
const QUERY = "travel";

function getRandomImage() {
    fetch(`https://api.unsplash.com/photos/random?client_id=${IMAGE_API_KEY}&query=${QUERY}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json);
            paintImage(json);
        });
}

function paintImage(json) {
    //background image
    const image = new Image(); //make image tag
    image.src = json.urls.full;
    image.classList.add("backgroundImage");
    body.prepend(image);
    //image container
    imageLocation.innerHTML = json.location.title;
    imageDescription.innerHTML = json.alt_description;
    photographer.innerHTML = `Photo by ${json.user.name}`;
}

function init() {
    getRandomImage();
}

init();
