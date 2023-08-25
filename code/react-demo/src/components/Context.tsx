/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-24 16:35:24
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-24 16:35:24
 */
import ThemeContext from '@/ThemeContext'
import {useContext} from 'react'

export default function Context() {
  /*return (
    <ThemeContext.Consumer>
        {value => (
            <div>{value.name}</div>
        )}
    </ThemeContext.Consumer>
  )*/
  const {name} = useContext(ThemeContext);
  	return (
        <div>{name}</div>
  	);
}
