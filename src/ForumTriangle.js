import React from 'react';
import './App.css';
import './ForumSquare.css'
import {Row, Col,FormGroup} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import { Alert} from 'react-st-modal';

const url = "http://192.168.1.110:8000/api/triangle";

class ForumTriangle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            base : 0 ,
            altura : 0 ,
            data:[],
        }  
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
        const {base,altura} = this.state;//elementos
        const triangle = {base,altura};
        console.log(triangle);
        axios.post(url, triangle).then(()=> {
            console.log('agregado');
            this.peticionGet();
        }).catch(err => {console.error(err); });
        this.resultado();
    }
    resultado  =async ()=> {
        await  Alert('Proceso realizado con éxito','Información');
        const {base,altura} = this.state;//elementos
        const triangle = {base,altura};
        console.log(this.state.data);
        for (let index = 0; index < this.state.data.length; index++) {
            const element = this.state.data[index].base;
            const element2 = this.state.data[index].height;
            console.log(element)
            if(element ===triangle.base && element2 === triangle.altura){
                await Alert(`Area:  ${this.state.data[index].area}                     Perimetro:  ${this.state.data[index].perimeter}   `, 'Resultado');
                break;
            }
        }
        window.location.href = "http://localhost:3000/";
    }
    handleChange= e=>{this.setState({ [e.target.name]:  parseInt(e.target.value) ? parseInt(e.target.value) : '' });}
    render(){
        return(
            <div className="ForumTriangleForum">
            <Row>
                <Col xs = "3"></Col>
                <Col xs = "6">
                <p> Elejiste: Triángulo </p>
                    <form onSubmit =  {this.handleSubmit}  className= 'inputTriangle'>
                        
                        <FormGroup className= 'inputTriangle'>
                            <label>Base (cm)</label>
                            <input className= 'base' id="base"  name= "base" type="number" min="1" max="300" required onChange={this.handleChange}></input>
                        </FormGroup>
                        
                        <br></br>
                        <FormGroup>
                            <label>Altura (cm)</label>
                            <input className= 'altura' id="altura"  name= "altura" type="number" min="1" max="300" required onChange={this.handleChange}></input>
                        
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
export default ForumTriangle ;
