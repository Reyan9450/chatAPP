import Conversation from "../models/conversion.modal.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res)=> {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [] // Initialize the messages array
            });
        }

        const newMessage = await Message.create({
            senderID: senderId,
            receiverID: receiverId,
            message: message
        });

        if (conversation && newMessage) {
            conversation.messages.push(newMessage._id);
            await conversation.save(); // Save the updated conversation
        }

        res.status(200).send({ newMessage });
    } catch (error) {
        console.log("Error message", error);
        res.status(500).send(error.message);
    }
}

export const getMessages =  async(req, res) =>{
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages');

       if(!conversation) {
           res.status(404).send("Conversation not found");}
        
         res.status(200).json(conversation.messages);  
    } catch (error) {
        console.log("Error message", error);
        res.status(500).send(error.message);
    }
}

