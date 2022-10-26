import styled from "styled-components";

export const PainelBotoes = styled.div `
    .divBotoes {
        margin-left: 216px;
        margin-Bottom: 5px;

        a{
            text-decoration: none;
        }
    }
`;

export const Dados = styled.div`
    width: 70vw;
    height: 70vh;
    display: flex;
    margin: auto;
    border: 2px solid;
    padding: 15px;
    box-shadow: 5px 9px  #777777;
    flex-direction: row;
    //justify-content: center;
    // align-items: center;

    
    .selDialogo {
        margin: 2px 2px 0px 10px;
        font-weight: bold;
    }

    select {
        margin-right:2px;
        width: 310px;
        color:blue;
    }

    input {
        margin: 0px 65px 5px 0px;
    }

    .labDialogo {
        margin-right:60px;
        font-weight: bold;
    }

    Table {
        width:970px;
        max-width: 970px;
    }
`;

export const Table = styled.table `
    max-width: '100%'
    height: 360
`;