import { createSwitchNavigator } from 'react-navigation';

import LoadingScreen from './LoadingScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';

const AuthNavigator = createSwitchNavigator({
        Loading: { screen: LoadingScreen },
        SignUp: { screen: SignUpScreen },
        SignIn: { screen: SignInScreen }
    },
    {
        initialRouteName: 'Loading'
    }
);

export default AuthNavigator;