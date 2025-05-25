const cardContainer = document.getElementById("cardContainer");

let selectElement = document.getElementById("select");
let filterData = "All";
select.addEventListener("change", function () {
  const selectedValue = this.value;
  filterData = selectedValue;
  fetchdata(filterData); 
  console.log("Selected value chaenged to:", selectedValue);
});

function renderdata(char) {
  char.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";
     let image;
    
     if(element.image){
      image = element.image
     }else{
      image = "image/not-found.png"
     }
        
    card.innerHTML = `
   <img src= ${image}>
   <div class="card-content">
  <p class="card-name"> Name: ${element.name} </p> 
  <p class="card-house"> house: ${element.house} </p> 
  <p class="card-Brith"> brith: ${element.dateOfBirth} </p> 
  </div>
          
   `;
    cardContainer.appendChild(card);
  });
}

function fetchdata(house) {
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => {
      if (!response.ok) {
        throw new error("fisrt error");
      }
      console.log("this is called");
      return response.json();
    })
    .then((characters) => {
      console.log("View the content of the api", characters);
      renderdata(characters);       
    
      let filtered = characters ;
      

      if (house !== "primary") {
        filtered = characters.filter((chr) => chr.house === filterData);
      

      filtered = filtered.slice(0, 16);}

      cardContainer.innerHTML = ""; 
      renderdata(filtered);
    });
}

fetchdata("primary");
