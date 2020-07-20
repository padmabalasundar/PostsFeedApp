import React, { Component } from 'react';
import {View, Text, ScrollView } from 'react-native';
import { Card, CardItem, CardImage, Left, Body, Right,Content, Container, Icon, Image, Thumbnail,
            Header, Button
        } from 'native-base';
import {firebaseApp,firestoreDB} from '../../util/Firebase'
import PostDetail from './PostDetail';
import PropTypes from 'prop-types'


let postsData = [];

class PostList extends Component{

    static propTypes = {
        listkey: PropTypes.string
    }
    constructor(props){
        super(props);

        this.state = { 
            posts: [] 
        };

        this.renderPosts = this.renderPosts.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
    }

    renderPosts(){
        console.log("this.props.listkey:",this.props.listkey)
    
       this.loadPosts();

       console.log('postData in RenderPosts : '+postsData);

        return (postsData.map( post =>
            <PostDetail key={post.pid} postData={post} /> 
        ));
    }

    loadPosts(){

        const user = firebaseApp.auth().currentUser
        console.log("User ID -",user.uid)

        console.log('listkey :',this.props.listkey)
        const lkey = this.props.listkey
        
        console.log("lkey.localeCompare('self') -",lkey.localeCompare('self'))
      
       
        if (lkey.localeCompare('self') != 0){


            console.log("lkey:",lkey)

            postsData = []; 
            firestoreDB.collection('posts').where('uid', '==', user.uid) //Retrieve the Posts of the Current User from Firestore
               .get()
               .then(querySnapshot =>{
                   postsData = []; 
                    querySnapshot.forEach( (doc) =>{
                       postsData.push(doc.data());
                       console.log(doc.id, " => ", doc.data());
                    })
              })
               .catch(function(error) {
                   console.log("Error getting documents: ", error);
               })
        }
       
        else if (lkey.localeCompare('self') == -1){ // Retrieve Posts of other USers

            console.log("lkey:",lkey)
            postsData = []; 

            firestoreDB.collection('posts') //Retrieve all the Posts from Firestore
               .get()
               .then(querySnapshot =>{
                   postsData = []; 
                    querySnapshot.forEach( (doc) =>{

                      const data = doc.data();
                      console.log("data.uid :",data.uid)
                      if (data.uid != user.uid){ // Check the User Id and store only those not matching with the Current User ID
                       postsData.push(doc.data());
                     }
                       
                       console.log(doc.id, " => ", doc.data());
                    })
              })
               .catch(function(error) {
                   console.log("Error getting documents: ", error);
               })
            
        }
        console.log('postData in LoadPosts : '+postsData);
        return;
       
        
    }

    render(){
        return(
            <ScrollView>
                {this.renderPosts()}
            </ScrollView>
        );
    }

}

export default PostList;