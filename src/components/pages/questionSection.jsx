import {db} from '../../services/firebase'
//console.log(db)
import { doc, getDoc } from "firebase/firestore"; 
import {useState, useEffect} from 'react';

 function QuestionSection() {
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const questionId = "balances"  
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const docRef = doc(db, "Questions", "balances");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const questionData = docSnap.data();
          const balancesData = questionData[questionId];
          setTitle(balancesData.balances.questions.title);
          setQuestionText(balancesData.balances.questions.fullquestion.question);
          setImageUrl(balancesData.balances.questions.fullquestion.questionImage);
          //console.log("Document data:", questionData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [questionId]); // Adding questionId to the dependency array to re-fetch data when it changes

  
  

  return (
  <div className="col-sm">
        <h3 className="text-center">{title}</h3>
        <div className="p-3 mb-2 bg-light">
          <div className="text-center">
            <img className="mb-4 rounded img-fluid" src={imageUrl} />
          </div>
          <p>{questionText}</p>
        </div>
  </div>
  );
};

export default QuestionSection;

