let btn= document.querySelector("#btn")
let content= document.querySelector("#content")
let voice= document.querySelector("#voice")

function speak(text){
    let text_speak= new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day= new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours<16){
        speak("Good Evening Sir")
    } else{
        speak("Good Evening Sir")
    }
}
window.addEventListener('load',()=>{
    wishMe()
})

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition
let recognition= new speechRecognition()
recognition.onresult=(event)=>{
  let currentIndex= event.resultIndex
    let transcript= event.results[currentIndex][0].transcript
    content.innerText= transcript
    takeCommand(transcript)
}

btn.addEventListener("click" ,()=>{
    console.log("button clicked")
     recognition.start()
    btn.style.display= "none"
    voice.style.display="block"
})

function takeCommand(message){
     btn.style.display= "flex"
     voice.style.display="none"

     

    if(message.toLowerCase().includes("hello")|| message.toLowerCase().includes("hey")){
        speak("hello sir, what can i help you?")
    }
    else if(message.toLowerCase().includes("who are you")){
        speak("i am virtual assistant, created by Harsh Maurya")
    } else if(message.toLowerCase().includes("open youtube")){
        speak("opening youtube")
        window.open("https://www.youtube.com/")
    }

    else if(message.toLowerCase().includes("open google")){
        speak("opening google")
        window.open("https://www.google.com/")
    }

    else if(message.toLowerCase().includes("open facebook")){
        speak("opening facebook")
        window.open("https://www.facebook.com/")
    }

    else if(message.toLowerCase().includes("open instagram")){
        speak("opening instagram")
        window.open("https://www.instagram.com/")
    }

    else if(message.toLowerCase().includes("open whatsapp")){
        speak("opening whatsapp")
        window.open("https://web.whatsapp.com/")
    }

    else if(message.toLowerCase().includes("time")){
        let time= new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }

else if (message.toLowerCase().includes("tell me a joke")) {
    tellJoke(); // Call the joke function
}
 
else if (message.toLowerCase().includes("tell me a news")) {
    getNews();
}

    
    else if(message.toLowerCase().includes("date")){
        let date= new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }

    

    else{
        let finalText= "this is what i found on internet regarding" + message.toLowerCase().replace("Arya vati", " Arya")+message.toLowerCase().replace("are")
        speak(finalText)
        window.open(`https://www.google.com/search?q= ${message.toLowerCase().replace("Arya vati", " Arya"," are","")}`)
    }

    
}

async function tellJoke() {
    const url = "https://official-joke-api.appspot.com/random_joke";

    try {
        const response = await fetch(url);
        const data = await response.json();
        const joke = `${data.setup} ... ${data.punchline}`;
        speak(joke); // Speak the joke
    } catch (error) {
        speak("Sorry, I couldn't fetch a joke right now.");
    }
}

async function getNews() {
    const apiKey = "84a675266d0c4675bcf80a2cc781358f ";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const headlines = data.articles.slice(0, 3).map(article => article.title).join(". ");
        speak(`Here are the top headlines: ${headlines}`);
    } catch (error) {
        speak("Sorry, I couldn't fetch the news.");
    }
}










