import styled from 'styled-components';

const Style = styled.div`
    background: lightblue;
    width: 800px;
    height: 800px;
    .list {
        background: blue;
        width: 100px;
        height: 300px;

        .item {
            font-size: 20px;
            color: white;
            &:hover {
                color: red;
            }
        }
    }
 `
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Test() {
    return (
        <Style>
            <div className="list">{arr.map((num: number) => (<div className="item" key={num}>{num}</div>))}</div>
        </Style>
    )
}