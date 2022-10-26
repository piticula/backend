import React, { useState, useEffect, Component } from "react";
import Swal from 'sweetalert2';

import {
    //Table,
    Form,
    Button,
    FormGroup,
    Label,
    Input,
    Alert

} from "reactstrap";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import { Table, Container, Pagination, PaginationButton, PaginationItem } from "./styles";
import api from "../../../services/api";


export const ListMatriculas = () => {
    var responseJson;
    var Tipo = 'C';
    let pag = 1;
    let qtdePagina = 10; // qtde. de registro por página.
    var Url;
    var Url2;
    const [matriculas, setMatriculas] = useState([]);
    // obter o total de registros
    const [total, setTotal] = useState(0);
    // define o limite exibido por página, no caso aqui é 10.
    const [limit, setLimit] = useState(10);
    // define o total de páginas a serem exibidas
    const [paginas, setPaginas] = useState([]);
    // defina a página atual das teclas de navegação de páginas.
    const [atualPagina, setAtualPagina] = useState(1);

    // Listagem de Cursos
    useEffect(() => {
        loadUsuariosMatric();
    }, []);

    const loadUsuariosMatric = async () => {
        try {
            Url = `http://localhost:9001/matriculas/${Tipo}`;
            Url2 = `http://localhost:9001/matriculas/${pag}/${qtdePagina}`;
            responseJson = await api.post(Url);
            setTotal((responseJson.data).length); // pega o total de itens.
            responseJson = await api.get(Url2);
            setMatriculas(responseJson.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'O Servidor desta Aplicação não está funcionando !',
                footer: '<b>Erro.:</b>  ' + error.message + '<br>' +
                    ' Verifique se o mesmo se encontra Online.',

            }).then(function () {
                window.location = "/";
            });
        }
        const arrayPages = [];
        let totalPages = Math.round(((responseJson.data).length / limit));
        if (totalPages == 0) { totalPages = 1 };
        for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
        }
        setPaginas(arrayPages);
    }

    const valorInput = e => setMatricula({ ...matricula, [e.target.name]: e.target.value });

    const [matricula, setMatricula] = useState({
        nomePesquisa: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const Pesquisar = async (pagi, qtde, nome) => {
        let totalPages = 0;
        try {
            Tipo = 'C';
            Url = `http://localhost:9001/cursos/${Tipo}`;
            responseJson = await api.post(Url);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'O Servidor desta Aplicação não está funcionando !',
                footer: '<b>Erro.:</b>  ' + error.message + '<br>' +
                    ' Verifique se o mesmo se encontra Online.',

            }).then(function () {
                window.location = "/";
            });
        }
        if (((responseJson.data).length / 10) > 1 && ((responseJson.data).length / 10) < 1.5) {
            totalPages = 2;
        }
        else {
            totalPages = Math.round(((responseJson.data).length / 10));
        }
        setTotal((responseJson.data).length);
        if (qtde == 'T') {
            qtdePagina = qtde;
            totalPages = Math.round(((responseJson.data).length / 10));
        }
        else if (parseInt(qtde) == 10) {
            qtdePagina = 10;
        }
        else if (parseInt(qtde) > (responseJson.data).length) {
            if (pagi == 1) {
                qtdePagina = 10;
            }
            else if (pagi > 1) {
                if (parseInt(qtde) > (responseJson.data).length) {
                    qtdePagina = 10;
                }
                else {
                    qtdePagina = (responseJson.data).length;
                }
                totalPages = Math.round(((responseJson.data).length / 10));
            }

        }
        else if (parseInt(qtde) < (responseJson.data).length) {
            qtdePagina = parseInt(qtde);
        }
        setAtualPagina(pagi);
        try {
            Url2 = `http://localhost:9001/matriculas/${pagi}/${qtdePagina}/${nome}`;
            responseJson = await api.get(Url2);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'O Servidor desta Aplicação não está funcionando !',
                footer: '<b>Erro.:</b>  ' + error.message + '<br>' +
                    ' Verifique se o mesmo se encontra Online.',

            }).then(function () {
                window.location = "/";
            });
        }
        setMatriculas(responseJson.data);
        setTotal((responseJson.data).length);
        const arrayPages = [];
        if (totalPages == 0) { totalPages = 1 };
        for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
        }
        setPaginas(arrayPages);
    }


    const lerPaginas = async (pagi, qtde) => {
        let totalPages = 0;
        Tipo = 'C';
        try {
            Url = `http://localhost:9001/matriculas/${Tipo}`;
            responseJson = await api.post(Url);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'O Servidor desta Aplicação não está funcionando !',
                footer: '<b>Erro.:</b>  ' + error.message + '<br>' +
                    ' Verifique se o mesmo se encontra Online.',

            }).then(function () {
                window.location = "/";
            });
        }

        if (((responseJson.data).length / 10) > 1 && ((responseJson.data).length / 10) < 1.5) {
            totalPages = 2;
        }
        else {
            totalPages = Math.round(((responseJson.data).length / 10));
        }
        setTotal((responseJson.data).length);
        if (qtde == 'T') {
            qtdePagina = qtde;
            totalPages = Math.round(((responseJson.data).length / 10));
        }
        else if (parseInt(qtde) == 10) {
            qtdePagina = 10;
        }
        else if (parseInt(qtde) > (responseJson.data).length) {
            if (pagi == 1) {
                qtdePagina = 10;
            }
            else if (pagi > 1) {
                if (parseInt(qtde) > (responseJson.data).length) {
                    qtdePagina = 10;
                }
                else {
                    qtdePagina = (responseJson.data).length;
                }
                totalPages = Math.round(((responseJson.data).length / 10));
            }

        }
        else if (parseInt(qtde) < (responseJson.data).length) {
            qtdePagina = parseInt(qtde);
        }
        setAtualPagina(pagi);
        try {
            Url2 = `http://localhost:9001/matriculas/${pagi}/${qtdePagina}`;
            responseJson = await api.get(Url2);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'O Servidor desta Aplicação não está funcionando !',
                footer: '<b>Erro.:</b>  ' + error.message + '<br>' +
                    ' Verifique se o mesmo se encontra Online.',

            }).then(function () {
                window.location = "/";
            });
        }

        setMatriculas(responseJson.data);
        const arrayPages = [];
        if (totalPages == 0) { totalPages = 1 };
        for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
        }
        setPaginas(arrayPages);
    }

    return (
        <div>
            {
                status.message != '' ? (
                    <Alert className="text-center" color={status.type}>{status.mensagem}</Alert>
                ) : ''
            }
            <div>
                <h2 className="font-weight-bold text-center"> Usuários Matriculados </h2>
            </div>
            <Container>
                <div>
                    <p>Escolha a Qtde a ser exibida..:
                        <select onChange={(e) => (setLimit(e.target.value), lerPaginas(1, e.target.value))}>
                            <option value='10'>10</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                            <option value='T'>Todos</option>
                        </select>
                    </p>
                    <div style={{ display: "flex", height: 45 }}>

                        <button type='button' className="btn btn-primary"
                            style={{ fontFamily: "sans-serif", fontSize: 8, marginRight: 5, borderRadius: 5 }}
                        ><Link to="/matriculas/cadastro" className="btn">Nova Matrícula</Link></button>

                        <label style={{ padding: 10 }}>Pesquisa:</label>
                        <Input name="nomePesquisa" type="text"
                            autoFocus
                            placeholder="Digite aqui o nome do Usuário a ser localizado ..."
                            onChange={(e) => (Pesquisar(1, limit, e.target.value))}
                            style={{ width: 567 }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 88, padding: 5, textAlign: 'center', marginRight: 0.3, border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Nº Matr.</div>
                        <div style={{ width: 470, padding: 5, textAlign: 'center', marginRight: 0.2, border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Nome do Usuário matriculado</div>
                        <div style={{ width: 130, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Qtde. Cursos</div>
                        <div style={{ width: 130, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Ações</div>
                    </div>
                    <div style={{ overflow: 'auto', maxwidth: '100%', height: 360, alignItems: 'center' }} >
                        <Table className="table-bordered table table-primary">
                            <tbody>
                                {matriculas.map((matricula) => (
                                    <tr key={matricula.id}>
                                        <td className="text-center selecao" style={{ width: 48 }}>{matricula.id}</td>
                                        <td className="text-left selecao" style={{ width: 255 }}>{matricula.nome}</td>
                                        <td className="text-center selecao" style={{ width: 70 }}>{matricula.qtde}</td>
                                        <td className="text-center opcao" style={{ width: 50 }}>
                                            <button type='button' className="btn btn-primary" style={{ width: 60, heigth: 10, padding: 5, fontSize: 10, borderRadius: 5 }}>
                                               <a href={"/matriculas/cadastro/?"+matricula.id} style={{color:"white", textDecoration:"none"}} >Matrículas</a> 
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination>
                        <div style={{ display: 'flex' }}>Total Usuários Matriculados: {total}
                            <PaginationButton>
                                Páginas.:
                                {atualPagina > 1 && (
                                    <PaginationItem onClick={() => lerPaginas(atualPagina - 1, limit)}>Início</PaginationItem>
                                )}
                                {paginas.map(pagina => (
                                    <PaginationItem
                                        isSelect={pagina === atualPagina}
                                        key={pagina}
                                        onClick={() => lerPaginas(pagina, limit)}>{pagina}</PaginationItem>
                                ))}
                                {atualPagina < paginas.length && (
                                    <PaginationItem onClick={() => lerPaginas(atualPagina + 1, limit)}>Fim</PaginationItem>
                                )}
                            </PaginationButton>
                        </div>
                    </Pagination>
                </div>
            </Container>
        </div>
    );
}

export default ListMatriculas;