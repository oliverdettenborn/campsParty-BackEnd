const SessionsRepository = require("../repository/sessions");
const UserRepository = require("../repository/users");

async function authMiddleware(req, res, next){
  try {
    const auth = req.header('Authorization');
    if(!auth) return res.status(401).send({ message: 'User token not found' });
  
    const tokenHeader = auth.split(' ')[1];
    if(!tokenHeader) return res.status(401).send({ message: 'User token not found' });
  
    const session = await SessionsRepository.findByToken(tokenHeader);
    if(!session) return res.status(401).send({ message: 'Invalid token' });
  
    const user = await UserRepository.findById(session.userId);
    if (!user) return res.status(401).send({ error: 'Invalid token' });
  
    req.userId = session.userId;
    req.user = { id: user.id, cpf: user.cpf };
    next();
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
}

module.exports = authMiddleware;