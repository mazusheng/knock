/**
 * Created by mazusheng on 2018/3/23.
 */
import React, { Component } from 'react';
// import Icon from 'react-native-vector-icons';
import { Container,Icon, Picker,SwipeRow,ActionSheet, Left, Right , Switch, ListItem, List, Header, Content, Card, CardItem, Button, Text, Body, Input, Form, Item, Label} from 'native-base';
import { connect } from '../utils/dva';
import { createAction,NavigationActions } from '../utils';
import {InteractionManager, View, Modal, TouchableHighlight} from "react-native";
import * as utils from '../utils';

@connect(({ AesModel}) => ({ ...AesModel}))
class choosePrivateCodePage extends Component {
    static navigationOptions =({navigation})=> {
        return (
            {
                title: '私钥选择',
                headerStyle:{backgroundColor: '#696969'},
                headerTintColor:'#fff',
                headerPressColorAndroid : '#999999',
                headerRight:(
                    <View>
                        <Text style={{color:'#fff',fontSize:14,paddingRight:10}}
                              onPress={navigation.state.params?navigation.state.params.navigatePress:null}>添加</Text>
                    </View>
                ),

            }
        )
    };
    constructor(props) {
        super(props);
        this.state={
            modalVisible: false,
        };
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => this.props.navigation.setParams({navigatePress:this._editBtn}));
    };
    _editBtn = () => {
        this.setModalVisible(!this.state.modalVisible);
    };
    _privateCodeChange = (value) => {

        ActionSheet.show(
            {
                options: ["选中","删除","取消"],
                cancelButtonIndex: 2,
                // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "操作"
            },
            buttonIndex => {
                if(buttonIndex ==0){
                    this.props.dispatch(createAction('AesModel/changeUsedCode')({keyHash:value}));
                    this.props.dispatch(NavigationActions.back())
                }else if(buttonIndex ==1){
                    this.props.dispatch(createAction('AesModel/deleteUsedCode')({keyHash:value}));
                }else if(buttonIndex ==2){

                }
            }
        )
    };
    _addPrivateCode = (value) => {
        this.props.dispatch(createAction('AesModel/addPrivateCode')({originData:value}));
    };

    render() {
        const {privateCodeHash,privateCodes} = this.props;
        return (
                <Container>
                    <Content>
                        <List>
                            {
                                privateCodes?privateCodes.map(function (item,index) {
                                    return (
                                    <Card>
                                        <ListItem icon onPress = {()=>this._privateCodeChange(item.keyHash)}>
                                                <Body>
                                                    <Text>{item.keyOrigin}</Text>
                                                </Body>
                                                {
                                                 item.keyHash == privateCodeHash?
                                                     <Right>
                                                         <Icon style={{color:"green"}} name="checkmark-circle" />
                                                     </Right>
                                                     :<View/>
                                                }
                                            </ListItem>
                                    </Card>
                                    )
                                },this):<View/>
                            }
                        </List>
                    </Content>
                    <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center',}}>
                        <Modal
                               animationType="slide"
                               transparent={true}
                               visible={this.state.modalVisible}
                               onRequestClose={() => {
                                   alert('Modal has been closed.');
                               }}>
                            <Card style={{flex:0,marginTop: utils.scaleSize(300),marginBottom: utils.scaleSize(280),width:"80%",height:utils.scaleSize(300),marginLeft:'10%'}}>
                                    <Item style={{marginTop:20,marginLeft:20,marginRight:20,marginBottom:10}} rounded>
                                        <Input
                                            onChangeText={(c) => this.setState({addCode:c})}
                                            placeholder="请设定私钥" />
                                    </Item>
                                    <CardItem style={{flexDirection: "row",justifyContent: 'space-between'}}>
                                        <Button bordered
                                                iconLeft
                                                small
                                                ight
                                                onPress={()=>this.setModalVisible(false)}
                                        >
                                            <Text>取消</Text>
                                        </Button>
                                        <Button bordered
                                                iconRight
                                                small
                                                onPress={()=>{
                                                    this.setModalVisible(false);
                                                    this._addPrivateCode(this.state.addCode);
                                                }}
                                        >
                                            <Text>确定</Text>
                                        </Button>
                                    </CardItem>
                            </Card>
                        </Modal>
                    </Content>
                </Container>
        )
    }
}

export default choosePrivateCodePage