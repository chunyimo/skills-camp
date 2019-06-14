const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO': {
          console.log(action)
          let re = [
            ...state,
            {
              id: `${state.length}`,
              text: action.text,
              completed: false
            }
          ];
          console.log(re);
          return re
      }
        
      case 'TOGGLE_TODO':
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  
  export default todos