const requestOptions = {
    method: "GET",
    redirect: "follow"
};

const API_KEY = "e1e6cf44";

function _getElementByType(arr, typ) {
    for(let i=0;i<arr.length;i++) {
        if (arr[i].localName == typ) {
            return arr[i];
        }
    }

    return null;
}


function getMovieRating(name /* LOTR */, foralder) {

    let bild = _getElementByType(foralder.children, 'img'); /* foralder.children[0]; */
    let rubrik = _getElementByType(foralder.children, 'h2');
    let betyg = _getElementByType(foralder.children, 'p');

    fetch("https://www.omdbapi.com/?t="+name+"&apikey="+API_KEY, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        rubrik = result.Title;
        bild.setAttribute("src", result.Poster);
        betyg.innerText = result.Ratings[0].Value; /*imdbRating*/;
    })
    .catch((error) => console.error(error));
}