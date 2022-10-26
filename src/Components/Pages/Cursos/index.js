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
import { Table, Pagination, PaginationButton, PaginationItem } from "./styles";
import api from "../../../services/api";

export const CadCursos = () => {
    var responseJson;
    var Tipo = 'C';
    let pag = 1;
    let qtdePagina = 10; // qtde. de registro por página.
    var Url;
    var Url2;
    const [curs, setCurs] = useState([]);
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
        loadCursos();
    }, []);

    const loadCursos = async () => {
        try {
            Url = `http://localhost:9001/cursos/${Tipo}`;
            Url2 = `http://localhost:9001/cursos/${pag}/${qtdePagina}`;
            responseJson = await api.post(Url);
            console.log(responseJson.data);
            setTotal((responseJson.data).length); // pega o total de itens.
            responseJson = await api.get(Url2);
            setCurs(responseJson.data);
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

    const [curso, setCurso] = useState({
        codCurso: '',
        nomeCurso: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })


    const valorInput = e => setCurso({ ...curso, [e.target.name]: e.target.value });

    const lerPaginas = async (pagi, qtde) => {
        let totalPages = 0;
        try {
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
        Tipo = 'C';

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
            Url2 = `http://localhost:9001/cursos/${pagi}/${qtdePagina}`;
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

        setCurs(responseJson.data);
        const arrayPages = [];
        if (totalPages == 0) { totalPages = 1 };
        for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
        }
        setPaginas(arrayPages);
    }

    // Editar Curso
    const carregaDados = async (id) => {
        if (id == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário selecionar um Curso !',
            });
            timeMessage(3000);
        } else {
            try {
                Url = `http://localhost:9001/cursos/${Tipo}/${id}`;
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
            Tipo = 'E';

            let objCurso = responseJson.data;
            curso.codCurso = id;
            curso.nomeCurso = objCurso[0].Curso;
            document.getElementById('nomedoCurso').focus();
            timeMessage(300);
        }
    }

    // Deletar Curso
    const deletarDados = (id, nome) => {
        if (id == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário selecionar um Curso !',
            });
            timeMessage(3000);
        } else {
            Swal.fire({
                title: 'Atenção',
                html: 'Confirma a exclusão do Curso  <b>' + nome + '</b> ?',
                icon: 'question',
                showDenyButton: true,
                denyButtonText: 'Não',
                denyButtonColor: 'red',
                confirmButtonText: 'Sim',
                confirmButtonColor: 'blue',
                position: 'center'

            }).then(
                response => {
                    if (response.isConfirmed) {
                        Tipo = '';
                        Url = `http://localhost:9001/cursos/${id}`;
                        ApagarCurso(Url);
                    }
                }
            )

        }
    }

    const ApagarCurso = async (url) => {
        try {
            await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.message.includes('sucesso')) {
                        setStatus({
                            type: 'success',
                            mensagem: responseJson.message
                        });
                        timeMessage(3000);
                        lerPaginas(atualPagina, limit);
                    } else {
                        console.log(responseJson.type);
                        setStatus({
                            type: 'danger',
                            mensagem: responseJson.message
                        });
                    }

                });
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

    }

    // Cadastrar Cursos
    const cadCurso = async e => {
        if (curso.nomeCurso == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário informar o nome do Curso!',
            });
            timeMessage(60000);
        } else {
            e.preventDefault();
            if (curso.codCurso != '' && curso.nomeCurso != '') { Tipo = 'E' } // alteração
            let data = {
                curso: curso.nomeCurso
            }
            if (Tipo == 'E') {
                try {
                    Url = `http://localhost:9001/cursos/${curso.codCurso}`;
                    await fetch(Url, {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ data })
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.message.includes('sucesso')) {
                                setStatus({
                                    type: 'success',
                                    mensagem: responseJson.message
                                });
                                // limpa os campos após gravar com sucesso.
                                setCurso({
                                    codCurso: '',
                                    nomeCurso: ''
                                });
                                timeMessage(3000);
                                lerPaginas(atualPagina, limit);
                            } else {
                                console.log(responseJson.type);
                                setStatus({
                                    type: 'danger',
                                    mensagem: responseJson.message
                                });
                            }
                        });
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
            } else {
                try {
                Tipo = 'I';
                Url = `http://localhost:9001/cursos/${Tipo}`;
                await fetch(Url, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ data })
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if (responseJson.message.includes('sucesso')) {
                            setStatus({
                                type: 'success',
                                mensagem: responseJson.message
                            });
                            // limpa os campos após gravar com sucesso.
                            setCurso({
                                codCurso: '',
                                nomeCurso: ''
                            });
                            timeMessage(3000);
                            lerPaginas(atualPagina, limit);
                        } else {
                            console.log(responseJson.type);
                            setStatus({
                                type: 'danger',
                                mensagem: responseJson.message
                            });
                        }

                    });                    
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
            }
        }
    }

    // Cancela o cadastro de um Usuário
    const cancelar = () => {
        setCurso({
            codCurso: '',
            nomeCurso: ''
        });
    }

    const timeMessage = (duration) => {
        setTimeout(() => {
            setStatus({
                type: '',
                mensagem: ''
            });
        }, duration);
    }

    return (
        <div>
            {
                status.message != '' ? (
                    <Alert className="text-center" color={status.type}>{status.mensagem}</Alert>
                ) : ''
            }
            <div className="row" style={{ marginLeft: 10 }}>
                <div className="col-md-6">
                    <h2 className="font-weight-bold text-center"> Cadastro de Cursos </h2>
                    <form >
                        <FormGroup>
                            <label>Código do Curso:</label>
                            <input name="codCurso" type="text" readOnly="true"
                                value={curso.codCurso}
                                onChange={valorInput}
                                style={{
                                    width: 35,
                                    margin: '5',
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <div className="form-row">
                                <div className="col-md-6 my-3">
                                    <Label>Descrição Curso:</Label>
                                    <Input name="nomeCurso" type="text" id="nomedoCurso"
                                        value={curso.nomeCurso}
                                        autoFocus
                                        placeholder="Digite a Descrição do Curso..."
                                        onChange={valorInput}
                                        style={{ width: 500 }} />
                                </div>
                            </div>
                        </FormGroup>
                        <button type="submit" className="btn btn-primary" onClick={cadCurso}>Gravar</button>
                        <button type="submit" className="btn btn-warning" style={{ marginLeft: 15 }} onClick={cancelar}>Cancelar</button>
                    </form>
                </div>
                <div style={{ width: 610 }}>
                    <h2 className="font-weight-bold text-center"> Lista de Cursos </h2>
                    <p>Escolha a Qtde a ser exibida..:
                        <select onChange={(e) => (setLimit(e.target.value), lerPaginas(1, e.target.value))}>
                            <option value='10'>10</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                            <option value='T'>Todos</option>
                        </select>
                    </p>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 75, padding: 5, textAlign: 'center', marginRight: 0.3, border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Código</div>
                        <div style={{ width: 381, padding: 5, textAlign: 'center', marginRight: 0.2, border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Descrição do Curso</div>
                        <div style={{ width: 130, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Ações</div>
                    </div>
                    <div style={{ overflow: 'auto', maxwidth: '100%', height: 360, alignItems: 'center' }} >
                        <Table className="table-bordered table table-primary">
                            <tbody>
                                {curs.map((curso) => (
                                    <tr key={curso.id}>
                                        <td className="text-center selecao" style={{ width: 75 }}>{curso.id}</td>
                                        <td className="text-left selecao" style={{ width: 377 }}>{curso.Curso}</td>
                                        <td className="text-center opcao" style={{ width: 130 }}>
                                            <button type='button' className="btn btn-primary" onClick={() => carregaDados(curso.id)} style={{ width: 45, padding: 3, fontSize: 9, marginRight: 5, borderRadius: 5 }}>Editar</button>
                                            <button type='button' className="btn btn-danger" onClick={() => deletarDados(curso.id, curso.Curso)} style={{ width: 45, padding: 3, fontSize: 9 }}>Excluir</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination>
                        <div>Total Cursos.: {total}</div>
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
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

export default CadCursos;