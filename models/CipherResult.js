/**
 * Created by mazusheng on 2018/3/21.
 */
import { createAction,NavigationActions } from '../utils/index'
import {unique} from '../utils/commonjs'
import {sha256func} from '../utils/sha256'
import {cipher,decryption} from '../utils/aes'
export default {
    namespace: 'CipherResult',
    state:{
        cipherValue:'',
        cipherValue2:'',
    },
    reducers: {
        reset(state, { payload }) {
            return { ...state,cipherValue:'',cipherValue2:''};
        },
        updateCipherValue(state, { payload }) {
            return { ...state,cipherValue:payload}
        },
        updateDecryptionCipherValue(state, { payload }) {
            return { ...state,cipherValue2:payload}
        },
    },
    effects: {
        *changeCipherValue({ payload }, { call, put, select }) {
            try{
                let privateCode= yield select(state => state.AesModel.privateCode);
                const {originData} =payload;
                const key=privateCode;
                let cipherValue=cipher(key,originData);
                yield put(createAction('updateCipherValue')(cipherValue))
            }catch (e){
            }
        },
        *decryptionCipherValue({ payload }, { call, put, select }) {
            try{
                let privateCode= yield select(state => state.AesModel.privateCode);
                const {cipherData} =payload;
                const key=privateCode;
                let originData=decryption(key,cipherData);
                yield put(createAction('updateDecryptionCipherValue')(originData))
            }catch (e){
            }
        },
    },
}
