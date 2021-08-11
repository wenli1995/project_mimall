import Mock from "mockjs"
Mock.mock("/api/user/login",{
    "status":0,
    "data":{
        "id|1-10":1,
        "username":"@name",
        "sex":'female'
    },
    "msg":"success1"

});