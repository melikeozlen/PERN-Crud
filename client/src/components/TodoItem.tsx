import Axios from 'axios';
import React, { useState } from 'react'
interface TodoItem {
    title: string;
    decription: string;
    id: number;
    complate: boolean;
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const TodoItemComponent: React.FC<TodoItem> = ({ title, decription, id, complate, trigger, setTrigger }) => {
    const [editMode, setEditMode] = useState(false)
    const handlecheckBoxChange = async (type: boolean, id: number): Promise<void> => {
        await Axios.post("http://localhost:5000/api/updateComplate", {
            "id": id,
            "complate": type
        }).then((resp) => {
            setTrigger(!trigger)
        })
    };
    const deleteTodo = async (id: number): Promise<void> => {
        await Axios.post("http://localhost:5000/api/delete", {
            id: id
        }).then((resp) => {
            setTrigger(!trigger)
        })

    };
    const updateTodo = async (id: number): Promise<void> => {
        const titleValueElement = document.getElementById("title-value") as HTMLInputElement | null;
        const desValueElement = document.getElementById("des-value") as HTMLInputElement | null;
      
        if (titleValueElement && desValueElement) {
          const title = titleValueElement.value;
          const description = desValueElement.value;
      
          await Axios.post("http://localhost:5000/api/update", {
            "title": title,
            "decription": description,
            "id": id
          }).then((resp) => {
            setEditMode(false)
            setTrigger(!trigger)
          });
        }
      };
    return (
        <div key={id} style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", margin: "10px", padding: "10px", background: "lightblue" }}>

            <div style={{ display: "flex", gap: "25px" }}>
                <input style={{ width: "30px" }} onChange={(e) => handlecheckBoxChange(e.target.checked, id)} checked={complate} type='checkbox'></input>
                <div>
                    {!editMode ? <h4 style={{ textDecoration: complate ? "line-through" : undefined }}>{title} </h4> : <input id='title-value' defaultValue={title}></input>}
                    {!editMode ? <p><i>{decription}</i></p> : <input id='des-value' defaultValue={decription} />}
                </div>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
                {!editMode ? <i className="fa fa-pencil" onClick={() => setEditMode(true)} aria-hidden="true" /> :
                    <i className="fa fa-floppy-o" onClick={() => updateTodo(id)} aria-hidden="true" />
                }
                <i className="fa fa-trash" onClick={() => deleteTodo(id)} aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default TodoItemComponent