import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useLoginHook from '../../hooks/AuthHooks/useLoginHook';
import logo from '../../public/assets/images/progearhub.png';
import LoginStyles from '../../styles/components/login.module.scss';

function LoginComponent() {
  const { passwordHidden, togglePasswordIcon, fetchToken, loginBtnLoader } = useLoginHook();
  const [formData, setFormData] = useState({ usr: '', pwd: '' });
  const [errors, setErrors] = useState({ usr: '', pwd: '' });

  const validate = () => {
    const newErrors = { usr: '', pwd: '' };

    if (!formData.usr) {
      newErrors.usr = 'Email field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.usr)) {
      newErrors.usr = 'Enter a valid email';
    }

    if (!formData.pwd) {
      newErrors.pwd = 'Password field is required';
    } else if (formData.pwd.length < 6) {
      newErrors.pwd = 'Password is too short - should be 6 chars minimum';
    }

    setErrors(newErrors);
    return !newErrors.usr && !newErrors.pwd;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      fetchToken(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-wrapper" id="wrapper-login">
        <div className="content-wrapper" id="content-signin">
          <div className="row mx-4 mx-sm-0">
            <div className={`offset-lg-4 offset-md-3 offset-sm-2 col-sm-8 col-12 col-lg-4 col-md-6 ${LoginStyles.main_column}`}>
              <div className="row px-4">
                <div className="col-12">
                  <div className="img">
                    <Link href="/" className="navbar-brand">
                      <Image src={logo} alt="logo" width={160} className="img-fluid mx-auto d-block mb-4 h-auto" priority={true} />
                    </Link>
                  </div>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="usr"
                      placeholder="Enter Email"
                      value={formData.usr}
                      onChange={handleChange}
                      className={`${LoginStyles.emailfield}`}
                    />
                    {errors.usr && <div className={`${LoginStyles.empty} mt-1`}>{errors.usr}</div>}
                  </Form.Group>
                </div>
              </div>
              <div className="row px-4 mt-1">
                <div className="col-12 mt-2">
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={passwordHidden ? 'password' : 'text'}
                        name="pwd"
                        placeholder="Enter Password"
                        value={formData.pwd}
                        onChange={handleChange}
                      />
                      <InputGroup.Text id="basic-addon2">
                        <span>{passwordHidden ? <FaEyeSlash onClick={togglePasswordIcon} /> : <FaEye onClick={togglePasswordIcon} />}</span>
                      </InputGroup.Text>
                    </InputGroup>
                    {errors.pwd && <div className={`${LoginStyles.empty} mt-1`}>{errors.pwd}</div>}
                  </Form.Group>
                </div>
              </div>
              <div className="row px-4 mt-3">
                <div className="col-12 d-flex justify-content-center">
                  <button type="submit" className={`${LoginStyles.btn_login} rounded w-100 mb-3 mt-2`} disabled={loginBtnLoader}>
                    {loginBtnLoader ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <span>LOGIN</span>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <span className="not_an_account">
                  <span className="color-black">New to Summit?</span> <Link href="/register">Create an account</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginComponent;
