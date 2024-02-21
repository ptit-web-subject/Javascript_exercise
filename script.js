
class StudentManager {
    constructor() {
        this.students = [];
        this.editingIndex = -1;
    }

    addStudent(student) {
        this.students.push(student);
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
    }

    displayStudents() {
        const tableBody = document.getElementById('studentTableBody');
        tableBody.innerHTML = '';

        this.students.forEach((student, index) => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${student.studentID}</td>
                <td>${student.fullName}</td>
                <td>${student.dob}</td>
                <td>${student.class}</td>
                <td>${student.gpa}</td>
                <td><input type='button' value='Chỉnh sửa' onclick='studentManager.editRow(${index})'></td>
            `;
        });

        this.updateNoStudentMessage();
    }

    editStudent(index, student) {
        this.students[index] = student;
        this.editingIndex = -1;
    }

    updateNoStudentMessage() {
        const noStudentMessage = document.getElementById('noStudentMessage');
        const studentTable = document.getElementById('studentTable');
        if (this.students.length === 0) {
            noStudentMessage.style.display = 'block';
            studentTable.style.display = 'none';
        } else {
            noStudentMessage.style.display = 'none';
            studentTable.style.display = 'table';
        }
    }

    editRow(index) {
        const student = this.students[index];
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('fullName').value = student.fullName;
        document.getElementById('dob').value = student.dob;
        document.getElementById('class').value = student.class;
        document.getElementById('gpa').value = student.gpa;
        document.getElementById('editIndex').value = index;
        document.getElementById('submitButton').value = 'Cập nhật';
        this.editingIndex = index;
    }
}

class Student {
    constructor(studentID, fullName, dob, classValue, gpa) {
        this.studentID = studentID;
        this.fullName = fullName;
        this.dob = dob;
        this.class = classValue;
        this.gpa = gpa;
    }
}

const studentManager = new StudentManager();

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentID = document.getElementById('studentID').value;
    const fullName = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const classValue = document.getElementById('class').value;
    const gpa = document.getElementById('gpa').value;

    const student = new Student(studentID, fullName, dob, classValue, gpa);

    if (studentManager.editingIndex === -1) {
        studentManager.addStudent(student);
    } else {
        studentManager.editStudent(studentManager.editingIndex, student);
    }

    document.getElementById('submitButton').value = 'Thêm sinh viên';
    document.getElementById('editIndex').value = '-1';
    document.getElementById('studentForm').reset();
    studentManager.displayStudents();
});
