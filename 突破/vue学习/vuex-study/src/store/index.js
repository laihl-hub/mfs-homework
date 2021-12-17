import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

class Todo{
    constructor(id,txt){
        this.id=id
        this.txt=txt
        this.done=false
    }
}
export const ADD_TODOS='ADD_TODOS'
export const CHANGE_TODOS='CHANGE_TODOS'
export const FILTER='FILTER'
export const CLEAR_TODOS='CLEAR_TODOS'
export const REMOVE_TODO='REMOVE_TODO'
export const ALL_DONE='ALL_DONE'

const store=new Vuex.Store({
    state:{
        todos:[],
        itemFilter:'all',
        leftNums:0
    },
    getters:{
        listFilters(state){
            // console.log(state.itemFilter);
            switch(state.itemFilter){
                case 'all':
                    // console.log(state.todos);
                    return state.todos
                case 'active':
                    return state.todos.filter(i=>!i.done)
                case 'completed':
                    return state.todos.filter(i=>i.done)
                default:
                    return state.todos
            }
        },
        leftNum(state){
            state.leftNums=state.todos.filter(i=>!i.done).length
            return state.leftNums
        }

    },
    mutations:{
        [ADD_TODOS](state,txt){
            let item=new Todo(state.todos.length,txt)
            state.todos.push(item)
        },
        // addTodos(state,newTodo){
        //     state.todos.push(newTodo)
        // }
        [CHANGE_TODOS](state,idx){
            state.todos[idx].done=!state.todos[idx].done
        },
        [FILTER](state,filter){
            state.itemFilter=filter
        },
        [CLEAR_TODOS](state){
            state.todos=state.todos.filter(i=>!i.done)
        },
        [REMOVE_TODO](state,idx){
            state.todos.splice(idx,1)
        },
        [ALL_DONE](state){
            if(state.leftNums===state.todos.length||state.leftNums===0){
                state.todos.forEach(i=>{i.done=!i.done})
            }else{
                state.todos.forEach(i=>{
                    if(!i.done){
                        i.done=true
                    }
                })
            }

        }
    },
    actions:{
    }
})

export default store