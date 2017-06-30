function createMessage(){
    messageDiv = document.createElement('div');
    var style = 'position: fixed; top:0;width: 100%; display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.6); padding: 0.5em 0; color: white !important; font-size: 0.9em; z-index: 1000;';
    messageDiv.setAttribute('id','message-div');
    messageDiv.setAttribute('style',style);
    messageDiv.innerHTML='<div><span id="message-body">Message</span> </div>';
    document.querySelector('body').appendChild(messageDiv);
}

function printMessage(message){
  document.querySelector('#message-body').innerHTML = message;
}

createMessage();
getAllWords()

function getAllWords(ngramMin = 1, ngramMax = 1) {
    var countedWords = {},
      paragraphs = document.getElementsByTagName('p');
    console.log('Getting words from all ' + paragraphs.length + ' paragraphs');
    for (var i = 0; i < paragraphs.length; i++) {
      var words = paragraphs[i].innerText;
      // if(this.clkTest(words)){
      //   words = words.replace(/\d|\s|[()]/g,'').split('').filter(v=>v!='');
      // }
      // else{
        words = words.split(/\s|,|[.()]|\d/g);
      // }
      // console.log(words);
      for (var j = 0; j < words.length; j++) {
        for (var b = ngramMin; b <= ngramMax; b++) {
          var word = words.slice(j, j + b).join(' ');
          if (!(word in countedWords)) {
            countedWords[word] = 0;
          }
          countedWords[word] += 1;
        }
      }
    }
    alert("Counted Words : "+Object.keys(countedWords).length);
  }
