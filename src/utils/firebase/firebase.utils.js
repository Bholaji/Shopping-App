import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDU9AmnNSC_nzBMxyaXi00riCEFIBJQtWk",
    authDomain: "beejay-clothing-app.firebaseapp.com",
    projectId: "beejay-clothing-app",
    storageBucket: "beejay-clothing-app.appspot.com",
    messagingSenderId: "43671986937",
    appId: "1:43671986937:web:28089e7915ab5b5fdff828"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) =>
{
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapShot = await getDoc(userDocRef)

    if (!userSnapShot.exists())
    {
        const { displayName, email } = userAuth;
        const createdAt = Date.now()

        try
        {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error)
        {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}