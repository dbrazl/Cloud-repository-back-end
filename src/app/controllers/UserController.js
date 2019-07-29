import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    /**
     * Schema validation
     */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    /**
     * Verify if request is valid with our schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

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
    /**
     * Schema validation
     */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      avatar_id: Yup.number(),
    });

    /**
     * Verify if request is valid with our schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    /**
     * Verify change in user email and if it's available
     */
    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(401).json({ error: 'User already exist.' });
      }
    }

    /**
     * Verify if the old password is correct
     */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old password is not match.' });
    }

    /**
     * Update user in DB
     */
    const { id, name } = await user.update(req.body);

    /**
     * Return user
     */
    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    await User.destroy({ where: { id: req.userId } });

    return res.json({ success: 'User has been deleted.' });
  }
}

export default new UserController();
