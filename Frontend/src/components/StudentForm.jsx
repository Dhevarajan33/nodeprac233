import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        dept: '',
        age: ''
    });

    useEffect(() => {
        if (student) {
            setFormData(student);
        } else {
            setFormData({
                id: '',
                name: '',
                dept: '',
                age: ''
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? (parseInt(value) || '') : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="student-form" style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h3>{student ? 'Edit Student' : 'Add New Student'}</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>ID:</label>
                    <input
                        type="number"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        disabled={!!student} // Disable ID editing if updating
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Department:</label>
                    <input
                        type="text"
                        name="dept"
                        value={formData.dept}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ccc', border: 'none', borderRadius: '4px' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
