import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc } from "firebase/firestore"; 
import {useState, useEffect} from 'react';
import Answer1 from '../Answers/answer1';
import Answer2 from '../Answers/answer2';
import Answer3 from '../Answers/answer3';
import Answer4 from '../Answers/answer4';


function AnswerSection() {
  const [text, setText] = useState("");
  const [correctValue, setCorrectValue] = useState("");
  
  const answerId = "balances"

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Answers", "balances");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const answerData = docSnap.data();
          const balancesData = answerData[answerId];
          setText(balancesData.answers.answer5.text);
          setCorrectValue(balancesData.answers.answer5.correct);
          
          //console.log("Document data:", questionData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 

  return(
  <div className="col-12">
    <h3 className="text-center">Answers</h3>
    <div className="p-3 mb-2 bg-light">
      <div className="row">
        <div className="col-sm d-grid gap-2">
          <button type="button" className="btn btn-secondary mb-2 p-4"><Answer1 /></button>
          <button type="button" className="btn btn-secondary mb-2 p-4"><Answer3 /></button>
          <button type="button" className="btn btn-secondary mb-2 p-4">{text}</button>
          
        </div>
        <div className="col-sm d-grid gap-2">
          <button type="button" className="btn btn-secondary mb-2 p-4"><Answer2 /></button>
          <button type="button" className="btn btn-secondary mb-2 p-4"><Answer4 /></button>
          <button type="button" className="btn btn-link mb-2 p-4 "></button>
        </div>
        
      </div>
      <div className="row">
        <div className="col-sm text-center align-self-center">
          <button type="button" className="btn btn-primary p-4">Check My Answer</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AnswerSection;