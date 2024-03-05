import QuestionSection from "./questionSection";
import AnswerSection from "./answerSection";
import HintSection from "./hintSection";

function QuestionPage() {
  return (
  <div className= "container">
    <h1 className="text-center">Question Page</h1>
    <div className="row">
      <QuestionSection />
      <HintSection />
    </div>
    <div className="row">
      <AnswerSection />
    </div>
  </div>
  );
};

export default QuestionPage;