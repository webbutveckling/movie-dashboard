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

// Ladda bakgrundsfärgen från local storage vid sidladdning
function loadBrowserPreferences() {

    document.getElementById("option1").setAttribute("checked","true");
    document.body.style.fontFamily = "Arial";

    
    const savedColor = localStorage.getItem('bakgrundsfarg');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        
        if (savedColor == "black") {
            document.getElementById("option3").setAttribute("checked","true");
        } else if (savedColor == "white") {
            document.getElementById("option2").setAttribute("checked","true");
        } else if (savedColor == "orange") {
            document.getElementById("option4").setAttribute("checked","true");
            document.body.style.fontFamily = "creepster";
        }
    }


};

// Funktion för att spara vald färg i local storage
function saveBrowserPreferences() {
    const color = document.querySelector('input[name="tema"]:checked').value;
    //const color = document.getElementById('colorPicker').value;
    document.body.style.backgroundColor = color;
    if (color == "orange") {
        document.body.style.fontFamily = "creepster";
    } else {
        document.body.style.fontFamily = "Arial";
    }
    localStorage.setItem('bakgrundsfarg', color);
}