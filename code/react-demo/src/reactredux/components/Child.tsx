/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-24 17:31:04
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-24 17:31:04
 */
import { connect } from 'react-redux';
import { add } from '@/store/vote/action';
import { prociseAction } from '@/store/person/action';

const Child = (props: any) => {
    console.log(props.subscribe);
    const {add, prociseAction, vote: {count}, person: {info}} = props;
    return (
        <>
            <div>=================react-redux============</div>
            <div>{count}</div>
            <div>{info ? info.name : 'info为null'}</div>
            <div onClick={() => {
                add();
                prociseAction({name: 'hh-hh'});
            }}>change store state</div>
        </>
    )
}

export default connect(
    (state) => state,
    {add, prociseAction}
)(Child);
