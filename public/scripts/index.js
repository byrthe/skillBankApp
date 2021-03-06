// FRONT END FILE TO INTERACT WITH THE DOM
const createLabel = document.querySelector('.card-create-category');

//input form variables
const inputButton = document.querySelector('#inputButton');
const titleInput = document.querySelector('#titleInput');
const descInput = document.querySelector('#descInput');
const nameInput = document.querySelector('#nameInput');
const locationInput = document.querySelector('#locationInput');
const imageInput = document.querySelector('#imageInput');
const emailInput = document.querySelector('#emailInput');
const catFix = document.querySelector('#r1');
const catMusic = document.querySelector('#r2');
const catCare = document.querySelector('#r3');
const catCreativity = document.querySelector('#r4');
const catOrganisation = document.querySelector('#r5');
const catPlants = document.querySelector('#r6');
const catConstruction = document.querySelector('#r7');
const catLanguage = document.querySelector('#r8');
const catMisc = document.querySelector('#r9');
const radioInput = "?";
// variables of card to fill in
const requestBox = document.querySelector('#left');
const offerBox = document.querySelector('#right');
// const currentDate = ;
const catButtons = document.querySelectorAll('#categories ul li');
let img_url;

catButtons.forEach((catButton) => {
  catButton.addEventListener('click', (e) => {
    console.log(catButton.innerText);
    const allCards = document.querySelectorAll('.card-wrapper');
    allCards.forEach((card) => {
      if(catButton.innerText != card.dataset.category && catButton.dataset.flag == "include"){
        card.style.display = "none";
      }else{
        card.style.display = "flex";
      }
    });
  });
});


const sendOfferToServer = (offer) => {
    fetch('api/skillBank/addOffer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offer),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dcgjw1jo2', 
  uploadPreset: 'wp5wncyp', folder: 'widgetUpload'}, 
  (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        img_url = result.info.secure_url;
        console.log(img_url);
      };
    
    // console.log(error, result)
  });


const sendOfferToServerWPic = (offer) => {
  fetch('api/skillBank/addOfferWPic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(offer),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};


// input button events
inputButton.addEventListener('click', (e) => {
    console.log('clicked me');
    console.log(titleInput.value);
    console.log(descInput.value);
    console.log(nameInput.value);
    console.log(locationInput.value);
    console.log(emailInput.value);
    // category radio buttons
    const rbs = document.querySelectorAll('input[name="cat"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    };
    // offer or request radio buttons
    const rbs2 = document.querySelectorAll('input[name="cardType"]');
    let typeValue;
    for (const rb2 of rbs2) {
        if (rb2.checked) {
            typeValue = rb2.value;
            break;
        }
    };
            
    sendOfferToServer({inputTitle: titleInput.value, inputDesc: descInput.value, inputName: nameInput.value, inputEmail: emailInput.value, inputImage: img_url, inputLocation: locationInput.value, inputRadio: selectedValue, inputType: typeValue});
    console.log({inputType: selectedValue});

    location.reload();
});

const imageUpload = document.querySelector('#imageUpload');

imageUpload.addEventListener('click', (event) => {
  myWidget.open();
});

// imageUpload.addEventListener('click', () => {
//   function showUploadWidget() { 
//         cloudinary.openUploadWidget({cloudName: "dcgjw1jo2", uploadPreset: "signed",sources: ["local", "url", "camera", "image_search", "dropbox", "shutterstock"], googleApiKey: "<image_search_google_api_key>", showAdvancedOptions: true, cropping: true, multiple: false, defaultSource: "local", styles: {palette: {window: "#000000",sourceBg: "#000000", windowBorder: "#8E9FBF", tabIcon: "#FFFFFF", inactiveTabIcon: "#8E9FBF", menuIcons: "#2AD9FF", link: "#08C0FF", action: "#336BFF", inProgress: "#00BFFF", complete: "#33ff00", error: "#EA2727", textDark: "#000000", textLight: "#FFFFFF" }, fonts: {default: null, "'Space Mono', monospace": {url: "https://fonts.googleapis.com/css?family=Space+Mono", active: true}}
//         }}, (err, info) => {   if (!err) {console.log("Upload Widget event - ", info);   
//       }  
//     }); 
//   };
//   showUploadWidget();
// });


const fetchAllOffersFromDB = () => {
    fetch('/api/skillBank/allOffers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      data.input.forEach((input) => {
       // get random number between -5 and 5
        // const randomAngle = Math.ceil(Math.random() * 4) * (Math.round(Math.random()) ? 1 : -1);
        let showToggle = "imgHide";
        if(input.img != null){
          showToggle = "imgShow";
        };
        if(input.offer == 1){
        // insert cards from de DB
        offerBox.insertAdjacentHTML('beforeend', 
          // <div class="card-wrapper" data-category=${input.category} style="transform: rotate(${randomAngle}deg);">
            `<div class="card-wrapper" data-category=${input.category}>
                <div class="card-request">
                    <div class="title bold">${input.title}</div>
                    <div class="desc">${input.desc}</div>
                    <img class="${showToggle}" src="${input.img}">
                    <div class="info-wrapper">
                    <div class="name">added by:<br><span class="bold">${input.name}</span></div>
                    <div class="date">added on:<br><span class="bold">${input.date}</span></div>
                    <div class="location">location:<br><span class="bold">${input.location}</span></div>
                    </div>
                </div>
                <div class="card-request-category ${input.category} bold">${input.category}</div>
                </div><!--end card-wrapper-->
            </div>`
        );
        }else{
          requestBox.insertAdjacentHTML('beforeend', 
          // <div class="card-wrapper" data-category=${input.category} style="transform: rotate(${randomAngle}deg);">
            `<div class="card-wrapper" data-category=${input.category}>
                <div class="card-request">
                    <div class="title bold">${input.title}</div>
                    <div class="desc">${input.desc}</div>
                    <img class="${showToggle}" src="${input.img}">
                    <div class="info-wrapper">
                    <div class="name">added by:<br><span class="bold">${input.name}</span></div>
                    <div class="date">added on:<br><span class="bold">${input.date}</span></div>
                    <div class="location">location:<br><span class="bold">${input.location}</span></div>
                    </div>
                </div>
                <div class="card-request-category ${input.category} bold">${input.category}</div>
                </div><!--end card-wrapper-->
            </div>`
        );
        }
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  fetchAllOffersFromDB();



// labels change according to which radio button is selected
catFix.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "#c8aedb";
    createLabel.innerHTML = "fixing";
});
catMusic.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(26,88,251)";
    createLabel.innerHTML = "music";
});
catCare.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(97,122,215)";
    createLabel.innerHTML = "care";
});
catCreativity.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(212,175,0)";
    createLabel.innerHTML = "creativity";
});
catOrganisation.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(127,90,17)";
    createLabel.innerHTML = "organisation";
});
catPlants.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(11,233,5)";
    createLabel.innerHTML = "plants";
});
catConstruction.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(219,16,1)";
    createLabel.innerHTML = "construction";
});
catLanguage.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(107,190,244)";
    createLabel.innerHTML = "language";
});
catMisc.addEventListener('click', e = () =>{
    createLabel.style.backgroundColor = "rgb(162,63,185)";
    createLabel.innerHTML = "misc";
});


// 


// accordion function
function accordize (target, one) {
    // (A) GET TARGET CONTAINER
    target = document.getElementById(target);
    target.classList.add("awrap");
    
    // (B) ATTACH CLICK TO OPEN DRAWER
    if (typeof one != "boolean") { one = false; }
    let head = target.getElementsByClassName("ahead");
  
    // (B1) ONLY ONE DRAWER CAN OPEN AT A TIME
    if (one) {
      for (let h of head) {
        h.addEventListener("click", function(){
          for (let e of head) { 
            if (e != this) { e.classList.remove("open");  }
            else { this.classList.toggle("open"); }
          }
        });
      }
    } else {
      for (let h of head) {
        h.addEventListener("click", function(){
          this.classList.toggle("open");
        });
      }
    }
  }