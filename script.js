console.log("Welocome to AJ Music");

let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs =[
    {songName:"You Lie In April", filepath: "songs/1.mp3", coverPath: "covers/Cover1.jpg"},
    {songName:"Kaguya Sama: Love Is War", filepath: "songs/2.mp3", coverPath: "covers/Cover2.jpg"},
    {songName:"Domestic Girlfriend", filepath: "songs/3.mp3", coverPath: "covers/Cover3.jpg"},
    {songName:"Summertime", filepath: "songs/4.mp3", coverPath: "covers/Cover4.jpg"},
    {songName:"Demon Slayer", filepath: "songs/5.mp3", coverPath: "covers/Cover5.jpg"},
    {songName:"Hunter x Hunter", filepath: "songs/6.mp3", coverPath: "covers/Cover6.jpg"},
    {songName:"Kamisama Hajimamashte", filepath: "songs/7.mp3", coverPath: "covers/Cover7.jpg"},
    {songName:"Seven Deadly Sins", filepath: "songs/8.mp3", coverPath: "covers/Cover8.jpg"},
    {songName:"Bunny Girl Senpai", filepath: "songs/9.mp3", coverPath: "covers/Cover9.jpg"},
    {songName:"Rent A Girlfriend", filepath: "songs/10.mp3", coverPath: "covers/Cover10.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

 masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
         masterPlay.classList.remove('fa-circle-pause');
         masterPlay.classList.add('fa-circle-play'); 
         gif.style.opacity =0;
     }
}) 

audioElement.addEventListener('timeupdate', ()=>{
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
     element.classList.remove('fa-circle-pause');
     element.classList.add('fa-circle-play');   
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex =parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src =`songs/${songIndex+1}.mp3`;
        masterSongName.innerText =songs[songIndex].songName;
 
        audioElement.currentTime = 0;

        audioElement.play();

        gif.style.opacity =1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src =`songs/${songIndex+1}.mp3`;
    masterSongName.innerText =songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src =`songs/${songIndex+1}.mp3`;
    masterSongName.innerText =songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})