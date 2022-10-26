const lightColors = ['lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow',
    'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen',
    'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow'];

const mediumColors = ['blue', 'coral', 'cyan', 'goldenrodyellow',
    'gray', 'green', 'grey', 'pink', 'salmon', 'seagreen',
    'skyblue', 'slategray', 'steelblue', 'yellow'];

function randomColor(colors) {
    let colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
}

document.querySelector("body").style.backgroundColor = randomColor(lightColors);
document.querySelector("h1").style.color = randomColor(mediumColors);
document.querySelector("h2").style.color = randomColor(mediumColors);


// live updates to the meme element objects

// image inputs and objects
const imageOptionURLs = {
    "You Don't Say": 'https://i.guim.co.uk/img/media/dd3882c4ad0fd11a14cffc7e5edaabe5ce8a8b53/0_85_1077_646/master/1077.jpg?width=620&quality=85&dpr=1&s=none',
    "Facepalm": 'https://www1.pictures.zimbio.com/mp/Kt5PAdXsZKRx.jpg',
    "Grumpy Cat": 'https://media.cnn.com/api/v1/images/stellar/prod/190517103414-01-grumpy-cat-file-restricted.jpg?q=w_3000,h_2049,x_0,y_0,c_fill',
    "Success Kid": 'https://upload.wikimedia.org/wikipedia/en/f/ff/SuccessKid.jpg',
    "Scumbag Steve": 'https://i.kym-cdn.com/photos/images/newsfeed/000/093/953/c5b.jpg',
    "First World Problems": 'https://i.imgflip.com/1ss54d.jpg',
    "Strutting Leo": 'https://i.kym-cdn.com/photos/images/newsfeed/000/070/279/leostrutoriginal.jpg',
}
const imgURLInput = document.querySelector('input[name="picture-url"]');
const imgOptionsInput = document.querySelector('input[name="image-options-input"]');
const memeImage = document.querySelector('#working-meme .meme-image');
// memeText object needed up here so that max-width can be updated when image is updated
const memeText = document.querySelectorAll('.meme-text');

// memeImage.style.opacity = "0.9";

imgURLInput.addEventListener("input", () => {
    changeImage(imgURLInput.value)
})

imgOptionsInput.addEventListener("input", () => {
    changeImage(imageOptionURLs[imgOptionsInput.value]);
    imgOptionsInput.value = "";
})

function changeImage(image) {
    memeImage.setAttribute('src', image);
    memeImage.addEventListener('load', () => {
        for (let text of memeText) {
            text.style.maxWidth = memeImage.offsetWidth - 50 + "px";
        }    
    })
}


// top text inputs and objects
const topTextInput = document.querySelector('input[name="top-text"]');
const topTextSizeInput = document.querySelector('input[name="top-text-size"]');
const topText = document.querySelector('.top-text');

topTextInput.addEventListener("input", () => {
    topText.textContent = topTextInput.value.toUpperCase()
})

topTextSizeInput.addEventListener("input", () => {
    topText.style.fontSize = topTextSizeInput.value + "px";
})


// bottom text inputs and objects
const bottomTextInput = document.querySelector('input[name="bottom-text"]');
const bottomTextSizeInput = document.querySelector('input[name="bottom-text-size"]');
const bottomText = document.querySelector('.bottom-text');

bottomTextInput.addEventListener("input", () => {
    bottomText.textContent = bottomTextInput.value.toUpperCase();
})

bottomTextSizeInput.addEventListener("input", () => {
    bottomText.style.fontSize = bottomTextSizeInput.value + "px";
})


// shared text inputs and objects
const fontOptions = {
    "Anton": "'Anton', sans-serif",
    "Bungee": "'Bungee', cursive",
    "Creepster": "'Creepster', cursive",
    "Fredoka One": "'Fredoka One', cursive",
    "Permanent Marker": "'Permanent Marker', cursive",
}
const fontStyleInput = document.querySelector('input[name="font-selector-input"]')
const textColorInput = document.querySelector('input[name="text-color"]');
// const for memetext pulled to above image functions; needed to update max-width

fontStyleInput.addEventListener("input", () => {
    for (let text of memeText) {
        text.style.fontFamily = fontOptions[fontStyleInput.value];
    }
    fontStyleInput.value = "";
})

textColorInput.addEventListener("input", () => {
    topText.style.color = textColorInput.value;
    bottomText.style.color = textColorInput.value;
})


// button event to save the generated meme to the page
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", event => {
    event.preventDefault();
    generateMeme();
})

// button event to save the generated meme AND reset the form
const saveAndResetButton = document.querySelector('#save-reset-button');
saveAndResetButton.addEventListener("click", event => {
    event.preventDefault();
    generateMeme();
    resetMemeForm();
})

// button event to reset the input form
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", event => {
    event.preventDefault();
    resetMemeForm();
})


function generateMeme() {
    let newMeme = document.createElement("div");
    newMeme.setAttribute("class", "meme");
    let currentMeme = document.querySelector("#working-meme");
    newMeme.innerHTML = currentMeme.innerHTML;
    
    // creates the delete button, along with all of its properties and styling
    let newButton = document.createElement("button");
    newButton.setAttribute("class", "delete-button");
    newButton.textContent = "Delete";
    newButton.style.backgroundColor = randomColor(lightColors);
    newButton.addEventListener("click", event => {
        event.preventDefault();
        newButton.parentElement.remove();
    })
    newButton.addEventListener("pointerenter", event => {
        newButton.style.display = 'inline';
    })
    newMeme.append(newButton);

    // grabs the meme image, activates it to show/hide the delete button 
    // depending on cursor location
    let memeImage = newMeme.querySelector(".meme-image");
    memeImage.addEventListener("pointerenter", () => {
        newButton.style.display = 'inline';
    })
    memeImage.addEventListener("pointerleave", () => {
        newButton.style.display = 'none';
    })

    // adds new meme to the bottom section of the page
    document.querySelector("#generated-memes").prepend(newMeme);
}

function resetMemeForm() {
    // reset form inputs
    imgURLInput.value = '';
    topTextInput.value = '';
    bottomTextInput.value = '';
    textColorInput.value = '#FFFFFF';
    topTextSizeInput.value = '40';
    bottomTextSizeInput.value = '40';

    // reset working meme values
    memeImage.setAttribute('src', 'yds_defaultimage.jpg');
    topText.textContent = 'TOP TEXT';
    bottomText.textContent = 'BOTTOM TEXT'
    for (let text of memeText) {
        text.style.fontFamily = "'Anton', sans-serif"
        text.style.fontSize = "40px";
    }
    topText.style.color = 'white';
    bottomText.style.color = 'white';
}