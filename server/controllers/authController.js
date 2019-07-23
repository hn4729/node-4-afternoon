const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;
    const { session } = req;

    const user = users.find(
      user => username === user.username && password === user.password
    );
    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.sendStatus(500);
    }
  },

  register: (req, res) => {
    const { username, password } = req.body;
    const { session } = req;

    users.push({ username, password, id });
    id++;
    session.user.username = username;
    res.status(200).send(session.user);
  },

  signout: (req, res) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },

  getUser: (req, res) => {
    res.status(200).send(req.session.user);
  }
};
