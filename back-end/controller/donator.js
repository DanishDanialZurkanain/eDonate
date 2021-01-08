const app = require('../app');
const model = require('../models');

const donator = {
    getDonators: async (req, res) => {
        let donators = [];

        try {
            donators = await model.donator.findAll();
        } catch (e) {
            console.log(e);
        }

        res.json(donators);
    },
    findDonator: async (req, res) => {
        let donator = [];

        try {
            donator = await model.donator.findOne({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e);
        }

        res.json(donator);
    },
    createDonator: async (req, res) => {
        let donator = {};
        donator = await model.donator.create({
            userId: req.body.userId,
            receiverId: req.body.receiverId,
            typeOfNeed: req.body.typeOfNeed,
        });
       
        res.json(donator);
    },
    updateDonator: async (req, res) => {
        let donator = {};

        try {
            donator = await model.donator.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(donator);
    },
    deleteDonator: async (req, res) => {
        await model.donator.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(204).json({
            status: 'Success'
        })
    }
}

module.exports = donator;