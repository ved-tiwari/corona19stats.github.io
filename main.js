
window.addEventListener('load', (event) => {
    document.getElementById("loading").style.display = "none"
  });

nfObject = new Intl.NumberFormat('en-US')

window.onbeforeunload = function () {
    return "";
};







fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(data => {

        console.log(data)
        let output = null;
        data.Countries.forEach(Countries => {
            document.getElementById("dropdown").innerHTML += `<a class="dropdown-item" onclick="document.getElementById('input').value='${Countries['Country']}'">${Countries["Country"]}</a>`
            /*document.getElementById("autoFill").innerHTML += `<a class="dropdown-item" onclick="document.getElementById('input').value='${Countries['Country']}'">${Countries['Country']}</a>`
*/
        })
    })

var num = 1

function submit(ele) {


    if (event.key === 'Enter') {



        let inputValue = document.getElementById("input").value;

        if (inputValue !== "United States of America") {
            inputValue = inputValue.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
        }


        if (inputValue == "") {
            document.getElementById("welcome").style.display = "none"
            document.getElementById("warning").style.display = "block";
        }

        else {
            num += 1
            document.getElementById("welcome").style.display = "none";
            document.getElementById("warning").style.display = "none";
            fetch("https://api.covid19api.com/summary")
                .then(res => res.json())
                .then(data => {

                    let output = null
                    let countryList = data.Countries;

                    for (var i = 0; i < countryList.length; i++) {
                        if (countryList[i].Country == inputValue) {
                            // Append the sorted data in your desired  variable.
                            data = countryList[i];
                            console.log(data)
                            let date = data["Date"]
                            date = new Date(date);
                            var dd = date.getDate();
                            var mm = date.getMonth() + 1;
                            var yyyy = date.getFullYear();
                            if (dd < 10) { dd = '0' + dd }
                            if (mm < 10) { mm = '0' + mm };
                            let dateMod = mm + '/' + dd + '/' + yyyy

                            let countryNum;

                            if (inputValue == "United States of America") {
                                countryNum = data["TotalConfirmed"] + 50589
                            } else if (inputValue == "Canada") {
                                countryNum = data["TotalConfirmed"] - 100000
                            }
                            else {
                                countryNum = data["TotalConfirmed"]
                            }

                            output = `
                        <div class="card" style="width: 18rem; float: left; position: relative; margin-left: 6px; margin-bottom: 6px;" id="stance">
                            <div class="card-body">
                            <svg class="bi bi-x" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg" style="position: absolute; right: 7px; top: 7px;" onclick="document.getElementById('status').removeChild(output)">
                                <path fill-rule="evenodd"
                                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                <path fill-rule="evenodd"
                                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                            </svg>
                            <h5 class="card-title">${data["Country"]}</h5>
                            <p>
                            Total Cases: ${nfObject.format(countryNum)}<br>
                            Total Recoveries: ${nfObject.format(data["TotalRecovered"])}<br>
                            Total Deaths: ${nfObject.format(data["TotalDeaths"])}<br>
                            Last Updated: ${dateMod}
                            <br><hr>
                            
                            <h6>Today's Statistics</h6>

                            <div id="${num}">
                                <p>
                                    Confirmed Today: ${nfObject.format(data["NewConfirmed"])}<br>
                                    Recovered Today: ${nfObject.format(data["NewRecovered"])}<br>
                                    Deaths Today: ${nfObject.format(data["NewDeaths"])}
                                </p>
                            </div>
                            <a target="_blank" href="https://www.google.com/search?q=coronavirus+cases+in+${data["Country"]}&oq=corona&aqs=chrome.0.69i59l2j69i57j69i59j69i60l4.1384j1j9&sourceid=chrome&ie=UTF-8" class="btn btn-outline-warning">Learn More</a>
                        </div>
                    </div>
                    `
                            let divClass = document.createElement("div");
                            divClass.innerHTML = output;

                            document.getElementById("status").appendChild(divClass)
                            break;
                        }
                    }
                })

        }
    }


}

function sub() {




    let inputValue = document.getElementById("input").value;

    if (inputValue.split(" ").length <= 2) {
        inputValue = inputValue.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
    }

    if (inputValue == "") {
        document.getElementById("warning").style.display = "block";
    }

    else {
        document.getElementById("welcome").style.display = "none"
        num += 1
        document.getElementById("warning").style.display = "none";

        fetch("https://api.covid19api.com/summary")
            .then(res => res.json())
            .then(data => {

                let output = null
                let countryList = data.Countries;

                

                for (var i = 0; i < countryList.length; i++) {
                    if (countryList[i].Country == inputValue) {
                        // Append the sorted data in your desired  variable.
                        data = countryList[i];
                        console.log(data)
                        let date = data["Date"]
                        date = new Date(date);
                        var dd = date.getDate();
                        var mm = date.getMonth() + 1;
                        var yyyy = date.getFullYear();
                        if (dd < 10) { dd = '0' + dd }
                        if (mm < 10) { mm = '0' + mm };
                        let dateMod = mm + '/' + dd + '/' + yyyy

                        let countryNum;
                        
                        if (inputValue == "United States of America") {
                            countryNum = data["TotalConfirmed"] + 50589
                        } else if (inputValue == "Canada") {
                            countryNum = data["TotalConfirmed"] - 100000
                        }
                        else {
                            countryNum = data["TotalConfirmed"]
                        }
                    
                        output = `
                        <div class="card" style="width: 18rem; float: left; position: relative; margin-left: 6px; margin-bottom: 6px;" id="stance">
                            <div class="card-body">
                            <svg class="bi bi-x" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg" style="position: absolute; right: 7px; top: 7px;" onclick="document.getElementById('status').removeChild(output)">
                                <path fill-rule="evenodd"
                                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                <path fill-rule="evenodd"
                                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                            </svg>
                            <h5 class="card-title">${data["Country"]}</h5>
                            <p>
                            Total Cases: ${nfObject.format(countryNum)}<br>
                            Total Recoveries: ${nfObject.format(data["TotalRecovered"])}<br>
                            Total Deaths: ${nfObject.format(data["TotalDeaths"])}<br>
                            Last Updated: ${dateMod}
                            <br><hr>
                            
                            <h6>Today's Statistics</h6>

                            <div id="${num}">
                                <p>
                                    Confirmed Today: ${nfObject.format(data["NewConfirmed"])}<br>
                                    Recovered Today: ${nfObject.format(data["NewRecovered"])}<br>
                                    Deaths Today: ${nfObject.format(data["NewDeaths"])}
                                </p>
                            </div>
                            <a target="_blank" href="https://www.google.com/search?q=coronavirus+cases+in+${data["Country"]}&oq=corona&aqs=chrome.0.69i59l2j69i57j69i59j69i60l4.1384j1j9&sourceid=chrome&ie=UTF-8" class="btn btn-outline-warning">Learn More</a>
                        </div>
                    </div>
                    `
                        let divClass = document.createElement("div");
                        divClass.innerHTML = output;

                        document.getElementById("status").appendChild(divClass)
                        break;
                    }
                }
            })

    }

}

function hide() {
    document.getElementById("notFound").style.display = "none";
    document.getElementById("warning").style.display = "none";
}

function world() {
    fetch("https://api.covid19api.com/summary")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let output = null;
            let date = data["Date"]
            date = new Date(date);
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (dd < 10) { dd = '0' + dd }
            if (mm < 10) { mm = '0' + mm };
            let dateMod = mm + '/' + dd + '/' + yyyy
            data = data.Global;



            output = `

                    <div class="card" style="width: 18rem; margin-left: 6px; margin-bottom: 6px; float: left;" id="stance">
                        <div class="card-body">
                            <svg class="bi bi-x" width="1.25em" height="1.25em" viewBox="0 0 16 16" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg" style="position: absolute; right: 7px; top: 7px;" onclick="document.getElementById('stance').style.display = 'none'">
                                <path fill-rule="evenodd"
                                d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                <path fill-rule="evenodd"
                                d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                            </svg>
                            <h5 class="card-title">Global Statistics <svg class="bi bi-compass" width=".75em" height=".75em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 15.016a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zm0 1a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"/>
                            <path d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1zm.94 6.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z"/>
                          </svg></h5>
                            <p>
                            Total Cases: ${nfObject.format(data["TotalConfirmed"])}<br>
                            Total Recoveries: ${nfObject.format(data["TotalRecovered"])}<br>
                            Total Deaths: ${nfObject.format(data["TotalDeaths"])}<br>
                            Last Updated: ${dateMod}
                            </p><hr>
                            
                            <h6>Today's Statistics</h6>

                            <div id="${num}">
                                <p>
                                    Confirmed Today: ${nfObject.format(data["NewConfirmed"])}<br>
                                    Recovered Today: ${nfObject.format(data["NewRecovered"])}<br>
                                    Deaths Today: ${nfObject.format(data["NewDeaths"])}<br>
                                    Last Updated: ${dateMod}
                                </p>
                            </div>
                            <a target="_blank" href="https://www.google.com/search?sxsrf=ALeKk00vTnKe3nV5KkWHpHWrNE7lVTTcIA%3A1591107679356&ei=X2DWXrWdFc2-ggehn47gAw&q=worldwide+coronavirus+cases&oq=worldwide+&gs_lcp=CgZwc3ktYWIQARgAMgcIABAUEIcCMgQIABBDMgQIABBDMgIIADICCAAyAggAMgUIABCDATICCAAyAggAMgIIADoECAAQRzoECCMQJzoHCAAQgwEQQ1DRJ1j0M2CtP2gAcAN4A4AB4gaIAaMekgENMC4yLjIuMS4xLjEuMpgBAKABAaoBB2d3cy13aXq4AQM&sclient=psy-ab" class="btn btn-outline-warning">Learn More</a>
                        </div>
                    </div>

                `

            document.getElementById("status").innerHTML += output

        })
}


function clr() {
    location.reload();

}

fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(data => {
        Countries = data.Countries[data.Countries.length - 9]

        document.getElementById("globalUSStatus").innerHTML = `Coronavirus (COVID-19) has so far affected ${nfObject.format(data.Global["TotalConfirmed"])} people globally and ${nfObject.format(Countries["TotalConfirmed"] + 50589)} people in the United States.`

        let output = null;


    })

function hideInfo() {
    document.getElementById("welcome").style.display = "none"
}

