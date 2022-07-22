/*IMDB Simple's goal is to use the API access from imdb-api.com to search IMDB's database and retrieve
    search's title and movie. The project should use vanilla JS to accomplish this.
*/

const apiKey = config.APIKey; //pulls API key from seperate file.


//Document variables
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
const searchOutputContainer = document.getElementById('searchOutputContainer');



searchButton.addEventListener('click', () => {
    let searchQuery = searchBox.value;
    if (!searchQuery){ //Verify input is not null or undefined.
        alert("Invalid search. Is the search bar empty?");
    }
    removePreviousResults();
    retrieveDataFromAPI(searchQuery);
});

searchBox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter'){
        console.log('fired');
        let searchQuery = searchBox.value;
        if (!searchQuery) { //Verify input is not null or undefined.
            alert("Invalid search. Is the search bar empty?");
        }
        removePreviousResults();
        retrieveDataFromAPI(searchQuery);
    }
})

function retrieveDataFromAPI(movieTitle){
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

   return fetch('https://imdb-api.com/en/API/Search/' + apiKey + '/' + movieTitle, requestOptions)
        .then(response => response.text())
        .then(result => {
            searchParser(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
};

function checkValidSearch(searchQuery){
    if (searchQuery.errorMessage != '' || searchQuery.results.length == 0) {
        return false;
    }
}

function searchParser(searchQuery){
    //Will check that errorMessage is empty, then pull image sources and titles.
    if (checkValidSearch(searchQuery) == false){
        alert("There was an error in your search. Maybe what you're looking for doesn't exist?");
        return false; //Search must be invalid, should not pass down to output functions.
    }
    let queryResultsObject = {}; //Will store as 0 : { title: ..., imageSrc: ...}, 1 : {....}, etc
    for (let i = 0; i < searchQuery.results.length; i++){
        //Descriptions sometimes output with alt translations, e.g The Dark Knight ->
        // El caballero de la noche. While this can be helpful in some cases e.g Tezz -> "Fast", removing
        //this may be more useful to the user.
        let descriptionRegExp = searchQuery.results[i].description.replace(/\s(aka).*/, ""); 
        queryResultsObject[i] = {
            title: searchQuery.results[i].title,
            year: descriptionRegExp,
            imgSrc: searchQuery.results[i].image,
            imgAlt: "IMDB poster for " + searchQuery.results[i].title + descriptionRegExp,
            imdbID : searchQuery.results[i].id
        };
    };
    outputSearchResults(queryResultsObject);
}

function outputSearchResults (queryResults) {
    //Use the first result to output a "hero" element, then several smaller alternates.
    //Each element should link back to its own IMDB page.

    /*
        searchOutputContainer
            mainPosterContainer
                mainPosterLink
                    mainPosterElement
                    mainTitleElement
    */

    let mainPosterLink = document.createElement('a');
    mainPosterLink.href = "https://www.imdb.com/title/" + queryResults[0].imdbID;

    let mainPosterContainer = document.createElement('section');
    mainPosterContainer.id = "mainPosterContainer";
    mainPosterContainer.classList.add('mainOutputContainer');

    let mainPosterElement = document.createElement('img');
    mainPosterElement.src = queryResults[0].imgSrc;
    mainPosterElement.alt = queryResults[0].imgAlt;

    let mainTitleElement = document.createElement('h2');
    let mainTitle = queryResults[0].title + " " + queryResults[0].year;
    mainTitleElement.textContent = mainTitle;

    searchOutputContainer.append(mainPosterContainer);
    mainPosterContainer.append(mainPosterLink);
    mainPosterLink.append(mainPosterElement);
    mainPosterLink.append(mainTitleElement);

    let seeAlso = document.createElement('h3');
    seeAlso.textContent = "Not what you were looking for? See also: ";
    searchOutputContainer.append(seeAlso);

    let alternateOutputContainer = document.createElement('section');
    alternateOutputContainer.classList.add('alternateOutputContainer');

    searchOutputContainer.append(alternateOutputContainer);

    for(let i = 1; i < queryResults.length || i < 6; i++){
        /*
        alternateOutputContainer 
            altPosterContainer
                altPosterLink(a)
                    altPosterElement
                    altTitleElement
        */

        let altPosterLink = document.createElement('a');
        altPosterLink.href = 'https://www.imdb.com/title/' + queryResults[i].imdbID;

        let altPosterContainer = document.createElement('section');
        altPosterContainer.classList.add('altPosterContainer');

        if (i % 2 == 1) {
            altPosterContainer.classList.add('alternatingRow');
        }

        let altPosterElement = document.createElement('img');
        altPosterElement.src = queryResults[i].imgSrc;
        altPosterElement.alt = queryResults[i].imgAlt;

        let altTitleElement = document.createElement('h3');
        let altTitle = queryResults[i].title + " " + queryResults[i].year;
        altTitleElement.textContent = altTitle;

        alternateOutputContainer.append(altPosterContainer);
        altPosterContainer.append(altPosterLink);
        altPosterLink.append(altPosterElement);
        altPosterLink.append(altTitleElement);       
    }
}

function removePreviousResults () {
    while (searchOutputContainer.firstChild){
        searchOutputContainer.removeChild(searchOutputContainer.firstChild);
    }
}
