import ReactDOM from 'react-dom/client';
import '@/assets/css/index.css';
import Test from '@/components/Test';
import ClassTest from './components/ClassTest';
import Memo from './components/Memo';
import Styled from './components/Styled';
// import Jss from './components/Jss';
// import jsxhandler from '@/jsxCore/jsxhandler';

// jsxhandler()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const title = <h2>我是标题</h2>;
const content = <p>我是内容</p>;

root.render(
   <>
        <Test content={content} titleWrap={title}>
            <span>hhh111</span>
        </Test>
        <Memo />
        {/* <Jss /> */}
        <Styled />
        <ClassTest />
   </>
);