const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keys_checkbox = document.querySelector(".keys-checkbox input");

let audio = new Audio("./assets/tunes/a.wav"); // by default , audio src is "a" tune

// Play tune
const playtune = (key) => {
  audio.src = `./assets/tunes/${key}.wav`;
  audio.play();
};

// Turn on tune with key
pianoKeys.forEach((key) => {
  // calling playtune function with passing data-key value as an argument
  key.addEventListener("click", () => playtune(key.dataset.key));
});

// Pressed key
const pressedKey = (e) => {
  // If the pressed key is in the allKeys array , only call the playtune function
  playtune(e.key);
};

const handleVolume = (e) => {
  audio.volume = e.target.value; // passing the range slider value as an audio volume
};

//toggling hide class from each key on the checkbox click
const hideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

document.addEventListener("keydown", pressedKey);
volumeSlider.addEventListener("input", handleVolume);
keys_checkbox.addEventListener("click", hideKeys);
