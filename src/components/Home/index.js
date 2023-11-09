import './index.css';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

const Home = () =>{

    const [listIdiomas, setList] = useState([]);
    
    useEffect( () => {
        const obtenerDatosIdiomas = async () => {
            try {
              const respuesta = await fetch(process.env.REACT_APP_APIKEY +'/idiomas');
              const datos = await respuesta.json();
              setList(datos);
            } catch (error) {
              console.error('Error al obtener datos de idiomas:', error);
            }
          };
      
          obtenerDatosIdiomas();
    }, [])

    return(
        <>
            <div className="container home-page">
                <div className='text-zone'>
                    <h1>Traductor de pueblos originarios</h1>
                    <p> Este proyecto tiene como objetivo desarrollar un traductor/diccionario<br />
                        para la gran mayoría de los pueblos originarios de Chile. Debido a que<br />
                        no tengo un dominio completo de estos idiomas, la página web solo es <br />
                        capaz de traducir palabras y no frases completas.
                    </p>   
                </div>
                <div className='traductor-zone'>
                    <Form>
                        <Form.Field control={TextArea} placeholder='Escribe el texto a traducir..'/>
                        <select className="select-idioma">
                            <option>Por favor selecciona un idioma..</option>
                            {
                                listIdiomas.map( (idiomas) => {
                                    return(
                                        <option value={idiomas.id}>{idiomas.nombre}</option>
                                    );
                                })
                            }
                        </select>
                        <Form.Field control={TextArea} placeholder='El resultado de la traducción..'/>
                        <Button color="orange" size="large">Traducir</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Home