const express = require('express');
const router = express.Router();
const studentService = require('../services/student');
const multer = require('multer')
const path = require('path')
const uripath = 'https://musixfy.tk:4001/profiles/'
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(path.dirname(__dirname), 'profiles'))
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})
const upload = multer({
  storage: Storage
})
// routes
router.post('/login', authenticate);
router.post('/register', register);
router.post('/request', request);
router.post('/update/', updateDetails);
router.post('/fetch', fetchDetails);
router.post('/fetchreq', fetchRequests);
router.post('/uploadimage', upload.array('photo', 3), async (req, res) => {
  let data=await studentService.updateImguri(req.body.id, uripath + req.files[0].filename)
  res.status(200).json({
    data,
    message:'success',
  })
})
router.post('/fetchcourses',fetchcourses)
router.post('/fetchabsent',fetchabsentdate)
router.post('/setdevicetoken',setDeviceToken)
router.post('/fetchnotice',fetchNotice)
module.exports = router;

function authenticate(req, res, next) {
  studentService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({
      message: 'Username or password is incorrect'
    }))
    .catch(err => next(err));
}

function register(req, res, next) {
  studentService.create(req.body)
    .then(() => res.status(200).json({
      message: 'User Created'
    }))
    .catch(err => res.status(400).json({
      error: err
    }));
}

function request(req, res, next) {
  studentService.sendRequest(req.body)
    .then(() => res.status(200).json({
      message: 'Request Submitted'
    }))
    .catch(err => res.status(400).json({
      message: err
    }));
}

function updateDetails(req, res, next) {
  studentService.update(req.body)
    .then((user) => res.status(200).json({
      user,
      message: 'Profile updated'
    }))
    .catch(err => res.status(400).json({
      message: err
    }));
}

function fetchDetails(req, res, next) {
  studentService.fetchDetails(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({
      message: 'User not found'
    }))
    .catch(err => res.status(400).json({
      message: err
    }));
}

function fetchRequests(req, res, next) {
  studentService.fetchRequests(req.body)
    .then((rlist) => {
      rlist ? res.json(rlist) : res.status(400).json({
        message: 'Request List Empty'
      })
    })
    .catch(err => res.status(400).json({
      message: err
    }));
}

function fetchcourses(req, res, next) {
  studentService.getCoursesbyBatchId(req.body)
    .then((list) => {
     list ? res.json(list) : res.status(400).json({
      message: 'List Empty'
     })
   })
    .catch(err => res.status(400).json({
      message: err
    }));
}
 
function fetchabsentdate(req, res, next) {
studentService.fetchAbsentDate(req.body)
  .then((absentlist) => {
    absentlist ? res.json(absentlist) : res.status(400).json({
      message: 'List Empty'
    })
  })
  .catch(err => res.status(400).json({
    message: err
  }));
}
function setDeviceToken(req, res, next) {
studentService.setDeviceToken(req.body)
   .then(() => res.status(200).json({
      message: 'Token Updated'
    }))
  .catch(err => res.status(400).json({
    message: err
  }));
}

function fetchNotice(req, res, next) {
studentService.fetchNotice(req.body)
  .then((noticeList) => {
    noticeList ? res.json(noticeList) : res.status(400).json({
      message: 'noticeList Empty'
    })
  })
  .catch(err => res.status(400).json({
    message: err
  }));
}