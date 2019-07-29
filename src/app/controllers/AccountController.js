import File from '../models/File';
import User from '../models/User';

class AccountController {
  async delete(req, res) {
    const files = await File.findAll({ where: { owner: req.userId } });

    files.map(file => File.destroy({ where: { path: file.path } }));
    await User.destroy({ where: { id: req.userId } });

    res.json({ sucess: 'Account has been deleted' });
  }
}

export default new AccountController();
