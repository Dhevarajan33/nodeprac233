import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true);
    axios.get('http://localhost:3000/students')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setError('Failed to fetch students');
        setLoading(false);
      });
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete('http://localhost:3000/students', { data: [id] }) // Backend expects array of IDs
        .then(() => {
          fetchStudents();
        })
        .catch(error => {
          console.error('Error deleting student:', error);
          alert('Failed to delete student');
        });
    }
  };

  const handleFormSave = (studentData) => {
    if (editingStudent) {
      // Update existing student
      // Backend expects array of students for update
      const { _id, ...updateData } = studentData;
      axios.put('http://localhost:3000/students', [updateData])
        .then(() => {
          setIsFormOpen(false);
          setEditingStudent(null);
          fetchStudents();
        })
        .catch(error => {
          console.error('Error updating student:', error);
          alert('Failed to update student');
        });
    } else {
      // Create new student
      axios.post('http://localhost:3000/students', studentData) // Backend handles single object or array
        .then(() => {
          setIsFormOpen(false);
          fetchStudents();
        })
        .catch(error => {
          console.error('Error creating student:', error);
          alert('Failed to create student: ' + (error.response?.data?.message || error.message));
        });
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="dashboard" style={{ padding: '20px' }}>
      <h2>Student Management Dashboard</h2>

      <div className="stats" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <strong>Total Students:</strong> {students.length}
        </div>
      </div>

      <button
        onClick={handleAddClick}
        style={{ marginBottom: '15px', padding: '10px 20px', cursor: 'pointer', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Add New Student
      </button>

      {isFormOpen && (
        <StudentForm
          student={editingStudent}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <StudentList
          students={students}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
}

export default Dashboard;
