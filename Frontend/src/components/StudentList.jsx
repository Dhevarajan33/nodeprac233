import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  return (
    <div className="student-list" style={{ marginTop: '20px' }}>
      <h3>Student List</h3>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Department</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Age</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.id}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.name}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.dept}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{student.age}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button 
                    onClick={() => onEdit(student)}
                    style={{ marginRight: '5px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(student.id)}
                    style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
