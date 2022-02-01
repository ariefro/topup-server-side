import Player from '../models/player';
import PlayerService from '../services/player-service';
import BaseController from './base-controller';
import path from 'path';
import fs from 'fs';
import config from '../config';

class PlayerController extends BaseController {
  static landingPage = async (req, res) => {
    try {
      const voucher = await PlayerService.getVouchers();

      return res.status(200).json(voucher);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static detailPage = async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await PlayerService.detailPage({ id });

      return res.status(200).json(voucher);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static register = async (req, res, next) => {
    try {
      const payload = req.body;

      if (req.file) {
        const tmpPath = req.file.path;
        const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        const filename = `${req.file.filename}.${originalExt}`;
        const targetPath = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const player = new Player({ ...payload, avatar: filename });
            await player.save();
            delete player._doc.password;
            return res.status(201).json({ data: player });
          } catch (err) {
            if (err && err.name === 'ValidationError') {
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors,
              });
            }
            next(err);
          }
        });
      } else {
        const player = new Player(payload);
        await player.save();
        delete player._doc.password;

        return res.status(201).json(payload);
      }
    } catch (err) {
      if (err && err.name === 'ValidationError') {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  };
}

export default PlayerController;
