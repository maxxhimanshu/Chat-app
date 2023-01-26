const { populate } = require("../Models/chatModel")
const chatModel = require("../Models/chatModel")
const createChat = async function (req, res) {
    try {

        const { userId } = req.body
        if (!userId) return res.status(400).send({ status: false, message: "user not given" })
        const chatData = await chatModel.find({
            isRoom: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate("users", "-password")
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select: { firstName: 1, lastName: 1, email: 1 }
                }
            })
        if (chatData.length > 0) {
            res.status(200).send({ status: true, data: chatData[0] })
        }
        else {
            let data = {
                chatName: "sender",
                isRoom: false,
                users: [req.user._id, userId]
            }
            const createdChat = await chatModel.create(data);
            const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
                "users", "-password"
            )
            res.status(200).send({ status: true, data: fullChat })
        }
    } catch (e) {
        res.status(400).send({ status: false, message: e.message })
    }
}

const AllChats = async function (req, res) {
    try {
        const data = await chatModel.find({
            users: { $elemMatch: { $eq: req.user._id } }
        }).populate('users', "-password")
            .populate("roomAdmin", "-password")
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select: { firstName: 1, lastName: 1, email: 1 }
                }
            })
            .sort({ updated: -1 })

        return res.status(200).send({ status: true, data: data });
    } catch (e) {
        return res.status(400).send({ status: false, message: e.message })
    }
}
const createRoom = async function (req, res) {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).send({ status: false, message: "Please fill all fields" })
        }
        let users = JSON.parse(req.body.users);

        if (users.length < 2) {
            return res.status(400).send({ status: false, message: "Provide more than two users" })
        }
        users.push(req.user)
        const roomChat = await chatModel.create({
            chatName: req.body.name,
            users: users,
            isRoom: true,
            roomAdmin: req.user,
        })
        const fullRoom = await chatModel.findOne({
            _id: roomChat._id,
        }).populate("users", "-password")
            .populate("roomAdmin", "-password")

        res.status(200).send({ status: true, data: fullRoom })

    }
    catch (e) {
        return res.status(400).send({ status: false, message: e.message })
    }
}
const addToRoom = async function (req, res) {
    try {
        const { chatId, userId } = req.body

        const userAdd = await chatModel.findByIdAndUpdate(
            chatId,
            { $push: { users: userId } },
            { new: true }
        ).populate("users", "-password")
            .populate("roomAdmin", "-password")

        if (userAdd) return res.status(200).send({ status: true, data: userAdd })
        else return res.status(400).send({ status: false, message: "Room not found" })


    } catch (e) {
        return res.status(400).send({ status: false, message: e.message })
    }
}

const removeFromRoom = async function (req, res) {
    try {
        const { chatId, userId } = req.body

        const userRemove = await chatModel.findByIdAndUpdate(
            chatId,
            { $pull: { users: userId } },
            { new: true }
        ).populate("users", "-password")
            .populate("roomAdmin", "-password")

        if (userRemove) return res.status(200).send({ status: true, data: userRemove })
        else return res.status(400).send({ status: false, message: "Room not found" })


    } catch (e) {
        return res.status(400).send({ status: false, message: e.message })
    }
}

module.exports = { createChat, AllChats, createRoom, addToRoom, removeFromRoom }