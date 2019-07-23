const swag = require("../models/swag");

module.exports = {
  add: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;

    const index = user.cart.findIndex(item => id == item.id);

    if (index === -1) {
      const item = swag.find(item => id == item.id);
      user.cart.push(item);
      user.total += item.price;
      res.status(200).send(user);
    } else {
      res.status(200).send(user);
    }
  },

  delete: (req, res) => {
    const { id } = req.params;
    const { session } = req;

    const index = session.user.cart.findIndex(item => id == item.id);
    removedItem = session.user.cart.splice(index, 1);
    session.user.cart.splice(index, 1);
    session.user.total -= removedItem[0].price;
    res.status(200).send(session.user);
  },

  checkout: (req, res) => {
    const { session } = req;
    session.user.cart = [];
    session.user.total = 0;
    res.status(200).send(session.user);
  }
};
