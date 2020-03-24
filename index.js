'use strict';

const apiKey = 'wcxMDpjOqk6EvOxjYFdpdoP7o0GFd5bko8M5mkds';

const searchUrl = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams(states, maxResults) {
    // console.log('formatQueryParams()');
    let queryString = '';
    queryString += `stateCode=${states}&`;
    queryString += `limit=${maxResults}`;
    // console.log(queryString)
    return queryString
}

function getParks(states, maxResults) {
    // console.log('getParks()');


    const queryString = formatQueryParams(states, maxResults);
    const url = searchUrl + '?' + queryString + '&fields=addresses' + '&api_key=wcxMDpjOqk6EvOxjYFdpdoP7o0GFd5bko8M5mkds';
    // console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok)
                return response.json()
            throw Error()
        })
        .then(responseJson =>
            displayResults(responseJson))
        .catch(error =>
            alert('Something went wrong. Try again later.'));
}


function displayResults(responseJson) {
    // console.log('displayResults()');
    // console.log(responseJson);
    $('#results-list').empty();


    // for (let i = 0; i < responseJson.data.length; i++) {
    // console.log(responseJson.data[i]);
    // console.log(responseJson.data[i].addresses[i]);
    // let parkHTML = ''


    // for (let i = 0; i < responseJson.data.length; i++) {
    //     console.log(responseJson.data[i]);
    //     parkHTML += `
    // <div class="result-item"><li><h3>${responseJson.data[i].fullName}</h3>
    // <p class="park-description">${responseJson.data[i].description}</p>
    // <a href="${parkData[i].url}">${responseJson.data[i].url}</a>
    // <div id="addresses">
    // <h4>Addresses</h4>
    // `
    // for (let x = 0; x < responseJson.data[i].addresses.length; x++) {
    //     parkHTML +=  `

    // <h5>${responseJson.data[i].addresses[x].type}:</h5>
    // <p class="addresses">${responseJson.data[i].addresses[x].line1}</p>
    // <p class="addresses">${responseJson.data[i].addresses[x].line2}</p>
    // <p class="addresses">${responseJson.data[i].addresses[x].line3}</p>
    // <p class="addresses">${responseJson.data[i].addresses[x].city}, ${responseJson.data[i].addresses[x].stateCode}, ${responseJson.data[i].addresses[x].postalCode}</p>
    // `
    //     }
    //     parkHTML +=   `</div></li></div>`
    // }
    // append extracted data 
    // $('#results-list').append(parkHTML)
    //removes hidden class to display results
    // $('#results').removeClass('hidden')
    // }


    for (let i = 0; i < responseJson.data.length; i++) {
        // console.log(responseJson.data[i]);
        // console.log(responseJson.data[i].addresses[i]);
        $('#results-list').append(
            `<li>
                <p>Park Name: "${responseJson.data[i].fullName}"</p>
                <p>Description: "${responseJson.data[i].description}"</p>
                <p>Url: <a  href="${responseJson.data[i].url}">"${responseJson.data[i].url}"</a></p>
          
            </li>`
            // <p>Addresses: "${responseJson.data[i].addresses[i]}"</p>
        )
    };
    $('#results').removeClass('hidden');

};

// for (let i = 0; i < responseJson.data[i].addresses.length; i++) {
//     console.log(responseJson.data[i].addresses[i]);
//     $("#addresses-list").append(
//         `<li>

//         </li>`
//     )
// };
//   <p>Addresses: "${responseJson.data[i].addresses[i]}"</p>
// $('#results').removeClass('hidden');
// };

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        // console.log('watchForm()');
        const states = $("#js-search-parks").val();
        const maxResults = $("#js-max-results").val();
        // console.log(states, maxResults);
        getParks(states, maxResults);
    });
}

$(function () {
    // console.log('App loaded! Waiting for submit!');
    watchForm();
});