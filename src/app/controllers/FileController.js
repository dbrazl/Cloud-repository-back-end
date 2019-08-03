import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, key: path, location: url } = req.file;

    const file = await File.create({
      name,
      path,
      url,
      owner: req.userId,
      avatar: false,
    });

    return res.json(file);
  }

  async index(req, res) {
    const files = await File.findAll({
      where: { owner: req.userId, avatar: false },
    });

    return res.json(files);
  }

  async update(req, res) {
    const { id } = req.body;

    const file = await File.findOne({ where: { id } });

    const { name } = await file.update(req.body);

    return res.json({ id, name });
  }

  async delete(req, res) {
    const { path } = req.params;

    await File.destroy({ where: { path } });

    return res.json({ sucess: 'File has been delete' });
  }
}

export default new FileController();
