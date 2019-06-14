import {connect} from 'react-redux'
import {toggleTodo} from '../actions'
import TodoList from '../components/TodoList'
import {VisibilityFilters} from '../actions/index'

const getVisiableTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

const mapStateToProps = state => ({
    todos: getVisiableTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dipatch => ({
    toggleTodo: id => dipatch(toggleTodo(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)