import File from '../models/File';

class AvatarController {
  async store(req, res) {
    const {
      originalname: name,
      key: path,
      location: url,
      mimetype: type,
      size,
    } = req.file;

    /**
     * Verify if the file is a image
     */
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (!allowedMimes.includes(type)) {
      res.status(400).json({ error: 'Invalid file type' });
    }

    /**
     * Verify if the size of image is less or equal 5 MB
     */
    if (size >= 5 * 1024 * 1024) {
      res.status(400).json({ error: 'File is to larger' });
    }

    const file = await File.create({
      name,
      path,
      url,
      owner: req.userId,
      avatar: true,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const { path } = req.params;

    await File.destroy({ where: { path } });

    return res.json({ sucess: 'File has been delete' });
  }
}

export default new AvatarController();
