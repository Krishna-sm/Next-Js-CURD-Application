export interface Todo {
    title: string
    desc: string
    createAt: number
    isComplete: boolean
    isDelete: boolean
}

export interface Todos {
todos:Todo[],
    AddTodo: (title: string, desc: string) => void
    updateTodo: (id: number) => void
    deleteTodo: (id: number) => void
    finishTodo: (id: number) => void
    
    
}