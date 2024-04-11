// all routes related to sellers for the app
const router = require('express').Router();
const { Seller } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const sellerData = await Seller.create(req.body);

    req.session.save(() => {
      req.session.seller_id = sellerData.id;
      req.session.logged_in = true;

      res.status(200).json(sellerData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const sellerData = await Seller.findOne({ where: { email: req.body.email } });

    if (!sellerData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await sellerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.seller_id = sellerData.id;
      req.session.logged_in = true;
      
      res.json({ seller: sellerData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
