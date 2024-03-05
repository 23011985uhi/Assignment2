import {firestore} from '../../services/firebase';
console.log(firestore)
import {useState, useEffect} from 'react';

function QuestionSection() {
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const questionId = "balances"

  useEffect(() => {
    const fetchData= async () => {
      try {
        const snapshot = await firestore.collection("Questions").doc(questionId).get();
        const questionData = snapshot.data();
        console.log(questionData)
        setTitle(questionData.title);
        setQuestionText(questionData.question);
        setImageUrl(questionData.questionImage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
}, [firestore, questionId]);

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