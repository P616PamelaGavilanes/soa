import React from 'react';
import './App.css';
import './ForumSquare.css'
import {Row, Col,FormGroup} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import { Alert} from 'react-st-modal';

const url = "http://192.168.1.110:8000/api/square/";
class ForumSquare extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            lado : 0 ,//es igual al form name 
            perimeter : 0 ,
            area : 0 ,
            data:[], 
        } 
        this.handleChange = this.handleChange.bind(this);
    } 
    peticionGet=()=>{
        axios.get(url).then(response=>{
          this.setState({data: response.data});
          console.log(this.state.data);
        }).catch(error=>{
          console.log(error.message);
        })
        }
    componentDidMount() {
        this.peticionGet(); 
    }
        
    //enviar 
    handleSubmit = e =>{
        e.preventDefault();
        const {lado} = this.state;
        const squared = { lado};
        console.log(squared);
        axios.post(url, squared).then(()=> {
            console.log('agregado');
            this.peticionGet();
        }).catch(err => {console.error(err); });
        this.resultado();
    }
    resultado  =async ()=> {
        await Alert('Proceso realizado con éxito','Información');
        const {lado} = this.state;//elementos
        const square = {lado};
            console.log(square.lado);
        console.log(this.state.data);
        for (let index = 0; index < this.state.data.length; index++) {
            const element = this.state.data[index].side;
            console.log(element)
            if(element ===square.lado){
                await Alert(`Area:  ${this.state.data[index].area}                     Perimetro:  ${this.state.data[index].perimeter}   `, 'Resultado');
                break;
            }
        }
        window.location.href = "http://localhost:3000/";
    }
    handleChange= e=>{
        this.setState({ [e.target.name]:  parseInt(e.target.value) ? parseInt(e.target.value) : '' });
        }
    render(){
        return(
        <div id="squareForum">
            <Row>
                <Col xs = "3"></Col>
                <Col xs = "6">
                <p> Elejiste : Cuadrado </p>
                    <form onSubmit =  {this.handleSubmit}>
                        <FormGroup>
                            <label> Lado (cm)</label>
                            <input className= 'lado' id="lado"  name= "lado" type="number" min="1" max="300" required onChange={this.handleChange}></input>
                        </FormGroup>
                        <br></br>
                        <FormGroup>
                            <button type="submit" className="btn btn-primary">Calcular</button>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        </div>
        
        )
    }
}
export default ForumSquare ;