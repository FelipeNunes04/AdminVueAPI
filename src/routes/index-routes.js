const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function JWTVerify(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

//Authentication
router.post('/login', (req, res, next) => {
    if(req.body.user === 'felipe' && req.body.pwd === '123456'){
      const id = 1;
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3600
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Invalid Login!'});
})

router.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

// Main
router.get('/', JWTVerify, (req, res, next) => {
    res.json({message: "Ok"});
})

module.exports = router;
