import React, {useState} from 'react';
import {
    View,
    Text, 
    TextInput, 
    StyleSheet,

    Alert,

    Animated, // Comppnentes para animaciones
    TouchableNativeFeedback // usar animaciones | las animaicnoes solo se peuden usar en este componente
} from 'react-native';
import {Picker} from '@react-native-picker/picker'

const Formulario = ({busqueda , setBusqueda, setConsultar}) => {

    // Extraer
    const {pais, ciudad} = busqueda;

    // Aniacion state
    const [ animacionboton ] = useState(new Animated.Value(1));  // el 1 = 199% signifca el tamñao y la escala
    //NotA: No se requiere el segundo valor de modificaicon, ya que este es modificado con la api de animate
    
    // funciones
    // Clima busqueda
    const consultarClima = () => {
        //Validar
        if(pais.trim() === "" || ciudad.trim() === "") {
            mostrarAlerta();
            return;
        }

        // Consultar la api
        setConsultar(true);
    }

    const mostrarAlerta = () => {
         // Alertas
         Alert.alert(
            'Error',
            'Agrega una ciudad y país para la búsqueda',
            [   
                {
                    text: 'Entendido'
                }
            ]
        )
    }

    // Animaciones
    const animacionEntrada = () => {
        Animated.spring( animacionboton ,{  // Pasamos el objeto inciado
            toValue: .75   // PAsamoes el valor final
        }).start(); // Inicamos la aniacmion
    }

    const animacionSalida = () => {
        Animated.spring( animacionboton ,{  // Pasamos el objeto inciado
            toValue: 1 ,  // PAsamoes el valor final
            friction: 2,// rebote | mas bajo el numero mayor es el rebote
            tension: 30, // movimiento | Mientras menor sea el numero mas suave es el movimiento
        }).start(); // Inicamos la aniacmion
    }

    const estiloAnimacion = { // Esta funcuion la pasamos al elemento que sera animado
        transform: [{scale: animacionboton  }]

        // Nota: esto seria el css
    }

    return ( 
        <>  
            <View style={styles.formulario}>
                <View>
                  <TextInput 
                    value={ciudad}
                    style={styles.input}
                    onChangeText={ ciudad => setBusqueda({ ...busqueda, ciudad }) }
                    placeholder="Escribe tu ciudad"
                    placeholderTextColor="#666"  // Para cambiar el color del placeholder
                  />
                </View>
        
                <View>
                    <Picker 
                          selectedValue={pais}
                          itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                          onValueChange={ pais => setBusqueda({ ...busqueda, pais}) }
                        
                    >
                        <Picker.Item label="-- Selecione un país --" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="Mexico" value="MX" />
                        <Picker.Item label="Peru" value="PE" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Venezuela" value="VE" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Costa Rica" value="CR" />
                    </Picker>
                </View>

                <TouchableNativeFeedback
                    // Metodos animaicones
                    onPressIn={() => animacionEntrada()}  // Cuando presiona
                    onPressOut={() => animacionSalida()}  // Cuando suelta

                    // Metodo busqueda
                    onPress={ () => consultarClima() }
                >
                    <Animated.View   // Especificamos el elemento que se va animar
                        style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar CLima</Text>
                    </Animated.View>
                </TouchableNativeFeedback>
                {
                    // TouchableNativeFeedback: Este metodo contiene estos dos prop onPressIn y onPressOut
                }
                 
            </View>
       </>    
     );
}
 
export default Formulario;

const styles = StyleSheet.create({
  
    input:{
        padding: 10,
        height:50,
        backgroundColor: '#fff',
        fontSize:20,
        marginBottom:20,
        textAlign: 'center'
    },
    btnBuscar:{
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent:'center',
    },
    textoBuscar:{
        color:'#fff',
        textAlign:'center', 
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize:18
    }
});