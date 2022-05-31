import React from "react";
import "../css/login.css";
import { useRef, useState } from "react";

const URL_LOGIN = "http://localhost/ws-login/login.php";

//send data to backend
const enviarData = async (url, data) => {
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //console.log(resp);
  const json = await resp.json();
  //console.log(json);

  return json;
};

function Login(props) {
  const [error, setError] = useState(null);
  const [espera, setEspera] = useState(false);

  const refUsuario = useRef(null);
  const refClave = useRef(null);

  //captura data del formulario
  const handleLogin = async () => {
    setEspera(true);

    const usuario = refUsuario.current.value;
    const clave = refClave.current.value;

    const data = { usuario: usuario, clave: clave };
    const respuestaJson = await enviarData(URL_LOGIN, data);

    console.log("respuesta:", respuestaJson.conectado);

    props.acceder(respuestaJson.conectado);
    setError(respuestaJson.error);
    setEspera(false);
  };

  return (
    <div className="login">
      <div className="row">
        <div className="col-sm-4 offset-4 mt-5">
          <div className="card pt-5">
            <div className="card-header text-center">
              <h3> 🌋 Login</h3>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    📧
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="correo"
                  aria-label="Username"
                  ref={refUsuario}
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon2">
                    🔒
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="clave"
                  aria-label="clave"
                  aria-describedby="basic-addon2"
                  ref={refClave}
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button
                onClick={handleLogin}
                disabled={espera}
                className="btn btn-info btn-lg btn-block"
              >
                Acceder
              </button>
              <div className="card-footer text-center">
                <span> ¿Olvidó su clave?</span> <a href="#">Recuperar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
