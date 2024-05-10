import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc, onSnapshot } from "firebase/firestore"; 
import {useState, useEffect} from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './answer4.css'


const Answer4 = ({ onCheckAnswer, resetButton, answerKey, checkAnswer }) => {
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
          const answer4Data = balancesData.answers.answer4;
          setAnswer({ text: answer4Data.text, correct: answer4Data.correct });
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
          const attempts = hintData.answer4 || 0;
          const totalAttempts = hintData.undefined || 0;
          setAttempts(attempts);
          setTotalAttempts(totalAttempts);
  
          console.log(attempts);
          console.log(totalAttempts);
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
        const attempts = hintData.answer4 || 0;
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
        <span className="button-content"><InlineMath math={answer.text} /></span>
        <span className="additional-text">{percentage ? `${percentage.toFixed(0)}%` : ''}</span>
      </button>
  </div>
  );
};
export default Answer4;