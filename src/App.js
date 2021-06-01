import './App.css';
import './index.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import ResultSquare from './ResultSquare'
import ForumTriangle from './ForumTriangle';
import ForumCircle from './ForumCircle';
import ForumSquare from './ForumSquare';
import ForumRectangle from './ForumRectangle';
import ResultCircle from './ResultCircle';
import ResultTriangle from './ResultTriangle';
import ResultRectangle from './ResultRectangle';
import circuloImg from './circulo.jpg';import cuadradoImg from './cuadrado.jpg'
function App(){
      const [showTriangle, setShowElementsTriangle] = React.useState(false)
      const [showCircle, setShowCircle] = React.useState(false)
      const [showSquare, setShowSquare] = React.useState(false)
      const [showRectangle, setShowRectangle] = React.useState(false)
      const onClickTriangle= ()=>{
          setShowElementsTriangle(true);
          setShowCircle(false);
          setShowSquare(false);
          setShowRectangle(false);
      }
      function FshowCircle(){
          setShowElementsTriangle(false);
          setShowCircle(true);
          setShowSquare(false);
          setShowRectangle(false);
      }
      function FshowSquare(){
          setShowElementsTriangle(false);
          setShowCircle(false);
          setShowSquare(true);
          setShowRectangle(false);
      }
      function FshowRectangle(){
          setShowElementsTriangle(false);
          setShowCircle(false);
          setShowSquare(false);
          setShowRectangle(true)
      }
      return (
        <div className="App">
          <header className="App-header">
          <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
          <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
          <div class="carousel fade-carousel slide" data-ride="carousel" data-interval="4000" id="bs-carousel">
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
            <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            <div className="overlay"></div>
            <div className="carousel-inner">
              <div className="item slides active">
                  <div className="slide-1"></div>
                  <div className="hero">
                    <hgroup><h1>Aprende con nosotros </h1><h3>Áreas y perímetros</h3></hgroup>
                  </div>
              </div>
            </div> 
          </div>
          <div className = 'hola'>
            <div className = 'container'>
              <div className="row">
                <div className="col-sm-8"><br></br>
                  <p className = 'opcion'>Elije una opción: </p>
                  <div className="accordian">
                    <ul>
                      <li>
                        <div className="image_title">
                          <button className = 'botonelec' onClick = {FshowCircle}>Círculo</button>
                        </div> 
                        <button className='botonelec' onClick = {FshowCircle}>
                          <div className='circuloImg'><img  className='imagen' src={circuloImg} alt='circulo'/></div>
                        </button>
                      </li>
                      <li>
                        <div className="image_title">
                            <button className = 'botonelec' onClick = {FshowSquare}>Cuadrado</button>
                        </div>
                        <button className = 'botonelec' onClick = {FshowSquare}>
                          <img className= 'imagen' src={cuadradoImg} alt='cuadrado'/>
                        </button>
                      </li>
                      <li>
                        <div className="image_title">
                        <button className = 'botonelec' onClick = {onClickTriangle}>Triángulo</button>
                        </div>
                        <button className = 'botonelec' onClick = {onClickTriangle}>
                          <img alt='triangulo' className= 'imagen' src="https://yosoytuprofe.20minutos.es/wp-content/uploads/2019/09/area-y-per%C3%ADmetro-tri%C3%A1ngulo.png"/>
                        </button>
                      </li>
                      <li>
                        <div className="image_title">
                          <button className = 'botonelec' onClick = {FshowRectangle}>Rectángulo</button>
                        </div>
                        <button className = 'botonelec' onClick = {FshowRectangle}>
                          <img alt = 'rectangulo' className= 'imagen' src="https://i.ytimg.com/vi/W3d8aftmgck/maxresdefault.jpg"/>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-4">
                <div>
                    <br></br><br></br><br></br><br></br>
                    { showTriangle ? <ForumTriangle /> :null }
                    { showCircle ? <ForumCircle/> :null }
                    { showSquare ? <ForumSquare /> :null }
                    { showRectangle ? <ForumRectangle /> :null }
                </div>
                </div>
                    { showSquare ? <ResultSquare/> :null }
                    { showCircle ? <ResultCircle/> :null }
                    { showTriangle? <ResultTriangle/> :null }
                    { showRectangle? <ResultRectangle/> :null }
              </div>
            </div>
          </div>
          </header>
        </div>
      );
    }
export default App;