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

export const CadUsuarios = () => {
    var responseJson;
    var Tipo = 'C';
    let pag = 1;
    let qtdePagina = 10; // qtde. de registro por página.
    var Url;
    var Url2;
    const [users, setUsers] = useState([]);
    // obter o total de registros
    const [total, setTotal] = useState(0);
    // define o limite exibido por página, no caso aqui é 10.
    const [limit, setLimit] = useState(10);
    // define o total de páginas a serem exibidas
    const [paginas, setPaginas] = useState([]);
    // defina a página atual das teclas de navegação de páginas.
    const [atualPagina, setAtualPagina] = useState(1);

    // Listagem de Usuários
    useEffect(() => {
        loadUsuarios();
    }, []);


    const loadUsuarios = async () => {
        try {
            Url = `http://localhost:9001/usuarios/${Tipo}`;
            Url2 = `http://localhost:9001/usuarios/${pag}/${qtdePagina}`;
            responseJson = await api.post(Url);
            console.log(responseJson.data);
            setTotal((responseJson.data).length); // pega o total de itens.
            responseJson = await api.get(Url2);
            setUsers(responseJson.data);
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
        //let totalPages = Math.round((limit/limit));
        if (totalPages == 0) { totalPages = 1 };
        for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
        }
        setPaginas(arrayPages);
    }

    const timeMessage = (duration) => {
        setTimeout(() => {
            setStatus({
                type: '',
                mensagem: ''
            });
        }, duration);
    }

    const lerPaginas = async (pagi, qtde) => {
        let totalPages = 0;
        try {
            Tipo = 'C';
            Url = `http://localhost:9001/usuarios/${Tipo}`;
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
        setTotal((responseJson.data).length); // pega o total de itens.
        if (qtde == 'T') // seleciona Todos
        {
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
            Url2 = `http://localhost:9001/usuarios/${pagi}/${qtdePagina}`;
            responseJson = await api.get(Url2);
            //console.log(responseJson.data);
            setUsers(responseJson.data);
            //setTotal((responseJson.data).length); // pega o total de itens.            
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
        if (totalPages == 0) { totalPages = 1 };
        for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
        }
        setPaginas(arrayPages);
    }

    const [usuario, setUsuario] = useState({
        codUsuario: '',
        nomeUsuario: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    // pega o valor dos inputs dos campos digitados
    const valorInput = e => setUsuario({ ...usuario, [e.target.name]: e.target.value });

    // Editar Usuário
    const carregaDados = async (id) => {
        if (id == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário selecionar um  Usuário !',
            });
            timeMessage(3000);
        } else {
            try {
                Tipo = 'E';
                Url = `http://localhost:9001/usuarios/${Tipo}/${id}`;
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
            let objUsuario = responseJson.data;
            usuario.codUsuario = id;
            usuario.nomeUsuario = objUsuario[0].Nome;
            document.getElementById('nomedoUser').focus();
            timeMessage(300);
        }
    }

    // Deletar Usuário
    const deletarDados = (id, nome) => {
        if (id == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário selecionar um  Usuário !',
            });
            timeMessage(3000);
        } else {
            Swal.fire({
                title: 'Atenção',
                html: 'Confirma a exclusão do Usuário  <b>' + nome + '</b> ?',
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
                        Url = `http://localhost:9001/usuarios/${id}`;
                        ApagarUser(Url);
                    }
                }
            )

        }
    }

    const ApagarUser = async (url) => {
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

    // Cancela o cadastro de um Usuário
    const cancelar = () => {
        setUsuario({
            codUsuario: '',
            nomeUsuario: ''
        });
    }

    // Cadastro de Usuário
    const cadUser = async e => {
        if (usuario.nomeUsuario == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário informar o nome do Usuário!',
            });
            timeMessage(60000);
        } else {
            e.preventDefault();
            if (usuario.codUsuario != '' && usuario.nomeUsuario != '') { Tipo = 'E' } // alteração
            let data = {
                nome: usuario.nomeUsuario
            }
            if (Tipo == 'E') {
                try {
                    Url = `http://localhost:9001/usuarios/${usuario.codUsuario}`;
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
                                setUsuario({
                                    codUsuario: '',
                                    nomeUsuario: ''
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
            else {
                try {
                    Tipo = 'I';
                    Url = `http://localhost:9001/usuarios/${Tipo}`;
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
                                setUsuario({
                                    codUsuario: '',
                                    nomeUsuario: ''
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

    return (
        <div>
            {
                status.message != '' ? (
                    <Alert className="text-center" color={status.type}>{status.mensagem}</Alert>
                ) : ''
            }
            <div className="row" style={{ marginLeft: 10 }}>
                <div className="col-md-6">
                    <h2 className="font-weight-bold text-center"> Cadastro de Usuários </h2>
                    <form >
                        <FormGroup>
                            <label>Código:</label>
                            <input name="codUsuario" type="text" readOnly="true"
                                value={usuario.codUsuario}
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
                                    <Label>Nome do Usuário:</Label>
                                    <Input name="nomeUsuario" type="text" id="nomedoUser"
                                        value={usuario.nomeUsuario}
                                        autoFocus // coloca o foco neste input
                                        placeholder="Digite o nome do Usuário..."
                                        onChange={valorInput}
                                        style={{ width: 500 }} />
                                </div>
                            </div>
                        </FormGroup>
                        <button type="submit" className="btn btn-primary" onClick={cadUser}>Gravar</button>
                        <button type="submit" className="btn btn-warning" style={{ marginLeft: 15 }} onClick={cancelar}>Cancelar</button>
                    </form>
                </div>
                <div style={{ width: 610 }}>
                    <h2 className="font-weight-bold text-center"> Lista de Usuários </h2>
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
                        <div style={{ width: 381, padding: 5, textAlign: 'center', marginRight: 0.2, border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Nome do Usuário</div>
                        <div style={{ width: 130, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Ações</div>
                    </div>
                    <div style={{ overflow: 'auto', maxwidth: '100%', height: 360, alignItems: 'center' }} >
                        <Table className="table-bordered table table-primary">
                            <tbody>
                                {users.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td className="text-center selecao" style={{ width: 75 }}>{usuario.id}</td>
                                        <td className="text-left selecao" style={{ width: 377 }}>{usuario.Nome}</td>
                                        <td className="text-center opcao" style={{ width: 130 }}>
                                            <button type='button' className="btn btn-primary" onClick={() => carregaDados(usuario.id)} style={{ width: 45, padding: 3, fontSize: 9, marginRight: 5, borderRadius: 5 }}>Editar</button>
                                            <button type='button' className="btn btn-danger" onClick={() => deletarDados(usuario.id, usuario.Nome)} style={{ width: 45, padding: 3, fontSize: 9 }}>Excluir</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination>
                        <div>Total Usuários.: {total}</div>
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

export default CadUsuarios;