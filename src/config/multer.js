import aws from 'aws-sdk';
import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import multerS3 from 'multer-s3';

const storageType = {
  local: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        file.key = res.toString('hex') + extname(file.originalname);

        return cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

export default {
  storage: storageType[process.env.STORAGE_TYPE],
};
