const path = require("path");
const config = require(path.join(__dirname, '..', 'config', 'config.json'));
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const Department = db.department;
const Professor = db.professor;

module.exports = {
	getList,
	getDeptId
};
async function getDeptId(dept) {
	const res = await Department.findOne({
		where: {
			deptName: dept.deptName
		}
	});
	return res;
}
async function getList(dept) {
	const res = await getDeptId(dept);
	const list = await Professor.findAll({
		where: {
			deptId: res.deptId
		}
	});
	return list;
}