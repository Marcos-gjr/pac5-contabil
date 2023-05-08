import { Container  } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";


export default function App() {

  
  return (
    <Container fluid className="App">

      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='*' element={<Navigate to='/'/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/requisicoes' element={<Requisicoes/>} />
          {/* <Route path='/inserir' element={<InserirItem/>} /> */}
          
        
        </Routes>
      </BrowserRouter>
 
    </Container>
  );
}