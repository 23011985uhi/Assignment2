import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc } from "firebase/firestore"; 
import {useState, useEffect} from 'react';



const Answer5 = ({ onCheckAnswer, resetButton }) => {
  const [answer, setAnswer] = useState({ text: "", correct: false });

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

  const checkAnswer = () => {
    onCheckAnswer(answer.correct);
    resetButton(); // Call the resetButton function
  };
  
  return (
    <div>
        <button type="button" className="btn btn-secondary mb-2 p-4 w-100 d-block " onClick={checkAnswer}>{answer.text}</button>
      {/* You can render other components based on answer.correct if needed */}
    </div>
  );
};
export default Answer5;