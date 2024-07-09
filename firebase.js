
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
  import {getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAfZgJxKGtv_qu78xEBCa3FTYiSknXACHQ",
    authDomain: "college-website-f9fef.firebaseapp.com",
    projectId: "college-website-f9fef",
    storageBucket: "college-website-f9fef.appspot.com",
    messagingSenderId: "1013382502739",
    appId: "1:1013382502739:web:c2cc40e9cc9ff1747269a6",
    measurementId: "G-300EWPK39E"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db=getFirestore();

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerText=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

document.getElementById("signup").addEventListener('click', (event)=>{
alert('Working');
const auth = getAuth();
const emailID = document.getElementById('email').value;
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
alert(emailID)
createUserWithEmailAndPassword(auth, emailID, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    const userData={
        email: emailID,
        username: username
    };

    showMessage('Account Created Successfully', 'register-form-feedback');
    const docRef=doc(db, "users", user.uid);
    setDoc(docRef,userData,{ merge: true })
    .then(()=>{
        window.location.href='login.html';
    })
    .catch((error)=>{
        console.error("error writing document", error);

    });
    // ...
  })
  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode=='auth/email-already-in-use'){
        showMessage('Email Address Already Exists !!!', 'register-form-feedback');
    }
    else{
        showMessage('unable to create User', 'signUpMessage');
    }
})
});


 const signIn=document.getElementById('signIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const emailID=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, emailID,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href="profile.html";
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })