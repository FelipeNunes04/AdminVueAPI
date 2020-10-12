const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function JWTVerify(req, res, next){
  const token = req.headers['accesstoken'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

//Authentication
router.post('/auth/login', (req, res, next) => {
    if(req.body.email === 'felipennunes@hotmail.com' && req.body.password === '123456'){
      const id = 1;
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3600
      });
      return res.json({ auth: true, accessToken: token });
    }
    
    res.status(500).json({message: 'Invalid Login!'});
})

router.post('/auth/logout', (req, res) => {
    res.json({ auth: false, accessToken: null });
})

router.get('/auth/account', JWTVerify, (req, res) => {
  res.json({
    id: 1, 
    name: 'Felipe', 
    email: 'felipennunes@hotmail.com', 
    avatar: '',
    role: 'admin'
  });
})


module.exports = router;
