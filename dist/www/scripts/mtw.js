
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
