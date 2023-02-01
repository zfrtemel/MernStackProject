const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../Models/index')
const dotenv = require('dotenv').config();
const Goal = db.Goal;

const CreateGoal = async (req, res) => {
    const { title, description, deadline, status } = req.body;
    const user = req.user.id;
    const FindGoal = await Goal.findOne({ where: { title: title } }, { where: { description: description } });
    if (FindGoal) {
        return res.status(500).send('Bu Başlık ile zaten bir hedef oluşturulmuş. Lütfen Başka Bir Başlık Giriniz.');
    }
    if (user == null)
        return res.status(500).send('Hedef Oluşturmak için Giriş Yapınız.');

    const goal = await Goal.create({
        user: user,
        title: title,
        description: description,
        deadline: deadline,
        status: status,
    });
    res.status(201).send({ status: "success", goal: goal });
};

const GetUserGoals = async (req, res) => {
    const user = req.user.id;
    if (user == null)
        return res.status(500).send('Hedefleri Listelemek için Giriş Yapınız.');
    const Goals = await Goal.findAll({ where: { user: user } });
    res.status(200).send({ status: "success", goals: Goals });
}
const UpdateGoal = async (req, res) => {
    const { title, description, deadline, status } = req.body;
    const user = req.user.id;
    const goal = await Goal.findOne({ where: { title: title } }, { where: { description: description } });

    if (goal == null)
        return res.status(500).send('Bu Başlık ile bir hedef bulunamadı.');
    if (user == null)
        return res.status(500).send('Hedef Güncellemek için Giriş Yapınız.');
    if (goal.user != user)
        return res.status(500).send('Bu Hedefi Güncellemek için Yetkiniz Yok.');

    const UpdatedGoal = await Goal.update({
        title: title,
        description: description,
        deadline: deadline,
        status: status,
    }, { where: { title: title } }, { where: { description: description } });
    res.status(200).send({ status: "success", goal: UpdatedGoal });
}
const DeleteGoal = async (req, res) => {
    const { title, description } = req.body;
    const user = req.user.id;
    const goal = await Goal.findOne({ where: { title: title } }, { where: { description: description } });

    if (goal == null)
        return res.status(500).send('Bu Başlık ile bir hedef bulunamadı.');
    if (user == null)
        return res.status(500).send('Hedef Silmek için Giriş Yapınız.');
    if (goal.user != user)
        return res.status(500).send('Bu Hedefi Silmek için Yetkiniz Yok.');

    const DeletedGoal = await Goal.destroy({ where: { title: title } }, { where: { description: description } });
    res.status(200).send({ status: "success", goal: DeletedGoal });
}

module.exports = {
    CreateGoal,
    GetUserGoals,
    UpdateGoal,
    DeleteGoal
}

//crud olacak
