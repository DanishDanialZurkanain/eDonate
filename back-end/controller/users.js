const app = require('../app');
const model = require('../models');

const bcrypt = require('bcrypt');

const users = {
    authenticate: async (req, res) => {
        let user = await model.users.findOne({
            where: {
                userName: req.body.userName
            }
        });

        if (!user) {
            return res.status(400).send("Cannot Find User");
        }

        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.json(user);
            }
        } catch {
            res.status(500).send();
        }
    },
    getUsers: async (req, res) => {
        let users = [];

        try {
            users = await model.users.findAll();
        } catch (e) {
            console.log(e);
        }

        res.json(users);
    },
    findUser: async (req, res) => {
        let user = [];

        try {
            user = await model.users.findOne({
                where: {
                    id: req.params.id
                }
            })
        } catch (e) {
            console.log(e);
        }

        res.json(user);
    },
    createUser: async (req, res) => {
        let user = {};

        try {
            let hashedPassword = await bcrypt.hash(req.body.password, 10)
            user = await model.users.create({
                userName: req.body.userName,
                fullName: req.body.fullName,
                role: req.body.role,
                password: hashedPassword,
            });
        } catch (e) {
            console.log(e);
        }
       
        res.json(user);
    },
    updateUser: async (req, res) => {
        let user = {};

        try {
            user = await model.users.update(
                req.body, {
                where: {
                    id: req.params.id
                }
            }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(user);
    },
    forgotPassword: async (req, res) => {
        let user = {};

        try {
            let hashedPassword = await bcrypt.hash(req.body.password, 10)
            user = await model.users.update(
                { password: hashedPassword }, 
                { where: { userName: req.params.userName } }
            )
        } catch (e) {
            console.log(e);
        }

        res.json(user);
    },
   
    deleteUser: async (req, res) => {
        await model.users.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(204).json({
            status: 'Success'
        })
    }
}

module.exports = users;