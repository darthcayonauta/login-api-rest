import { useState } from "react";

import Login from "./componentes/Login";
import Menu from "./componentes/Menu";

function App() {

  const [conectado,setConectado] = useState(false);

  //crear interfaz para mutar estado, recibes un estado y cambias
  const acceder = (estado) => {
    setConectado(estado)
  }

  return (

    conectado ? <Menu /> : <Login acceder={acceder}/>
  );
}

export default App;
