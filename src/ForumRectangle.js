import React from 'react';
import './App.css';
import {Row, Col,FormGroup} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axios from 'axios';
import { Alert} from 'react-st-modal';
const url = "http://192.168.1.110:8000/api/rectangle";
class ForumRectangle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lado1 : 0 ,
            lado2 : 0 ,
            data:[], 
        }
        this.handleChange = this.handleChange.bind(this);  
    } 
    handleChange= e=>{
        this.setState({ [e.target.name]:  parseInt(e.target.value) ? parseInt(e.target.value) : '' });
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
    handleSubmit = e =>{
        e.preventDefault();
        const {lado1, lado2} = this.state;
        const rectangle = { lado1, lado2};
        axios.post(url, rectangle ).then(()=> {
            console.log('agregado');
            this.peticionGet();
        }).catch(err => {console.error(err); });
        this.resultado();

    }
    resultado  =async ()=> {
        await Alert('Proceso realizado con éxito','Información');
        const {lado1, lado2} = this.state;
        const rectangle = { lado1, lado2};
        for (let index = 0; index < this.state.data.length; index++) {
            const element = this.state.data[index].width;
            const element2 = this.state.data[index].lenght;
            if(element ===rectangle.lado2 && element2 ===rectangle.lado1){
                await Alert(`Area:  ${this.state.data[index].area}                     Perimetro:  ${this.state.data[index].perimeter}   `, 'Resultado');
                break;
            }
        }
        window.location.href = "http://localhost:3000/";
    }
    render(){
        return(
            <div id="ForumRectangle">
            <Row>
                <Col xs = "3"></Col>
                <Col xs = "6">
                <p> Elejiste : Rectángulo </p>
                    <form onSubmit =  {this.handleSubmit}>
                        <FormGroup>
                            <label>Largo (cm)</label>
                            <input className= 'lado1' id="lado1" name="lado1" type="number" min="1" max="300" required onChange={this.handleChange}></input>
                        </FormGroup><br></br>
                        <FormGroup>
                            <label>Ancho (cm)</label>
                            <input className= 'lado2' id="lado2" name="lado2" type="number" min="1" max="300" required onChange={this.handleChange}></input>
                        </FormGroup><br></br>
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
export default ForumRectangle ;
