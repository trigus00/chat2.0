const users = [];
// user join chats 
function userJoin(id,username,room){
    const user = {id,username,room}

    users.push(user);
    return user;
}

// get current user 
function getCurrentUser(id){
    return users.find(user =>  user.id === id )
}

// user leaves 
function userLeft(id){
    const index = users.findIndex(user=>user.id === id);
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}
// get room from users 
function getRoom(room){
    return users.filter(user => user.room ===room )
}

module.exports ={
    userJoin,
    getCurrentUser,
    userLeft,
    getRoom
}