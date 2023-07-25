import React, { Component } from 'react'
import { flushSync } from 'react-dom';

export default class ClassTest extends Component {
    state = {
        x: 1,
        y: 1,
        z: 1
    }

    handleClick = () => {
        // flushSync(() => {
        //     this.setState({ x: 2, y: 2, z: 2});
        // });
        // console.log('=====flushSync', this.state);
        // this.setState({ x: 3, y: 3, z: 3});
        // console.log(this.state);
        for (let i = 0; i < 20; i++) {
            this.setState((prevState: {x:number, y: number, z: number}) => {
                return {x: prevState.x + 1}
            });
        }
    }

    render() {
        console.log("======RENDER=====")
        return (
            <div onClick={this.handleClick}>ClassTest{this.state.x}</div>
        )
    }
}
