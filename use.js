const button = document.querySelector("button");

button.addEventListener("click", () =>{
    if(navigator.geolocation){//if browser support geolocation api
       button.innerText ="Allow to detect location";
       navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else{
        button.innerText = "Your browser not support";
    }
});
let apiKey = "32c793bc3aa5473189d738707611ee96";
function onSuccess(position){
    button.innerText ="Detecting your location...";
   let {latitude, longitude} =position.coords;
   fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
   .then(response => response.json()).then(result => {
    let allDetails = result.results[0].components;
    let{county, postcode, country} = allDetails;
    button.innerText = `${county} ${postcode}, ${country}`;
    console.table(allDetails);
   }).catch(() =>{
    button.innerText = "";
   })
};
function onError(error){
   if(error.code ==1){//if user denied the request
    button.innerText = "you denied the request";
   }
   else if(error.code == 2){//if  /loction not availble
    button.innerText = "location not availble";
   } else{//if any error occured
    button.innerText = "sometime went wrong";
   }
   button.setAttribute("disabled", "true"); //
}