import React from 'react'
import {View,Text,StyleSheet, ScrollView,AsyncStorage} from 'react-native'
import {Container,Content,Card,CardItem,CardSwiper,StyleProvider,
    Header,Footer,Icon,Button,Fab
} from 'native-base'
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor.js';
import {firebaseApp,firestoreDB} from '../../util/Firebase'
import PostList from './PostList'
import { Actions } from 'react-native-router-flux';
import NewPostScreen from '../routes/NewPostScreen';

var postExist = false;

class UserFeed extends React.Component{

    constructor(props){
        super(props)

    }

    renderList(){

        return(
            <PostList listkey='self' />
        )

    }

    render(){
        return(
        
            <StyleProvider style={getTheme(commonColor)} >
            <Container>
                <Content>
                   {this.renderList()}
                </Content>
                
            </Container>
            </StyleProvider>
        );
    }
    
}

export default UserFeed;
