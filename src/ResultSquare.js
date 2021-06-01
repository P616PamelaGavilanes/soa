import React from 'react';
import './App.css';
import './ResultSquare.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import request from 'superagent';
import axios from 'axios'
import { Prompt, Alert} from 'react-st-modal';

//URL
const url ='http://192.168.1.110:8000/api/square/';
class ResultSquare extends React.Component{
    constructor(props){
        super(props);
        //MODEL
        this.state = {
            id : '',
            name : '',
            lado : 0 ,//es igual al form name 
            perimeter : 0 ,
            area : 0 ,
            data:[], 
            form: {
                id: '',
                lado: 0,
                area: 0,
                perimeter:0
            }
        }     } 
    //OBTERNER  - METODO GET
    peticionGet=()=>{
        request.get(url).end((err, res) => {
            const users = JSON.parse(res.text);
            this.setState({data: users});
        });
    }
    componentDidMount() {
            this.peticionGet(); 
    }
    //
    peticionPut=(id)=>{
        const {lado} = this.state.form;
        const rectangle = {lado};
        console.log(rectangle);
        axios.put(url+id+'/update', rectangle).then(response=>{
            this.peticionGet();
            console.log(this.state.form.lado);
        })
    }
    //
    peticionDelete=()=>{
        this.setState();
        fetch(url.concat(this.state.form.id).concat('/delete'), { method: 'DELETE' })
        .then(() => {
            this.peticionGet(); 
            this.setState();
        }
        );
        Alert('Esta seguro de eliminar este registro?','Eliminar');
      }
    //
    handleChange=async e=>{
        e.persist();
        await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }
        });
        console.log(this.state.form);
        }
    //

    selecSquare= async (square) =>  {
        this.setState({
            //tipoModal: 'actualizar',
            form: {
                id: square.id,
                lado: square.lado,
                area: square.area,
                perimeter: square.perimeter
            }
        })
        
    }
    formAct= async (square) =>  {
        const age =await  Prompt('Lado', {
            isRequired: true,
            defaultValue: square.side,
            });
            if (age) {
                this.state.form.lado = parseFloat( age);
                console.log(square.id);
                console.log(this.state.form);
                this.peticionPut(square.id);
                console.log(age);
                Alert(`El lado es ${age} `, 'Actualizado');
            }
    }
    render(){
        return(
            
            <div id="squareResult">
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
                    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'></link>
                    <p></p>
                    <h1>Cuadrado</h1>
                    <div className="card">
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                            <p> <b>Perímetro</b> <br></br>
                            El perímetro de un cuadrado es cuatro veces el valor del lado:
                            <br></br> P = 4 · a</p>
                            <p><b>Área</b>
                            <br></br>El área de un cuadrado es igual al cuadrado de la longitud del lado.
                            <br></br>A= a<sup>2</sup></p>
                            </blockquote>
                        </div>
                    </div>
                    <h2>Resultados: </h2>
                    <p> </p><p> </p>
                    <div class="panel panel-default panel-table">
                        <div class="panel-heading">
                            <div class="row">
                            <div class="col col-xs-6">
                                <h3 class="panel-title">Figura geometrica: Cuadrado</h3>
                            </div>
                            
                            </div>
                        </div>
                    <div class="panel-body">
                        <table class="table table-striped table-bordered table-list">
                            <thead>
                                <tr>
                                    <th><em class="fa fa-cog">N</em></th>
                                    <th class="hidden-xs">Lado</th>
                                    <th>Área</th>
                                    <th>Perímetro</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {this.state.data.map((square, i) => {return(
                                <tr>
                                    <td>{square.id}</td>
                                    <td>{square.side}</td>
                                    <td>{square.area}</td>
                                    <td>{square.perimeter}</td>
                                    <td>
                                    <div>
                                    <button className="btn btn-success"

                                        onClick={ () => {
                                        this.selecSquare(square);this.formAct(square)
                                        }}
                                    >
                                        Editar 
                                    </button>
                                    {"     "}
                                    <button className="btn btn-danger"
                                        onClick={ () => {this.selecSquare(square); this.peticionDelete();}}
                                    >
                                        Eliminar
                                    </button>
                                    </div>
                                  </td>
                                </tr>
                            )})}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default ResultSquare ;