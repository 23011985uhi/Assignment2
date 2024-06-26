import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function Login() {
  return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    <div style={{ display:'flex', flex:1, justifyContent:'center', alignItems:'center', minWidth:300 }}>
      <button className="btn btn-danger fw-bold fs-5 px-4 py-2"
      onClick={async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            console.log(user);
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
        }
      }>
      Login With Google</button>
    </div>
  </div>
  )
}

export default Login;