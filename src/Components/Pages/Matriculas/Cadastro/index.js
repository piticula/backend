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
import { Table, Pagination, PaginationButton, PaginationItem } from "../styles";

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import { Dados, PainelBotoes } from "../Cadastro/styles";
import api from "../../../../services/api";


export const CadMatriculas = () => {

    let qtdePagina = 10; // qtde. de registro por página.
    var Tipo;
    var responseJson;
    var Url;
    var UrlMatriculas;
    var UrlUsuarios;
    var UrlCursos;
    const dataAtual = new Date().toLocaleDateString();
    const [usuarios, setUsuarios] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [matriculas, setMatriculas] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    // obter o total de registros
    const [total, setTotal] = useState(0);
    // define o limite exibido por página, no caso aqui é 10.
    const [limit, setLimit] = useState(10);
    // define o total de páginas a serem exibidas
    const [paginas, setPaginas] = useState([]);
    // defina a página atual das teclas de navegação de páginas.
    const [atualPagina, setAtualPagina] = useState(1);

    useEffect(() => {
        preencheCombo();        
    }, []);

    const preencheCombo = async () => {
        try {
            Tipo = 'C';
            UrlUsuarios = `http://localhost:9001/usuarios/${Tipo}`;
            responseJson = await api.post(UrlUsuarios);
            setUsuarios(responseJson.data);
            UrlCursos = `http://localhost:9001/cursos/${Tipo}`;
            responseJson = await api.post(UrlCursos);
            setCursos(responseJson.data);
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
        if(window.location.href.split("?")[1] !=""){
            let nUsuario =  parseInt(window.location.href.split("?")[1].replace(/%20/g, " "));
            document.getElementById('selUsuario').value = nUsuario;   
            buscaMatriculas(nUsuario);
        }
    }

    const timeMessage = (duration) => {
        setTimeout(() => {
            setStatus({
                type: '',
                mensagem: ''
            });
        }, duration);
    }

    const limpar = () => {
        document.getElementById('codMatric').value = '';
        document.getElementById('datMatric').value = '';
        document.getElementById('datInicio').value = '';
        document.getElementById('datFim').value = '';
        document.getElementById('selUsuario').value = '';
        document.getElementById('selCurso').value = '';
        document.getElementById('selStatus').value = '';
        buscaMatriculas(0);
        document.getElementById('selUsuario').focus();
    }

    // Cancela o cadastro de um Usuário
    const cancelar = () => {
        limpar();
    }

    const buscaMatriculas = async (idUser) => {
        if (idUser !== null) {
            try {
                Tipo = 'C';
                UrlMatriculas = `http://localhost:9001/matriculas/cadastro/${Tipo}/${idUser}`;
                responseJson = await api.post(UrlMatriculas);
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
            document.getElementById('selCurso').focus();
            timeMessage(300);
        }
    }

    const carregaDados = async (idUsuario, idMatricula) => {
        if (idUsuario !== '') {
            try {
                Tipo = 'E';
                UrlMatriculas = `http://localhost:9001/matriculas/cadastro/${Tipo}/${idUsuario}/${idMatricula}`;
                responseJson = await api.post(UrlMatriculas);
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

            let objMatricula = responseJson.data;
            document.getElementById('selCurso').value = objMatricula[0].id_curso;
            document.getElementById('codMatric').value = objMatricula[0].id;
            document.getElementById('datMatric').value = objMatricula[0].dataMatric.split('/').reverse().join('-');
            document.getElementById('datInicio').value = objMatricula[0].dataInicio.split('/').reverse().join('-');
            document.getElementById('datFim').value = objMatricula[0].dataFim.split('/').reverse().join('-');
            if (objMatricula[0].status == 'CURSANDO') {
                document.getElementById('selStatus').value = 1;
            } else if (objMatricula[0].status == 'CANCELOU') {
                document.getElementById('selStatus').value = 2;
            } else if (objMatricula[0].status == 'CONCLUIDO') {
                document.getElementById('selStatus').value = 3;
            }

            document.getElementById('selCurso').focus();
            timeMessage(300);
        }
    }

    const deletarDados = (idUsuario, idMatricula) => {
        if (idMatricula == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário selecionar uma Matrícula !',
            });
            timeMessage(3000);
        } else {
            Swal.fire({
                title: 'Atenção',
                html: 'Confirma a exclusão da Matrícula de número: <b>' + idMatricula + '</b> ?',
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
                        UrlMatriculas = `http://localhost:9001/matriculas/cadastro/${idUsuario}/${idMatricula}`;
                        ApagarMatricula(idUsuario,UrlMatriculas);
                    }
                }
            )

        }
    }

    const ApagarMatricula = async (idUsuario, url) => {
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
        buscaMatriculas(idUsuario);
    }

    const cadMatricula = async e => {
        let wStatus;
        if (document.getElementById('selUsuario').value == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário informar o Usuário da Matrícula!',
            });
            timeMessage(3000);
            document.getElementById('selUsuario').focus();
        } else if (document.getElementById('selCurso').value == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário informar o Curso da Matrícula!',
            });
            timeMessage(3000);
            document.getElementById('selCurso').focus();
        } else if (document.getElementById('datMatric').value == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário informar a data da Matrícula!',
            });
            timeMessage(3000);
            document.getElementById('datMatric').focus();
        } else if (document.getElementById('datInicio').value == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário informar a data de início do Curso!',
            });
            timeMessage(3000);
            document.getElementById('datInicio').focus();
        } else if (document.getElementById('datFim').value == '') {
            setStatus({
                type: 'danger',
                mensagem: 'É necessário informar a data do Término do Curso!',
            });
            timeMessage(3000);
            document.getElementById('datFim').focus();
        } else {
            e.preventDefault();
            if (document.getElementById('codMatric').value != '' && document.getElementById('datMatric').value != '') {
                Tipo = 'E';
                wStatus = 1;
            } // alteração
            let data = {
                datmatric: document.getElementById('datMatric').value,
                datinicio: document.getElementById('datInicio').value,
                datfim: document.getElementById('datFim').value,
                id_usuario: document.getElementById('selUsuario').value,
                id_curso: document.getElementById('selCurso').value,
                status: document.getElementById('selStatus').value
            }
            let User = parseInt(document.getElementById('selUsuario').value);
            let Matric = document.getElementById('codMatric').value;
            if (Tipo == 'E') {
                try {
                    Url = `http://localhost:9001/matriculas/cadastro/${User}/${Matric}`;
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
                                limpar();
                                timeMessage(3000);
                            } else {
                                console.log(responseJson.type);
                                setStatus({
                                    type: 'danger',
                                    mensagem: responseJson.message
                                });
                            }
                        });
                        buscaMatriculas(User);
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
                    Url = `http://localhost:9001/matriculas/${Tipo}`;
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
                                limpar();
                                timeMessage(3000);
                                document.getElementById('idUsuario').focus();
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
            <h2 className="font-weight-bold text-center"> Cadastro de Matrículas </h2>
            <PainelBotoes>
                <div className="divBotoes">
                    <button type="submit" className="btn btn-primary" onClick={cadMatricula}>Gravar</button>
                    <button type="submit" className="btn btn-warning" style={{ marginLeft: 10 }} onClick={cancelar}>Cancelar</button>
                    <button type="button" className="btn btn-info" style={{ marginLeft: 10 }} ><a href="/matriculas">Voltar</a> </button>
                </div>
            </PainelBotoes>
            <Dados>
                <div className="form-dialog">
                    <div>
                        <form>
                            <div className="mb-2" style={{ display: "flex" }}>
                                <label className="selDialogo">Selecione o Usuário:</label>
                                <select className="form-select form-select-sm"
                                    name="selUsuario" id="selUsuario"
                                    value={usuarios.id}
                                    onChange={(e) => (buscaMatriculas(e.target.value))}
                                    autoFocus>
                                    <option value={0}></option>
                                    {usuarios.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>{usuario.Nome}</option>
                                    ))}
                                </select>

                                <label className="selDialogo" style={{ marginLeft: 45 }}>Selecione o Curso:</label>
                                <select className="form-select form-select-sm" name="selCurso" id="selCurso" value={cursos.id} >
                                    <option value={0}></option>
                                    {cursos.map((matricula) => (
                                        <option key={matricula.id} value={matricula.id}>{matricula.Curso}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="labDialogo" style={{ marginLeft: 10 }}>Nº Matr:</label>
                                <label className="labDialogo" style={{ marginLeft: 8 }}>Data Matricula:</label>
                                <label className="labDialogo" style={{ marginLeft: 20 }}>Data de Início:</label>
                                <label className="labDialogo" style={{ marginLeft: 10 }}>Data de Término:</label>
                                <label className="labDialogo" style={{ marginLeft: 30 }}>Situação:</label>
                            </div>
                            <div>
                                <input name="codMatric" type="text" readOnly="true"
                                    id="codMatric"
                                    style={{
                                        width: 65,
                                        marginLeft: 10,
                                        textAlign: "center"
                                    }}
                                />

                                <input name="datMatric" type="date"
                                    id="datMatric"
                                    style={{
                                        width: 125,
                                        margin: '5'
                                    }}
                                />

                                <input name="datInicio" type="date"
                                    id="datInicio"
                                    style={{
                                        width: 125,
                                        margin: '5'
                                    }}
                                />

                                <input name="datFim" type="date"
                                    id="datFim"
                                    style={{ width: 125 }}
                                />

                                <select className="form-select-sm"
                                    name="selStatus"
                                    id="selStatus"
                                    style={{ width: 120, color: "#000088", fontWeight: "bold" }}
                                >
                                    <option value={0}></option>
                                    <option value={1}>CURSANDO</option>
                                    <option value={2}>CANCELOU</option>
                                    <option value={3}>CONCLUÍDO</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <h6 className="font-bold"> Cursos do Usuário.: </h6>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 67, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Matric.</div>
                        <div style={{ width: 100, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Data</div>
                        <div style={{ width: 390, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Descrição do Curso</div>
                        <div style={{ width: 100, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Início</div>
                        <div style={{ width: 100, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Término</div>
                        <div style={{ width: 100, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Situação</div>
                        <div style={{ width: 113, padding: 5, textAlign: 'center', border: '2px solid #00BFFF', color: '#000000', background: '#B0C4DE', fontWeight: 'bold' }}>Ações</div>
                    </div>
                    <div style={{ overflow: 'auto', maxwidth: '100%', height: 360, alignItems: 'center' }} >
                        <Table className="table-bordered table table-primary">
                            <tbody>
                                {matriculas.map((matricula) => (
                                    <tr key={matricula.id}>
                                        <td className="selecao" style={{ width: 140, textAlign: 'center' }}>{matricula.id}</td>
                                        <td className="selecao" style={{ width: 110, textAlign: 'center' }}>{matricula.dataMatric}</td>
                                        <td className="selecao" style={{ width: 750 }}>{matricula.Curso}</td>
                                        <td className="selecao" style={{ width: 110, textAlign: 'center' }}>{matricula.dataInicio}</td>
                                        <td className="selecao" style={{ width: 110, textAlign: 'center' }}>{matricula.dataFim}</td>
                                        <td className="selecao" style={{ width: 95, textAlign: 'center' }}>{matricula.status}</td>
                                        <td className="opcao" style={{ width: 182 }}>
                                            <button type='button' className="btn btn-primary" onClick={() => carregaDados(matricula.id_usuario, matricula.id)} style={{ width: 45, padding: 3, fontSize: 9, marginRight: 5, borderRadius: 5 }}>Editar</button>
                                            <button type='button' className="btn btn-danger" onClick={() => deletarDados(matricula.id_usuario, matricula.id)} style={{ width: 45, padding: 3, fontSize: 9 }}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Dados>
        </div>
    )

}

export default CadMatriculas;