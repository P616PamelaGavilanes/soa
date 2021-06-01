import React from 'react';
import './App.css';
import './ResultSquare.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import request from 'superagent';
import axios from 'axios'
import { Prompt, Alert} from 'react-st-modal';
const url ='http://192.168.1.110:8000/api/circle/';

class ResultCircle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',//es igual al form name 
            radius:0,
            perimeter : 0 ,
            area : 0 ,
            data:[], 
            form: {
                id: '',
                radio: 0,
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
        const {radio} = this.state.form;
        const circle = {radio};
        console.log(circle);
        axios.put(url+id+'/update', circle).then(response=>{
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
        Alert('Esta seguro de eliminar este registro? Presione nuevamente para confirmar','Eliminar');
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
    selecCircle= async (circle) =>  {
        this.setState({
            form: {
                id: circle.id,
                radio: circle.radio,
                area: circle.area,
                perimeter: circle.perimeter
            }
        })
    }
    formActualizar= async (circle) =>  {
        const age =await  Prompt('Radio del circulo', {
            isRequired: true,
            defaultValue: circle.radius,
            });
            if (age) {
                this.state.form.radio= parseFloat(age);
                console.log(circle.id);
                console.log(this.state.form);
                this.peticionPut(circle.id);
                console.log(age);
                Alert(`El radio actual es ${age} `, 'Actualizado');
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
                    <h1>Círculo</h1>
                    <div className="card">
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                            <p> <b>Perímetro</b> <br></br>
                                    El perímetro de un circulo es la circunferencia y 
                                    su valor es igual diámetro multiplicado por pi.
                                    Como el diámetro es igual a dos radios también se puede decir 
                                    que la longitud de la circunferencia = p x 2r
                                    <br></br>
                                    La razón (división) entre el perímetro y el diámetro de una circunferencia 
                                    recibe el nombre de p (pi) y su valor aproximado es 3,14.
                                </p>
                                <p>
                                <b>Área</b>
                                <br></br>
                                El área del círculo es igual al valor de su radio elevado al 
                                cuadrado multiplicado por pi = p x r2.
                                </p>
                            </blockquote>
                        </div>
                        </div>
                    <h2>Resultados: </h2>
                <p> </p><p> </p>
                <div className="panel panel-default panel-table">
                        <div className="panel-heading">
                            <div className="row">
                            <div className="col col-xs-6">
                                <h3 className="panel-title">Figura geometrica: Círculo</h3>
                            </div>
                            
                            </div>
                        </div>
                    <div className="panel-body">
                        <table className="table table-striped table-bordered table-list">
                            <thead>
                                <tr>
                                    <th><em className="fa fa-cog">N</em></th>
                                    <th className="hidden-xs">Radio</th>
                                    <th>Área</th>
                                    <th>Perímetro</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {this.state.data.map((circle, i) => {return(
                                <tr>
                                    <td>{circle.id}</td>
                                    <td>{circle.radius}</td>
                                    <td>{circle.area}</td>
                                    <td>{circle.perimeter}</td>
                                    <td>
                                    <div>
                                    <button className="btn btn-success"  onClick={ () => {this.selecCircle(circle);this.formActualizar(circle)}}>Editar </button>
                                    {"     "}
                                    <button className="btn btn-danger"  onClick={ () => {this.selecCircle(circle); this.peticionDelete();}}>Eliminar</button>
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
export default ResultCircle ;