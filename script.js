

var imageFileNames = [
  'audi', 'Apple','banana','cherry','grapes','honda','lexus','mercedes','orange','cloud','Scenery','trees'
];

function populateGallery(imageFileNames) {
  var galleryDiv = document.getElementById('gallery');
  galleryDiv.innerHTML="";


  imageFileNames.forEach(function(fileName) {
      
      var cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.style.width = '18rem';

      var imgElement = document.createElement('img');
      imgElement.className = 'card-img-top';
      imgElement.src = '/Resources/' + fileName + '.jpg'; 
      imgElement.alt = 'Card image cap';

      var cardBodyDiv = document.createElement('div');
      cardBodyDiv.className = 'card-body';

      var titleElement = document.createElement('h5');
      titleElement.className = 'card-title';
      titleElement.style.textAlign = 'center';
      titleElement.style.fontFamily = "'Courier New', Courier, monospace";
      titleElement.textContent = fileName; 

      cardBodyDiv.appendChild(titleElement);
      cardDiv.appendChild(imgElement);
      cardDiv.appendChild(cardBodyDiv);
      galleryDiv.appendChild(cardDiv);

      imgElement.addEventListener('click', function() {
        window.location.href = 'editor.html?image=' + encodeURIComponent(imgElement.src);
    });
  });
}


window.onload = function() {
  populateGallery(imageFileNames);
};

function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.classList.toggle("show");
  }

// document.getElementById("all").addEventListener("click", button1Clicked);
function button1Clicked() {
  sorted_list = imageFileNames.sort()
  populateGallery(sorted_list)
}

function button2Clicked() {
  sorted_list = imageFileNames.sort()
  populateGallery(sorted_list.reverse())
}