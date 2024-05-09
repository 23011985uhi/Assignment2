import { doc, updateDoc, setDoc, getDoc} from "firebase/firestore";
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
  const [checkButtonText, setCheckButtonText] = useState("Check My Answer");
  const [attempts, setAttempts] = useState({
    answer1: 0,
    answer2: 0,
    answer3: 0,
    answer4: 0,
    answer5: 0,
  });

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const balancesRef = doc(db, "Hints", "Balances");
        const balancesSnapshot = await getDoc(balancesRef);
        const balancesData = balancesSnapshot.data();
        
        // Initialize the state with database values
        if (balancesData) {
          setAttempts(balancesData);
        }
      } catch (error) {
        console.error('Error fetching attempts:', error);
      }
    };

    fetchAttempts(); // Call the fetchAttempts function when the component mounts
  }, []); 

  

  const checkAnswer = (isCorrect, answer) => {
    if (isCorrect) {
      setIsAnswerCorrect(true);
      setCheckButtonClassName("btn btn-success p-4");
      setCheckButtonText("Correct");
    } else {
      setIsAnswerCorrect(false);
      setCheckButtonClassName("btn btn-danger p-4");
      setCheckButtonText("Wrong, try again");
    }
    setAttempts(prevAttempts => ({
      ...prevAttempts,
      [answer]: prevAttempts[answer] + 1,
      total: prevAttempts.total + 1
    }));
  };

  const resetButton = () => {
    setCheckButtonClassName("btn btn-primary p-4"); // Reset to default color
    setCheckButtonText("Check My Answer");
  };

  const handleSubmitAttempts = async () => {
    try {
        // Update attempt counts for each answer
        await Promise.all([
            updateAttemptCount("answer1", attempts.answer1),
            updateAttemptCount("answer2", attempts.answer2),
            updateAttemptCount("answer3", attempts.answer3),
            updateAttemptCount("answer4", attempts.answer4),
            updateAttemptCount("answer5", attempts.answer5),
        ]);

        console.log("Attempt counts updated successfully.");
    } catch (error) {
        console.error("Error updating attempt counts:", error);
    }
};

// Updated updateAttemptCount function without total attempt count
const updateAttemptCount = async (answerKey, count) => {
    const balancesRef = doc(db, "Hints", "Balances");
    try {
        // Update attempt count for the specific answer
        await setDoc(balancesRef, { [`${answerKey}`]: count }, { merge: true });

        console.log(`${answerKey} attempt count updated`);
    } catch (error) {
        console.error(`Error updating ${answerKey} attempt count:`, error);
    }
};

  return (
    <div className="col-12">
      <h3 className="text-center">Answers</h3>
      <div className="p-3 mb-2 bg-light">
        <div className="row">
          <div className="col-sm-6 d-grid gap-2">
            <Answer1 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer1')} resetButton={resetButton}/>
            <Answer3 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer3')} resetButton={resetButton}/>
            <Answer5 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer5')} resetButton={resetButton}/>
          </div>
          <div className="col-sm-6 d-grid gap-2">
            <Answer2 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer2')} resetButton={resetButton}/>
            <Answer4 onCheckAnswer={(isCorrect) => checkAnswer(isCorrect, 'answer4')} resetButton={resetButton}/>
            {/* Additional answers or components */}
            <button className='btn btn-link mb-2 p-4 w-100 d-block' disabled></button>
            <div></div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm text-center align-self-center">
            <button type="button" className={`${checkButtonClassName}`} onClick={handleSubmitAttempts}>
              {checkButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerSection;