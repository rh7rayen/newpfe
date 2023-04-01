import React, { useState } from "react";
import userApi from "../../api/userApi";
import authApi from "../../api/auth";

function Login(props) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: token } = await userApi.loginUser(data);

      authApi.setToken(token);
      window.location = "/admin";
      //console.log(api);
    } catch (err) {
      console.error(err);
      alert("error de connexion");
    }
  };

  const handleChange = ({ target }) =>
    setData({ ...data, [target.name]: target.value });

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        type="password"
                      />
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                    </div>
                    {/* Checkbox */}
                    <div className="form-check d-flex justify-content-start mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="form1Example3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form1Example3"
                      >
                        {" "}
                        Remember password{" "}
                      </label>
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
