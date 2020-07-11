const models = require('./services/student')
const RandExp = require('randexp'); 
/*models.request.findAll({
	raw:true,
    attributes: ['requestId'],
    where:{
     regNo:'20158033'
    }
    ,
    include: [
      {
        model: models.student,
        attributes: ['name'],
      },
      {
        model: models.professor,
        attributes: ['name']
      }
    ]
  })
.then(function(result){
  console.log(result)
})
console.log(models)*/
async function  createentry(){
  for(i=0;i<2000;i++){
    try{
    await models.create(create())
    console.log(i)
    }
    catch(err){
     console.log(err.message)
    }
  }
}

function create(){
  let regNo=new RandExp(/(201)[5-9]\d\d\d\d/).gen()
  let name=new RandExp(/([a-z]{3,10}) ([a-z]{6,10})/).gen()
  let password='101010'
  let email=`${regNo}@gmail.com`
  let batchid=new RandExp(/(CSA|CSB|IT|MEA|MEB|ECEA|ECEB|EE|PIE|BT|CHE|CE)/).gen()
  let semester=new RandExp(/[1-8]/).gen()
  return {regNo,name,password,email,batchid,semester}
}
createentry()