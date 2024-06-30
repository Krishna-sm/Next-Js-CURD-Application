"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { UseTodo } from './Todos.context'
import moment from 'moment';

const RootPage = () => {

    const [index,setIndex] = useState(0);
    const {AddTodo,todos} = UseTodo();

    const [state,setState] = useState({
        title:'',
        desc:''
    })

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=> setState({...state,[e.target.name]:e.target.value})

    const onSubmitHandler =(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();


        AddTodo(state.title,state.desc)

        setState({
            title:'',
            desc:''
        })
    }

  return (
    <>
                       <div className="container bg-[#ffffffe2] py-[15px]">
              <form onSubmit={onSubmitHandler} className="w-1/2 mx-auto">
              <div className="mb-3">
                <h1 className='text-2xl'>Add Todo</h1>
              </div>
                  <div className="mb-3">
                      <label htmlFor="title">title</label>
                      <input name='title' value={state.title} onChange={onChangeHandler} id='title' type="text" className="w-full border py-2 px-4 rounded-md" placeholder='Enter Title' />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="title">Desc</label>
                      <textarea  name='desc' value={state.desc} onChange={onChangeHandler} id='title' rows={5} className="w-full border py-2 px-4 rounded-md" placeholder='Enter Descrption' />
                  </div>
                  <div className="mb-3">
                    <button type='submit' className="px-6 py-2 rounded-md bg-green-500 text-white">Submit</button>
                  </div>
              </form>
                       </div>

        <ul className="flex items-center gap-x-4 bg-purple-600">
              <li onClick={()=>setIndex(0)} className={`text-lg px-4 py-2 ${index ===0&&`bg-red-500`} cursor-pointer rounded-lg shadow-xl text-white`}>All</li>
              <li onClick={() => setIndex(1)} className={`text-lg px-4 py-2 ${index === 1 && `bg-red-500`} cursor-pointer rounded-lg shadow-xl text-white`}>Active</li>
              <li onClick={() => setIndex(2)} className={`text-lg px-4 py-2 ${index === 2 && `bg-red-500`} cursor-pointer rounded-lg shadow-xl text-white`}>Complete</li>
        </ul>
          {/* {JSON.stringify({ todos })} */}
         
                <div className="py-3">
              {index === 0 && <AllTodos />}
              {index === 1 && <ActiveTodos />}
              {index === 2 && <AllCompleteTodos />}
                </div>





    </>
  )
}

export default RootPage



const AllTodos=()=>{
    const{todos,updateTodo,deleteTodo} = UseTodo()
    return <>
    
        <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-y-2 gap-x-5">
                    {
                todos.length>0 ? todos.map((cur,i)=>{
                    return !cur.isComplete && !cur.isDelete   && <div key={i} className='card border px-4 py-3 rounded-md shadow-lg'>
                        <h1 className='text-xl font-semibold capitalize'>{cur.title} <span className="text-gray-400 text-sm">{moment(new Date(cur.createAt)).format("LL")}</span> </h1>
                                <h1 className='py-3'>{cur.desc}</h1>
                               <div className="flex items-center">
                            <button onClick={() => deleteTodo(cur.createAt)} className='px-4 py-2 rounded-md bg-red-500 text-white mx-2'>Complete</button>
                            <button onClick={() => updateTodo(cur.createAt)} className='px-4 py-2 rounded-md bg-yellow-500 text-white mx-2'>Update</button>
                               </div>
                            </div>
                }) :
                    <>
        <h1 className='text-center text-2xl'>no todos</h1>
                    </>
                    }
                    

                    </div>
    </>
}

export const ActiveTodos = () => {
    const { todos,deleteTodo } = UseTodo()
    return <>

        <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-y-2 gap-x-5">
            {
                todos.length > 0 ? todos.map((cur, i) => {
                    return cur.isComplete && !cur.isDelete &&<div key={i} className='card border px-4 py-3 rounded-md shadow-lg'>
                        <h1 className='text-xl font-semibold capitalize'>{cur.title}</h1>
                        <h1 className='py-3'>{cur.desc}</h1>
                        <div className="flex items-center">
                            <button onClick={() => deleteTodo(cur.createAt)} className='px-4 py-2 rounded-md bg-red-500 text-white mx-2'>Complete</button>
                       
                        </div>
                    </div>
                }) :
                    <>
                        <h1 className='text-center text-2xl'>no todos</h1>
                    </>
            }


        </div>
    </>
}



export const AllCompleteTodos = () => {
    const { todos,finishTodo } = UseTodo()
    return <>

        <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-y-2 gap-x-5">
            {
                todos.length > 0 ? todos.map((cur, i) => {
                    return  cur.isDelete && <div key={i} className='card border px-4 py-3 rounded-md shadow-lg'>
                        <h1 className='text-xl font-semibold capitalize'>{cur.title}</h1>
                        <h1 className='py-3'>{cur.desc}</h1>
                        <div className="flex items-center">
                            <button 
                                onClick={() => finishTodo(cur.createAt)} 
                            className='px-4 py-2 rounded-md bg-red-500 text-white mx-2'>Delete</button>

                        </div>
                    </div>
                }) :
                    <>
                        <h1 className='text-center text-2xl'>no todos</h1>
                    </>
            }


        </div>
    </>
}
