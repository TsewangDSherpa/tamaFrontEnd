import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

function Register({ setAlert }) {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    petName: "",
    personality: "",
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(" You must input a username."),
    email: Yup.string().required(),
    password: Yup.string()
      .min(8)
      .max(15)
      .required(" Please enter a password that meets the required length."),
    personality: Yup.number().required(" Choose a personality type"),
  });

  const onSubmit = (data) => {
    axios
      .post("https://tama.up.railway.app/auth/register", data)
      .then((response) => {
        console.log("User Registered");
        navigate("/Login");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log("Error: Bad Request");
          alert("User may already Exist, try different Username");
        } else {
          console.error("Error:", error);
          // Handle other types of errors here
        }
      });
  };
  return (
    <div className="container mt-5 p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <ErrorMessage
                      name="username"
                      component="span"
                      className="error"
                    />
                    <Field
                      autoComplete="off"
                      id="username"
                      name="username"
                      placeholder="Alphanumerical Only"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail:
                    </label>
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error"
                    />
                    <Field
                      autoComplete="off"
                      id="email"
                      name="email"
                      placeholder="Enter Valid E-mail"
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error"
                    />
                    <Field
                      autoComplete="off"
                      id="password"
                      name="password"
                      placeholder="Enter a password"
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="petName" className="form-label">
                      Pet Name:
                    </label>
                    <ErrorMessage
                      name="petName"
                      component="span"
                      className="error"
                    />
                    <Field
                      autoComplete="off"
                      id="petName"
                      name="petName"
                      placeholder="Enter Pet's Name"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="personality" className="form-label">
                      Pet Personality:
                    </label>
                    <ErrorMessage
                      name="personality"
                      component="span"
                      className="error"
                    />
                    <Field
                      as="select"
                      id="personality"
                      name="personality"
                      className="form-select"
                    >
                      <option value="">Select Pet Personality</option>
                      <option value="1">Normal</option>
                      <option value="2">Cranky</option>
                      <option value="3">Playful</option>
                      <option value="4">Lazy</option>
                      <option value="5">Calm</option>
                    </Field>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
