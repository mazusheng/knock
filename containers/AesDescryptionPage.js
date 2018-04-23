/**
 * Created by mazusheng on 2018/3/21.
 */
import React, { Component } from 'react';
import { Container, Picker, Left,Toast, Right, Icon, Switch, ListItem, List, Header, Content, Card, CardItem, Button, Text, Body, Input, Form, Item, Label} from 'native-base';
import { connect } from '../utils/dva';
import { createAction,NavigationActions } from '../utils';
import {Clipboard,StyleSheet}  from "react-native";
import * as utils from '../utils';

@connect(({ AesModel,CipherResult}) => ({ ...AesModel,...CipherResult}))
class AesDescryptionPage extends Component {
    static navigationOptions =({navigation})=> {
        return (
            {
                title:'解密',
                headerTintColor:'#000',
                // headerStyle:{backgroundColor: '#FFE4B5'},
                headerPressColorAndroid : '#999999',
                tabBarIcon: ({focused, tintColor}) =>
                    <Icon name="arrow-forward" style={{color: focused?'#FFE4B5':'black'}}/>,
                tabBarLabel: ({focused, tintColor}) =>
                    null,
            }
        )
    };
    constructor(props) {
        super(props);
        this.state={

        };
    };
    _choosePrivateCode = () =>{
        this.props.dispatch(NavigationActions.navigate({routeName:"choosePrivateCodePage"}))
    };
    copyFromClipBoard(){
        var content = Clipboard.getString().then((e)=>{
            this.setState({text:e});
            this.props.dispatch(createAction('CipherResult/decryptionCipherValue')({
                cipherData:e,
            }));
            Toast.show({
                text: "复制成功!",
            });
        });
    }
    componentDidUpdate(){
        const {mark} = this.props;
        if(this.state.mark != mark && this.state.text){
            this.setState({mark:mark})
            this.props.dispatch(createAction('CipherResult/decryptionCipherValue')({
                cipherData:this.state.text,
            }));
        }
    }
    render() {
        const {cipherValue2,privateCodeOrigin} = this.props;
        return (
            <Container>
                <Content>
                    <Card style={{marginTop:utils.scaleSize(20)}}>
                        <CardItem header>
                            <Text style={styles.fontSize}>解密结果</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.fontSize}>
                                {cipherValue2}
                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text></Text>

                        </CardItem>
                    </Card>
                    <List style={{padding:utils.scaleSize(10)}}>
                        <ListItem icon
                                  onPress={this._choosePrivateCode}
                        >
                            <Left>
                                <Icon name="pulse" />
                            </Left>
                            <Body>
                            <Text style={styles.fontSize}>{privateCodeOrigin}</Text>
                            </Body>
                            <Right>
                                <Text style={styles.fontSize}>解密</Text>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                    <Button
                        style={{backgroundColor:'#FFE4B5'}}
                        full
                        onPress={()=>this.copyFromClipBoard()}
                    >
                        <Text style={[styles.fontSize,{color:'black'}]}>从剪切板复制</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    fontSize:{
        fontSize:16
    }
})
export default AesDescryptionPage