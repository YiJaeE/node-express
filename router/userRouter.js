const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get('/', async (req, res) => {
  res.render('user');
});

router.post('/create', async (req, res) => {
  const { user_name, user_phone } = req.body;
  await db.users.create({
    user_name: user_name,
    user_phone: user_phone,
  });
  res.send({
    status: 200,
    message: 'success',
  });
});

router.get('/list', async (req, res) => {
  const result = await db.users.findAll();
  const resultDetail = await db.users.findOne({ where: { id: 1 } });
  // 아래처럼 쿼리문으로 불러올 수도 있다
  // const resultQuery = await db.sequelize.query(`select * from users order by id`);
  res.send({ status: 200, data: { result, resultDetail } });
});

router.put('/update', async (req, res) => {
  await db.users.update({ user_name: '영희' }, { where: { id: 1 } });
});

module.exports = router;
