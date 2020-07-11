const express = require('express');
const router = express.Router();
const professorListService = require('../services/professor_list');
const professorService = require('../services/professor');
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
const AttStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(path.dirname(__dirname), 'attachment'))
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}${file.originalname}`)
  },
})
const attupload = multer({
  storage: AttStorage
})
// routes
router.post('/login', authenticate);
router.post('/register', register);
router.post('/fetchreq', fetchRequests);
router.post('/get_professor_list', get_professor_list);
router.post('/update', updateDetails)
router.post('/fetch', fetchDetails)
router.post('/fetchreq', fetchRequests);
router.post('/uploadimage', upload.array('photo', 3), async (req, res) => {
  let data=await professorService.updateImguri(req.body.id, uripath + req.files[0].filename)
  res.status(200).json({
  	data,
    message:'success'
  })
})
router.post('/handlenotice',attupload.any(),async (req, res) => {
  await professorService.handleNotice(req.body,req.files)
  res.status(200).json({files:req.files,status:true
  })
})
router.post('/updatereq', scheduleReq);
router.post('/deletereq', deleteReq);
router.post('/registercourse',registerCourse);
router.post('/getcourses',getCoursesbyPid);
router.post('/getstudentbybatchid', getStudentsbybatchId);
router.post('/addattendance',addAttendace);
router.post('/scheduleclass',scheduleclass);
router.post('/markattendance',markAttendanceByBatchId);
router.post('/fetchscheduledclass',fetchScheduledClass)
router.post('/fetchsabsentees',fetchAbsentees)
router.post('/setdevicetoken',setDeviceToken)
router.post('/addnotice',addNotice)
router.post('/addnoticeattachment',addNoticeAttachment)
router.post('/fetchnotice',fetchNotice)
module.exports = router;

function authenticate(req, res, next) {
  professorService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({
      message: 'Username or password is incorrect'
    }))
    .catch(err => next(err));
}

function register(req, res, next) {
  professorService.create(req.body)
    .then(() => res.status(200).json({
      message: 'User Created'
    }))
    .catch(err => res.status(400).json({
      error: err
    }));
}

function get_professor_list(req, res, next) {
  professorListService.getList(req.body)
    .then(dept => dept ? res.json(dept) : res.status(400).json({
      message: 'dept not found'
    }))
    .catch(err => next(err));
}

function fetchRequests(req, res, next) {
  professorService.fetchRequests(req.body.professorId)
    .then((rlist) => {
      rlist ? res.json(rlist) : res.status(400).json({
        message: 'Request List Empty'
      })
    })
    .catch(err => res.status(400).json({
      message: err
    }));
}

function updateDetails(req, res, next) {
  professorService.update(req.body)
    .then((user) => res.status(200).json({
      user,
      message: 'Profile updated'
    }))
    .catch(err => res.status(400).json({
      message: err
    }));
}

function fetchDetails(req, res, next) {
  professorService.fetchDetails(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({
      message: 'User not found'
    }))
    .catch(err => res.status(400).json({
      message: err
    }));
}

function fetchRequests(req, res, next) {
  professorService.fetchRequests(req.body)
    .then((rlist) => {
      rlist ? res.json(rlist) : res.status(400).json({
        message: 'Request List Empty'
      })
    })
    .catch(err => res.status(400).json({
      message: err
    }));
}

function scheduleReq(req, res, next) {
  professorService.scheduleReq(req.body).then(() => {
    res.status(200).json({
        message: 'Request Scheduled'
      })
      .catch(err => res.status(400).json({
        message: err
      }));
  })

}

function deleteReq(req, res, next) {
  professorService.deleteReq(req.body).then(() => {
    res.status(200).json({
        message: 'Request deleted'
      })
      .catch(err => res.status(400).json({
        message: err
      }));
  })

}
function registerCourse(req, res, next) {
  console.log(req.body)
  professorService.registerCourse(req.body).then(() => {
    res.status(200).json({
        message: 'Courses Registered'
      })
    }) .catch(err => res.status(400).json({
      message: err
  }));
}
function getCoursesbyPid(req, res, next) {
  professorService.getCoursesbyPid(req.body).then(data=> data? res.json(data):res.status(400).json({
       message: 'Courses Not Found'
     }))
      .catch(err => res.status(400).json({
        message: err
      }));
}
function getStudentsbybatchId(req, res, next) {
  professorService.getStudentsbybatchId(req.body).then(data=> data? res.json(data):res.status(400).json({
       message: 'Courses Not Found'
     }))
      .catch(err => res.status(400).json({
        message: err
      }));
}
function addAttendace(req, res, next) {
  console.log(req.body)
  professorService.addAttendace(req.body).then(() => {
    res.status(200).json({
        message: 'Attendace Feeded'
      })
    }) .catch(err => res.status(400).json({
      message: err
  }));
}
function scheduleclass(req, res, next) {
  console.log(req.body)
  professorService.scheduleclass(req.body).then(() => {
    res.status(200).json({
        message: 'Class Scheduled'
      })
    }) .catch(err => res.status(400).json({
      message: err
  }));
}
 function markAttendanceByBatchId(req, res, next) {
  console.log(req.body)
  professorService.markAttendanceByBatchId(req.body).then(() => {
    res.status(200).json({
        message: 'Attendance Marked'
      })
    }) .catch(err => res.status(400).json({
      message: err
  }));
}
 function fetchScheduledClass(req, res, next) {
  professorService.fetchScheduledClasses(req.body).then(data=> data? res.json(data):res.status(400).json({
       message: 'Class list Not Found'
     }))
      .catch(err => res.status(400).json({
        message: err
      }));
  }
  function fetchAbsentees(req, res, next) {
  professorService.fetchAbsentees(req.body).then(data=> data? res.json(data):res.status(400).json({
       message: 'Absentees list Not Found'
     }))
      .catch(err => res.status(400).json({
        message: err
      }));
  }
  function setDeviceToken(req, res, next) {
   professorService.setDeviceToken(req.body)
   .then(() => res.status(200).json({
      message: 'Token Updated'
    }))
  .catch(err => res.status(400).json({
    message: err
  }));
}

function addNotice(req, res, next) {
  console.log(req)
   professorService.addNotice(req.body)
   .then(() => res.status(200).json({
      message: 'New notice added'
    }))
  .catch(err => res.status(400).json({
    message: err
  }));
}

function addNoticeAttachment(req, res, next) {
   professorService.addNoticeAttachment(req.body)
   .then(() => res.status(200).json({
      message: 'attachment added'
    }))
  .catch(err => res.status(400).json({
    message: err
  }));
}

function fetchNotice(req, res, next) {
  professorService.fetchNotice(req.body).then(data=> data? res.json(data):res.status(400).json({
       message: 'notice list Not Found'
     }))
      .catch(err => res.status(400).json({
        message: err
      }));
  }