/*
Storage基本使用：
https://developer.mozilla.org/zh-CN/docs/Web/API/Storage
调用setItem(key,value)时，当value是引用类型（数组或对象），会保存为字符串形式。
再调用getItem(key)的方法获取对象，返回的时引用类型.toString()的字符串形式。
使用起来十分不方便，所以当value是对象时，通过JSON处理，可以很方便获取对象属性。
sessionStorage.setItem("user2",JSON.stringify({"name":"alice","age":23}))
JSON.parse(sessionStorage.getItem("user2"))
sessionStorage===window.sessionStorage
封装Storage，重写setItem和getItem方法，对value进行json化处理
注意：sessionStorage===window.sessionStorage，是全局BOM对象.
课程中还加了带三个入参，后面再看项目复杂度需不需要这样做。
*/
export default{
    getItem(key){
        return JSON.parse(sessionStorage.getItem(key));
    },
    setItem(key,value){
        sessionStorage.setItem(key,JSON.stringify(value));
    }
}