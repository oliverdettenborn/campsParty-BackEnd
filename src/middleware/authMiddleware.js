const sessionsRepository = require("../repository/sessions");
const UserRepository = require("../repository/users");

async function authMiddleware(req,res,next){
  const auth = req.header('Authorization');
  if(!auth) return res.status(401).send({ message: 'User token not found' });

  const tokenHeader = auth.split(' ')[1];
  if(!tokenHeader) return res.status(401).send({ message: 'User token not found' });

  const session = await sessionsRepository.findByToken(tokenHeader);
  if(!session) return res.status(401).send({ message: 'Invalid token' });

  const user = await UserRepository.findById(userId);
  if(!session) return res.status(404).send({ message: 'User not found' });
  
  req.userId = session.userId;
  req.user = { userId: user.id, cpf: user.cpf };
  next();
}

module.exports = authMiddleware;