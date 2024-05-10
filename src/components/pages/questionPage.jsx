import QuestionSection from "./questionSection";
import AnswerSection from "./answerSection";
import HintSection from "./hintSection";
import Logout from './logout'
import {useAuth} from './authContext'

function QuestionPage() {
  const { user } = useAuth();

  return (
  <div className= "container">
    <h3 className="fs-5 px-4 py-2">Welcome, {user.displayName}</h3>
    <h1 className="text-center">Balances Problem</h1>
    <Logout />
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