const mongoose = require ('mongoose'); 

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    prontuario: {
        type: String,
        required: true,
        unique: true , 
        lowercase:true, 
    },
    password: {
        type: String,
        required: true,
        select:false, 
    },
    categoria: {
        type: String,
        enum: ['aluno', 'professor', 'adm'],
        required: true,
    },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
   