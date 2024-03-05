import {db} from '../../services/firebase'
console.log(db)
import { collection, getDocs } from "firebase/firestore"; 
import {useState, useEffect} from 'react';

 function QuestionSection() {
  const [title, setTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const questionId = "balances"  
  
  useEffect(() => {
    // Inside useEffect, you should perform asynchronous operations like fetching data
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Questions"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          // Update state variables accordingly with doc data
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Since we don't have any dependencies in useEffect, leave the dependency array empty
  }, []);



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

