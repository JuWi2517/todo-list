import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
    const [items, setItems] = useState([]);
    const [categories] = useState(['Nákup', 'Práce', 'Domov', 'Osobní']);
    const [currentFilter, setCurrentFilter] = useState('All');
    const [doneFilter, setDoneFilter] = useState('All'); // 'All', 'Done', or 'Undone'
    const [newItemName, setNewItemName] = useState('');

    useEffect(() => {
        const savedItems = localStorage.getItem('todoList');
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        if (newItemName.trim() !== '') {
            const newItem = {
                id: Date.now(),
                name: newItemName.trim(),
                category: categories[0],
                isEditing: false,
                done: false,
            };
            setItems([...items, newItem]);
            setNewItemName('');
        }
    };

    const editItem = (id, newName, newCategory) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, name: newName, category: newCategory, isEditing: false } : item
        ));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const toggleEdit = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, isEditing: !item.isEditing } : item
        ));
    };

    const toggleDone = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, done: !item.done } : item
        ));
    };

    const filteredItems = items
        .filter(item => currentFilter === 'All' || item.category === currentFilter)
        .filter(item => {
            if (doneFilter === 'Done') return item.done;
            if (doneFilter === 'Undone') return !item.done;
            return true; // doneFilter is 'All'
        });

    return (
        <div className="TodoList">
            <div>
                <select onChange={(e) => setCurrentFilter(e.target.value)} value={currentFilter}>
                    <option value="All">Všechny kategorie</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <select onChange={(e) => setDoneFilter(e.target.value)} value={doneFilter}>
                    <option value="All">Všechny úkoly</option>
                    <option value="Done">Dokončené úkoly</option>
                    <option value="Undone">Nedokončené úkoly</option>
                </select>
            </div>

            {filteredItems.map(item => (
                <div key={item.id} className={`item ${item.isEditing ? 'editing' : ''} ${item.done ? 'done' : ''}`}>
                    {item.isEditing ? (
                        <>
                            <input
                                type="text"
                                defaultValue={item.name}
                                onBlur={(e) => editItem(item.id, e.target.value, item.category)}
                                className="item-name"
                            />
                            <select
                                defaultValue={item.category}
                                onChange={(e) => editItem(item.id, item.name, e.target.value)}
                                className="item-category"
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                            <button onClick={() => toggleEdit(item.id)}>Hotovo</button>
                        </>
                    ) : (
                        <>
                            <span className="item-name">{item.name}</span>
                            <span className="item-category">{item.category}</span>
                            <button onClick={() => toggleEdit(item.id)}>Edit</button>
                            <button onClick={() => toggleDone(item.id)}>
                                {item.done ? 'Označ jako nedokončený' : 'Označ jako hotový'}
                            </button>
                            <button onClick={() => removeItem(item.id)}>Odstranit</button>
                        </>
                    )}
                </div>
            ))}

            <div>
                <input
                    type="text"
                    placeholder="Přidat nový Úkol"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addItem();
                        }
                    }}
                />
                <button onClick={addItem}>Přidat úkol</button>


            </div>
        </div>
    );
}

export default TodoList;
