import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import './sign-in-form.style.scss'

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () =>
{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const resetFormFields = () =>
    {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () =>
    {
        await signInWithGooglePopup();

    }


    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        try
        {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error)
        {
            switch (error.code)
            {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('incorrect password for email');
                    break;
                default:
                    console.log(error)
            }
        }
    };

    const handleChange = (event) =>
    {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type="email"
                    required
                    name='email'
                    value={email}
                    onChange={handleChange}

                />

                <FormInput
                    label='Password'
                    type="password"
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}

                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>

    )
}

export default SignInForm