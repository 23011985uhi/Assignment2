import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc } from "firebase/firestore"; 
import {useState, useEffect} from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Answer2 = () => {
  const [answer, setAnswer] = useState({ text: "", correct: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Answers", "balances");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const answerData = docSnap.data();
          const balancesData = answerData.balances; 
          const answer2Data = balancesData.answers.answer2;
          setAnswer({ text: answer2Data.text, correct: answer2Data.correct });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div>
      <InlineMath math={answer.text} />
      {/* You can render other components based on answer.correct if needed */}
    </div>
  );
};
export default Answer2;