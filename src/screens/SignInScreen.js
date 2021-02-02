import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
  } from "react-native";

  import 'firebase/firestore';
  import firebase from 'firebase';

  import * as GoogleSignIn from 'expo-google-sign-in';

  const SignInScreen = ( {navigation} ) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onLoginSuccess = () => {
        navigation.navigate('People');
    };

    const onLoginFailure = (errorMessage) => {
        setErrorMessage(errorMessage);
        setLoading(false);
    };

    const renderLoading = ( loading ) => {
        if ( loading ) {
            return (
                <View><ActivityIndicator size={'large'} /></View>
            );
        }
    };

    const signInWithEmail = async () => {
        await firebase
            .auth()
                .signInWithEmailAndPassword(email, password)
                .then(
                    onLoginSuccess()
                ).catch(e => {
                    let errorCode = e.code;
                    let errorMessage = e.message;
                    if(errorCode === 'auth/weak-password') {
                        onLoginFailure( 'Weak Password!' );
                    } else {
                        onLoginFailure( errorMessage );
                    }
                });
    }

    const signInWithGoogle = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user }= await GoogleSignIn.signInAsync();
            const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
            if ( type === 'success' ) {
                await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accesstoken);
                const googleProfileData = await firebase.auth().signInWithCredential(credential);
                onLoginSuccess();
            }
        } catch(e) {
            console.log( e );
        }
    }

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss(); }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <Text style={{ fontSize: 32, fontWeight: '700', color: 'gray' }}>App Name</Text>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#B1B1B1"
                            returnKeyType="next"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            value={ email }
                            onChangeText={ setEmail }
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#B1B1B1"
                            returnKeyType="done"
                            textContentType="newPassword"
                            secureTextEntry={true}
                            value={ password }
                            onChangeText={ setPassword }
                            autoCapitalize="none"
                        />                    
                    </View>

                    { renderLoading() }

                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: "center",
                            color: "red",
                            width: "80%"
                        }}
                    >
                        { errorMessage }
                    </Text>

                    <TouchableOpacity
                        style={{ width: '86%', marginTop: 10 }}
                        onPress={ signInWithEmail }>
                        <Text>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{ width: "86%", marginTop: 10 }}
                        onPress={ signInWithGoogle }>
                        <View style={styles.googleButton}>
                            <Text
                            style={{
                                letterSpacing: 0.5,
                                fontSize: 16,
                                color: "#707070"
                            }}
                            >
                            Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>   

                    <View style={{ marginTop: 10 }}>
                        <Text
                            style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                            onPress={() => {
                            navigation.navigate("SignUp");
                            }}
                            >
                            Don't have an Account?
                        </Text>
                    </View>                                     

                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )

  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "86%",
      marginTop: 15
    },
    logo: {
      marginTop: 20
    },
    input: {
      fontSize: 20,
      borderColor: "#707070",
      borderBottomWidth: 1,
      paddingBottom: 1.5,
      marginTop: 25.5
    },
    button: {
      backgroundColor: "#3A559F",
      height: 44,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 22
    },
    googleButton: {
      backgroundColor: "#FFFFFF",
      height: 44,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 22,
      borderWidth: 1,
      borderColor: "#707070"
    }
  });

  export default SignInScreen;