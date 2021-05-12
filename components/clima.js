import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Clima = ({resultado}) => {

    // console.log(resultado);
    const {name, main} = resultado;

    // Validamos que exista
    if(!name) return null;

    // Grados kelvin
    const kelvin = 273.15;

    return ( 
        <>
            <View style={styles.clima}>
                <Text style={[styles.texto , styles.actual]}>
                    { parseInt(main.temp - kelvin) }
                    <Text style={styles.temperatura}>
                        &#x2103;
                    </Text>
                    <Image 
                        style={{width:66, height:55}}  // Siempre que se usen imagende internt debe especifcarse el anccho y alto
                        source={{uri:`https://api.openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
                        // NOta: uri se obtinee recurso de afuera
                   />
                </Text>

                <View style={styles.temperaturas}>
                    <Text style={styles.texto}> Min {'  '}
                         <Text style={styles.temperatura}>
                             {parseInt(main.temp_min - kelvin)} &#x2103;  {'  '}
                         </Text>
                    </Text>
                    <Text style={styles.texto}>Max {'  '}
                         <Text style={styles.temperatura}>
                             {parseInt(main.temp_max- kelvin)} &#x2103;
                         </Text>
                    </Text>
                </View>
            </View>

        </>
     );
}

const styles = StyleSheet.create({
    clima:{
        marginBottom: 20,
    },
    texto:{
        color:'#fff',
        fontSize:20,
        textAlign:'center',
        marginRight: 20

    },
    actual:{
        fontSize: 90,
        marginRight: 0,
        fontWeight: 'bold',
    },
    temperatura:{
        fontSize:24,
        fontWeight:'bold'
    },
    temperaturas:{
        flexDirection:'row',
        justifyContent:'center'
    }
});
 
export default Clima;
