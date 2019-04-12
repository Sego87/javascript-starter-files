let term = "" // the terms I am looking for
const songContainer = document.getElementById("songs");

const updateTerm = () => {
    term = document.getElementById("searchInput").value;

    if(!term || term==="") { // if there's no term or if its space is empty
        alert("please enter a search term");
    } else { // it runs when we type in something in the search bar

        while(songContainer.firstChild) { // it checks if the songContainer has any child elements, if it does we are going to remove it
            songContainer.removeChild(songContainer.firstChild); // this will remove the children one by one inside the songContainer
        } // it works until the songContainer is empty

        const url = `https://itunes.apple.com/search?limit=10&media=music&term=${term}`; // `-----------media=music&term=${term}` is to add a query string in which we search for a term that is only searchable in the type of "music" elements (can't be a movie or whatsoever).The limit is set to be 10 results
        fetch(url/* , { mode: 'no-cors'} */)
        .then((response) => { //the name is up to us, the response is just a http response, therefore we need to extract the json data (the response body), using the json method
            return response.json();
        })
        .then((data) => {
            // return console.log(data.results);
            const artists = data.results;
            return artists.map(result => {
        
                const article = document.createElement("article"), // if I keep creating constants I can separate them with a coma instead of writing const al the time and putting the semicolon
                      artist = document.createElement("p"),
                      song = document.createElement("p"),
                      img = document.createElement("img"),
                      audio = document.createElement("audio"),
                      audioSource = document.createElement("source")
        
                artist.innerHTML = result.artistName;
                song.innerHTML = result.songName;
                img.src = result.artworkUrl100;
                audioSource.src = result.PreviewUrl;
                audio.setAttribute("controls", "");
        
                article.appendChild(img);
                article.appendChild(artist);
                article.appendChild(song);
                article.appendChild(audio);
                audio.appendChild(audioSource);
                songContainer.appendChild(article);
                    //   console.log(result);
            })
        })
        
        // .catch() is to fix an error
        
        .catch(error => console.log("Request failed:", error));
    }
}

const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", updateTerm);

document.addEventListener("play", event => { // after we play a song we trigger an event
    const audio = document.getElementsByTagName("audio");
    // we now check if any is already playing
    for(let i = 0; i < audio.length, i++;) {
        if(audio[i] !=event.target) { // with event.target we can now which element is the target of the event now (which one is playing a song) (the reference of which player we have clicked will be available as information inside of the event)
            //anything we run inside of the loop will apply to all audio players except the one that we want
            audio[i].pause(); // all the audio players that are not the target of the "play" event will pause         
            console.log(event); // very useful to understand what is happening with the bubbling and the event in the 9 remaining songs (the one that we want is exluded form the event, we want it to play)
        }
    }
}, true) // ,true is necessary to run correctly the event listener (see event capture and bubbling). The true allows the event handler to execute in the capture phase (by default is set to false and unfortunately the play event is one of the events that can not bubble)

// a promise is  just a way to declare what we want to do when the data is eventually returned
// when the data has been returned succesfully we run the code inside the .then()

/* 
console.log(data);

setTimeout(() => {
    console.log(data);
},2000); */