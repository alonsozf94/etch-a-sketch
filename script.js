function buildCanvas(size) {
    canvasContainer.innerHTML = null;
    canvasContainer.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`
    for (let i = 0; i < size*size; i++) {
        const div = document.createElement('div');
        div.style.backgroundColor = 'rgb(255, 255, 255)';
        div.style.filter = 'brightness(100%)';
        canvasContainer.appendChild(div)
    }

    let tiledCanvas = document.querySelectorAll('#canvas div');

    return tiledCanvas;
}

function paintTile(tile, color) {
    switch (color) {
        case "black":
            tile.style.backgroundColor = `rgb(0,0,0)`;
            break;
        case "rainbow":
            let r = Math.random() * 255;
            let g = Math.random() * 255;
            let b = Math.random() * 255;
            tile.style.backgroundColor = `rgb(${r},${g},${b})`;
            break;
        case "grayscale":
            let brightness = tile.style.filter.match(/([0-9])\w+/)[0];
            tile.style.filter = `brightness(${brightness - 10}%)`;
            console.log(brightness);
            break;
        default:
            break;
    }
}

let canvasContainer = document.querySelector('#canvas');
let slider = document.querySelector("#size-slider");
let resetButton = document.querySelector("#reset-button")
let myCanvas = buildCanvas(slider.value);
let option = "black"
let mouseDown = 0;

document.body.onmousedown = () => {
    mouseDown = 1;
    return false;
};
document.body.onmouseup = () => mouseDown = 0;
document.querySelector("#black").addEventListener("click", () => option = "black");
document.querySelector("#rainbow").addEventListener("click", () => option = "rainbow");
document.querySelector("#grayscale").addEventListener("click", () => option = "grayscale");

myCanvas.forEach(tile => {
    tile.addEventListener('mouseover', () => {
        if (mouseDown){
            paintTile(tile, option)
        }
        
    })
});

slider.addEventListener('change', () => location.reload());
resetButton.addEventListener('click', () => location.reload())