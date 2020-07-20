import React from 'react'
import {View,Text,StyleSheet,ImageBackground,Image,KeyboardAvoidingView} from 'react-native'
import {Container, Content, Form,Item,Label,Input,Button,Icon, Thumbnail,Header, Footer} from 'native-base'
import {Actions} from 'react-native-router-flux'
import {firebaseApp,firestoreDB} from '../../util/Firebase'
import { YellowBox } from 'react-native';
import Spinner from '../components/Spinner'

const bkg_img = require('../../util/images/login_bg_image.png')

class LoginScreen extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            email: '',
            pwd: '',
            loading: false, //set to false for - Activity Indicator
        }

        // Workaround for the Issue - https://github.com/firebase/firebase-js-sdk/issues/97 -Issue still prevails in Firebase - android platform
        YellowBox.ignoreWarnings(['Setting a timer']);
    }
 
    componentDidMount(){
        firebaseApp.auth().onAuthStateChanged( result =>{
            if (result){
                const user =  firebaseApp.auth().currentUser
                Actions.home() // If user already Signed In - Navigate to Home Page directly - after opening the App
            }
            
        })
    }



    //Helper Method to Handle Signing In of the User
    handleSignIn(){

        const {email, pwd, loading} = this.state

        if (!this.checkFields()){ // Check whether the Fields are empty
            alert("Email / Password value Missing")
            return false
        }

        this.setState({loading: true}) // Spinner  - loaded

        firebaseApp.auth().signInWithEmailAndPassword(
            email, pwd
        ).then(result =>{
            console.log(result)
            console.log("Provider :"+result.additionalUserInfo.providerId)
            console.log("Provider User Name:"+result.user.displayName)

            this.setState({loading :false}) // Spinner - stopped
            Actions.home(); //navigate to Home Screen
        }).catch(error =>{
            alert(error)
            this.setState({loading: false}) //Spinner - stopped
        })

        
    }

    // Check whether the Fields are empty
    checkFields(){
        const {email, pwd} = this.state
        
        if(email !=='' && pwd !== ''){
            return true;
        }
            
        return false;
    }

    handleLoading(){
        if(this.state.loading){
            return(
                <Spinner />
            )
        }

        return(
            <Button rounded
                 style={styles.signinBtn}
                onPress={()=>{
                     this.handleSignIn();
                }}
            >
                <Text style={{fontSize: 18}}>Sign In</Text>
            </Button>
        )
        
    
    }


    render(){
    
        return(
            <Container>
                
                <Content>
                    <KeyboardAvoidingView
                        behavior='padding'
                    >
                                        
                        <Form style={styles.formStyle}>
                        <Image
                            style={{width: '100%', height: 200, resizeMode: "contain", opacity: 0.7 ,marginBottom: 30}}
                            source={require('../../util/images/logo_img.jpg')}
                        />
                            <Item>
                                <Label>Email ID</Label>
                                <Input 
                                    value={this.state.email}
                                    onChangeText={(email)=>this.setState({email: email })}
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                />
                            </Item>
                            <Item>
                                <Label>Password</Label>
                                <Input
                                    value={this.state.pwd}
                                    onChangeText={(pwd)=>this.setState({pwd: pwd })}
                                    secureTextEntry={true}
                                    
                                />
                            </Item>
                            <View>
                                 {this.handleLoading()}
                            </View>
                            <Button rounded 
                                style={styles.signoutBtn}
                                onPress={()=>{
                                    Actions.signup();
                                }}
                            >
                                <Text style={{fontSize: 18}}>New User? Sign Up</Text>
                            </Button>
                        </Form>
                   
                   
                        </KeyboardAvoidingView>
                        
                </Content>
                <Footer style={styles.headerstyle} >
                    <Button style={{backgroundColor: "#c3e5ae"}} transparent>
                        <Text style={{fontSize: 18,color:'white'}}>Forgot Password?</Text>
                    </Button>
                </Footer>
            </Container>
            
               
                    
               
            
           
                    
             
        );
    }

}

const styles= StyleSheet.create({
    headerstyle:{
        backgroundColor:"#c3e5ae"
    },
    formStyle:{
        marginTop: 30,
        width: '77%',
       // height: '70%',
        alignSelf: 'center'
        
    },
    signinBtn:{
        backgroundColor:"#c3e5ae",
        width: 200,
        marginHorizontal: 50,
        marginTop: 50,
        justifyContent: 'center',
    },
    signoutBtn:{
        backgroundColor:"#78d1d2",
        width:200,
        marginTop: 30,
        marginHorizontal: 50,
        justifyContent: 'center',
    },
})

export default LoginScreen