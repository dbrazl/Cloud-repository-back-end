import * as Yup from 'yup';
import User from '../models/User';

class RestoreController {
  async update(req, res) {
    /**
     * Schema validation
     */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
    });

    /**
     * Verify if request is valid with our schema
     */
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Verify if the user exist on DB
     */
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    /**
     * Generate a new random password
     */
    const random = user.generateNewRandomPassword(10);

    /**
     * Update user in DB
     */
    await user.update({
      password: random,
    });

    return res.json({ number: random });
  }
}

export default new RestoreController();
