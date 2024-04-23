let $ = document

let ulContainer = $.querySelector("ul")
let inputElem = $.querySelector("input")
let show_MeaningWord = $.getElementById("meaning-word")
let exactWord = $.getElementById("exact-word")
let type = $.getElementById("type")

let audio;

async function fetchDictionaryapi(e) {

    let inputValue = inputElem.value

    if (e.keyCode === 13) {

        try {          
            let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
            
            if(res.ok) {
                let data = await res.json()
                showWord(data)
                clearInput()    
            } else {
                throw Error(`Oops ;) we can't find: ${inputValue}`)
            }
            
        } catch(err) {
            alert(err)
        }
    }
}

function showWord(wordData) {

    let showMeaning = wordData[0]

    audio = new Audio(showMeaning.phonetics[0].audio)

    exactWord.innerHTML = showMeaning.word

    type.innerHTML = `${showMeaning.meanings[0].partOfSpeech} / ${showMeaning.phonetic}/`

    show_MeaningWord.innerHTML = showMeaning.meanings[0].definitions[0].definition
        
}

function playSound() {
    audio.play()
}

function clearInput() {
    ulContainer.style.cssText = "height: 100%;opacity: 1;"
    inputElem.value = ""
}

window.addEventListener("keyup", fetchDictionaryapi)