/**
 * Created by mazusheng on 2018/3/21.
 */
import { createAction,NavigationActions } from '../utils/index'
import {unique} from '../utils/commonjs'
import {sha256func} from '../utils/sha256'
import {cipher,decryption} from '../utils/aes'
export default {
    namespace: 'AesModel',
    state:{
        privateCode:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        privateCodeHash:"keyhash",
        privateCodeOrigin:"默认算法",
        privateCodes:[
            {keyArray:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],keyHash:"keyhash",keyOrigin:"默认算法"},
            ],
        // cipherValue:'',
        // cipherValue2:'',
        mark:0,
    },
    reducers: {
        reset(state, { payload }) {
            return { ...state,cipherValue:'',cipherValue2:''};
        },
        changeUsedCode(state, { payload }) {
            const {keyHash} = payload;
            const {privateCodes} = state;
            let privateCode = [];
            let privateCodeHash = "";
            let privateCodeOrigin = "";
            privateCodes.map(function (item,index) {
                if(item.keyHash == keyHash){
                    privateCode=item.keyArray;
                    privateCodeHash=item.keyHash;
                    privateCodeOrigin = item.keyOrigin;
                }
            })

            return { ...state,cipherValue:'',privateCode:privateCode,privateCodeHash:privateCodeHash,privateCodeOrigin:privateCodeOrigin,mark:state.mark+1}
        },
        deleteUsedCode(state, { payload }) {
            const {keyHash} = payload;
            const {privateCodes} = state;
            let privateCodesNew = [];
            privateCodes.map(function (item,index) {
                if(item.keyHash != keyHash){
                    privateCodesNew.push(item);
                }
            })
            return { ...state,privateCodes:privateCodesNew,cipherValue:'',mark:state.mark+1}
        },
        addPrivateCode(state, { payload }){
            let keyHash = sha256func(payload.originData);
            let keyArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(function (item,index) {
                return parseInt(keyHash.slice((item-1)*4,item*4),16)%256
            })
            let keyObj = {keyArray:keyArray,keyHash:keyHash,keyOrigin:payload.originData};
            let privateCodes=unique([...state.privateCodes,keyObj]);
            return { ...state,privateCodes:privateCodes}
        },
        // changeCipherValue(state, { payload }) {
        //     const {originData} =payload;
        //     const key=state.privateCode;
        //     let cipherValue=cipher(key,originData);
        //     return { ...state,cipherValue:cipherValue}
        // },
        // decryptionCipherValue(state, { payload }) {
        //     const {cipherData} =payload;
        //     const key=state.privateCode;
        //     let originData=decryption(key,cipherData);
        //     return { ...state,cipherValue2:originData}
        // },
    },
    effects: {
        *takeToken({ payload }, { call, put, select }) {
            try{
                let login = yield call(authAccount.takeTokenServer, payload);
            }catch (e){

            }
        },
    },
}
