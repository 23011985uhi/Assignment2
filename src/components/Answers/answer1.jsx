import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc } from "firebase/firestore"; 
import {useState, useEffect} from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';


const Answer1 = ({ onCheckAnswer, resetButton }) => {
  const [answer, setAnswer] = useState({ text: "", correct: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Answers", "balances");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const answerData = docSnap.data();
          const balancesData = answerData.balances; 
          const answer1Data = balancesData.answers.answer1;
          setAnswer({ text: answer1Data.text, correct: answer1Data.correct });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  const checkAnswer = () => {
    onCheckAnswer(answer.correct);
    resetButton(); // Call the resetButton function
  };
  
  return (
    <div>
      <button type="button" className="btn btn-secondary mb-2 p-4 w-100 d-block" onClick={checkAnswer}><InlineMath math={answer.text} /></button>
      {/* You can render other components based on answer.correct if needed */}
    </div>
  );
};
export default Answer1;