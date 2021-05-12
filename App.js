import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,

  Keyboard, // para obtener funciones del teclado
  TouchableWithoutFeedback // No tiene estilo añadido
} from 'react-native';


// Componente
import Formulario  from './components/formulario';
import Clima from './components/clima';



const App = () => {

  // Busqueda de ciudad state
  const [ busqueda, setBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  // guardar resultados
  const [resultado , setResultado] = useState({});

  // Verificar si se debe consultar
  const [consultar, setConsultar] = useState(false);

  // Color segun la temperatura state
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)');


  const { ciudad, pais} = busqueda;

  useEffect(()=>{
    const consultarClima = async () => {
          if(consultar){
            // console.log('consultado la api');
              const appId = `9d10de0aec4f81ba1b385b4fe182c748`;
              const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad.toLowerCase()},${pais}&appid=${appId}`;
         
              try {
                // Realizando peticion
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                 // Nota: usamos doble await con fecth


                // console.log(resultado);
                // Guardasmos la busqueda
                setResultado(resultado);
                // Reniciamos el verificar
                setConsultar(false);

                // Modifica los colores del fondo basado en la temperatura
                const kelvin = 273.15;
                const { main } = resultado;
                const actual = main.temp - kelvin;
  
                if(actual < 10) {
                  setBgcolor('rgb( 105, 108, 149 )');
                } else if(actual >= 10 && actual < 25) {
                  setBgcolor('rgb(71, 149, 212)');
                } else {
                  setBgcolor('rgb( 178, 28, 61)');
                }
               
              } catch (error) {
                   // Notificamos error en caso de no consegui resultado
                  mostrarAlerta();
              }


          }
    }

    // Llamdo de funcion 
    consultarClima();
  }, [consultar]);

 
  //Funcioens
  // Ocultaar teclado

  const ocultarTeclado = () => {
    Keyboard.dismiss(); // Cerramos el teclado
  }


  // Mostrar alerta
      const mostrarAlerta = () => {
        // Alertas
        Alert.alert(
          'Error',
          'No hay resultado, intenta con otra ciudad o pais',
          [   
              {
                  text: 'Ok'
              }
          ]
      )
    }


    // Objeto colorAdpp
    const bgColorApp = {
      backgroundColor: bgcolor
    }

  return (
    <>  
      <TouchableWithoutFeedback
        onPress={()=> ocultarTeclado()}
      >
          <View style={[styles.app, bgColorApp]}>
              <View style={styles.contenido}>
                {/* componente clima */}
                <Clima 
                  resultado={resultado}
                />
                {/* componente formulario */}
                <Formulario 
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                    setConsultar={setConsultar}
                />
              </View>
            </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
    app:{
        flex:1,
        // backgroundColor: 'rgb(71,149,212)',
        justifyContent:'center'
    },
    contenido:{
        marginHorizontal: '2.5%'
    }
});

export default App;
