const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        personOne: {
            type: String,
        },
        personTwo: {
            type: String,
        },
        messages: {
            type: [{
                sender: {
                    type: String,
                },
                msgContents: {
                    type: String,
                },
                when: {
                    type: Date,
                },
            }]
        }
    },
    { timestamps: true }
);

const defaultCallback = function(err, chats) {//TODO: remove (unused)
    if (err) return Promise.reject();
    return Promise.resolve(chats);
}

//finds all chats that involve user (sorted in descending order)
ChatSchema.statics.findChatsWithUser = function(user) {
    const AllChats = this; //should bind to the Chat model

    return AllChats.find({$or:[{personOne: user},{personTwo: user}]}).sort({updatedAt: 'desc' }).exec();
}

//finds all chats that involve user (sorted in descending order)
ChatSchema.statics.deleteChatsWithUser = async function(user) {
    const AllChats = this; //should bind to the Chat model

    const chatsWithUser = await AllChats.find({$or:[{personOne: user},{personTwo: user}]}).exec();
    const deleteInfo = await AllChats.deleteMany({$or:[{personOne: user},{personTwo: user}]}).exec();
    
    return { deleteInfo: deleteInfo, deletedChats: chatsWithUser};
}

//finds first chat that includes user1 and user2 as person1 and person2 (any order)
ChatSchema.statics.findChatsBetweenUsers = function(user1, user2) {
    const AllChats = this; //should bind to the Chat model

    //Assumes there exists only one chat where this condition is met, so no group chats
    return AllChats.findOne({$or:[{personOne: user1, personTwo: user2},{personOne: user2, personTwo: user1}]}).exec();
}

ChatSchema.methods.addMessage = async function(sender, messageContents, when=new Date()) {
    const chat = this;

    if (chat.personOne !== sender && chat.personTwo !== sender) {
        console.error("ERROR: " + sender + " is not a participant of this chat!");
        return Promise.reject();
    }
    
    const message = {
        sender: sender,
        msgContents: messageContents,
        when: when
    };

    try {
        const newMessage = chat.messages.create(message);
        chat.messages.push(newMessage);
        chat.save();

        return Promise.resolve(newMessage);
    } catch {
        return Promise.reject();
    }
    
}

const Chat =  mongoose.model("Chat", ChatSchema);
module.exports = { Chat };