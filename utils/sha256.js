/**
 * Created by mazusheng on 2018/3/21.
 */
import {sha256} from 'js-sha256'

/**
 * sha256 哈希算法
 * @param originData    string
 * @return hash    string
 */
export const sha256func = (originData) => {
    return sha256(originData)
}