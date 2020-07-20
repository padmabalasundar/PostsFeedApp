import React from 'react'
import {Router, Scene,} from 'react-native-router-flux'
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import SignupScreen from './SignupScreen'
import NewPostScreen from './NewPostScreen'
import Users from  '../components/Users'
import UserFeed from  '../components/UserFeed'


const RouterComponent = () =>{
    return(
        <Router>
            <Scene key='root'>
                <Scene key='login' component={LoginScreen} initial hideNavBar />
                <Scene key='signup' component={SignupScreen} hideNavBar />
                <Scene key='home' tabs component={HomeScreen} hideNavBar >
                    <Scene key='userfeed' component={UserFeed} hideNavBar />
                    <Scene key='users' component={Users} hideNavBar  />
                </Scene>
                <Scene key='newpost' component={NewPostScreen} hideNavBar />
                

            </Scene>
        </Router>
    )
}

export default RouterComponent;
