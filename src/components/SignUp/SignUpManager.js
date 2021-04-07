import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";


export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleSignIn = () => {
    const google = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(google)
    .then( (result) => {
        const {displayName, email, photoURL} = result.user
        const signedInUser = {
        isSignedIn: true, 
        name: displayName, 
        email: email, 
        photo: photoURL,
        success: true
        }
        return signedInUser
    })
    .catch( (error) => {
        console.log(error);
        console.log(error.message);
    })
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then((res) => {
    //   console.log("User Name Updated Successfully");
    }).catch((error) => {
      console.log(error.message);
    });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.name = newUserInfo.displayName;
      newUserInfo.isSignedIn = true;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.isSignedIn = false;
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      console.log(error.message);
      return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.isSignedIn = true;
      newUserInfo.name = newUserInfo.displayName; 
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.isSignedIn = false;
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then( (res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        success: false
      }
      return signedOutUser
    })
    .catch((error) => {
      console.log(error);
    });
}