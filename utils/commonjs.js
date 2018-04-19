/**
 * Created by mazusheng on 2018/3/21.
 */

/**
 * 数组去重
 * @param originArray
 * @return uniqueArray
 */
export const unique = (originArray) => {
    var obj = {};
    return originArray.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}