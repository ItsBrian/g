isRunning = "false";
console.log("isRunning = false");
tseries = +0;
pewdiepie = +0;
subgap = +0;

function startGen(){
    console.log("click run")
    input = document.getElementById("input").value;
    if (input != "" && isRunning == "false"){
        URL = input;
        alert("Generator started!");
        isRunning = "true";
        console.log("Set URL to: " + URL);
    }
    else if (input != "" && isRunning == "true"){
        var confirmUpdate = confirm("The generator is already running\nAre you sure you want to update the URL?");
            if (confirmUpdate == true) {
                URL = input;
                alert("Updated URL");
                console.log("Update URL to: " + URL);
            } 
            else {
                alert("Update Canceled");
                console.log("Update Canceled");
                document.getElementById("input").value = URL;
            }
    }
    else {
        alert("Please enter a URL\n(If you need help click the 'Help' button on the right");
    }
}

setInterval(function() {
    if (isRunning == "true"){
        console.log("Current URL: " + URL);
        var timeLeft = document.getElementById("timeLeft").innerHTML;
        if (timeLeft > +0){
            var timeLeft = --timeLeft;
            document.getElementById("timeLeft").innerHTML = timeLeft;
        } else {
            document.getElementById("timeLeft").innerHTML = "60";
            document.getElementById("messagesSent").innerHTML = ++document.getElementById("messagesSent").innerHTML;
            updateSubcounts();
        }
    }
}, 750);

function updateSubcounts(){
    
    pewdiepieOLD = pewdiepie;
    tseriesOLD = tseries;
    subgapOLD = subgap;

     setTimeout(function (){
        $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&key=AIzaSyDbB3szNvbDXMli7NLFkn5AcCPgNVyYNzY', function(pewdiepieS) {
            pewdiepie = pewdiepieS.items[0].statistics.subscriberCount;
         console.log("Getting pewdiepie's subs");
     });
    }, 0);

    setTimeout(function (){
        $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=AIzaSyDbB3szNvbDXMli7NLFkn5AcCPgNVyYNzY', function(tseriesS) {
            tseries = tseriesS.items[0].statistics.subscriberCount;
            console.log("Getting tseries' subs");
     });
    }, 2000);

    setTimeout(function (){
        console.log("Formatting subcounts");
        subgap = +pewdiepie - +tseries;

        pewdiepieGAIN = +pewdiepie - +pewdiepieOLD;
        tseriesGAIN = +tseries - +tseriesOLD;
        subgapGAIN = +subgap - +subgapOLD
        

        if (+pewdiepieGAIN >= +0){
            pewdiepieGAIN = "+" + pewdiepieGAIN;
        }

        if (+tseriesGAIN >= +0){
            tseriesGAIN = "+" + tseriesGAIN;
        }

        if (+subgapGAIN >= +0){
            subgapGAIN = "+" + subgapGAIN;
        }

        if (+subgap < +0){
            document.getElementById("subgapC").style.color = "#B0461B";
        } else {
            document.getElementById("subgapC").style.color = "#2C706E";
        }

        document.getElementById("pewdiepieCS").innerHTML = pewdiepie.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        document.getElementById("tseriesCS").innerHTML = tseries.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        document.getElementById("subgapC").innerHTML = subgap.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        document.getElementById("pewdiepieG").innerHTML = "(" + pewdiepieGAIN + ")";
        document.getElementById("tseriesG").innerHTML = "(" + tseriesGAIN + ")";
        document.getElementById("subgapG").innerHTML = "(" + subgapGAIN + ")";

        configureForm();
    }, 3000);
}

function configureForm(){
    console.log("Configuring final form");
    document.getElementById("form").action = URL;
    document.getElementById("formContent").value = "```yaml\nPewdiepie: " + document.getElementById("pewdiepieCS").innerHTML + " (" + pewdiepieGAIN + ")\nT-Series: " + document.getElementById("tseriesCS").innerHTML + " (" + tseriesGAIN + ")\n\nSubgap: " + document.getElementById("subgapC").innerHTML + " (" + subgapGAIN + ")```";
    document.getElementById("form").submit();
    console.log("Sending form");
}
