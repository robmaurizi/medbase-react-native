import React, { useState } from 'react';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from 'expo-google-sign-in';

const LoginScreen = () => {

    const [ isSignedIn, setSignedIn ] = useState( false );
    const [ signInInProcess, setSignInInProcess ] = useState( false );
    const [ userInfo, setUserInfo ] = useState( null )

    const signin = async () => {

        try { 
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo( userInfo );
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={ signin }
            disabled={ signInInProcess }
        />
    )
}

export default LoginScreen;