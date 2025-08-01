import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth, onAuthStateChanged,
    signInWithEmailAndPassword, signOut
    , GoogleAuthProvider, signInWithPopup
} from "firebase/auth";
import { app } from '../Firebase/firebase.config.js'; // ✅ Make sure you're importing your Firebase config

const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => { // ✅ Should be lowercase `children`
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Google Sign-In
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user; // user information after sign-in
            setUser(user);
            return result;
        } catch (error) {
            console.error("Error signing in with Google: ", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth); // ✅ This returns a Promise
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            //('Current user:', currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // ✅ Just call unsubscribe here
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle

    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
