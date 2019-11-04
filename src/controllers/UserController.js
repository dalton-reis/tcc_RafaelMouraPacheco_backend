const User = require('../models/User');

class UserController {
  async register(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) {
        return res.status(400).json('Usuário já cadastrado');
      }

      const user = await User.create(req.body);

      return res.json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json('Não foi possível realizar o cadastro');
    }
  }

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json('Usuário ou senha incorretos');
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json('Usuário ou senha incorretos');
      }

      return res.json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json('Não foi possível realizar o login');
    }
  }

  async me(req, res) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json('Usuário não encontrado');
      }

      return res.json({
        user,
        token: user.generateToken()
      });
    } catch (err) {
      return res.status(400).json('Não foi possível realizar o login');
    }
  }

  async linkUser(req, res) {
    try {
      const { linkedUserEmail, email } = req.body;

      const user = await User.findOne({ email });
      const linkedUser = await User.findOne({ email: linkedUserEmail });

      if (!linkedUser) {
        return res.status(400).json('Usuário não encontrado');
      }

      user.linkedUsers.push(linkedUser.email);
      linkedUser.linkedUsers.push(linkedUser.email);

      await user.save();
      await linkedUser.save();

      return res.json({
        linkedUser: linkedUser
      });
    } catch (err) {
      return res.status(400).json('Não foi possível enviar o convite');
    }
  }
}

module.exports = new UserController();
