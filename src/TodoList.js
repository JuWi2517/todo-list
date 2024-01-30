import React, { useState } from 'react';
import "./TodoList.css";

function TodoList() {
    const [items, setItems] = useState([]);
    const [boughtItems, setBoughtItems] = useState([]);
    const [isArchived, setArchive] = useState(false);
    const [isDone, setDone] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [showAddItemFields, setShowAddItemFields] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [username, setUsername] = useState('');
    const hardcodedUsers = ['Matej', 'Strom', 'Nekolas'];
    const categories = ['Groceries', 'Work', 'Home', 'Personal'];

    const addItem = () => {
        const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
        const newItem = {
            id: newId,
            name: newItemName,
            category: categories[0],
            isEditing: false,
        };
        setItems([...items, newItem]);
        setNewItemName('');
        setShowAddItemFields(false);
    };

    const boughtItem = (id) => {
        setBoughtItems(prevBoughtItems => {
            if (prevBoughtItems.includes(id)) {
                return prevBoughtItems.filter(itemId => itemId !== id);
            } else {
                return [...prevBoughtItems, id];
            }
        });
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const startEditing = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, isEditing: true } : item));
    };

    const editItemName = (id, newName) => {
        setItems(items.map(item => item.id === id ? { ...item, name: newName, isEditing: false } : item));
    };

    const editItemCategory = (id, newCategory) => {
        setItems(items.map(item => item.id === id ? { ...item, category: newCategory } : item));
    };

    const addUser = () => {
        alert('Uživatel byl úspěšně přidán: ' + username);
        setUsername('');
        setShowUserModal(false);
    };

    const showModal = () => {
        setShowUserModal(true);
    };

    const removeAll = () => {
        setItems([]);
    };

    const archiveList = () => {
        setArchive(true);
        alert("Seznam byl archivován");
    };

    const listDone = () => {
        setDone(true);
        alert("Seznam byl označen jako hotový");
    };

    return (
        <div className="ShopList">
            <div className="container">
                <h1>ÚKOLY</h1>
                <div className="item-list mb-4">
                    {items.map(item => (
                        <div
                            id={item.id}
                            className={`d-flex justify-content-between align-items-center border p-2 mb-2 ${boughtItems.includes(item.id) ? 'bg-green' : ''}`}
                            key={item.id}
                        >
                            {item.isEditing ? (
                                <input
                                    type="text"
                                    defaultValue={item.name}
                                    onBlur={(e) => editItemName(item.id, e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            editItemName(item.id, e.target.value);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <div className="item-name">{item.name}</div>
                            )}

                            {/* Category Dropdown */}
                            <select
                                value={item.category}
                                onChange={(e) => editItemCategory(item.id, e.target.value)}
                                className="item-category"
                                disabled={!item.isEditing}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>

                            <div>
                                {item.isEditing ? (
                                    <button className="btn btn-secondary btn-sm me-2" onClick={() => editItemName(item.id, item.name)}>Cancel</button>
                                ) : (
                                    <>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => startEditing(item.id)}>Edit</button>
                                        <button className="btn btn-success btn-sm me-2" onClick={() => boughtItem(item.id)}>Hotovo</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Odebrat</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {showAddItemFields && (
                    <div>
                        <input
                            type="text"
                            placeholder="Item name"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                        />
                        <button onClick={addItem}>Potvrdit</button>
                    </div>
                )}
                {showUserModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowUserModal(false)}>&times;</span>
                            <input
                                type="text"
                                placeholder="Uživatelské jméno"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button onClick={addUser}>Přidat uživatele</button>
                            <ul>
                                {hardcodedUsers.map(user => (
                                    <li key={user}>{user}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="actions mb-4">
                    <button className="btn btn-primary me-2" onClick={() => setShowAddItemFields(true)}>Přidat položku</button>
                    <button className="btn btn-secondary me-2" onClick={showModal}>Přidat uživatele</button>
                    <button className="btn btn-info me-2" onClick={listDone}>Označit jako hotové</button>
                    <button className="btn btn-warning me-2" onClick={archiveList}>Archivovat</button>
                    <button className="btn btn-danger" onClick={removeAll}>Smazat položky</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
