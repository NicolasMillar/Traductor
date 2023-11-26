import './index.scss';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

const Home = () =>{

    const [listIdiomas, setList] = useState([]);
    const [textEntrante, setTextEntrante] = useState("");
    const [selectIdioma, setSelectIdoma] = useState("");
    const [traducción, setTraduccion] = useState();
    const [error, setError] = useState();
    
    useEffect( () => {
        const obtenerDatosIdiomas = async () => {
            try {
              const respuesta = await fetch('https://endpointtraductor-dev-fpfj.3.us-1.fl0.io/idiomas');
              const datos = await respuesta.json();
              setList(datos);
            } catch (error) {
              console.error('Error al obtener datos de idiomas:', error);
            }
          };
          obtenerDatosIdiomas();
    }, []);

    const ObtenerIdioma = (idiomaSeleccionad) => {
        setSelectIdoma(idiomaSeleccionad.target.value);
    }

    async function Traducir  () {
        try {
            console.log(selectIdioma);
            const respuesta = await fetch('https://endpointtraductor-dev-fpfj.3.us-1.fl0.io/buscar?id_idioma='+selectIdioma+'&origen='+textEntrante);
            const datos = await respuesta.json();
            if (!respuesta.ok) {
                console.log(datos.error);
                setError(datos.error);
            }else{
                const traduccionesUnicas = [...new Map(datos.map(item => [item.traduccion, item])).values()];
                var traduccion = traduccionesUnicas.map(traduccion => traduccion.traduccion).join(', ');
                setTraduccion(traduccion);
            }
            
        }catch(problema){
            setError('Error al obtener datos de traducciones:' + problema);
        }
    }

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
                        <Form.Field control={TextArea} placeholder='Escribe el texto a traducir..' onChange={ (e) => setTextEntrante(e.target.value)}/>
                        <select className="select-idioma" onChange={ObtenerIdioma}>
                            <option>Por favor selecciona un idioma..</option>
                            {
                                listIdiomas.map( (idiomas) => {
                                    return(
                                        <option key={idiomas.id} value={idiomas.id}>{idiomas.nombre}</option>
                                    );
                                })
                            }
                        </select>
                        <Form.Field control={TextArea} placeholder='El resultado de la traducción..' value={traducción}/>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <Button color="orange" size="large" onClick={Traducir}>Traducir</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Home