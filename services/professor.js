const Sequelize=require('sequelize')
const path = require("path");
const config = require(path.join(__dirname, '..', 'config', 'config.json'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const Professor = db.professor;
const Student = db.student;
const Request = db.request;
const RegisterCourse=db.registeredcourse
const Attendance=db.attendance
const ScheduleClass=db.scheduledclass
const Notice=db.notice
const NoticeAttachment=db.attachment
const NoticeTo=db.noticeto
const Dept=db.department
const Op = Sequelize.Op
module.exports = {
    authenticate,
    create,
    setRequestStatus,
    fetchRequests,
    fetchDetails,
    update,
    updateImguri,
    scheduleReq,
    deleteReq,
    registerCourse, 
    getCoursesbyPid,
    getStudentsbybatchId,
    addAttendace,
    scheduleclass,
    markAttendanceByBatchId,
    fetchScheduledClasses,
    fetchAbsentees,
    setDeviceToken,
    addNotice,
    addNoticeAttachment,
    handleNotice,
    fetchNotice
}
async function authenticate(professor) {
    const user = await Professor.findOne({
        where: {
            email: professor.email
        }
    });
    if (user && bcrypt.compareSync(professor.password, user.password)) {
        const token = jwt.sign({
            user: user.email
        }, config.secret, {
            expiresIn: '24h'
        });
        return {
            token,
            user: user.email
        };
    }
}

async function create(user) {
    await Professor.sync({
        force: false
    });
    if (await Professor.findOne({
            where: {
                email: user.email
            }
        })) {
        throw `Professor already exists`
    }
    // hash password
    if (user.password) {
        let password = bcrypt.hashSync(user.password, 10);
        let str = user.email;
        let str_split = str.split('@');
        let data = {
            email: user.email,
            professorId: str_split[0],
            password
        }
        let newUser = await Professor.create(data);
        if (!newUser)
            throw "Professor Not Created"
    }
}
async function setRequestStatus(data) {
    let req = await Request.update({
        status: data.status
    }, {
        where: {
            requestId: data.id
        }
    })
    if (!req)
        throw "Request not Updated"
}

async function update(userParam) {
    const user = await Professor.findOne({
        where: {
            email: userParam.email
        }
    })
    // validate
    if (!user) throw 'User not found';
    Object.assign(user, userParam);
    await Professor.update(userParam, {
        where: {
            email: userParam.email
        }
    })
   return await fetchDetails(userParam)
}

async function fetchDetails(userParam) {
    const user = await Professor.findOne({
        raw:true,
        where: {
            email: userParam.email
        },
        include: [
          {
            model:Dept,
            attributes: ['deptName'],
          }
        ]
    })
    // validate
    if (!user) throw 'User not found';
    return user
}

async function updateImguri(email, uri) {
    const user = await Professor.findOne({
        where: {
            email
        }
    })
    // validate
    if (!user) throw 'User not found';
    await Professor.update({
        imageuri: uri
    }, {
        where: {
            email
        }
    })
    return await fetchDetails({email})
}
async function scheduleReq(data) {
    const req = await Request.findOne({
        where: {
            requestId: data.requestId
        }
    })
    // validate
    if (!req) throw 'Request not found';
    await Request.update({
        pmessage: data.pmessage,
        scheduleDate: data.scheduleDate,
        scheduleTime: data.scheduleTime,
        status: 'accepted'
    }, {
        where: {
            requestId: data.requestId
        }
    })
}
async function deleteReq(data) {
    const req = await Request.findOne({
        where: {
            requestId: data.requestId
        }
    })
    // validate
    if (!req) throw 'Request not found';
    await Request.update({
        status: 'rejected'
    }, {
        where: {
            requestId: data.requestId
        }
    })
}
async function fetchRequests(payload) {
    let str = payload.email;
    let str_split = str.split('@');
    let data = await Request.findAll({
        where: {
            professorId: str_split[0],
            status: payload.status
        },
        include: [{
            model: db['student'],
        }]
    })
    console.log(data)
    return data.map((reqitem) => {
        return Object.assign({}, {
            requestId: reqitem.requestId,
            status: reqitem.status,
            date: reqitem.createdAt,
            regNo: reqitem.regNo,
            studentName: reqitem.student.name,
            message: reqitem.message,
        })
    })
}

async function registerCourse(payload){
    //batchId will be array of classes sent by teacher
    let {batchId,classcode,semester,professorId,classTitle}=payload
          Object.keys(batchId).map((course,index)=>{
            batchId[course].map(async(item,index)=>{
             try{
             let data=await RegisterCourse.create({batchId:item,classcode,semester,professorId,classTitle,course})
             //if (!data)
             //throw "Course Not Registered"
            }
            catch(err){
             console.log(err)
           } 
        })
      })
         
}

async function getCoursesbyPid(payload){
    let {professorId}=payload
     let data=await RegisterCourse.findAll({
         where:{
          professorId
         }
     })
     if(!data)
     throw "Courses Not Found"
     return data
}
async function getStudentsbybatchId(payload){
    let {batchid}=payload
     let data=await Student.findAll({
         attributes: ['regNo', 'name','batchid','semester'],
         where:{
          batchid
         }
     })
     if(!data)
     throw "Students Not Found"
     return data
}
async function addAttendace(payload){
    let {regList,classcode,absentDate,semester,professorId,batchId,message}=payload
          await scheduleclass({scheduleDate:absentDate,classcode,semester,professorId,batchId,message})
            regList.map(async(item,index)=>{
             try{
             let data=await Attendance.create({regNo:item,classcode,absentDate,batchId})
             //if (!data)
             //throw "Course Not Registered"
            }
            catch(err){
             console.log(err)
           } 
        })
         
}
async function scheduleclass(payload){
    let {scheduleDate,classcode,semester,professorId,batchId,message}=payload
    console.log(scheduleDate)
    try{
        let data=await ScheduleClass.create({scheduleDate,classcode,semester,professorId,batchId,message})
        //if (!data)
        //throw "Course Not Registered"
        }
    catch(err){
        console.log(err)
    } 
         
}

async function markAttendanceByBatchId(payload){
    let {batchId,classcode,absentDate}=payload
     let data=await Student.findAll({
        raw:true,
         attributes: ['regNo'],
         where:{
          batchid:batchId
         }
     })
     data=data.map((item,index)=>{
         return item['regNo']
     })
     await addAttendace({regList:data,classcode,absentDate,batchId})
     if(!data)
     throw "Students Not Found"
}

async function fetchScheduledClasses(payload){
    let {batchId,classcode,professorId}=payload
    let data=await ScheduleClass.findAll({
        raw:true,
         attributes: ['scheduleDate'],
         where:{
          batchId,
          classcode,
          professorId
         }
     })
    if(!data)
     throw "Class data not found"
    return data
}

async function fetchAbsentees(payload){
    let {batchId,classcode,absentDate}=payload
    let data=[]
    try{
        data=await Attendance.findAll({
         raw:true,
         attributes: ['regNo'],
         where:{
          batchId,
          classcode,
          absentDate
         },
         include: [
          {
            model: Student,
            attributes: ['name'],
          }
        ]
     })
    }
    catch(err){
    }
    if(!data)
     throw "Class data not found"
    return data
}
async function setDeviceToken(payload) {
    let {email,deviceToken}=payload
    console.log(payload)
    const user = await Professor.findOne({
        where: {
          email
        }
    })
    // validate
    if (!user) throw 'User not found';
    await Professor.update({
        deviceToken
    }, {
        where: {
            email
        }
    })
}

async function addNotice(payload){
  let {subject,composedMessage,professorId}=payload
  let noticeId=professorId+Date.now()
  try{
        let data=await Notice.create({raw:true,noticeId,subject,composedMessage,professorId})
        }
    catch(err){
        console.log(err)
    } 
  return noticeId
}

async function addNoticeAttachment(payload){
  let {professorId,attachments,noticeId}=payload
  try{
  for(data in attachments)
   {
       let obj=attachments[data]
       let fileName=obj['filename']
       let attachmentPath='https://musixfy.tk:4001/attachment/'+fileName
       let fileSize=obj['size']
       await NoticeAttachment.create({raw:true,noticeId,fileName,attachmentPath,fileSize})
   }
  }
  catch(e){
    console.log(e)
  }
}

async function addTo(payload,noticeId){
  let {type,dept,hostel,courses,year}=payload
  let deptList=dept['list']
  console.log(payload)
  if(type['show']===true && type['value']==='teacher'){
      if(deptList.length>0)
      {
        deptList.map((item,index)=>{
          NoticeTo.create({noticeId,type:type['value'],dept:item})
        })
      }
      else{
        NoticeTo.create({noticeId,type:type['value'],dept:'all'})
      }
  }
  else if(type['show']===true && type['value']==='student'){
       let yearList=year['list']
       console.log(yearList)
       if(hostel['show']===true){
          let hostelList=hostel['list']
          hostelList.map((item,index)=>{
           NoticeTo.create({noticeId,type:type['value'],hostel:item})
        })
       }
      if(courses['show']===true){
        let course=courses['value']
        if(yearList.length===0 && deptList.length>0)
        {
          deptList.map((item,index)=>{
            NoticeTo.create({noticeId,type:type['value'],dept:item,course})
          })
        }
        else if(yearList.length>0 && deptList.length>0){
          yearList.map((year,index1)=>{
            deptList.map((dept,index2)=>{
              NoticeTo.create({noticeId,type:type['value'],dept,course,year})
            })
          })
        }
        else{
          NoticeTo.create({noticeId,type:type['value'],dept:'all',course})
        }
      }
  }
  else{
     NoticeTo.create({noticeId,type:'all'})
  }
}

async function handleNotice(payload,attachments){
  let data=JSON.parse(payload['main'])
  let noticeId= await addNotice(data)
  await addNoticeAttachment({'professorId':data['professorId'],noticeId,attachments})
  await addTo(JSON.parse(payload['to']),noticeId)
}

async function fetchNotice(payload){
  let dept=payload['dept']
  let data=[]
    try{
        data=await NoticeTo.findAll({
         attributes: ['noticeId'],
         where:{
          [Op.or]: [{type:'all'}, {type:'teacher',dept:'all'},{
             type:'teacher',
             dept}
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