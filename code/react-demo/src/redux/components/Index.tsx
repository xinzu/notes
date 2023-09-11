
import Context from './Context';
import ThemeContext from '@/ThemeContext';
import store from '@/store';
export default function Index() {
    return (
        <ThemeContext.Provider value={store}><Context /></ThemeContext.Provider>
    )
}
