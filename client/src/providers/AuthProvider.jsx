import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../contexts";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create a user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in a user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in with google
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // update a user's profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // reset user's password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // sign out the user
  const signOutUser = () => {
    setUser(null);
    setLoading(true);
    return signOut(auth);
  };

  // save user in database
  const saveUser = async (user) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      uid: user?.uid,
      email: user?.email,
      name: user?.displayName,
      avatar: user?.photoURL || "https://i.ibb.co/9H2PJ7h2/d43801412989.jpg",
      role: "General",
    });
    return data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          await saveUser(currentUser);
        } catch (err) {
          console.error("Error saving user: ", err.message);
        }
      }
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signInUser,
    googleSignIn,
    updateUserProfile,
    resetPassword,
    signOutUser,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
