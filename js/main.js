const clicks=()=>{
    let new_div=document.createElement("div");
    new_div.setAttribute("class","ufo");

    let head=document.createElement("div");
    head.setAttribute("class","head");
    new_div.appendChild(head);

    let new_input=document.createElement("input");
    new_input.setAttribute("class","base_cloud");
    new_input.setAttribute("placeholder","enter city name");
    new_input.setAttribute("type","text");
    new_input.setAttribute("id","city");
    new_div.appendChild(new_input);

    let new_div_x=document.createElement("div");
    new_div_x.setAttribute("class","x");
    new_div.appendChild(new_div_x);

    document.getElementById("cities").appendChild(new_div);

}

const searchButton=()=>{
    let cityname=[];
    document.querySelectorAll('[id=city]').forEach(element=> {
        if (element.value.length===0){
            alert("Please Enter Value");
        }
        cityname.push(element.value);
    });
    
    if(cityname.length!=0){
        document.getElementById("show-ufo").style.display="block";
        document.getElementById("show-ufo--animation").style.display="block";
        fetch('https://xvi.onrender.com/getWeather', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"cities":cityname})
        }).then(res => res.json())
        .then(res =>{
            document.getElementById("show-ufo").style.display="none";
            document.getElementById("show-ufo--animation").style.display="none";
            if(res.weather===undefined){
                alert("Check spellings")
            }else{
                
                createInfoCards(res.weather);
            }

        });   

        }
     
}

const refreshButton=()=>{
    location.reload(); 
}


const setIcons=(desc)=>{

    if (desc == "haze") {
        return  "fas fa-cloud-sun fa-5x"

    }
    if (desc == "smoke") {

        return  "fas fa-smog fa-5x"
    }
    if (desc == "clear sky") {

        return  "fas fa-sun fa-5x"
    }
    if (desc == "overcast clouds") {
        return  "fas fa-cloud fa-5x"

    }
    if (desc == "broken clouds") {
        return  "fas fa-cloud-sun fa-5x"
    }
    if (desc == "few clouds") {
        return  "fas fa-cloud fa-5x"
    }
    if (desc == "light rain" | desc == "moderate rain" | desc == "heavy intensity rain" |
        desc == "very heavy rain" | desc == "extreme rain") {
        return  "fas fa-cloud-rain fa-5x"
    }

    if (desc == "fog") {
        return  "fas fa-smog fa-5x"
    }
    if (desc == "scattered clouds") {
        return  "fas fa-cloud fa-5x"
    }
    if (desc == "thunderstorm" | desc == "thunderstorm") {
        //<i class="fas fa-poo-storm"></i>
        return  "fas fa-poo-storm fa-5x"
    }
    if (desc == "mist" | desc == "sand/ dust whirls" | desc == "dust" |
        desc == "sand" | desc == "volcanic ash" | desc == "squalls" |
        desc == "tornado") {
        return  "fas fa-wind fa-5x"
    }
    if (desc == "light snow" | desc == "Snow" | desc == "Heavy snow" | desc == "Sleet" |
        desc == "Light shower sleet" | desc == "Shower sleet" | desc == "Light rain and snow" |
        desc == "Rain and snow" | desc == "Light shower snow" | desc == "Shower snow" |
        desc == "Heavy shower snow" | desc == "freezing rain") {

        return  "fas fa-snowflake fa-5x"

    }

}

const createInfoCards=async(weather,delay=1300)=>{

    let weather_lengeth=weather.length;
    for(let x=0;x<weather_lengeth;x++){

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delay)
        );


        let info_div=document.createElement("div");
        info_div.setAttribute("class","info-card");

        let city_name=document.createElement("div");
        city_name.setAttribute("class","city-name");
        let city_h5_name=document.createElement("h5");
        city_h5_name.innerHTML=weather[x].name;
        city_name.appendChild(city_h5_name)
        info_div.appendChild(city_name);

        let deg=document.createElement("h2");
        deg.setAttribute("class","deg");

        let x_deg=weather[x].deg.split("C")
        deg.innerHTML=x_deg[0];
        let sup=document.createElement("sup");
        sup.innerHTML=" o"
        deg.appendChild(sup);
        let span=document.createElement("span");
        span.innerHTML="C"
        deg.appendChild(span);
        info_div.appendChild(deg);


        let icon=document.createElement("div");
        icon.setAttribute("class","icon");
        let icons = document.createElement("i");
        icons.setAttribute("class", setIcons(weather[x].desc))
        icon.appendChild(icons);
        info_div.appendChild(icon);

        let desc=document.createElement("div");
        desc.setAttribute("class","desc");
        let h4_desc=document.createElement("h4");
        h4_desc.innerHTML=weather[x].desc;
        desc.appendChild(h4_desc);

        info_div.appendChild(desc);

        document.getElementById("infos").appendChild(info_div);

    }
}