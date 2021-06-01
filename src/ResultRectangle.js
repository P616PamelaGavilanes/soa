import React from 'react';
import './App.css';
import './ResultSquare.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import request from 'superagent';
import axios from 'axios'
import { Prompt, Alert} from 'react-st-modal';

const url ='http://192.168.1.110:8000/api/rectangle/';

class ResultRectangle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            lenght : 0 ,//alto
            width:0,//ancho
            perimeter : 0 ,
            area : 0 ,
            data:[], 
            form: {
                id: '',
                lenght : 0 ,//es igual al form name 
                width:0,
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
    peticionPut=(id)=>{
        const {lado1, lado2} = this.state.form;
        const rectangle = {lado1,lado2};
        console.log(rectangle);
        axios.put(url+id+'/update', rectangle).then(response=>{
            this.peticionGet();
        })
    }
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
    componentDidMount() {
        this.peticionGet(); 
    }
    handleChange=async e=>{
        e.persist();
        await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }
        });
    }
    selecRectangle= async (rectangle) =>  {
        this.setState({
            form: {
                id: rectangle.id,
                lado1: rectangle.lado1,
                lado2: rectangle.lado2,
                area: rectangle.area,
                perimeter: rectangle.perimeter
            }
        })
    }
    formActualizar= async (rectangle) =>  {
        const age =await  Prompt('Lado 1 - largo del reactángulo', {
            isRequired: true,
            defaultValue: rectangle.lenght,
            });
        const heightr =await  Prompt('Lado 2 - Ancho del reactángulo', {
            isRequired: true,
            defaultValue: rectangle.width,
            });
            if (age && heightr) {
                this.state.form.lado1= parseFloat(age);
                this.state.form.lado2= parseFloat(heightr);
                console.log(rectangle.id);
                console.log(this.state.form);
                this.peticionPut(rectangle.id);
                console.log(age);
                Alert(`Largo del rectangulo actual ${age}  y Ancho es ${heightr} `, 'Actualizado');
            }else{
                Alert(`No se actualizo  `, 'Cancelado');
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
                    <h1>Rectángulo</h1>
                    <div className="card">
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                            <p> <b>Perímetro</b> <br></br>
                            El rectángulo tiene los lados iguales dos a dos, por tanto:
                            <br></br>P = 2· a + 2· b</p>
                            <p><b>Área</b>
                            <br></br>El área de un rectángulo es el producto de la longitud de los lados.
                            <br></br>A= a · b</p>
                            </blockquote>
                        </div>
                    </div>
                    <h2>Resultados: </h2>
                <p> </p><p> </p>
                <div class="panel panel-default panel-table">
                        <div class="panel-heading">
                            <div class="row">
                            <div class="col col-xs-6">
                                <h3 class="panel-title">Figura geometrica: Rectángulo</h3>
                            </div>
                            
                            </div>
                        </div>
                    <div class="panel-body">
                        <table class="table table-striped table-bordered table-list">
                            <thead>
                                <tr>
                                    <th><em class="fa fa-cog">N</em></th>
                                    <th class="hidden-xs">Largo</th>
                                    <th class="hidden-xs">Ancho</th>
                                    <th>Área</th>
                                    <th>Perímetro</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {this.state.data.map((rectangle, i) => {return(
                                <tr>
                                    <td>{rectangle.id}</td>
                                    <td>{rectangle.lenght}</td>
                                    <td>{rectangle.width}</td>
                                    <td>{rectangle.area}</td>
                                    <td>{rectangle.perimeter}</td>
                                    <td>
                                    <div>
                                    <button  className="btn btn-success" onClick={ () => {this.selecRectangle(rectangle);this.formActualizar(rectangle)}}>Editar </button>
                                    {"     "}
                                    <button className="btn btn-danger" onClick={ () => {this.selecRectangle(rectangle); this.peticionDelete();}}>Eliminar</button>
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
export default ResultRectangle ;