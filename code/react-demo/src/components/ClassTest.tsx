import React, { Component } from 'react'
import { flushSync } from 'react-dom';

import store from '@/store';
console.log(store)

export default class ClassTest extends Component {
    state = {
        x: 1,
        y: 1,
        z: 1
    }

    handleClick = () => {
        // this.setState({x: 2});
        // this.setState({y: 2});
        // this.setState({z: 2});
        // console.log(this.state.x, this.state.x, this.state.x);
        setTimeout(() => {
            this.setState({x: 2});
            this.setState({y: 2});
            this.setState({z: 2});
            console.log(this.state.x, this.state.x, this.state.x);
		});
        // // flushSync(() => {
        // //     this.setState({ x: 2, y: 2, z: 2});
        // // });
        // // console.log('=====flushSync', this.state);
        // // this.setState({ x: 3, y: 3, z: 3});
        // // console.log(this.state);
        // for (let i = 0; i < 20; i++) {
        //     this.setState((prevState: {x:number, y: number, z: number}) => {
        //         return {x: prevState.x + 1}
        //     });
        // }

        store.dispatch({
            type: 'login',
            info: {
                name: 'hh'
            }
        })
    }

    render() {
        console.log("======RENDER=====")
        return (
            <div onClick={this.handleClick}>ClassTest{this.state.x}-{this.state.y}-{this.state.z}</div>
        )
    }
}
