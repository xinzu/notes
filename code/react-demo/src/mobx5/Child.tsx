import { Component, useEffect } from 'react'
import { inject, observer } from "mobx-react";
import { autorun, reaction, runInAction } from 'mobx';
// @inject('store')
// @observer
// export default class Child extends Component {
//     componentDidMount() {
//         const { store } = this.props as any;
//         autorun(() => {
//             console.log(store.testNum);
//         });
//         reaction(() => store.num, (val) => {
//             console.log(val);
//         });
        
//         reaction(() => [store.num], (val) => {
//             console.log(val);
//         })
//     }
//     increment() {
//         runInAction(() => {
//             const { store } = this.props as any;
//             store.num++;
//         });
//     }
//     render() {
//         const { store } = this.props as any;
//         return (
//             <div>
//                 <span>{store.num}</span>
//                 <br />
//                 <button onClick={() => {
//                     store.increment();
//                 }}>store 异步</button>
//                 <button onClick={() => {
//                     this.increment();
//                 }}>在组件中使用runInAction +1</button>
//                 <button onClick={() => {
//                     store.decrement();
//                 }}>store -1</button>
//                 <button onClick={() => {
//                     store.flowFunc();
//                 }}>store flow</button>
//             </div>
//         )
//     }
// }


const Child = (props: any) => {
    const { store } = props;

    const increment = () => {
        runInAction(() => {
            store.num++;
        });
    }

    useEffect(() => {
        autorun(() => {
            console.log(store.testNum);
        });
        reaction(() => store.num, (val) => {
            console.log(val);
        });
        
        reaction(() => [store.num], (val) => {
            console.log(val);
        })
    }, [])

    return (
        <div>
            <span>{store.num}</span>
            <br />
            <button onClick={() => {
                store.increment();
            }}>store 异步</button>
            <button onClick={() => {
                increment();
            }}>在组件中使用runInAction +1</button>
            <button onClick={() => {
                store.decrement();
            }}>store -1</button>
            <button onClick={() => {
                store.flowFunc();
            }}>store flow</button>
        </div>
    )
}

export default inject('store')(observer(Child));