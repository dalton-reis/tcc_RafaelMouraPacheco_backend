const User = require('../models/User');

class UserController {
  async register(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      return res.json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json({ error: 'User registration failed' });
    }
  }

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json({ error: 'User authentication failed' });
    }
  }

  async me(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      return res.json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json({ error: "Can't get user information" });
    }
  }

  async linkUser(req, res) {
    try {
      const { linkedUserEmail, email } = req.body;

      const user = await User.findOne({ email });
      const linkedUser = await User.findOne({ email: linkedUserEmail });

      if (!linkedUser) {
        return res.status(400).json({ error: 'User to link not found' });
      }

      user.linkedUsers.push(linkedUser.email);
      linkedUser.linkedUsers.push(linkedUser.email);

      await user.save();
      await linkedUser.save();

      return res.json({
        linkedUser: linkedUser
      });
    } catch (err) {
      return res.status(400).json({ error: 'User link failed' });
    }
  }
}

module.exports = new UserController();
