import React from 'react';
import './App.css';
import './ResultSquare.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import request from 'superagent';
import axios from 'axios'
import { Prompt, Alert} from 'react-st-modal';

const url ='http://192.168.1.110:8000/api/triangle/';

class ResultTriangle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            base : 0 ,//es igual al form name 
            height:0,
            perimeter : 0 ,
            area : 0 ,
            data:[], 
            form: {
                id: '',
                base : 0 ,//es igual al form name 
                height:0,
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
        const {base, altura} = this.state.form;
        const triangle = {base, altura};
        console.log(triangle);
        axios.put(url+id+'/update', triangle).then(response=>{
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
    selecTriangle= async (triangle) =>  {
        this.setState({
            form: {
                id: triangle.id,
                base: triangle.base,
                altura: triangle.altura,
                area: triangle.area,
                perimeter: triangle.perimeter
            }
        })
    }
    formActualizar= async (triangle) =>  {
        const age =await  Prompt('Base del triángulo', {
            isRequired: true,
            defaultValue: triangle.base,
            });
        const heightr =await  Prompt('Altura del triángulo', {
            isRequired: true,
            defaultValue: triangle.height,
            });
            if (age && heightr) {
                this.state.form.base= parseFloat(age);
                this.state.form.altura= parseFloat(heightr);
                console.log(triangle.id);
                console.log(this.state.form);
                this.peticionPut(triangle.id);
                console.log(age);
                Alert(`La base actual es ${age}  y Altura es ${heightr} `, 'Actualizado');
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
                    <h1>Triángulo</h1>
                    <div className="card">
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                            <p> <b>Perímetro de un triángulo equilátero</b> <br></br></p>
                            <div class="container">
                                <div class="row">
                                    <div  className='col-2'  id= "myImage2"></div>
                                    <div className='col-3'  id= "myImage3"></div>
                                    <div className='col-6'  id= "myImage">  <b>Área</b> </div>
                                </div>
                            </div>
                            </blockquote>
                        </div>
                    </div>
                    <h2>Resultados: </h2>
                <p> </p><p> </p>
                <div class="panel panel-default panel-table">
                        <div class="panel-heading">
                            <div class="row">
                            <div class="col col-xs-6">
                                <h3 class="panel-title">Figura geometrica: Triángulo</h3>
                            </div>
                            
                            </div>
                        </div>
                    <div class="panel-body">
                        <table class="table table-striped table-bordered table-list">
                            <thead>
                                <tr>
                                    <th><em class="fa fa-cog">N</em></th>
                                    <th class="hidden-xs">Base</th>
                                    <th class="hidden-xs">Altura</th>
                                    <th>Área</th>
                                    <th>Perímetro</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {this.state.data.map((triangle, i) => {return(
                                <tr>
                                    <td>{triangle.id}</td>
                                    <td>{triangle.base}</td>
                                    <td>{triangle.height}</td>
                                    <td>{triangle.area}</td>
                                    <td>{triangle.perimeter}</td>
                                    <td>
                                    <div>
                                    <button className="btn btn-success" onClick={ () => {this.selecTriangle(triangle);this.formActualizar(triangle)}}>Editar </button>
                                    {"     "}
                                    <button className="btn btn-danger" onClick={ () => {this.selecTriangle(triangle); this.peticionDelete();}}>Eliminar</button>
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
export default ResultTriangle ;