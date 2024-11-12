'use client'
import BtnAtivado from '@/components/Geral/Button/BtnAtivado';
import axios from 'axios';
import Navbar from '@/components/LandingPage/Navbar';
import PlansAndPrices from '@/components/LandingPage/PlansAndPrices';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
    const Todos = ({todos}) => {
        return(
            <div>
                {todos.map((todo) => (
                    <div key={todo.id} className="flex items-center justify-between w-full p-2 my-2 bg-gray-100 rounded-md">
                        <div>
                            <input 
                                type="checkbox" 
                                checked={todo.status} 
                                onChange={() => {}}
                            />
                            <span className="ml-2">{todo.name}</span>
                        </div>
                        <div className='flex gap-3'>
                            <button 
                                onClick={() => updateTodo(todo)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded-md"
                            >
                                editar
                            </button>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-md"
                            >
                                excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState({name: ""});

    const getTodos = async () => {
        const res = await axios.get("http://localhost:3001/todos");
        if(res.data && res.data.length > 0){
            const restructuredData = res.data.map((todo) => {
                return {
                    id: todo.id,
                    name: todo.name,
                    status: todo.status
                }
            });
            setTodos(restructuredData);
        }
    }

    const createTodo = async () => {
        try{
            const res = await axios.post("http://localhost:3001/todos", {name: input.name});
            if(res.status === 201){
                setInput({name: ""});
                getTodos();
            }
        } catch (error){
            console.log(error);
        }
    }

    const updateTodo = async (todo) => {
        const res = await axios.put("http://localhost:3001/todos", {
            id: todo.id, 
            status: todo.status, 
            name: todo.name
        });
        if(res.status === 201){
            getTodos();
            console.log(res.data);
        }
    }

    const deleteTodo = async (id) => {
        try{
            const res = await axios.delete(`http://localhost:3001/todos/${id}`);
            getTodos();
            // if(res.status === 200){
            // }
        } catch (error){    
            console.log(error);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);
    
    return (
        <div className="w-full flex flex-col mx-auto">
            <header className="w-full flex flex-row items-center justify-between px-3 md:px-5 xl:px-20 pt-5">
                <div className="w-full flex justify-end lg:justify-normal flex-row-reverse lg:flex-row items-center lg:gap-4">
                    <div>
                        <h1 className='text-segundaria-900 text-3xl font-semibold'>OwnSystem</h1>
                    </div>
                    <Navbar />
                </div>

                <div className="flex w-full flex-row justify-end items-center gap-4">
                    <button className="hidden lg:flex bg-gray-50 hover:bg-gray-100 shadow-sm rounded-md px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                        <a
                            className="w-full text-neutral-700 font-medium text-sm"
                        >
                            Teste Grátis
                        </a>
                    </button>
                    <button className="bg-segundaria-900 hover:bg-segundaria-800 shadow-md hover:shadow-lg rounded-md px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                        <a href="/login" className="text-white font-medium text-sm">
                            Entrar
                        </a>
                    </button>
                </div>
            </header>

            <main className='w-full h-[880px] flex px-5 xl:px-20 py-5 lg:mt-20'>
                <div className='bg-segundaria-700 w-full min-h-max flex flex-col items-center p-5'>
                    <h1 className='text-segundaria-900 font-semibold text-2xl'>ToDo App</h1>
                    <div className='h-auto w-full'>
                        <Todos todos={todos} />
                    </div>
                    <form>
                        <input 
                            type='text'
                            value={input.name}
                            onChange={(e) => setInput({...input, name: e.target.value})}
                            placeholder='Adicione uma tarefa'
                            className='w-full p-2 my-2 bg-gray-100 rounded-md'
                        />
                    </form>
                    <button
                        type="button"
                        onClick={createTodo}
                        className='bg-segundaria-900 hover:bg-segundaria-800 text-white font-semibold shadow-md hover:shadow-lg rounded-md px-4 py-2 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out'
                    >
                        Adicionar tarefa
                    </button>
                    <div id="todo-list"></div>

                </div>
                <div className='w-full md:w-1/2 flex flex-col items-start gap-6'>
                    <h3 className='text-6xl font-semibold'>
                        Transforme a <span className='text-segundaria-900'>Gestão do Seu Negócio</span> com Nosso Sistema Integrado
                    </h3>
                    <p className='md:w-[640px] font-medium'>
                        Aliquam vel platea curabitur sit vestibulum egestas sit id lorem. Aliquet neque, dui sed eget scelerisque. Non at at venenatis tortor amet feugiat ullamcorper in. Odio vulputate cras vel lacinia turpis volutpat adipiscing. Sollicitudin at velit, blandit tempus nunc in.
                    </p>

                    <div>
                        <button className="bg-segundaria-900 hover:bg-segundaria-800 text-white text-lg font-semibold shadow-md hover:shadow-lg rounded-md px-4 py-2 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                            Teste Grátis
                        </button>
                        <button className="text-segundaria-800 items-center text-lg font-medium rounded-md px-3 py-1 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out">
                            <AddIcon /> Descubra mais
                        </button>
                    </div>
                </div>
                <div className='w-1/2 hidden md:flex flex-col items-center'>
                    <div>
                        <Image src='/img/LandingPage/mochup.png' width={700} height={500} alt="mochup" />
                    </div>
                </div>
            </main>

            <PlansAndPrices />
        </div>
    );
}