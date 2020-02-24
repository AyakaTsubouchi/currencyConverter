// ===================
//     get data from API
// =================== 
const baseurl = "http://api.currencylayer.com/";
const live = "live?";
const historical = "historical?";
let date;

const currencies = "&currencies=USD,AUD,CAD,PLN,MXN";
const fomat = "&format=1";

const KEY = "access_key=acbae8b183edc06161487c7ee6bbfe75";


// set default date (Today)
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#mydate").value = today;
function setdate() {
    date = "&date=" + document.getElementById("mydate").value;
    return date;
};


function getData() {
    date = setdate();
    const fromC = document.querySelector("#fCurrency").value;
    const fromA = document.querySelector("#fAmount").value;
    const toC = document.querySelector("#toCurrency").value;
    const toA = document.querySelector("#toAmount").value;
    console.log(fromC);

    console.log(date)
    fetch(baseurl + historical + KEY + date + currencies + fomat)
        .then(response => {
            return response.json();

        })
        .then(data => {
            console.log(data);
            switch (fromC) {
                case "USDUSD":
                    fromCRate = data.quotes.USDUSD;
                    break
                case "USDAUD":
                    fromCRate = data.quotes.USDAUD;
                    break
                case "USDCAD":
                    fromCRate = data.quotes.USDCAD;
                    break
                case "USDPLN":
                    fromCRate = data.quotes.USDPLN;
                    break
                case "USDMXN":
                    fromCRate = data.quotes.USDMXN;
            }

            switch (toC) {
                case "USDUSD":
                    toCRate = data.quotes.USDUSD;
                    break
                case "USDAUD":
                    toCRate = data.quotes.USDAUD;
                    break
                case "USDCAD":
                    toCRate = data.quotes.USDCAD;
                    break
                case "USDPLN":
                    toCRate = data.quotes.USDPLN;
                    break
                case "USDMXN":
                    toCRate = data.quotes.USDMXN;
            }


            console.log(fromC);
            console.log("data.quotes.fromC" + data.quotes.fromC)

            document.querySelector("#toAmount").value = toCRate / fromCRate * fromA;


        });
}

handleSwap = (e) => {
    state = {
        currencies: ['USD', 'AUD', 'CAD'],
        base: 'USD',
        amount: '1',
        convertTo: '',
        result: '',
        date: '2020/02/23'
    }
    const base = this.state.base
    const convertTo = this.state.convertTo
    e.preventDefault();
    this.setState({
        base: convertTo,
        convertTo: base,
        result: null
    }, this.getData
    )
}


// ===================
//     for graph
// =================== 
// weekly
let cuttoday = new Date().toISOString().substr(0, 8);
let cuttoday2 = new Date().toISOString().substr(8, 2);
for (let i = 0; i < 8; i++) {
    const fromC = document.querySelector("#fCurrency").value;
    const fromA = document.querySelector("#fAmount").value;
    const toC = document.querySelector("#toCurrency").value;
    const toA = document.querySelector("#toAmount").value;
    let weekDate = parseInt(cuttoday2) - i;
    let weekDate2 = cuttoday + weekDate;
    let toCRate;
    console.log(cuttoday + weekDate)
    fetch(baseurl + historical + KEY + "&date=" + cuttoday + weekDate + currencies + fomat)
        .then(response => {
            return response.json();

        })
        .then(data => {
            console.log(data);
            switch (fromC) {
                case "USDUSD":
                    fromCRate = data.quotes.USDUSD;
                    break
                case "USDAUD":
                    fromCRate = data.quotes.USDAUD;
                    break
                case "USDCAD":
                    fromCRate = data.quotes.USDCAD;
                    break
                case "USDPLN":
                    fromCRate = data.quotes.USDPLN;
                    break
                case "USDMXN":
                    fromCRate = data.quotes.USDMXN;
            }

            switch (toC) {
                case "USDUSD":
                    toCRate = data.quotes.USDUSD;
                    break
                case "USDAUD":
                    toCRate = data.quotes.USDAUD;
                    break
                case "USDCAD":
                    toCRate = data.quotes.USDCAD;
                    break
                case "USDPLN":
                    toCRate = data.quotes.USDPLN;
                    break
                case "USDMXN":
                    toCRate = data.quotes.USDMXN;
            }


            console.log(toCRate);
            console.log("data.quotes.fromC" + data.quotes.fromC)


        });

}


var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['feb 2', '', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [

                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});