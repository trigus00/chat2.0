const users = [];
const colors = ["#7cb5ec","#90ed7d","#f7a35c","#8085e9","#f15c80","#e4d354","#2b908f","#f45b5b","#91e8e1"];
// user join chats 
function userJoin(id,username,room){
    const user = {id,username,room}
    user.color = assignColor(colors);
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

function assignColor(colors){
    const randIndx = Math.floor(Math.random() * colors.length)
    return colors[randIndx]
}

module.exports ={
    userJoin,
    getCurrentUser,
    userLeft,
    getRoom
}