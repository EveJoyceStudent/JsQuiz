var quiz = {
    questions:[],
    answers:[],
    questionSequence:[],
    answerSequence:[],
    correctAnswers:[],
    maxanswers:0,
    questionID:0,
    questionNumber:0,
    currentCorrectAnswer:0,
    guesses:[]
};

// question order before randomisation
if(Math.random()<.75){
    quiz.questions.push("What is the name for the Jewish New Year?");
    quiz.answers.push(["Hanukkah","Yom Kippur","Kwanza","Rosh Hashanah"]);
    quiz.correctAnswers.push("Rosh Hashanah");
}

if(Math.random()<.75){
quiz.questions.push("How many blue stripes are there on the U.S. flag?");
quiz.answers.push(["6","7","13","0","10"]);
quiz.correctAnswers.push("0");
}

if(Math.random()<.75){
quiz.questions.push("Which one of these characters is not friends with Harry Potter?");
quiz.answers.push(["Ron Weasley","Draco Malfoy","Hermione Granger"]);
quiz.correctAnswers.push("Draco Malfoy");
}

if(Math.random()<.75){
// quiz.questions.push("What is the color of Donald Duck’s bowtie?");
// quiz.answers.push(["Red","Yellow","Blue","White"]);
// quiz.correctAnswers.push("Red");
}

if(Math.random()<.75){
quiz.questions.push("What was the name of the band Lionel Richie was a part of?");
quiz.answers.push(["King Harvest","Spectrums","Commodores","The Marshall Tucker Band"]);
quiz.correctAnswers.push("Commodores");
}

if(Math.random()<.75){
quiz.questions.push("Which animal does not appear in the Chinese zodiac?");
quiz.answers.push(["Dragon","Rabbit","Dog","Hummingbird","Goat"]);
quiz.correctAnswers.push("Hummingbird");
}

if(Math.random()<.75){
// quiz.questions.push("What is 3?");
// quiz.answers.push(["1","2","3","4"]);
// quiz.correctAnswers.push("3");
}

if(Math.random()<.75){
// quiz.questions.push("What is 2?");
// quiz.answers.push(["1","2","3","4","5"]);
// quiz.correctAnswers.push("2");
}

if(Math.random()<.75){
// quiz.questions.push("What is 1?");
// quiz.answers.push(["1","2","3"]);
// quiz.correctAnswers.push("1");
}

if(Math.random()<.75){
// quiz.questions.push("What is 1?");
// quiz.answers.push(["1","200"]);
// quiz.correctAnswers.push("1");
}

for(var i=0;i<quiz.questions.length;i++){
    // create a sequence which will hold the randomisation order of the questions
    quiz.questionSequence[i]=i;
    // find out the number of answers for the question with the most answers
    if(quiz.answers[i].length>quiz.maxanswers){
        quiz.maxanswers=quiz.answers[i].length;
    }
}

// generate the answer buttons
for(var i=0;i<quiz.maxanswers;i++){
    document.getElementById("answers").innerHTML += '<input type="radio" id="radio'+(i+1)+'" name="answer" value="answer'+(i+1)+'">\n<label id="answer'+(i+1)+'" for="radio'+(i+1)+'">Answer '+(i+1)+'</label><br id="br'+(i+1)+'">';
}

// randomise answers (need to do once per quiz)
for(let i=quiz.questionSequence.length-1;i>-1;i--){
    const j = Math.floor(Math.random()*i)
    const temp = quiz.questionSequence[i]
    quiz.questionSequence[i]=quiz.questionSequence[j]
    quiz.questionSequence[j]=temp
}

// call this function to set up each question
function refresh(){
 
    console.log("question number: "+quiz.questionNumber)
    
    // question id
    quiz.questionID = quiz.questionSequence.indexOf(quiz.questionNumber);
    console.log("question id: "+quiz.questionID);

    // create a sequence which will hold the randomisation order of the answers
    quiz.answerSequence=[];
    for(var i=0;i<quiz.answers[quiz.questionID].length;i++){
        quiz.answerSequence.push(i);
    }
    
    // randomise answers for this question
    for(let i=quiz.answerSequence.length-1;i>-1;i--){
        const j = Math.floor(Math.random()*i)
        const temp = quiz.answerSequence[i]
        quiz.answerSequence[i]=quiz.answerSequence[j]
        quiz.answerSequence[j]=temp
    }

    // index of answer in unsorted answer array
    quiz.currentCorrectAnswer = quiz.answers[quiz.questionID].indexOf(quiz.correctAnswers[quiz.questionID]);
    // console.log(quiz.currentCorrectAnswer);

    // current correct answer
    console.log("correct answer: "+quiz.correctAnswers[quiz.questionID]);
    // index of randomised current correct answer
    console.log("answer number: "+((quiz.answerSequence.indexOf(quiz.currentCorrectAnswer))+1));

    document.getElementById("questionNo").innerHTML = (quiz.questionNumber+1)+" of "+quiz.questions.length;
    document.getElementById("questionText").innerHTML = quiz.questions[quiz.questionID];

    for(var i=0;i<quiz.maxanswers;i++){
        
        if(typeof quiz.answers[quiz.questionID][i] === 'undefined'){
            document.getElementById("answer"+(i+1)).style.display='none';
            document.getElementById("radio"+(i+1)).style.display='none';
            document.getElementById("br"+(i+1)).style.display='none';
        } else {
            document.getElementById("answer"+(i+1)).innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[i]];
            document.getElementById("answer"+(i+1)).style.display='inline';
            document.getElementById("radio"+(i+1)).style.display='inline';
            document.getElementById("br"+(i+1)).style.display='inline';
        }
    }

    // document.getElementById("answer1").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[0]];
    // document.getElementById("answer2").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[1]];
    // document.getElementById("answer3").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[2]];
    // document.getElementById("answer4").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[3]];

    console.log(quiz.guesses);

}

// set up the first question on load
refresh();

// hide the answer sections (on load) i.e. before you have any answers
document.getElementById("solutionBox").style.display='none';
document.getElementById("resultsBox").style.display='none';

//call these on a correct 
function correct(){
    quiz.guesses[quiz.questionNumber]="Correct";
    document.getElementById("previousMark").innerHTML = "Correct";
    document.getElementById("previousMark").style.color='yellowgreen';
    document.getElementById("contestantBox").style.backgroundImage='url("./images/GirlExcited.png")';
}

function incorrect(){
    quiz.guesses[quiz.questionNumber]="Incorrect";
    document.getElementById("previousMark").innerHTML = "Incorrect";
    document.getElementById("previousMark").style.color='red';
    document.getElementById("contestantBox").style.backgroundImage='url("./images/GirlAngry.png")';
}

function submit(){

    // check answer
    var radios = document.getElementsByName('answer');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            if(i==quiz.answerSequence.indexOf(quiz.currentCorrectAnswer)){
                correct();
            } else {
                incorrect();
            }
            document.getElementById("prevAnswer").innerHTML = quiz.answers[quiz.questionID][quiz.answerSequence[i]];
            radios[i].checked=false;
            // only one radio can be logically checked, don't check the rest
            break;
        } else {
            incorrect();
            document.getElementById("prevAnswer").innerHTML = "No Answer";
        }
    }
    // only want the prev answer/correct/incorrect to display after submitting an answer
    document.getElementById("solutionBox").style.display='';

    // move to next question
    quiz.questionNumber++;

    // if there are still questions, continue
    if(quiz.questionNumber<quiz.questions.length){
        refresh();
    
    // if there aren't questions, you're done with the quiz
    } else {
        document.getElementById("contestantBox").style.backgroundImage='url("./images/GirlHappy.png")';
        document.getElementById("questionBox").style.display='none';
        document.getElementById("solutionBox").style.display='none';
        var color='';
        var score=0;
        for(let i=0;i<quiz.guesses.length;i++){
            if(quiz.guesses[i]=='Correct'){
                color='yellowgreen';
                score++;
            } else {
                color='red';
            }
            document.getElementById("resultsBox").innerHTML+='<h3 style="color:'+color+'"> Question '+(i+1)+': '+quiz.guesses[i]+'</h3>';
        }
        document.getElementById("resultsBox").innerHTML+='<h3> Score: '+score+'</h3>';
        document.getElementById("resultsBox").style.display="block";
        document.getElementById("restartBox").style.display='block';
    }
    
}   

