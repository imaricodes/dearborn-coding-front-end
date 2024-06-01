/* 
This function processes a cue string into an object with three properties:
- display: an array of words that will be displayed to the user
- evaluate: an array of words that will be used to evaluate the user's response
- cueLength: the number of words in the cue

That object is returned
*/


const regexRemovePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export default function processCue(cue) {
 
    let sentenceToDisplay = cue.split(" ");
  
    let sentenceNoPunctuation = cue
      .replace(regexRemovePunctuation, "")
      .toLowerCase();
  
    let sentenceToEvaluateArray = sentenceNoPunctuation.split(" ");
    let cueLength = sentenceToEvaluateArray.length;

    return {
      display: sentenceToDisplay, //array
      evaluate: sentenceToEvaluateArray,
      cueLength: cueLength, //array
      cue: cue
      
    };
  }