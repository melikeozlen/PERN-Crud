import React, { useEffect, useState } from 'react';
import AddItem from './AddItem.tsx';
import Axios from 'axios';
import TodoItemComponent from './TodoItem.tsx';
interface TodoItem {
    id: number;
    title: string;
    decription: string;
    complate: boolean;
}

const Provider: React.FC = () => {
    const [dataSource, setDataSource] = useState<TodoItem[]>([]);
    const [trigger, setTrigger] = useState(true)
    useEffect(() => {
        getAllTodo();
    }, [trigger]);

    const getAllTodo = async (): Promise<void> => {
        try {
            const response = await fetch("http://localhost:5000/api/");
            if (response.ok) {
                const json = await response.json();
                setDataSource(json);
            } else {
                console.error("Veri alınamadı.");
            }
        } catch (err) {
            console.error(err);
        }
    };
    
  
    return (
        <section id='main-card'>
            <AddItem trigger={trigger} setTrigger={setTrigger} />
            {dataSource.map((item) => (
                <TodoItemComponent title={item.title} decription={item.decription} id={item.id} complate={item.complate} trigger={trigger} setTrigger={setTrigger}/>
            ))}
        </section>
    );
};

export default Provider;
