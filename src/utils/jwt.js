import jwt from 'jsonwebtoken';
import config from '../config';

class Jwt {
  static options = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  static sign = (payload) => jwt.sign(payload, config.jwtSecret, this.options);

  static verify = (token) => jwt.verify(token, config.jwtSecret, this.options);
}

export default Jwt;
