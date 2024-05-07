import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc } from "firebase/firestore"; 
import {useState, useEffect} from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const Answer3 = () => {
  const [answer, setAnswer] = useState({ text: "", correct: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Answers", "balances");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const answerData = docSnap.data();
          const balancesData = answerData.balances; 
          const answer3Data = balancesData.answers.answer3;
          setAnswer({ text: answer3Data.text, correct: answer3Data.correct });
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
export default Answer3;