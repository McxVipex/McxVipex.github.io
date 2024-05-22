let bgOuPas = false;
function encouragement(){
    document.getElementById("Dorian").style.background = "rgb(255,255,255,0.8)"; // pour que le texte qui présente Dorian reste lisible
    document.getElementById("Cassandree").style.background = "rgb(255,255,255,0.8)"; // pour que le texte qui présente Cassandre reste lisible
    if(bgOuPas == false){
        if(confirm('ALLER LES BLEUS !!!')){
            document.body.style.backgroundImage = "url(image2/confetis.jpg)";
            bgOuPas = true;
        }
    }else{
        if(confirm('Enlever les confetti 😭')){
            document.body.style.backgroundImage = "";
            bgOuPas = false;
        }
    }
}
// ------------------ Quiz ------------------------------- //

const questions  = [     //on définit une constante avec les questions et leur réponses respectives
    {
        question : "Où est ce que je dois me mettre dans un concert ?",
        answers : [
            { text: "Au premier rang", correct: false}, // on définit les réponses avec deux éléments
            { text: "Loin du premier rang", correct: true}, // un élément text avec le texte de la réponse
            { text: "S'éloigner au maximum", correct: true}, // un élément correct avec la véracité de la réponse
            { text: "Devant les enceintes", correct: false}, // pour cela on utilise un booléen
        ]
    },
    {
        question : "Qu'est ce que je cherche à éviter ?",
        answers : [
            { text: "Les traumatismes", correct: true},
            { text: "Réduire le niveau de son", correct: false},
            { text: "Les dégats définitifs", correct: true},

        ]
    },
    {
        question : "Comment faire pour éviter cela ?",
        answers : [
            { text: "Mettre des écouteurs", correct: false},
            { text: "Porter des bouchons d'oreille", correct: true},
            { text: "Aller à des concerts une fois par semaine", correct: false},
        ]
    },
    {
        question : "En cas de problème que faire ?",
        answers : [
            { text: "Voir un docteur", correct: true},
            { text: "Rester chez soi", correct: false},
            { text: "Aller à un autre concert", correct: false},
        ]
    },
]

const questionElement = document.getElementById('question'); // on définit une constante qui prend l'élément d'id question
const answerButtons = document.getElementById('answer-btn'); // on définit une constante qui prend l'élément d'id answer-btn
const nextButton = document.getElementById('next-btn');      // on définit une constante qui prend l'élément d'id next-btn
const returnBtn = document.getElementById('return-btn')      // on définit une constante qui prend l'élément d'id return-btn

let currentQuestionIndex = 0; // cette variable sert à savoir à quel question on est arrivé
let score = 0; // cette variable permet de calculer le score

function startQuiz(){  // la fonction startQuiz est la fonction principale du quiz elle comporte toutes les autres
    returnBtn.style.display = 'none';
    nextButton.innerHtml = 'Suivant'; // on change le texte du bouton pouru passer à la prochaine question à : Suivant
    currentQuestionIndex = 0; //au début du quiz on définit la queestion à la première question
    score = 0; // de même pour le score on est seulement on train de les initialiser
    showQuestion(); // après l'initialisation on montre les questions
};

function showQuestion(){ //cette fonction sert à afficher les questions
    resetState(); //on commence pas initialiser les réponses aussi
    let currentQuestion = questions[currentQuestionIndex]; //on selectionne la question d'index currentQuestionIndex
    let questionNo = currentQuestionIndex + 1; // on rajoute 1 à cet index qui commence par 0 pour l'écrire ensuite
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; //on écrit le numéro de la question, un point, ensuite la question

    currentQuestion.answers.forEach(answer => {  // cette fonction va se répter pour chaque réponse et dans cette boucle currentQuestion.answers va devenir answer
        const button = document.createElement("button"); // créer un élement bouton
        button.innerHTML = answer.text; //on va donner à ce bouton le text des réponses possibles
        button.classList.add("btn"); //ensuite on lui attribue la classe btn
        answerButtons.appendChild(button); //on va rajouter ce bouton au boutons de réponses
        if(answer.correct){
            button.dataset.correct = answer.correct; //on récupère la valeur true si la réponse est correcte
        }
        button.addEventListener('click', selectAnswer); //on attribue à ce bouton la fonction selectAnswer quand on clique dessus
    })
};

function resetState(){ //cette fonction sert à initialiser les réponses
    nextButton.innerHTML = 'Suivant';
    nextButton.style.display = "none"; //on commence par cacher le bouton suivant
    while(answerButtons.firstChild){ //si les réponses ont un premmier élément
        answerButtons.removeChild(answerButtons.firstChild); //on le supprime
    }
};

function selectAnswer(e){ //cette fonction sert à montrer la bonne et mauvaise réponse
    const selectedBtn = e.target; //on crée une constante à chaque fois avec la réponse cliquée
    const isCorrect = selectedBtn.dataset.correct === "true"; //cette fonction est uniquement défini par les réponses correctes cliquées
    if(isCorrect){
        selectedBtn.classList.add("correct"); //si la réponse est correcte on attribue à son bouton la classe correct
        score++; //et on rajoute le score
    }else{
        selectedBtn.classList.add("incorrect"); //sinon on lui attribue la classe incorrect
    }
    Array.from(answerButtons.children).forEach(button => { //on rajoute à toutes les autres bouton non cliquées la classe correct si ils le sont
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        };
        button.disabled = true; //ensuite on desactive les boutons
    });
    nextButton.style.display = 'block' //et on affiche le bouton suivant
};

function showScore(){ //cette fonction sert à montrer le score à la fin du quiz
    resetState(); //encore une fois on enlève toutes les réponses possibles
    if(score === 5){
        questionElement.innerHTML = `Ton score est de ${score} sur ${questions.length}! Eh bah dis donc vous avez tous compris.`; //on change l'élement question en le score atteint
    }else{
        questionElement.innerHTML = `Ton score est de ${score} sur ${questions.length}! N'oubliez pas de revoir ceux que vous avez raté 👍.`; //on change l'élement question en le score atteint
    }
    nextButton.innerHTML = 'Recommencer'; //on chanche le bouton suivant en un bouton recommencez
    nextButton.style.display = 'block'; //et on l'affiche
    returnBtn.innerHTML = 'Retour au site'; //on change le test du bouton de retour en Retourner
    returnBtn.style.display = 'block';
}


function handleNextQuestion(){ //cette fonction sert à afficher des nouvelles questions / réponses jusqu'à ce qu'il y'en a plus
    currentQuestionIndex++; //on ajoute un au compteur de questions
    if(currentQuestionIndex < questions.length){ //si il reste encore des questions
        showQuestion(); //on affiche la questions suivant
    }else{
        showScore(); // sinon on affiche le score
    }
}

nextButton.addEventListener('click', () =>{
    if(currentQuestionIndex < questions.length){
        handleNextQuestion(); //si il reste encore des questions, quand on clique sur le bouton ça affiche les questions suivantes grâce à la question précédente
    }else{
        startQuiz(); // sinon si il y'a plus de questions on redémarre le quiz
    }
})

startQuiz(); //on execute la fonction pour afficher le tout
