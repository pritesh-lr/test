const asyncHandler = require('express-async-handler');
const {
	getAllStudents,
	addNewStudent,
	getStudentDetail,
	setStudentStatus,
	updateStudent,
} = require('./students-service');
// const Student = require('../models/student');

const handleGetAllStudents = asyncHandler(async (req, res) => {
	const students = await getAllStudents(req.query);
	res.status(200).json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
	const {
		name,
		gender,
		phone,
		email,
		class: studentClass,
		section,
		roll,
		currentAddress,
		permanentAddress,
		fatherName,
		fatherPhone,
		motherName,
		motherPhone,
		guardianName,
		guardianPhone,
		relationOfGuardian,
		systemAccess,
		dob,
		admissionDate,
	} = req.body;

	if (
		!name ||
		!gender ||
		!phone ||
		!email ||
		!studentClass ||
		!roll ||
		!currentAddress ||
		!permanentAddress ||
		!fatherName ||
		!fatherPhone ||
		!motherName ||
		!motherPhone ||
		!guardianName ||
		!guardianPhone ||
		!relationOfGuardian ||
		!dob ||
		!admissionDate
	) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	const newStudent = await addNewStudent({
		name,
		gender,
		phone,
		email,
		class: studentClass,
		section,
		roll,
		currentAddress,
		permanentAddress,
		fatherName,
		fatherPhone,
		motherName,
		motherPhone,
		guardianName,
		guardianPhone,
		relationOfGuardian,
		systemAccess,
		dob,
		admissionDate,
	});
	res.status(201).json(newStudent);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		name,
		gender,
		dob,
		phone,
		email,
		class: studentClass,
		section,
		roll,
		admissionDate,
		currentAddress,
		permanentAddress,
		fatherName,
		fatherPhone,
		motherName,
		motherPhone,
		guardianName,
		guardianPhone,
		relationOfGuardian,
		systemAccess,
	} = req.body;

	if (
		!name ||
		!gender ||
		!dob ||
		!phone ||
		!email ||
		!studentClass ||
		!roll ||
		!admissionDate ||
		!currentAddress ||
		!permanentAddress ||
		!fatherName ||
		!fatherPhone ||
		!motherName ||
		!motherPhone ||
		!guardianName ||
		!guardianPhone ||
		!relationOfGuardian
	) {
		return res.status(400).json({ message: 'All fields are required' });
	}

	const payload = {
		userId: id,
		name,
		gender,
		dob,
		phone,
		email,
		class: studentClass,
		section,
		roll,
		admissionDate,
		currentAddress,
		permanentAddress,
		fatherName,
		fatherPhone,
		motherName,
		motherPhone,
		guardianName,
		guardianPhone,
		relationOfGuardian,
		systemAccess,
	};
	const result = await updateStudent(payload);

	res.status(200).json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: 'Student ID is required' });
	}

	const student = await getStudentDetail(id);

	if (!student) {
		return res.status(404).json({ message: 'Student not found' });
	}

	res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
	const { id: reviewerId } = req.user;
	const { id: userId } = req.params;
	const { status } = req.body;
	const payload = { userId, reviewerId, status };
	const student = await setStudentStatus(payload);
	res.status(200).json(student);
});

module.exports = {
	handleGetAllStudents,
	handleGetStudentDetail,
	handleAddStudent,
	handleStudentStatus,
	handleUpdateStudent,
};
