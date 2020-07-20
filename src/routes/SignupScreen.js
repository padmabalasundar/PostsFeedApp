import React from 'react'
import {View,Text,StyleSheet,AsyncStorage} from 'react-native'
import {Container, Content, Form,Item,Label,Input,Button,Icon, Thumbnail, Footer,Header} from 'native-base'
import {Actions} from 'react-native-router-flux'
import {firebaseApp,firestoreDB} from '../../util/Firebase'
import Spinner from '../components/Spinner'
//import {Avatar} from 'react-native-'


class SignupScreen extends React.Component{

    constructor(props){
        super(props)
        this.state={ //state values
            name: '',
            email: '',
            pwd: '',
            cPwd: '',
            loading: false
        }
    }

    handleInput(){
        
        if (!this.checkFields()){ // Check whether the Fields are empty
            alert("All fields are mandatory")
            return false
        }

        if (!this.passwordcheck()){ // Check whether the Passwords Match
            alert("Passwords Doesnt Match")
            return false
        }

        this.setState({loading : true}) // To display the Spinner
        this.registerUser(); // Helper Function to register the User details and store in Firestore

        Actions.newpost();
    }

    // Check whether the Fields are empty
    checkFields(){
        const {name,email, pwd, cPwd} = this.state
        
        if(name !== '' && email !=='' && pwd !== '' && cPwd !== ''){
            return true;
        }
            
        return false;
    }

    // Check whether the Passwords Match
    passwordcheck(){
        const {pwd, cPwd} = this.state
        if ( pwd !== cPwd) {
                return false
        }
        return true;
    }

    // Helper Function to register the User details and store in Firestore
    registerUser = async () =>{
        const {
            name,
            email,
            pwd,
            cPwd

        }=this.state

        await firebaseApp.auth().createUserWithEmailAndPassword(email,pwd)
            .then( (result) =>{
                console.log("Email/Pwd Creation - Successful")
                if (result.user.uid){

                    // Data to be stored in Firestore collection -'users'
                    const userData = {
                        uId: result.user.uid,
                        uName: name,
                        uEmail: email,
                        avatar: null,
                        posts: false,
                        following: [], // array of following - users details
                    }
                    
                    //Create an entry for the New User in Firestore collection - 'users'
                    firestoreDB.collection('users') 
                    .doc(result.user.uid)
                    .set(userData)
                        .then(()=>{

                            this.updateDName(); //Update the Display Name of the User in Auth Collection
                            this.setState({loading: false}) //Spinner Loading  - stopped on successful registration
                            console.log("Sign up Successful")

                           
                        })
                }
            })
            .catch((error) =>{
                console.log("Error in Sign Up",error)
                alert("Signup Error :"+error)
                this.setState({loading: false}) //Spinner Loading  - stopped on Error
                return false;
            })
        
        
    }

    updateDName = async() =>{
        var user = firebaseApp.auth().currentUser;

        await user.updateProfile({
            displayName: this.state.name
        })
        return;
    }

    handleLoading(){ // Load Spinner  or the Register Button 
        if(this.state.loading){
            return(
                <Spinner />
            )
        }
    
        return(
            <Button rounded style={styles.registerBtn} 
                onPress={ () =>{
                this.handleInput()
            }}>
                <Text style={{fontSize: 18}}>Sign Up</Text>
            </Button>
        );
    }
        

    render(){
        return(
            
            <Container style={{flex:1,justifyContent: 'center'}}>
                <Header style={styles.headerstyle}>
                    <View>
                        <Text style={{fontSize: 20,alignSelf: 'center',}}>Register New Account</Text>
                    </View>
                </Header>
                <Content>
                   
                    <Form style={styles.formStyle}>
                    <Item>
                            <Label>Name</Label>
                            <Input
                            value={this.state.name}
                            onChangeText={(name)=>this.setState({name: name })}
                            
                            autoCapitalize='none'
                            />
                        </Item>
                        
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
                            <Input value={this.state.pwd}
                            onChangeText={(pwd)=>this.setState({pwd: pwd })}
                            secureTextEntry={true}
                            
                            />
                        </Item>
                        <Item>
                            <Label>Confirm Password</Label>
                            <Input  value={this.state.cPwd}
                            onChangeText={(cPwd)=>this.setState({cPwd: cPwd })}
                            secureTextEntry={true}
                            
                            />
                        </Item>
                        <Item>
                            <Label>Select an Avatar</Label>
                            
                            
                           
                        </Item>
                        <View>
                            {this.handleLoading()}
                        </View>
                        
                    </Form>
                </Content>
                <Footer style={styles.headerstyle}/>

            </Container>
        )
    }

}


const styles= StyleSheet.create({
    headerstyle:{
        backgroundColor:"#78d1d2",
        alignItems: 'center',
        justifyContent: 'center'
    },
    formStyle:{
        marginTop: 30,
        width: '85%',
       // height: '70%',
        alignSelf: 'center'
        
    },
    registerBtn:{
        backgroundColor:"#cde4ad",
        width: 200,
        marginHorizontal: 80,
        marginTop: 30,
        justifyContent: 'center',
    },
    signoutBtn:{
        backgroundColor:"#ff826c",
        width:200,
        marginTop: 30,
        marginHorizontal: 50,
        justifyContent: 'center',
    },
})

export default SignupScreen;
