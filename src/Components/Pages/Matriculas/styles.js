import styled from "styled-components";

export const TableCab = styled.table `
    border: 2px solid #00BFFF;
    margin: 0;
    width: 100%;
   th {
        padding:5px;
        background-color: #FFFF00;
        color: #FF0000;
   } 
   td {
        padding: 5px;
        background-color: #FFFFF0;
   }
`;

export const Table = styled.table `
    width: 818px;
    border: 2px solid #00BFFF;
    margin: 0;
   th {
        padding: 5px;
        background-color: #FFFF00;
        color: #FF0000;
   } 
   td {
        padding: 5px;
        background-color: #FFFFF0;
   }
   .selecao: hover {
     background-color: #FFFF00;
     color: #FF0000;
     cursor: pointer;
     font-weight: bold;
   }
   .opcao: hover {
     cursor: pointer;
   }
`;

export const Container = styled.div `
     width: 100vw;
     height: 70vh;
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
`

export const Pagination = styled.div `
   display: flex;
   min-width: 500px;
   justify-content: space-between;
   
`;

export const PaginationButton = styled.div `
   display: flex; 
   margin-left: 350px;
`;

export const PaginationItem = styled.div `
     margin: 0 10px;  
     cursor: pointer;
     
     ${(props) =>
          props.isSelect && {
               background:"#FFFF00",
               color: "#DC143C",
               fontWeight:"bold" 
     }}
     padding: 0 5px;
`;