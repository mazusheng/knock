/**
 * Created by mazusheng on 2018/3/21.
 */
import React, { Component } from 'react';
import { Container, Picker,Toast, Left, Right, Icon, Switch, ListItem, List, Header, Content, Card, CardItem, Button, Text, Body, Input, Form, Item, Label} from 'native-base';
import { connect } from '../utils/dva';
import { createAction,NavigationActions } from '../utils';
import {ActionSheetIOS, Clipboard, StyleSheet}  from "react-native";
import * as utils from '../utils';

@connect(({ AesModel,CipherResult}) => ({ ...AesModel,...CipherResult}))
class AesPage extends Component {
    static navigationOptions =({navigation})=> {
        return (
            {
                title:'加密',
                // headerStyle:{backgroundColor: 'color:rgb(94, 170, 220)'},
                headerTintColor:'#000',
                headerPressColorAndroid : '#999999',
                tabBarIcon: ({focused, tintColor}) =>
                    <Icon name="arrow-back" style={{color: focused?'rgb(94, 170, 220)':'black'}}/>,
                tabBarLabel: ({focused, tintColor}) =>
                    null,
            }
        )
    };
    constructor(props) {
        super(props);
        this.state={
            mark:props.mark
        };
    };
    _inputTextChange = (value) =>{
        this.setState(value);
        this.props.dispatch(createAction('CipherResult/changeCipherValue')({
            originData:value.text,
        }));
    }
    _choosePrivateCode = () =>{
        this.props.dispatch(NavigationActions.navigate({routeName:"choosePrivateCodePage"}))
    };
    _shareToFriends = (value) =>{
        ActionSheetIOS.showShareActionSheetWithOptions({
            title: '私密',
            message: value,
        }, function (error) {
        }, function (e) {
            if (e) {
            } else {
            }
        })
    }
    // componentDidUpdate(){
    //     const {mark} = this.props;
    //     if(this.state.mark != mark && this.state.text){
    //         this.setState({mark:mark})
    //         this.props.dispatch(createAction('CipherResult/changeCipherValue')({
    //             originData:this.state.text,
    //         }));
    //     }
    // }
    copyToClipBoard(value){
        Clipboard.setString(value);
        Toast.show({
            text: "复制成功!",
        });
    }
    render() {
        const {cipherValue,privateCodeOrigin} = this.props;
        return (
            <Container>
                <Content>
                    <Form style={{marginTop:utils.scaleSize(20)}}>
                        <Item rounded>
                            <Input style={[{height:utils.scaleSize(300)},styles.fontSize]}
                                placeholder='请输入待加密文字'
                                multiline={true}
                                blurOnSubmit={true}
                                returnKeyType ='done'
                                onChangeText={(text) => this._inputTextChange({text})}
                            />
                        </Item>
                    </Form>

                    <Card style={{marginTop:utils.scaleSize(20)}}>
                        <CardItem header>
                            <Text style={styles.fontSize}>加密结果</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text style={styles.fontSize}>
                                {cipherValue}
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
                                <Text style={styles.fontSize}>加密</Text>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                    <Button
                        style={{backgroundColor:'color:rgb(94, 170, 220)'}}
                        full
                        onPress={()=>this.copyToClipBoard(cipherValue)}
                    >
                        <Text style={styles.fontSize}>复制到剪切板</Text>
                    </Button>
                    {/*<Button*/}
                        {/*style={{backgroundColor:'#FA8072'}}*/}
                        {/*full*/}
                        {/*onPress={()=>this._shareToFriends(cipherValue)}*/}
                    {/*>*/}
                        {/*<Text>发送给朋友</Text>*/}
                    {/*</Button>*/}
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
export default AesPage