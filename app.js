let words = ["deer", 'html', 'css'];

//setting levels

let lvls = {
   "Easy": 6,
   "easy": 6,
   "Normal": 4,
   "normal": 4,
   "Hard": 2,
   "hard": 2
};

//default lvl

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

//selectors

let startBtn = document.querySelector('.start');
let lvlNameSpan = document.querySelector('.message .lvl');
let secondsSpan = document.querySelector('.message .seconds');
let theWord = document.querySelector('.the-word');
let upcomingwords = document.querySelector('.upcoming-words');
let input = document.querySelector('.input');
let timeLeftSpan = document.querySelector('.time span');
let scoreGot = document.querySelector('.score .got');
let scoreTotal = document.querySelector('.score .total');
let finsihMessage = document.querySelector('.finish');

//setting level name + seconds + score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

//disable paste

input.onpaste = () => false;

//start btn

startBtn.onclick = function () {
   this.remove();
   input.focus();
   // generate words function
   genWords();

};


function genWords() {
   //random word from array

   let randomWord = words[Math.floor(Math.random() * words.length)];

   //get index
   let index = words.indexOf(randomWord);

   //remove word
   words.splice(index, 1);


   //show random word

   theWord.innerHTML = randomWord;

   //empty upcoming words

   upcomingwords.innerHTML = '';

   //genreate words

   for (let i = 0; i < words.length; i++) {
      let div = document.createElement('div');
      let txt = document.createTextNode(words[i]);
      div.append(txt);
      upcomingwords.append(div);
   }

   //start play funct
   startPlay();
}


function startPlay() {
   timeLeftSpan.innerHTML = defaultLevelSeconds;
   let start = setInterval(() => {
      timeLeftSpan.innerHTML--;
      if (timeLeftSpan.innerHTML == 0) {
         clearInterval(start);

         //compare the words
         if (theWord.innerHTML.toLowerCase() == input.value.toLowerCase()) {
            //empty input 
            input.value = '';
            //Increase score
            scoreGot.innerHTML++;

            if (words.length > 0) {
               genWords();
            } else {
               upcomingwords.remove();

               let span = document.createElement('span');
               span.className = 'good';
               span.textContent = 'Congrats';
               let emoji = String.fromCodePoint(0x1F389);
               span.append(emoji);
               finsihMessage.append(span);

               finalMessage();
            }
         } else {
            let span = document.createElement('span');
            span.className = 'bad';
            span.textContent = 'Game Over';
            let emoji = String.fromCodePoint(0x1F61E);
            span.append(emoji);
            finsihMessage.append(span);
            finalMessage();



         }

      }
   }, 1000);
}

function finalMessage() {
   let close = document.createElement('button');
   close.innerHTML = `X`;
   close.className = 'close';
   finsihMessage.style = `  
               font-weight: bold;
               font-size: 40px;
               text-align: center;
               padding: 15px;
               position: absolute;
               top: 0;
               left: 0;
               z-index: 100;
               width: calc(100% - 40px);
               height: 100%;
               background-color: rgba(0, 81, 255, 0.671);
               display: flex;
               align-items: center;
               justify-content: center;
               font-size: 80px;
               transition: .5s;
               border-radius: 10px 0 10px 10px;
               left:50%;
               transform:translateX(-50%);
               z-index = -100
               `;
   finsihMessage.append(close);
   close.addEventListener('click', () => {
      finsihMessage.style.opacity = '0';

      finsihMessage.style.transform = `translateX(-200%)`;
      window.location.reload();
   });
   setTimeout(() => {
      window.addEventListener('click', function (e) {
         let isInside = finsihMessage.contains(e.target);
         if (!isInside) {
            finsihMessage.style.opacity = '0';

            finsihMessage.style.transform = `translateX(-200%)`;
            window.location.reload();
         }
      });
   }, 0);

}

