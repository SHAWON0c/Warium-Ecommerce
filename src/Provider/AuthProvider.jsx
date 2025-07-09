import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from '../Firebase/firebase.config.js'; // ✅ Make sure you're importing your Firebase config

const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => { // ✅ Should be lowercase `children`
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser =(auth, email, password)=>{
        return createUserWithEmailAndPassword(auth,email,password);

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current user:', currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // ✅ Just call unsubscribe here
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
