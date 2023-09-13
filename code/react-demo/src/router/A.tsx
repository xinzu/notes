import { Link, Outlet } from 'react-router-dom';

export default function A() {
  return (
    <div>
        A组件内容
        <Link to="/a/b">A/B</Link>
        <Outlet />
    </div>
  )
}
