
import {useState, useEffect} from 'react';
import Answer1 from '../Answers/answer1';
import Answer2 from '../Answers/answer2';
import Answer3 from '../Answers/answer3';
import Answer4 from '../Answers/answer4';
import Answer5 from '../Answers/answer5';

function AnswerSection() {

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [checkButtonClassName, setCheckButtonClassName] = useState("btn btn-primary p-4");
  const [checkButtonText, setCheckButtonText] = useState("Check My Answer");

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      setIsAnswerCorrect(true);
      setCheckButtonClassName("btn btn-success p-4");
      setCheckButtonText("Correct");
    } else {
      setIsAnswerCorrect(false);
      setCheckButtonClassName("btn btn-danger p-4");
      setCheckButtonText("Wrong, try again");
    }
  };

  const resetButton = () => {
    setCheckButtonClassName("btn btn-primary p-4"); // Reset to default color
    setCheckButtonText("Check My Answer");
  };
 

  return(
  <div className="col-12">
    <h3 className="text-center">Answers</h3>
    <div className="p-3 mb-2 bg-light">
      <div className="row">
        <div className="col-sm-6 d-grid gap-2">
          <Answer1 onCheckAnswer={checkAnswer} resetButton={resetButton}/>
          <Answer3 onCheckAnswer={checkAnswer} resetButton={resetButton}/>
          <Answer5 onCheckAnswer={checkAnswer} resetButton={resetButton}/>
        </div>
        <div className="col-sm-6 d-grid gap-2">
          <Answer2 onCheckAnswer={checkAnswer} resetButton={resetButton}/>
          <Answer4 onCheckAnswer={checkAnswer} resetButton={resetButton}/>
          <button className='btn btn-link mb-2 p-4 w-100 d-block'disabled></button>
          <div></div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm text-center align-self-center">
          <button type="button" className={`${checkButtonClassName}`} onClick={() => checkAnswer(isAnswerCorrect)}>
              {checkButtonText}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AnswerSection;