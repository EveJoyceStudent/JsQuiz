var quiz = {
    questions:[],
    unsortedQuestions:[],
    answers:[],
    questionSequence:[0,1,2,3,4,5],
    answerSequence:[0,1,2,3],
    correctAnswers:[],
    questionID:0,
    questionNumber:0,
    currentCorrectAnswer:0,
    guesses:[]
};

for(let i=quiz.questionSequence.length-1;i>-1;i--){
    const j = Math.floor(Math.random()*i)
    const temp = quiz.questionSequence[i]
    quiz.questionSequence[i]=quiz.questionSequence[j]
    quiz.questionSequence[j]=temp
}

for(let i=quiz.answerSequence.length-1;i>-1;i--){
    const j = Math.floor(Math.random()*i)
    const temp = quiz.answerSequence[i]
    quiz.answerSequence[i]=quiz.answerSequence[j]
    quiz.answerSequence[j]=temp
}

// question order before randomisation
quiz.unsortedQuestions[0]="What is the name for the Jewish New Year?";
quiz.answers[0]=["Hanukkah","Yom Kippur","Kwanza","Rosh Hashanah"];
quiz.correctAnswers[0]="Rosh Hashanah";

quiz.unsortedQuestions[1]="How many blue stripes are there on the U.S. flag?";
quiz.answers[1]=["6","7","13","0"];
quiz.correctAnswers[1]="13";

quiz.unsortedQuestions[2]="Which one of these characters is not friends with Harry Potter?";
quiz.answers[2]=["Ron Weasley","Neville Longbottom","Draco Malfoy","Hermione Granger"];
quiz.correctAnswers[2]="Draco Malfoy";

quiz.unsortedQuestions[3]="What is the color of Donald Duck’s bowtie?";
quiz.answers[3]=["Red","Yellow","Blue","White"];
quiz.correctAnswers[3]="Red";

quiz.unsortedQuestions[4]="What was the name of the band Lionel Richie was a part of?";
quiz.answers[4]=["King Harvest","Spectrums","Commodores","The Marshall Tucker Band"];
quiz.correctAnswers[4]="Commodores";

quiz.unsortedQuestions[5]="Which animal does not appear in the Chinese zodiac?";
quiz.answers[5]=["Dragon","Rabbit","Dog","Hummingbird"];
quiz.correctAnswers[5]="Hummingbird";

var quSeq = quiz.questionSequence;

// questions with a random sequence
quiz.questions[quSeq[0]]="How many blue stripes are there on the U.S. flag?";
quiz.questions[quSeq[1]]="What is the name for the Jewish New Year?";
quiz.questions[quSeq[2]]="Which one of these characters is not friends with Harry Potter?";
quiz.questions[quSeq[3]]="What is the color of Donald Duck’s bowtie?";
quiz.questions[quSeq[4]]="What was the name of the band Lionel Richie was a part of?";
quiz.questions[quSeq[5]]="Which animal does not appear in the Chinese zodiac?";

function refresh(){

quiz.questionID = quiz.unsortedQuestions.indexOf(quiz.questions[quiz.questionNumber]);

quiz.currentCorrectAnswer = quiz.answers[quiz.questionID].indexOf(quiz.correctAnswers[quiz.questionID]);

// question id
console.log(quiz.questionID);
// index of answer in unsorted answer array
console.log(quiz.currentCorrectAnswer);

// current correct answer
console.log(quiz.correctAnswers[quiz.questionID]);
// index of randomised current correct answer
console.log(quiz.answerSequence.indexOf(quiz.currentCorrectAnswer));

document.getElementById("questionNo").innerHTML = (quiz.questionNumber+1) +" question id: "+ quiz.questionID;
document.getElementById("questionText").innerHTML = quiz.questions[quiz.questionNumber];

document.getElementById("answer1").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[0]];
document.getElementById("answer2").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[1]];
document.getElementById("answer3").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[2]];
document.getElementById("answer4").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[3]];

console.log(quiz.guesses);

}
refresh();

document.getElementById("solutionBox").style.display='none';
document.getElementById("resultsBox").style.display='none';

function submit(){
    var radios = document.getElementsByName('answer');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            if(i==quiz.answerSequence.indexOf(quiz.currentCorrectAnswer)){
                quiz.guesses[quiz.questionNumber]="Correct";
                document.getElementById("previousMark").innerHTML = "Correct";
            } else {
                quiz.guesses[quiz.questionNumber]="Incorrect";
                document.getElementById("previousMark").innerHTML = "Incorrect";
            }
            document.getElementById("prevAnswer").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[i]];
            radios[i].checked=false;
            // only one radio can be logically checked, don't check the rest
            break;
        } else {
            quiz.guesses[quiz.questionNumber]="Incorrect";
            document.getElementById("previousMark").innerHTML = "Incorrect";
        }
    }
    console.log(document.getElementById("solutionBox"));
    document.getElementById("solutionBox").style.display='';
    quiz.questionNumber++;
    console.log(quiz.guesses);
    if(quiz.questionNumber<quiz.questions.length){
        refresh();
    } else {
        document.getElementById("questionBox").style.display='none';
        document.getElementById("solutionBox").style.display='none';
        for(let i=0;i<quiz.guesses.length;i++){
            document.getElementById("resultsBox").innerHTML+='<div> Question '+i+': '+quiz.guesses[i]+'</div>';

        }
        document.getElementById("resultsBox").style.display='';
    }
    
}
