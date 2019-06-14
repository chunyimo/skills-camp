import React from 'react';
import store from './store/index';
import { Provider } from 'react-redux'
import App from './components/App'
class ReduxIndex extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default ReduxIndex;