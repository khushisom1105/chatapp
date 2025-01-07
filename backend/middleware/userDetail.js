let userId = null;
const getUser = async()=>{
    console.log("userId",userId)
    return userId;
}

const setUser = (id)=>{
    console.log("id",id)

    userId = id;
    
}       
export {getUser , setUser}