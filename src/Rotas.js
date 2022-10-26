import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import CadCursos from "./Components/Pages/Cursos";
import ListMatriculas from "./Components/Pages/Matriculas";
import CadMatriculas from "./Components/Pages/Matriculas/Cadastro";
import CadUsuarios from "./Components/Pages/Usuarios";


function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/cursos" element={<CadCursos/>}/>
                <Route path="/matriculas" element={<ListMatriculas/>}/>
                <Route path="/matriculas/cadastro" element={<CadMatriculas/>}/>
                <Route path="/usuarios" element={<CadUsuarios/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;

