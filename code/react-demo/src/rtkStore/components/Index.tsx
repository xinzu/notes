import { Provider } from 'react-redux';
import store from '../index';
import Child from './Child';

export default function index() {
  return (
    <Provider store={store}>
        <Child />
    </Provider>
  )
}
