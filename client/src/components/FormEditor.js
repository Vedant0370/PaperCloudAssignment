import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createForm, getForm } from '../api';

const FormEditor = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [inputs, setInputs] = useState([]);
    const [newInput, setNewInput] = useState({ type: '', title: '', placeholder: '' });
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const addInput = () => {
        if (newInput.title) {
            setInputs([...inputs, newInput]);
            setNewInput({ type: '', title: '', placeholder: '' });
            setIsAdding(false);
        } else {
            alert('Input title is required');
        }
    };

    const removeInput = (index) => {
        setInputs(inputs.filter((_, i) => i !== index));
    };

    const saveForm = async () => {
        await createForm({ title, inputs });
        navigate('/');
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getForm(id);
                setInputs(res.data.inputs);
                setTitle(res.data.title);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [id]);

    return (
        <div className="container mx-auto p-4 flex">
            <div className="w-1/2 p-4 border rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Edit Form</h1>
                <input
                    type="text"
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Form Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="mb-4">
                    <button
                        onClick={() => setIsAdding(true)}
                        className="border border-blue-500 text-blue-500 px-4 py-2 rounded shadow"
                    >
                        Add Input
                    </button>
                </div>
                <div className="flex overflow-x-auto mb-4 space-x-4">
                    {inputs.map((input, index) => (
                        <div key={index} className="flex-shrink-0 p-4 border rounded shadow-md">
                            <label className="block text-sm font-bold mb-1">{input.title}</label>
                            <input
                                type={input.type}
                                placeholder={input.placeholder}
                                readOnly
                                className="w-full p-2 border rounded"
                            />
                            <button
                                onClick={() => removeInput(index)}
                                className="border border-red-500 text-red-500 px-2 py-1 rounded mt-2 shadow"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={saveForm}
                    className="border bg-green-500 text-white px-4 py-2 rounded shadow"
                >
                    Save Form
                </button>
            </div>
            {isAdding && (
                <div className="w-1/2 ml-4 p-4 border rounded shadow-md">
                    <h2 className="text-xl font-bold mb-2">Add New Input</h2>
                    <label className="block mb-2">Input Type:</label>
                    <select
                        value={newInput.type}
                        onChange={(e) => setNewInput({ ...newInput, type: e.target.value })}
                        className="w-full p-2 mb-4 border rounded"
                    >
                        <option value="">Select type</option>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                    </select>
                    <label className="block mb-2">Input Title:</label>
                    <input
                        type="text"
                        value={newInput.title}
                        onChange={(e) => setNewInput({ ...newInput, title: e.target.value })}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <label className="block mb-2">Input Placeholder:</label>
                    <input
                        type="text"
                        value={newInput.placeholder}
                        onChange={(e) => setNewInput({ ...newInput, placeholder: e.target.value })}
                        className="w-full p-2 mb-4 border rounded"
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={addInput}
                            className="border border-blue-500 text-blue-500 px-4 py-2 rounded shadow"
                        >
                            Add Input
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="border border-red-500 text-red-500 px-4 py-2 rounded shadow"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormEditor;
