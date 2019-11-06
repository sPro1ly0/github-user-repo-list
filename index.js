'use strict';

//user should input a user handle
//catch any errors in submitted input value
//call github api
//display repo name and repo URL link
//user can make multiple searches and see only results from current search

function getUrl() {

    let userInput = $("#user-handle").val();

    let gitHubURL = `https://api.github.com/users/${userInput}/repos?sort=created`;
    console.log(gitHubURL);

    fetch(gitHubURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error (response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            $(".error-message").text(`User ${userInput} ${error.message}.`)
        });
};

function displayResults(responseJson) {

   console.log(responseJson); 
    $(".repos").empty();
    $(".error-message").empty();

    for (let i = 0; i < responseJson.length; i++) {
        $(".repos").append(`
        <li>${responseJson[i].name}: <a href = "${responseJson[i].html_url}">${responseJson[i].html_url}</a></li>`);
    };

    $(".results").removeClass("hidden");
};

function gitHubHandleForm() {
    $("form").submit( event => {
        event.preventDefault();
        getUrl();
        $("#user-handle").val("");
    });
};

$(gitHubHandleForm);