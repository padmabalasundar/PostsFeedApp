import React from 'react';
import {View ,Text, Image, AsyncStorage} from 'react-native';
import { Thumbnail, Icon, Card, CardItem, Left, Body, Right, Button} from 'native-base';

const PostDetail = ( {postData} ) => {
    const {

            pid,
            pText,
            pHash,
            uid,
            uName,
            ptStamp,
        } = postData; //deconstructing
/*
    const checkForVerified = () => {
        if(verified){
            return (
                <Icon name='md-checkmark-circle-outline' style={{color:'#0383FA', fontSize: 17}} />
            );
        }
    };
*/

const checkData = () =>{
    console.log(pid)
}
    return(
        <View>
            <Card >
                <CardItem style={{paddingBottom: 0}}>
                    <Left >
                        <Thumbnail source={require('../../util/images/smiley.jpg')}/>
                        <Body>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                                {checkData()}
                                    <Text style={styles.usrNameStyle}>{uName}</Text>
                                   {/*<Text>  {ptStamp}</Text> */}
                                    
                                    
                                </View>
                                <View>
                                    <Text>{pText} </Text>
                                    <Text># {pHash}</Text>
                                </View>
                            </View>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem style={styles.postImgContainer}>
                    <Image source={require('../../util/images/joy.jpg')} style={styles.postImgStyle}/> 
                </CardItem>
                
            </Card>
        </View>
            
    );
};

export default PostDetail;

const styles = {
    usrNameStyle:{
        fontSize: 16,
        fontWeight: '500', 
        color: 'black'
    },
    usrHandleStyle: {
        fontSize: 17,
       
    },
    msgStyle: {

    },
    postImgContainer: {
        paddingLeft: 80, paddingRight: 10,paddingBottom: 0
    },
    postImgStyle: {
        resizeMode: 'cover', height: 200, width: 200, flex: 1,paddingBottom: 0
    },
    postFooterStyle: {
        flexDirection: 'row', justifyContent: 'space-between',paddingLeft: 60 ,paddingBottom: 0
    },
    

};

/*

return(
        <View>
            <Card >
                <CardItem style={{paddingBottom: 0}}>
                    <Left >
                        <Thumbnail source={thumbnailImage}/>
                        <Body>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                                    <Text style={styles.usrNameStyle}>{userName}</Text>
                                    {checkForVerified()}
                                    <Text note>{userHandle}</Text>
                                    <Text> . {time}</Text>
                                    <Icon name='md-arrow-dropdown' style={{color:'#7C7B7B'}}/>
                                </View>
                                <View>
                                    <Text>{msg} # {tag}</Text>
                                </View>
                            </View>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem style={styles.tweetImgContainer}>
                    <Image source={msgImage} style={styles.tweetImgStyle}/> 
                </CardItem>
                <CardItem style={styles.tweetFooterStyle}>
                   
                        <Button transparent>
                        <Icon  name="md-chatbubbles" style={{color:'#7C7B7B'}} />
                        <Text>{comments}</Text>
                        </Button>
                   
                        <Button transparent>
                        <Icon name="md-repeat" style={{color:'#7C7B7B'}} />
                        <Text>{reTweets}</Text>
                        </Button>
                        <Button transparent>
                        <Icon  name="md-heart-outline" style={{color:'#7C7B7B'}}/>
                        <Text>{likes}</Text>
                        </Button>
                    
                        <Button transparent>
                            <Icon  name="md-mail" style={{color:'#7C7B7B'}} />
                        </Button>
                </CardItem>
            </Card>
        </View>
            
    );
*/