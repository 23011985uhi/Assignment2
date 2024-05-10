import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc, onSnapshot } from "firebase/firestore"; 
import {useState, useEffect} from 'react';
import './answer5.css'


const Answer5 = ({ onCheckAnswer, resetButton, answerKey, checkAnswer }) => {
  const [answer, setAnswer] = useState({ text: "", correct: false });
  const [attempts, setAttempts] = useState(null);
  const [totalAttempts, setTotalAttempts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Answers", "balances");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const answerData = docSnap.data();
          const balancesData = answerData.balances; 
          const answer5Data = balancesData.answers.answer5;
          setAnswer({ text: answer5Data.text, correct: answer5Data.correct });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "Hints", "Balances");
  
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const hintData = docSnap.data();
          const attempts = hintData.answer5 || 0;
          const totalAttempts = hintData.undefined || 0;
          setAttempts(attempts);
          setTotalAttempts(totalAttempts);
  
         // console.log(attempts);
         // console.log(totalAttempts);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    // Add listener for document changes
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const hintData = doc.data();
        const attempts = hintData.answer5 || 0;
        const totalAttempts = hintData.undefined || 0;
        setAttempts(attempts);
        setTotalAttempts(totalAttempts);
      } else {
        console.log("No such document!");
      }
    });
  
    // Clean up listener
    return () => unsubscribe();

  }, []);

  const percentage = attempts && totalAttempts ? (attempts / totalAttempts) * 100 : null;

  const handleAnswerClick = () => {
    onCheckAnswer(answer.correct, answerKey);
    resetButton(); // Call the resetButton function
    checkAnswer(answer.correct);
  };
  
  return (
    <div>
     <button type="button" className="btn btn-secondary mb-2 p-4 w-100 d-block relative-button" onClick={handleAnswerClick}>
        <span className="button-content">{answer.text}</span>
        <span className="additional-text">{percentage ? `${percentage.toFixed(0)}%` : ''}</span>
      </button>
    </div>
  );
};
export default Answer5;