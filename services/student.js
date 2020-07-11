const Sequelize=require('sequelize')
const path = require("path");
const config = require(path.join(__dirname, '..', 'config', 'config.json'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const Student = db.student;
const Request = db.request;
const Professor = db.professor;
const RegisterCourse=db.registeredcourse
const Attendance=db.attendance
const ScheduleClass=db.scheduledclass
const Notice=db.notice
const NoticeAttachment=db.attachment
const NoticeTo=db.noticeto
const Op = Sequelize.Op

module.exports = {
    authenticate,
    create,
    sendRequest,
    fetchDetails,
    update,
    fetchRequests,
    updateImguri,
    getCoursesbyBatchId,
    fetchAbsentDate,
    fetchScheduledClasses,
    setDeviceToken,
    fetchNotice
};

async function authenticate(student) {
    const user = await Student.findOne({
        where: {
            email: student.email
        }
    });
    if (user && bcrypt.compareSync(student.password, user.password)) {
        const token = jwt.sign({
            user: user.email
        }, config.secret, {
            expiresIn: '24h'
        });
        return {
            token,
            user: user.regNo
        };
    }
}

async function create(user) {
    // validate
    if (await Student.findOne({
            where: {
                regNo: user.regNo
            }
        })) {
        throw `User already exists`
    }
    // hash password
    if (user.password) {
        let password = bcrypt.hashSync(user.password, 10);
        let data = {
            regNo: user.regNo,
            email: user.email,
            password
        }
        let newUser = await Student.create(data);
        if (!newUser)
            throw "User Not Created"
    }
}

async function sendRequest(req) {
    await Request.sync({
        force: false
    });

    var requestID = req.from + (new Date()).getTime();
    let data = {
        regNo: req.from,
        professorId: req.to,
        message: req.message,
        requestId: requestID
    }
    let newRequest = await Request.create(data);
    if (!newRequest)
        throw "Request not submitted"
}

async function update(userParam) {
    const user = await Student.findOne({
        where: {
            regNo: userParam.regNo
        }
    })
    // validate
    if (!user) throw 'User not found';
    Object.assign(user, userParam);
    await Student.update(userParam, {
        where: {
            regNo: userParam.regNo
        }
    })
  return await fetchDetails(userParam)
}

async function fetchDetails(userParam) {
    const user = await Student.findOne({
        where: {
            regNo: userParam.regNo
        }
    })
    // validate
    if (!user) throw 'User not found';
    return user
}
async function updateImguri(regNo, uri) {
    const user = await Student.findOne({
        where: {
            regNo
        }
    })
    // validate
    if (!user) throw 'User not found';
    await Student.update({
        imageuri: uri
    }, {
        where: {
            regNo
        }
    })
    return await fetchDetails({regNo})
}
async function fetchRequests(payload) {
    let data = await Request.findAll({
        where: {
            regNo: payload.regNo,
            status: payload.status
        },
        include: [{
            model: Professor
        }]
    })
    return data.map((reqitem) => {
        return Object.assign({}, {
            requestId: reqitem.requestId,
            message: reqitem.message,
            status: reqitem.status,
            date: reqitem.createdAt,
            professorId: reqitem.professorId,
            professorName: reqitem.professor.name
        })
    })
}

async function getCoursesbyBatchId(payload){
    let {batchId}=payload
    let data=[]
    try{
     data=await RegisterCourse.findAll({
        raw:true,
         where:{
          batchId
         },
         include: [{
            model: Professor,
            attributes: ['name']}],
     })
    }
    catch(e){
     console.log(e)
     }
     if(!data)
     throw "Courses Not Found"
     return data
}

async function fetchScheduledClasses(payload){
    let {batchId,classcode,professorId}=payload
    let data=await ScheduleClass.findAll({
        raw:true,
         where:{
          batchId,
          classcode,
          professorId
         },
         order: [['scheduleDate', 'DESC']]
     })
    if(!data)
     throw "Class data not found"
    return data
}

async function fetchAbsentDate(payload){
    let {regNo,classcode,professorId,batchId}=payload
    let absentData=[]
    let scheduledData=[]
    try{
        absentData=await Attendance.findAll({
            raw:true,
            where:{
                regNo,
                classcode
            },
          order: [['absentDate', 'DESC']]
        })
        scheduledData=await fetchScheduledClasses(payload)
    }
    catch(e){
     console.log(e)
    }
    if(!absentData)
    throw "Courses Not Found"
    return {'absentData':absentData,'scheduledData':scheduledData}
}

async function setDeviceToken(payload) {
    let {regNo,deviceToken}=payload
    console.log(payload)
    const user = await Student.findOne({
        where: {
          regNo
        }
    })
    // validate
    if (!user) throw 'User not found';
    await Student.update({
        deviceToken
    }, {
        where: {
            regNo
        }
    })
}

async function fetchNotice(payload){
  let {dept,course,year,hostel}=payload
  console.log('course',course)
  let data=[]
    try{
        data=await NoticeTo.findAll({
         attributes: ['noticeId'],
         where:{
          [Op.or]: [{type:'all'}, 
                    {type:'student',dept:'all',course:'all',year:'all',hostel:'all'},
                    {type:'student',dept:'all',course,year:'all',hostel:'all'},
                    {type:'student',dept,course,year:'all',hostel:'all'},
                    {type:'student',dept,course,year,hostel:'all'},
                    {type:'student',dept:'all',course:'all',year:'all',hostel},
          ] 
         },
         include: [
          {
            model: Notice,
            attributes: ['subject','composedMessage','createdAt','professorId'],
            include:[
             {
              model: NoticeAttachment,
              attributes:['attachmentPath','fileName','fileSize']
            },
             {
              model:Professor,
              attributes:['name']
             }
            ]
          }
        ],
        order: [[Notice,'createdAt', 'DESC']]
     })
    }
    catch(err){
      console.log(err)
    }
  return data
}