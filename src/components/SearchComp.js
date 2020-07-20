import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Actions} from 'react-native-router-flux';
import  { StyleProvider, Container, Content, Header,Left, Body,Right, Item, Icon, Input, Button,Fab,
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor.js';



const SearchComp =() =>{
    
        return(
            <StyleProvider style={getTheme(commonColor)} >
                <Container>
             
                    <Content >
                            <Item>
                            
                                <Input placeholder='Search Feed' />
                                <Button style={{backgroundColor:"#c3e5ae",width:40,justifyContent:'center',marginRight:10}} ><Text >Go</Text></Button>
                            </Item>
                      
                      
                  
                    </Content>
                    
                  
                </Container>
            </StyleProvider>
        );
   
}

export default SearchComp;

/*
 <Fab
                            //active={true}
                            //direction="up"
                            //containerStyle={{ }}
                            style={{ backgroundColor: '#75bde0' }}
                            position="bottomRight"
                            
                        >
                            <Icon  name='ios-create'
                                onPress={() => {
                                Actions.newpost();
                            }}
                            />
                        </Fab>
               
                       
                        */