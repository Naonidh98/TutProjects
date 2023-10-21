

const userWheather = document.querySelector("[data-userWheather]");
const searchWheather = document.querySelector("[data-searchWheather]");

const tabs = document.querySelectorAll(".tab");

const wheatherContainer = document.querySelector(".grant-location-wheather");
const fromContainer = document.querySelector("[data-searchForm]");
const loadingWindow = document.querySelector(".loading-container");
const userinfoWheather = document.querySelector(".user-info-wheather");

const searchTab = document.querySelector("[data-searchInput]");
const acessbtn = document.querySelector("[data-grantBtn]");

let currWindow = userWheather;
currWindow.classList.add("select-tab");

switchTab(currWindow);

const API_KEY = "a900867b3a2d5c2c10b7663bed0f5a33";

/**********************************************/

function switchTab(selecttab) {
  if (currWindow != selecttab) {
    currWindow.classList.remove("select-tab");
    currWindow = selecttab;
    currWindow.classList.add("select-tab");

    if (!fromContainer.classList.contains("active")) {
      loadingWindow.classList.remove("active");
      userinfoWheather.classList.remove("active");
      wheatherContainer.classList.remove("active");
      fromContainer.classList.add("active");
    } else {
      fromContainer.classList.remove("active");
      userinfoWheather.classList.remove("active");
      //wheatherContainer.classList.add("active");
      getlatlon();
    }
  }
}

function getlatlon(){
  const currCoordinates = sessionStorage.getItem("coordiantes");

  if(!currCoordinates){
    wheatherContainer.classList.add("active");
  }
  else{
    wheatherContainer.classList.remove("active");
    const mycoords = JSON.parse(currCoordinates);
    fetchdatafromlatlon(mycoords);
  }
}

async function fetchdatafromlatlon(coordinates) {
  const {
      lat,
      lon
  } = coordinates;

  loadingWindow.classList.add("active");

  try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      loadingWindow.classList.remove("active");
      userinfoWheather.classList.add("active");
      renderinfo(data);
  } catch (e) {
      loadingWindow.classList.remove("active");
      //hW
  }
}

function renderinfo(data) {
  const cityName = document.querySelector("[data-cityName]");
  const flag = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-wheatherDesc]");
  const wheatherIcon = document.querySelector("[data-wheatherIcon]");
  const wheatherTemp = document.querySelector("[data-temp]");
  const windSpeed = document.querySelector("[data-windSpeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloud = document.querySelector("[data-cloud]");

  cityName.innerText = data?.name;
  let c = data?.sys?.country.toUpperCase();
  flag.src = `https://flagsapi.com/${c}/shiny/64.png`;
  //desc.innerText = data?.weather?.[0]?.description;
  desc.innerText = data?.weather?.[0]?.description;
  wheatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
  wheatherTemp.innerText = data?.main.temp;
  windSpeed.innerText = data?.wind?.speed;
  humidity.innerText = data?.main?.humidity;
  cloud.innerText = data?.clouds?.all;
}



async function fetchWheatherFromCity(city){
  loadingWindow.classList.add("active");

  try{
    const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data =await response.json();
    loadingWindow.classList.remove("active");
    userinfoWheather.classList.add("active");
    renderinfo(data);
  }
  catch(e){
    alert("given state doesn't exsits");
  }

}

function getgeolocation() {
 /* if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {}*/

}

function showPosition(position) {
  const usercoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
  };

  sessionStorage.setItem("usercoordinates", JSON.stringify(usercoordinates));
  fetchdatafromlatlon(usercoordinates);
}

 

function submitCity(input) {
  if(input.value == "") return;
  else{
    fetchWheatherFromCity(input.value);
  }
}

/** ******************************/

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchTab(tab);
  });
});

fromContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  submitCity(searchTab);
});


acessbtn.addEventListener("click",()=>{
  getgeolocation();
})