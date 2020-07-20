import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { StyleProvider,
    Container, Content, Form,Item,Label,Input,Button,Icon, Thumbnail, Footer,Header,Right,Left,Body,Tabs,Tab,TabHeading, Fab
} from 'native-base'
import {firebaseApp} from '../../util/Firebase'
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor.js';
import UserFeed from '../components/UserFeed'
import Users from '../components/Users'
import SearchComp from '../components/SearchComp'


class HomeScreen extends React.Component{
    constructor(props){
        super(props)
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

    handleFabPress(){

        const user =  firebaseApp.auth().currentUser
        console.log("Current User :",user)
        console.log("User Display Name: "+user.displayName)
       
        Actions.newpost({dName: user.displayName});
    }
    
    navigateTabs(i, ref, from){

        console.log(i);
        switch(i){
            case 0:
                return (Actions.home())
            case 1:
                return (<Users /> )
            case 2:
                return (<SearchComp />  )
        }
       
    }

    render(){
        return(
            <StyleProvider style={getTheme(commonColor)}>
            <Container>
                <Header style={styles.headerstyle}>
                    
                        <Left>
                            <Text style={{color:'black',fontSize: 20,fontWeight: 'bold'}}>Home </Text>
                        </Left>
                        
                        <Right>
                        <Icon  name='md-log-out' style={{ color: "black",fontSize: 30}} 
                            onPress={ ()=>{this.handleSignout();}}
                        />
                        </Right>
                </Header>
                <Content>
                    <Tabs  onChangeTab={({ i, ref, from })=> this.navigateTabs(i,ref, from)}>
                        <Tab heading={ <TabHeading><Icon name='ios-paper'/></TabHeading> } on>
                            <UserFeed />
                        </Tab>
                        <Tab  heading={ <TabHeading><Icon name='ios-people'/></TabHeading> }>
                            <Users /> 
                        </Tab>
                        <Tab  heading={ <TabHeading><Icon name='md-search'/></TabHeading> }>
                            
                            <SearchComp />   
                        </Tab>

                    </Tabs>
                    
                </Content>
                <Fab position='bottomRight' 
                    style={{backgroundColor: '#75bde0',marginBottom: 40}}
                
                >
                    <Icon  name='ios-create'
                            onPress={() => {
                                    this.handleFabPress();
                            }}
                    />
                </Fab>
                <Footer  style={styles.headerstyle} />
                  
            </Container>
            </StyleProvider>
        )
    }

}

const styles= StyleSheet.create({
    headerstyle:{
        backgroundColor:"#c3e5ae",
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


export default HomeScreen;

/*
<Footer  style={styles.headerstyle} >
                    <Button full transparent>
                        <Text>New Post</Text>
                    </Button>
                </Footer>
            */