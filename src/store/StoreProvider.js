import store from './store';
import { Provider } from 'react-redux';
import { getGenresThunkFunction } from './slices/genresSlice';

store.dispatch(getGenresThunkFunction());

export default function StoreProvider(props) {
  return <Provider store={store}>{props.children}</Provider>;
}
