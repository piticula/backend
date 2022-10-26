<!-- Instalar as depenências -->
npm install
====================================

<!-- Instalar o Bootstrap: -->
npm i --save bootstrap
====================================

<!-- Instalar o Reacstrap: -->
npm i --save reactstrap
====================================

<!-- Instalar a lib para manipulas as rotas -->
npm i –save react-router-dom
====================================

<!-- Instalar a lib de converter css em componente: -->
npm i --save styled-components
====================================

<!-- Instalar a lib para trabalhar com data e hora: -->
npm i --save moment e
====================================

// Exemplo de como fazer um envio para a API:
verifyLogin = () => {
    console.log(this.state)
    axios({
        method: 'post',
        url: 'http://192.168.26.166:3000/users/authenticate',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            username: 'teste',
            password: '123',
        },
        json: true,
    }).then((data) => {
        console.log(data)
    }).catch(error => {
        console.error(error.response)
    })
}
-----------------------------------------------------------------
// nesta caso vai chegar na função authenticate: { '{"username":"teste","password":"123"}': '' }
app.post('/authenticate', (req, res) => {
   console.log(3)

    knex = database(LEGACY_DATABASE)

    const { username, password } = req.body
    console.log(req.body)
    console.log(4)
})
===============================================================================
Converter date para string e string para date:
var brDate = '2017-06-08'.split('-').reverse().join('/');    * para string
var inputDate = '08/06/2017'.split('/').reverse().join('-'); * para date

===============================================================================
    // Extrair um json com fetch....................................................
    // const getUsuario = async () => {
    //     await fetch(Url)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log('A mensagem é.: ' + responseJson.message);
    //             setStatus({
    //                 type: 'success',
    //                 mensagem: responseJson.message
    //             });
    //             //setTotal(responseJson.headers['x-total-count']); // pega o total
    //             const arrayPages = [];
    //             const totalPages = Math.ceil(total/limit);
    //             for (let i = 1; i <= totalPages; i++ ){
    //                 arrayPages.push(i);                   
    //             }
    //             console.log(responseJson.headers);
    //             setData(responseJson);
    //             timeMessage(3000);
    //         })
    //         .catch(err => {
    //             setStatus({
    //                 type: 'danger',
    //                 mensagem: 'Erro apresentado.: ' + err
    //             });
    //         })
    // }