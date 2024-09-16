const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const menu = await tables.menu.readAll();

    res.json(menu);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const formData = req.body;

  try {
    const insertId = await tables.menu.create(formData);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const menu = req.body;

  try {
    const updatedMenu = await tables.menu.update(menu);

    res.status(200).json({ updatedMenu });
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const item = await tables.menu.readByContinent(req.query.continent);

    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
  edit,
  read,
};
