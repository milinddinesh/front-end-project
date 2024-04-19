let image;
window.onload = function() {
    // Get the URL parameter 'image'
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const imageUrl = urlParams.get('image');

    // Check if imageUrl is not null or undefined
    if (imageUrl) {
        // Create an image element
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Image';

        // Append the image to the container
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.appendChild(imgElement);
    } else {
        // Handle case where imageUrl is not provided
        console.error('Image URL not provided in query parameter.');
    }

    findDominantColor(imageUrl)
}


function findDominantColor(img_src){
const imageContainer = document.getElementById('imageContainer');
image = new Image();
image.src = img_src ; // replace with your image URL
image.onload = function() {
  // Get the image data
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Analyze the image pixels
  let redCount = 0;
  let greenCount = 0;
  let blueCount = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];
    if (red > green && red > blue) {
      redCount++;
    } else if (green > red && green > blue) {
      greenCount++;
    } else if (blue > red && blue > green) {
      blueCount++;
    }
  }

  // Determine the dominant color
  const totalPixels = pixels.length / 4;
  const redPercentage = (redCount / totalPixels) * 100;
  const greenPercentage = (greenCount / totalPixels) * 100;
  const bluePercentage = (blueCount / totalPixels) * 100;

  let dominantColor;
  if (redPercentage > 50) {
    dominantColor = 'Reddish';
  } else if (greenPercentage > 50) {
    dominantColor = 'Greenish';
  } else if (bluePercentage > 50) {
    dominantColor = 'Blueish';
  } else {
    dominantColor = 'Unknown';
  }

  // Update the color indicator
  const colorIndicator = document.getElementById('colorIndicator');
  colorIndicator.textContent = dominantColor;
};
}

const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const brightnessSlider = document.getElementById('brightness')
const imageContainer = document.getElementById('imageContainer');

// Add event listeners to the sliders
redSlider.addEventListener('input', updateImageColors);
greenSlider.addEventListener('input', updateImageColors);
blueSlider.addEventListener('input', updateImageColors);
// brightnessSlider.addEventListener('input,up')

function updateImageColors() {
  // Get the current values of the sliders
  const redValue = parseInt(redSlider.value);
  const greenValue = parseInt(greenSlider.value);
  const blueValue = parseInt(blueSlider.value);

  // Update the image with new pixel values
  const canvas = document.createElement('canvas');

// Calculate the scale factor to fit the image within the container
const containerWidth = imageContainer.offsetWidth;
const containerHeight = imageContainer.offsetHeight;
const widthScaleFactor = containerWidth / image.width;
const heightScaleFactor = containerHeight / image.height;
const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

// Calculate the scaled width and height
const scaledWidth = image.width * scaleFactor;
const scaledHeight = image.height * scaleFactor;

// Center the image within the canvas
const offsetX = (containerWidth - scaledWidth) / 2;
const offsetY = (containerHeight - scaledHeight) / 2;

canvas.width = containerWidth;
canvas.height = containerHeight;

// Draw the image on the canvas with the scaled size and centered position
const ctx = canvas.getContext('2d');
ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

  // canvas.width = image.width;
  // canvas.height = image.height;
  // const ctx = canvas.getContext('2d');
  // ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Loop through each pixel and adjust the RGB values
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = Math.min(255, pixels[i] + redValue); // Red
    pixels[i + 1] = Math.min(255, pixels[i + 1] + greenValue); // Green
    pixels[i + 2] = Math.min(255, pixels[i + 2] + blueValue); // Blue
  }

  // Put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Update the image container with the modified image
  imageContainer.innerHTML = '';
  imageContainer.appendChild(canvas);
}

brightnessSlider.addEventListener('input', () => {
  const red = redSlider.value;
  const green = greenSlider.value;
  const blue = blueSlider.value;
  imageContainer.style.filter = `brightness(${red / 255}) saturate(${green / 255}) hue-rotate(${blue / 255}deg)`;
});