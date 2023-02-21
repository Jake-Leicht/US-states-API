let toggle = document.getElementById("toggle");
let headerTxt = document.getElementById("header-txt");
let errorTxt = document.getElementById("error-txt");

toggle.addEventListener("click", () => {
    if(!toggle.checked){
        headerTxt.innerHTML = "Kilometers";
    } else{
        headerTxt.innerHTML = "Miles";
    }
});

let calcBtn = document.getElementById("calculate-btn");
let inputA = document.getElementById("input-a");
let inputB = document.getElementById("input-b");
let inputContainer = document.querySelectorAll(".input-container input");
var finalCoords = [];

let outputTxt = document.getElementById("output-txt");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3e3ec4e52emsh80cb5d80804e7efp1a4af8jsndb9bd959b791',
		'X-RapidAPI-Host': 'us-states.p.rapidapi.com'
	}
};

calcBtn.addEventListener("click", () => {
    let stateA = inputA.value.trim();
    let stateB = inputB.value.trim();

    getResponse(stateA, stateB);

    clearInputs();
    inputA.focus();
});

function clearInputs(){
    inputA.value = "";
    inputB.value = "";
}

function getResponse(stateA, stateB){
    let data = fetch('https://us-states.p.rapidapi.com/basic', options)
	.then((response) => {
        return response.json();
    }).then(data => {
        getCoords(data, stateA, stateB);
    })
    .catch(err => {
        errorTxt.innerHTML = "ERROR: Request limit reached/to many requests";
        finalCoords = [];
    });
}

function getCoords(data, stateA, stateB){
    data.forEach(elem => {
        if(String(elem.name).toLowerCase() === String(stateA).toLowerCase() || String(elem.name).toLowerCase() === String(stateB).toLowerCase()){
            finalCoords.push(elem.capital.latitude, elem.capital.longitude);
        }
    });
    if(finalCoords.length < 3){
        errorTxt.innerHTML = "ERROR: Invalid state input";
    } else{
        errorTxt.innerHTML = "";
    }
    let distance = haversineFormula(finalCoords[0], finalCoords[1], finalCoords[2], finalCoords[3]);

    if(toggle.checked){
        distance = kilometersToMiles(distance);
        distance = addCommas(distance.toFixed(2));
        outputTxt.innerHTML = `${distance} mi`;
    } else{
        distance = addCommas(distance.toFixed(2));
        outputTxt.innerHTML = `${distance} km`;
    }
    finalCoords = [];
}

function addCommas(num){
    return num.toLocaleString("en-US");
}

// ? Haversine Formula
let d = 0; //distance (between A and B)
const r = 6371;   //Earth radius (km)
const pi = Math.PI;
const cos = Math.cos;
const sin = Math.sin;
const pow = Math.pow;
const asin = Math.asin;
const sqrt = Math.sqrt;

let a_lat, a_long, b_lat, b_long;

function haversineFormula(a_lat, a_long, b_lat, b_long){
    let latdiff = (b_lat - a_lat) * pi / 180;
    let longdiff = (b_long - a_long) * pi / 180;

    let aLatRad = a_lat * pi / 180;
    let bLatRad = b_lat * pi / 180;

    let havsineLat = pow(sin(latdiff / 2), 2);
    let havesineLong = pow(sin(longdiff / 2), 2);

    let a = havsineLat + cos(aLatRad) * cos(bLatRad) * havesineLong;

    d = r * 2 * asin(sqrt(a));
    // *Returns answer in kilometers
    return d;
};

function kilometersToMiles(kilometers){
    return kilometers * 0.62137119;
}