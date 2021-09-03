




//HIV
//Electricity?
//Refugee? Internally Displaced?
//Agricultural Worker? (Use our world in data)


//Country
//Age -> Gender
//    -> Literacy
//Ethnic Group
//Religion
//Rural vs Urban -> Major Urban area?

var countries = data.countries;
var population = 0;
var count = 0;

var country = "afghanistan"
//console.log(countries['afghanistan']['data'].people.population['total'])
var ageArray = ["0_to_14", "15_to_24", "25_to_54", "55_to_64", "65_and_over"]

//modifies global population data
function findCountry(per){
    population = 0;
    count = 0;
    for (country in countries){
        //console.log(country)
        if(count>0){
            try{
                if(country=='european_union'){
                    
                    //console.log(countries[country]['data'].people.population['total'])
                } else{
                    population = population + countries[country]['data'].people.population['total'];
                    if(population>per){
                        //console.log("You live in " + country)
                        return country;
                    }
                }
            } catch{
                console.log(countries[country]['data'])
            }
        }
        count++;
    }
}

function findAgeBracket(per, country){
    var age = ageArray[4];
    var whatage = Math.random()*1;
    var runningp = countries[country]['data'].people.age_structure[ageArray[0]]["percent"];
    //console.log(per)
    //console.log(runningp)
    if(per<runningp){
        return 0;
    }
    runningp = runningp + countries[country]['data'].people.age_structure[ageArray[1]]["percent"];
    if(per<runningp){
        return 1;
    }
    runningp = runningp + countries[country]['data'].people.age_structure[ageArray[2]]["percent"];
    if(per<runningp){
        return 2;
    }
    runningp = runningp + countries[country]['data'].people.age_structure[ageArray[3]]["percent"];
    if(per<runningp){
        return 3;
    }
    else {
        age = ageArray[4];
        return 4;
    }
}

function getAge(bracket){
    var whatage = Math.random()*1;
    switch(bracket){
        case(0):
            return whatage*14;
            break;
        case(1):
            return whatage*9+15;
            break;
        case(2):
            return whatage*29+25;
            break;
        case(3):
            return whatage*9+55;
            break;
        case(4):
            return 65;
            break;
        
    }
}

function getSex(bracket){
    var whatsex = Math.random()*1;
    //console.log("get sex")
    //console.log(ageArray[bracket])
    //console.log(countries[country]['data'].people.sex_ratio["by_age"])
    //console.log(countries[country]['data'].people.sex_ratio["by_age"][ageArray[bracket]])
    var rat = "";
    if(bracket==4){
        rat = countries[country]['data'].people.sex_ratio["by_age"]["65_years_and_over"]["value"];
        
    }
    else{
        rat = countries[country]['data'].people.sex_ratio["by_age"][ageArray[bracket]+"_years"]["value"];
    }
        var ratper = 1/(1/rat+1)
    if(whatsex<ratper){
        return "male"
    } else{
        return "female"
    }
    
}

function getLiterate(perc, sex, age){
    if(age>15){
        //console.log("undefined?")
        //console.log(countries[country]['data'].people);
        try{
            rate = countries[country]['data'].people.literacy[sex]["value"];
            if(perc<rate){
                return "literate";
            } else{
                return "illiterate";
            }
        } 
        catch(exception_var){
            return "literate";
        }
    }
    else{
        return ""
    }
}

function getEthnicity(perc){
    var ethlist = countries[country]['data'].people.ethnic_groups["ethnicity"];
    for(var i = 0; i < ethlist.length; i++){
        if (perc < ethlist[i]["percent"]){
            return ethlist[i]["name"];
        }
        else{
            perc = perc - ethlist[i]["percent"];
        }
    }
}

function getReligion(perc){
    var rlist = countries[country]['data'].people.religions["religion"];
    for(var i = 0; i < rlist.length; i++){
        if (perc < rlist[i]["percent"]){
            return rlist[i]["name"];
        }
        else{
            perc = perc - rlist[i]["percent"];
        }
    }
}

function getUrban(perc){
    var urbanp = countries[country]['data'].people.urbanization.urban_population["value"];
    if(perc<urbanp){
        return true;
    }
    else{
        return false;
    }
}

function getUrbanArea(countryperson){
    var urblist = countries[country]['data'].people.major_urban_areas["places"]
    for(var i = 0; i < urblist.length; i++){
        //console.log("area");
        //console.log(urblist[i]["place"])
        //console.log(urblist[i]["population"]);
        //console.log(countryperson)
        if (countryperson < urblist[i]["population"]){
            return urblist[i]["place"];
        }
        else{
            countryperson = countryperson - urblist[i]["population"];
        }
        
    }
    //if it fails to find one
    return "a non-major urban area"
}

function getDrinkingWaterSource(urban, perc){
    var urb = "rural";
    if(urban){
        urb = "urban"
    }
    //console.log("drink")
    //console.log(countries[country]['data'].people);
    var drinkp;
    //console.log(Object.keys(countries[country]['data'].people.drinking_water_source["improved"]));
    if(Object.keys(countries[country]['data'].people.drinking_water_source["improved"])[0]=="urban"){
        //console.log("urban success");
        drinkp = countries[country]['data'].people.drinking_water_source["improved"][urb]["value"];
    }
    else{
        drinkp = countries[country]['data'].people.drinking_water_source["improved"]["total"]["value"];
    }
    
    //console.log(perc)
    //console.log(drinkp)
    if(perc<drinkp){
        return "improved";
    }
    else{
        return "unimproved";
    }
}

function getSanitationFacility(urban, perc){
    var urb = "rural";
    if(urban){
        urb = "urban"
    }
    drinkp = countries[country]['data'].people.sanitation_facility_access["improved"][urb]["value"];
    if(perc<drinkp){
        return "improved";
    }
    else{
        return "unimproved";
    }
}

function getEmployment(urban, perc){
    //Use most recent rate
    //console.log("employment");
    //console.log(countries[country]['data'].economy);
    //console.log(countries[country]['data'].economy.unemployment_rate.annual_values[0]);
    try{
        unp = countries[country]['data'].economy.unemployment_rate.annual_values[0]["value"];
        if(perc<unp){
            return "unemployed";
        }
    }
    catch(error){
        console.log(error)
    }
    
    if(!urban){
        //console.log("rural job");
        var ruralp = 100-countries[country]['data'].people.urbanization.urban_population["value"];
        //console.log(countries[country]['data'].economy.labor_force["by_occupation"]);
        var farmp = countries[country]['data'].economy.labor_force["by_occupation"].occupation["agriculture"]["value"];
        if(perc*ruralp/100.0<farmp){
            return "an agricultural worker";
        }
    }
    else{
        return "employed";
    }
}

function getElectric(urban, perc){
    var ur = "rural_electrification"
    if(urban){
        ur = "urban_electrification"
    }
    //console.log("electric")
    //console.log(countries[country]['data'].energy);
    if(electricp = JSON.stringify(countries[country]['data'].energy.electricity.access).includes(ur)){
        electricp = countries[country]['data'].energy.electricity.access[ur]["value"]
        //console.log("proper value");
    }
    else{
        electricp = countries[country]['data'].energy.electricity.access["total_electrification"]["value"];
        //console.log("improper value");
    }
    if(perc<electricp){
        return "access to electricity";
    }
    else{
        return "no access to electricity";
    }
}

function countCountry(){
    var pop = 0;
    for (country in countries){
        //console.log(country)
        if(count>0){
            try{
                if(country=='european_union'){
                    //console.log(countries[country]['data'].people.population['total'])
                } else{
                    pop = pop + countries[country]['data'].people.population['total'];
                }
            } catch{
                console.log(countries[country]['data'])
            }
        }
        count++;
    }
    return pop;
}

function capitalizeWord(word){
    var rword = word;
    //console.log("ecuador");
    if(rword===undefined){
        //console.log("hi");
        rword = "undefined";
    }
    rword = rword[0].toUpperCase()+rword.substring(1)
    while(rword.includes("_")){
        sub = rword.indexOf("_");
        rword = rword.substring(0, sub) + " " + rword[sub+1].toUpperCase() + rword.substring(sub+2);
    }
    //eliminate sentences
    if(rword.length>30){
        rword = rword.substring(0, rword.indexOf(" "));
    }

    return rword;
}


function generatePerson(){

    var person = Math.random() * 7684440653;
    //Determine country
    country = findCountry(person);
    //Determine person number in country
    var personC = population-person;
    //Determine country population
    var countrypop = countries[country]['data'].people.population['total']
    var percentage = personC/countrypop*100;

    //Determine age
    var agep = Math.random() * 100;
    var ageb = findAgeBracket(agep, country)

    var age = Math.floor(getAge(ageb));
    var sex = getSex(ageb);

    var litper = Math.random() * 100;
    var literate = getLiterate(litper, sex, age)

    var ethperc = Math.random() * 100;
    var eth = getEthnicity(ethperc);

    var rperc = Math.random() * 100;
    var rel = getReligion(rperc);

    var urbanperc = Math.random() * 100;
    var urban = getUrban(urbanperc);

    var urbanarea = "a rural area";
    if(urban){  
        countryperson = (urbanperc/100) * countrypop;
        urbanarea = getUrbanArea(countryperson);
    }

    var drinkperc = Math.random() * 100;
    var drinkingwater = getDrinkingWaterSource(urban, drinkperc);

    var sanperc = Math.random() * 100;
    var sanitation = getDrinkingWaterSource(urban, sanperc);

    var jobp = Math.random() * 100;
    var job = getEmployment(urban, jobp);

    var elecp = Math.random() * 100;
    var elec = getElectric(urban, elecp);

    /*
    console.log(population);
    console.log("You are person number " + person)
    console.log("You are a " + age + " year old " + sex + " from " + country + " and are " + literate);
    console.log(eth);
    console.log(rel)
    console.log(urbanarea);
    console.log(drinkingwater);
    console.log(sanitation)
    console.log(job);
    console.log(elec)
    */

    //transform text
    if(rel=="none"){
        rel = "no"
    }
    var countryword = capitalizeWord(country);
    if(countryword=="Burma"){
        countryword="Taiwan";
    }
    
    var ethword = capitalizeWord(eth);
    if(ethword=="Other"){
        ethword = "a minority ethnicity"
    }

    var relword = capitalizeWord(rel);
    if(relword.includes("religion")){
        relword = relword.substring(0, relword.indexOf("religion")-1)
        //console.log("Did religion shorten?")
    }
    if(relword=="none"){
        relword = "no"
    }

    var agearticle = "a";
    if(age==8||age==11||age==18||(age>79&&age<90)){
        agearticle = "an";
    }

    var result = "You are " + agearticle + " " + age + " year old " + sex + " living in " + countryword + "." + " You are " + ethword + " and of " + relword + " religion. " + "You live in " + urbanarea + ", with " + elec + " and access to " + drinkingwater + " drinking water and " + sanitation + " sanitation."

    if(eth=="none"||eth=="undefined"){
        result = "You are a " + age + " year old " + sex + " living in " + countryword + "." + " You are of " + relword + " religion. " + "You live in " + urbanarea + ", with " + elec + " and access to " + drinkingwater + " drinking water and " + sanitation + " sanitation."
    }
    
    if(age>18){
        result = result + " You are " + job + ".";  
    }

    return result;
}

function timer(tim){
    //console.log("begin timer");
    var timeleft = tim;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
    }
    document.getElementById("timetext").innerHTML = timeleft;
    timeleft -= 1;
    }, 1000);
}


function changePerson(){
    document.getElementById("ptext").innerHTML = generatePerson();
}