import React, { useState } from 'react';
import Axios from 'axios'

interface TodoItem {
    title: string;
    description: string;
}
interface AddItemProps {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddItem: React.FC<AddItemProps> = ({ trigger, setTrigger }) => {
    const [newItem, setNewItem] = useState<TodoItem>({ title: '', description: '' });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({ ...newItem, title: e.target.value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({ ...newItem, description: e.target.value });
    };

    const addTodoItem = async (): Promise<void> => {

        await Axios.post("http://localhost:5000/api/addPost", {
            "title": newItem.title,
            "description": newItem.description

        })
            .then((resp) => {
                console.log(resp)
                setTrigger(!trigger)
            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <div style={{ margin: "20px" }}>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }} onSubmit={(e) => {
                e.preventDefault();
                addTodoItem();
            }}>
                <input
                    id='title-input'
                    placeholder='Title'
                    value={newItem.title}
                    onChange={handleTitleChange}
                    style={{width:"100%", padding:"1px"}}
                />
                <input
                    id='des-input'
                    placeholder='Description'
                    value={newItem.description}
                    onChange={handleDescriptionChange}
                    style={{width:"100%", padding:"1px", height:"100px"}}
                />
                <button style={{ width: "70px" }} type='submit'>Add</button>
            </form>
        </div>
    );
};

export default AddItem;
