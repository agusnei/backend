import mongoose from "mongoose"

await mongoose.connect('mongodb+srv://agusneira:OIY2O7qR5F1jALyb@cluster0.64e5d.mongodb.net/?retryWrites=true&w=majority')
console.log("Conectado a la base Mongo")

const chatSchema = new mongoose.Schema({
    author:{
        userEmail: { type: String, required: true },
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: String, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    message: { type: String, required: true, }
})

const Chat = mongoose.model('messages', chatSchema)

export { Chat }