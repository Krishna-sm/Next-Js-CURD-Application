"use client";
import { Todo, Todos } from "@/types/todo";
import { createContext, useContext, useEffect, useState } from "react";


export const TodoContext = createContext<Todos>({
    todos:[],
    AddTodo(){},
    updateTodo() { },
    deleteTodo() { },
    finishTodo(){}
    
});


export const UseTodo =()=>{
    return useContext(TodoContext);
}

export const TodoProvider = ({ children }: { children :React.ReactNode})=>{

    const [todos,setTodos]  = useState<Todo[]>([])


    const fetchAllTodo =()=>{
        const all_todos = JSON.parse(localStorage.getItem("todos") || '[]')
            setTodos(all_todos);
    }

    useEffect(()=>{
        fetchAllTodo()
    },[])

    const AddTodo = (title:string,desc:string)=>{
        const item:Todo ={
            createAt:new Date().getTime(),
            desc:desc,
            title:title,
            isComplete:false,
            isDelete:false
        }
            const all_todo:Todo[]= [...todos,item]
            console.log(all_todo);
            
        setTodos(all_todo);
        console.log(title,desc,todos);
        

        localStorage.setItem("todos", JSON.stringify(all_todo))
    }



    const updateTodo =(id:number)=>{
        // const all_todo = todos.filter((cur)=>cur.createAt !==id);

        const all_todos =  todos.map((cur)=>{
            if(cur.createAt === id){
                cur['isComplete'] =true
            }
            return cur
        })
        setTodos(all_todos);
        localStorage.setItem("todos", JSON.stringify(all_todos))
        // console.log(title, desc, todos);


    }

    const deleteTodo = (id: number) => {
        // const all_todo = todos.filter((cur)=>cur.createAt !==id);

        const all_todos = todos.map((cur) => {
            if (cur.createAt === id) {
                cur['isDelete'] = true
            }
            return cur
        })
        setTodos(all_todos);
        localStorage.setItem("todos", JSON.stringify(all_todos))
        // console.log(title, desc, todos);


    }

    const finishTodo = (id: number) => {
        const all_todo = todos.filter((cur)=>cur.createAt !==id);

        // const all_todos = todos.map((cur) => {
        //     if (cur.createAt === id) {
        //         cur['isDelete'] = true
        //     }
        //     return cur
        // })
        setTodos(all_todo);
        localStorage.setItem("todos", JSON.stringify(all_todo))
        // console.log(title, desc, todos);


    }
    return <>
        <TodoContext.Provider value={{ todos, AddTodo, updateTodo, deleteTodo, finishTodo }} >
            {children}
        </TodoContext.Provider>
    </>
}

