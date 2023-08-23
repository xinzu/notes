import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
    list: {
        background: 'lightblue',
        width: '300px'
    },

    item: {
        fontSize: '20px',
        color: 'white',
        '&:hover': {
            color: 'green'
        }
    }
});

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Jss() {
    const {list, item} = useStyles();
    return (
        <div className={list}>
            {arr.map((num: number) => (<div className={item}>{num}</div>))}
        </div>
    )
}
