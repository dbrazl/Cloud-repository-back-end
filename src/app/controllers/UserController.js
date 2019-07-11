import User from '../models/User';

class UserController {
  async store(req, res) {
    /**
     * Verify if the user exist in DB
     */
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(401).json({ error: 'User already exists.' });
    }

    /**
     * Create user in DB
     */
    const { id, name, email } = await User.create(req.body);

    /**
     * Return user
     */
    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    return res.json();
  }

  async index(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new UserController();
