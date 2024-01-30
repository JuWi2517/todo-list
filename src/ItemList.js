function ItemList({ items, removeItem, boughtItem, editItem, categories, startEditing }) {
    return (
        <div className="item-list mb-4">
            {items.map((item) => (
                <div
                    className={`d-flex justify-content-between align-items-center border p-2 mb-2 ${boughtItem.includes(item.id) ? 'bg-green' : ''}`}
                    key={item.id}
                >
                    {item.isEditing ? (
                        <>
                            <input
                                type="text"
                                defaultValue={item.name}
                                onBlur={(e) => editItem(item.id, e.target.value, item.category)}
                                className="form-control"
                            />
                            <select
                                value={item.category}
                                onChange={(e) => editItem(item.id, item.name, e.target.value)}
                                className="form-control"
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <button className="btn btn-secondary btn-sm" onClick={() => startEditing(item.id)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <span className="item-name mx-auto p-2">{item.name}</span>
                            <span className="item-category mx-auto p-2">{item.category}</span>
                            <button className="btn btn-primary btn-sm" onClick={() => startEditing(item.id)}>Edit</button>
                        </>
                    )}
                    <button className="btn btn-success btn-sm me-2" onClick={() => boughtItem(item.id)}>Hotovo</button>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Odebrat</button>
                </div>
            ))}
        </div>
    );
}

export default ItemList;