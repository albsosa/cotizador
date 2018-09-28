import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';

class App extends Component {
    state = {
      resultado : '',
      datos : {

      }
    }

    cotizarSeguro = (datos) => {
    const {marca,plan, year}= datos;
    //agregar una base de 2000
    let resultado =2000;
    //Obtener la diferencia de años y por cada año restar 3%
    const diferencia = obtenerDiferenciaAnio(year);
    resultado -= ((diferencia * 3) * resultado ) / 100;
    resultado = calcularMarca(marca);
    //el plan del auto, el basico incrementa el valir de 20% y cobertura completa 50%
    let incrementoPlan = obtenerPlan(plan);
    //dependiendo el plan incrementar el Resultado
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
     
    //crear objeto para el resumen 
      const datosAuto = {
        marca : marca,
        plan : plan,
        year : year
      }

    // Ya tenemos el costo.
      this.setState({
        resultado : resultado,
        datos : datosAuto
      })
  }
  render() {
    return (
      <div className="contenedor">
      <Header 
      titulo = "Cotizador de seguro de auto"
      />
      <div className="contenedor-formulario">
      <Formulario 
       cotizarSeguro={this.cotizarSeguro}
      />
      <Resumen 
        datos={this.state.datos}
        resultado ={this.state.resultado}
      />
 
      </div>
      </div>
    );
  }
}

export default App;
