import { doc, updateDoc, setDoc, getDoc, increment} from "firebase/firestore";
import {db} from '../../services/firebase'
import {useState, useEffect} from 'react';
import Answer1 from '../Answers/answer1';
import Answer2 from '../Answers/answer2';
import Answer3 from '../Answers/answer3';
import Answer4 from '../Answers/answer4';
import Answer5 from '../Answers/answer5';




function AnswerSection() {

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [checkButtonClassName, setCheckButtonClassName] = useState("btn btn-primary p-4");
  const [checkButtonText, setCheckButtonText] = useState("Select an Answer");
  



  const checkAnswer = async (isCorrect, answerKey) => {
    if (isCorrect) {
      setIsAnswerCorrect(true);
      setCheckButtonClassName("btn btn-success p-4");
      setCheckButtonText("Correct");
    } else {
      setIsAnswerCorrect(false);
      setCheckButtonClassName("btn btn-danger p-4");
      setCheckButtonText("Wrong, try again");
    }
    updateAttemptInFirestore(answerKey);
   
  };

  const updateAttemptInFirestore = async (answerKey) => {
   // console.log(`Updating ${answerKey}...`);
    const balancesRef = doc(db, "Hints", "Balances");
    try {
      await updateDoc(balancesRef, {
        [answerKey]: increment(1)
      });
     // console.log("Attempt count updated successfully");
    } catch (error) {
      console.error("Error updating attempt count:", error);
    }
  };


  
  const resetButton = () => {
    setIsAnswerCorrect(false);
    setCheckButtonClassName("btn btn-primary p-4"); // Reset to default color
    setCheckButtonText("Check My Answer");
  };

 

  return(
    <div className="col-12">
      <h3 className="text-center">Answers</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">
          <div className="col-sm-6 d-grid gap-2">
            <Answer1 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer1')} resetButton={resetButton} checkAnswer={checkAnswer} answerKey="answer1"/>
            <Answer3 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer3')} resetButton={resetButton} checkAnswer={checkAnswer} answerKey="answer3"/>
            <Answer5 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer5')} resetButton={resetButton} checkAnswer={checkAnswer} answerKey="answer5"/>
          </div>
          <div className="col-sm-6 d-grid gap-2">
            <Answer2 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer2')} resetButton={resetButton} checkAnswer={checkAnswer} answerKey="answer2"/>
            <Answer4 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer4')} resetButton={resetButton} checkAnswer={checkAnswer} answerKey="answer4"/>
            <button className='btn btn-link mb-2 p-4 w-100 d-block' disabled></button>
            <div></div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm text-center align-self-center">
            <button type="button" className={`${checkButtonClassName}`} >
              {checkButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerSection;