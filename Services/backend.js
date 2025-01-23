const db = require("./db")

async function getUsers(){
    const rows = await db.query( "SELECT * FROM users" )
    return rows?rows:[]
}
async function getUser(id){
    const rows = await db.query( "SEKECT * FROM users WHERE id=?", [id])
    return rows?rows:[]
}
async function createUser(user){
    const rows = await db.query( "INSERT INTO user (username, password, email) VALUES (?,?,?)", [user.username, user.password, user.email])
    let message = "Error in creating new user"
    if (rows.affectedRows)
        message = "Successfully created new user"
    return {message}
}
async function updateUser(id, user){
    const result = await db.query( " UPDATE user SET username=?, password=?, email=?", [user.username, user.password, user.email])
    let message = "Error updating user"
    if (result.affectedRows)
        message="Successfully updated user"
    return {message}
}
async function patchUser(id, user){
    let fields = Object.keys(user).map( (field) => field+"=?").join(", ")

    let updateValues = Object.values(user)
    updateValues.push(id)
    console.log("Fields: ", fields)
    console.log("updateValues: ", updateValues)

    const result = await db.query(` UPDATE user SET ${fields} WHERE id=?`, updateValues)
    let message = "Error updating user"
    if (result.affectedRows)
        message = "Successfully updated user"
    return {message}
}
async function removeUser(id){
    let result = await db.query(" DELETE FROM user WHERE id=?", [id])
    let message = "Error removing user"
    if (result.affectedRows)
        message = "Successfully removed user"
    return {message}
}

module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    patchUser,
    removeUser
}