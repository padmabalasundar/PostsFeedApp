import React from 'react'
import {View,Text,StyleSheet,KeyboardAvoidingView} from 'react-native'
import {Container,Content,Card,CardItem,CardSwiper,StyleProvider,Form,Textarea,Separator ,
    Header,Footer,Icon,Button,Fab, Right,Left,Body, Input
} from 'native-base'
import {firebaseApp,firestoreDB} from '../../util/Firebase'
import * as firebase from "firebase"
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor.js';
import { Actions } from 'react-native-router-flux';
import UUIDGenerator from 'react-native-uuid-generator'; // package to generate Unique ID for each Post


class NewPostScreen extends React.Component{

    constructor(props){
        super(props)

        this.state={
            name: '',
            avatar: null,
            pText:'',
            pHash:'',
            pPic: null,
            pVideo: null,

        }
    }

    handlePost(){

        console.log(this.state.pText)
        console.log(this.state.pHash)

        
        // Generate an Unique ID - for the Post to store in Firestore
        UUIDGenerator.getRandomUUID()
            .then((uuid) => {
                console.log("uuid :"+uuid);
                
                const user =  firebaseApp.auth().currentUser
                const pID = uuid
                //Prepare the JSON object to store in Firestore
                const postData ={
                    uid: user.uid,
                    uName: user.displayName,
                    pid: pID,
                    pText: this.state.pText,
                    pHash: this.state.pHash,
                    ptStamp: firebase.firestore.Timestamp.now()
                    
                }

                //Create an entry for the New Post in Firestore collection - 'posts'
                firestoreDB.collection('posts')
                .doc(pID)
                .set(postData)
                .then(result => {

                    this.updateUser()
                    console.log("New Post Created  Successfully")
                    Actions.home();
                   
                })

                
                
               
         });
    }

    updateUser = async() =>{
        var user = firebaseApp.auth().currentUser;

        var docRef = firestoreDB.collection("users").doc(user.uid);
        if (docRef){
            return docRef.update({
                posts : true
            })
           
        }
        return;
    }
    render(){

        return(
            <StyleProvider style={getTheme(commonColor)} >
            <Container>
                <Header style={styles.headerstyle}>
                    <Left>
                        <Icon  name='md-home' style={{ color: "black",fontSize: 30}} 
                            onPress={ ()=>{Actions.home()}}
                        />
                    </Left>
                    <Body style={{alignItems:'center',marginLeft: 60}}>
                        <Text style={{fontSize: 20,}}>New Post</Text>
                    </Body>
                        
              
                <Right>
                    <Icon  name='md-log-out' style={{ color: "black",fontSize: 30}} 
                            onPress={ ()=>{this.handleSignout();}}
                        />
                </Right>
                </Header>
                <Content>
                    <KeyboardAvoidingView
                        behavior='padding'
                    >

                    
                    <View style={{flexDirection: 'row',justifyContent:'space-between' }}>
                        <Text style= {{fontSize: 15}}> {this.props.dName}</Text>
                        
                    </View>
                    
                    <Form>
                        <Textarea
                            placeholder='What is on your mind?'
                            rowSpan={7}
                            bordered
                            onChangeText={(val) => {
                                this.setState({pText: val})
                            }}
                        />
                        <Input 
                            placeholder='Hastags separated by comma'
                            value={this.state.pHash}
                            onChangeText={(val)=>{
                                this.setState({pHash: val})
                            }}
                        />
                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Button transparent>
                            <Icon name='md-images'   style={{fontSize:20,color: 'black'}}>
                            <Text style={{fontSize:17}}>  Photo</Text>
                            </Icon>
                        </Button>
                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Button transparent>
                            <Icon name='md-videocam'  style={{fontSize:20,color: 'black'}}>
                            <Text style={{fontSize:17}}>  Video</Text>
                            </Icon>
                        </Button>
                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Button rounded style={{height: 40,marginTop: 30,width: 150,alignSelf: 'center',justifyContent: "center",backgroundColor: "#c3e5ae"}}
                            onPress={()=>{this.handlePost();}}
                        >
                            <Text>POST</Text>
                        </Button>
                        
                    </Form>
                    </KeyboardAvoidingView>
                </Content>
                <Fab position='bottomRight' 
                    style={{backgroundColor: '#97dbae',marginBottom: 40}}
                
                >
                    <Icon  name='ios-create'
                            onPress={() => {
                                    Actions.newpost();
                            }}
                    />
                </Fab>
                <Footer  style={styles.headerstyle}/>
            </Container>
            </StyleProvider>
        )
    }

    handleSignout = async() =>{

        await firebaseApp.auth().signOut() // User signed out from Firebase
        .then(()=>{
          
            console.log("User signed out from Firebase")
            Actions.login();
        })
        .catch((error) => {
            console.log(error)
            alert("Signout Error - "+error)
        })
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
export default NewPostScreen;
