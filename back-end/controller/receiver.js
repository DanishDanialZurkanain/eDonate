const app = require('../app');
const model = require('../models');

const receiver = {
    getReceivers: async (req, res) => {
        let receivers = [];

        try {
            receivers = await model.receiver.findAll();
        } catch (e) {
            console.log(e);
        }

        res.json(receivers);
    },
    getActiveReceivers: async (req, res) => {
        let receivers = [];

        try {
            receivers = await model.receiver.findAll(
                {
                    where: {
                        status: 'Active'
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }

        res.json(receivers);
    },
    getRequestReceivers: async (req, res) => {
        let receivers = [];

        try {
            receivers = await model.receiver.findAll(
                {
                    where: {
                        id: req.params.id
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }

        res.json(receivers);
    },
    getDonator: async (req, res) => {
        let donator = [];

        try {
            donator = await model.receiver.findAll(
                {
                    where: {
                        userId: req.params.userId
                    }
                }
            );
        } catch (e) {
            console.log(e);
        }

        res.json(donator);
    },
    findReceiver: async (req, res) => {
        let receiver = [];

        try {
            receiver = await model.receiver.findOne({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e);
        }

        res.json(receiver);
    },
    createReceiver: async (req, res) => {
        let receiver = {};
        receiver = await model.receiver.create({
            typeOfHelp: req.body.typeOfHelp,
            typeOfNeed: req.body.typeOfNeed,
            bloodType: req.body.bloodType,
            userId: req.body.userId,
            fullName: req.body.fullName,
            familyMember: req.body.familyMember,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            quantity: req.body.quantity,
            emergency: req.body.emergency,
            date: req.body.date,
            status: req.body.status,
        });
       
        res.json(receiver);
    },
    updateReceiver: async (req, res) => {
        let receiver = {};

        try {
            receiver = await model.receiver.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(receiver);
    },
    deleteReceiver: async (req, res) => {
        await model.receiver.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(204).json({
            status: 'Success'
        })
    }
}

module.exports = receiver;