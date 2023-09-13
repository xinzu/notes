import { HashRouter, BrowserRouter, Link, NavLink, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import A from "./A";
import B from "./B";
import C from "./C";

const NavBox = styled.nav`
    a {
        font-size: 16px;
        color: black;
        margin: 0 10px;
    }
`

export default function RouterApp() {
  return (
    <HashRouter>
        <NavBox>
            <Link to="/a">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </NavBox>
        <div className="content">
            <Routes>
                <Route path="/a" element={<A />}>
                    <Route path='/a/b' element={<div>A/B内容: <B /></div>} />
                </Route>
                <Route path="/b" Component={B} />
                <Route path="/c" Component={C} />
                <Route path="*" element={<div>page 404</div>} />
            </Routes>
        </div>
    </HashRouter>
  )
}
