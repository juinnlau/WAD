import React, {Component} from "react";
import { View, ScrollView, Text, ImageBackground, Image } from 'react-native';
import { DrawerItem, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";



const SideBars = (props) => {
    return (
        <View style ={{flex : 1}}>
            <DrawerContentScrollView {...props} contentContainer style ={{backgroundColor:'white'}}>
                <ImageBackground source = { require('../images/wallpaper.jpg')} style ={{padding :25 , marginTop: -8}}>
                    <Image source={require('../images/usericon.jpg')} style={{height:80, width: 80, borderRadius:40,marginBottom:10}}></Image>
                <Text style={{color:"white"}}>Hi User</Text>
                </ImageBackground>
                <DrawerItemList {...props}/>
               
            </DrawerContentScrollView>
            <View>
                <Text style ={{color :'black'}}>Container</Text>
            </View>
        </View>
        )
    };
  
  export default SideBars;