import { getAuth, signOut } from 'firebase/auth';

function Logout() {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <button className="btn btn-danger btn-sm fw-bold fs-5 px-4 py-2" style={{ marginLeft: 'auto',  }}  onClick={handleLogout}>
       Logout
      </button>
    </div>
  );
}

export default Logout;