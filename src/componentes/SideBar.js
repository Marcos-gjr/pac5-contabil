import '../styles/SideBar.css'

import {Navbar, Nav} from "react-bootstrap";

// as palavras serão substituidas por icones depois
export default function BarraLateral() {
    return(
        <Navbar sticky="top" className="flex-column Sidebar" >
            <Nav.Item>
                <Nav.Link href="/" >"Dashboard"</Nav.Link>    
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/" >"Tabelas"</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/" >"Pesquisar"</Nav.Link>
            </Nav.Item>

        </Navbar>




    );




}