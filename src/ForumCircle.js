import React from 'react';
import './App.css';
import './ForumSquare.css'
import {Row, Col,FormGroup} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import { Alert} from 'react-st-modal';
const url = "http://192.168.1.110:8000/api/circle";
class ForumCircle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            radio : 0 ,
            id:''
            ,data:[],} 
        this.handleChange = this.handleChange.bind(this);
    } 
    peticionGet=()=>{
        axios.get(url).then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }
    componentDidMount() {
        this.peticionGet(); 
    }
    handleSubmit = async e =>{
        e.preventDefault();
        const {radio} = this.state;//elementos
        const circle = {radio};
        console.log(circle);
        await axios.post(url, circle).then(()=> {
            console.log('agregado');
            this.peticionGet();
        }).catch(err => {console.error(err); });
        this.resultado();
    }
    resultado  =async ()=> {
        await  Alert('Proceso realizado con éxito','Información');
        const {radio} = this.state;//elementos
        const circle = {radio};
        console.log(circle.radio);
        console.log(this.state.data);
        for (let index = 0; index < this.state.data.length; index++) {
            const element = this.state.data[index].radius;
            console.log(element)
            if(element ===circle.radio){
                await Alert(`Area:  ${this.state.data[index].area}                     Perimetro:  ${this.state.data[index].perimeter}   `, 'Resultado');
                break;
            }
        }
        window.location.href = "http://localhost:3000/";
    }
    handleChange= e=>{this.setState({ [e.target.name]:  parseInt(e.target.value) ? parseInt(e.target.value) : '' });}
    render(){
        return(
            <div id="circleForum">
            <Row>
                <Col xs = "3"></Col>
                <Col xs = "6">
                    <form onSubmit =  {this.handleSubmit}>
                        <p> Elejiste : Círculo </p>
                        <FormGroup>
                            <label> Radio (cm)</label>
                            <input className= 'radio' id="radio"  name= "radio" type="number" min="1" max="300" required onChange={this.handleChange}></input>
                        </FormGroup>
                        <br></br>
                        <FormGroup>
                        <button type="submit" className="btn btn-primary" >Calcular</button>
                        </FormGroup>
                    </form>
                </Col>
            </Row>
        </div>
        )
    }
}
export default ForumCircle ;