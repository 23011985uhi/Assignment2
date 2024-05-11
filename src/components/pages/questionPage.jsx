import QuestionSection from "./questionSection";
import AnswerSection from "./answerSection";
import HintSection from "./hintSection";
import Logout from './logout'
import AdminPage from './admin/adminPage'
import {useAuth} from './authContext'
import { useState } from "react";

function QuestionPage() {
  const { user, isAdmin } = useAuth();
  const [adminPageOpen, setAdminPageOpen] = useState(false);

  const openAdminPage = () => {
    setAdminPageOpen(true);
  };

  const closeAdminPage = () => {
    setAdminPageOpen(false);
  };
  

  return (
  <div className= "container">
    <h3 className="fs-5 px-4 py-2">Welcome, {user.displayName}</h3>
    <h1 className="text-center">Balances Problem</h1>
    {isAdmin && ( // Render button only if isAdmin is true
        <button onClick={openAdminPage} className="btn btn-lg btn-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
          A
        </button>
      )}
    <AdminPage isOpen={adminPageOpen} onClose={closeAdminPage} />
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