import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { authService } from './slice'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './formlogin.css';

const AuthTemplate = () => {
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state) => state.authLoginReducer || {});
    const [active, setActive] = useState(false); // toggle for sign-up / sign-in
    // Handle Loading
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <svg
                    className="animate-spin h-10 w-10 text-indigo-500 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <p className="text-gray-500 text-lg font-medium">Loading...</p>
            </div>
        )
    }

    if (data) {
        return <Navigate to="/admin" />;
    }
    // Handle Submit use Formik & Yup
    // Password policy: at least 8 chars, 1 upper, 1 lower, 1 number, 1 special
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Sign-in form
    const formikSignIn = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Tài khoản bắt buộc ko để trống"),
            matKhau: Yup.string()
                .required("Mật khẩu bắt buộc để trống")
                .matches(passwordRegex, "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"),
        }),
        onSubmit: (values) => {
            dispatch(authService(values));
        },
    });
    // Sign-up form (separate instance)
    const formikSignUp = useFormik({
        initialValues: {
            taiKhoan: "",
            email: "",
            matKhau: "",
            confirmMatKhau: "",
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Tài khoản bắt buộc không để trống"),
            email: Yup.string().email("Email không hợp lệ").required("Email bắt buộc không để trống"),
            matKhau: Yup.string()
                .required("Mật khẩu bắt buộc không để trống")
                .matches(passwordRegex, "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"),
            confirmMatKhau: Yup.string()
                .required("Xác nhận mật khẩu là bắt buộc")
                .oneOf([Yup.ref('matKhau'), null], 'Mật khẩu không trùng khớp'),
        }),
        onSubmit: (values) => {
            // Replace with real register action when available
            // For now, log and notify success
            // eslint-disable-next-line no-console
            console.log('Register payload', values);
            // simple feedback — you may replace with your own UI toast
            alert('Đăng ký thành công (demo)');
            setActive(false);
        },
    });

    // UI state to toggle show/hide password fields
    const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
    const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className={`container${active ? ' active' : ''}`} id="container">
            {/* Form Đăng Ký */}
            <div className="form-container sign-up">
                <form onSubmit={formikSignUp.handleSubmit}>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Create Account</h1>
                    <input type="text" name="taiKhoan" placeholder="Tài khoản"
                        value={formikSignUp.values.taiKhoan}
                        onChange={formikSignUp.handleChange}
                        onBlur={formikSignUp.handleBlur}
                    />
                    {formikSignUp.touched.taiKhoan && formikSignUp.errors.taiKhoan ? (
                        <div className="error">{formikSignUp.errors.taiKhoan}</div>
                    ) : null}

                    <input type="email" name="email" placeholder="Email"
                        value={formikSignUp.values.email}
                        onChange={formikSignUp.handleChange}
                        onBlur={formikSignUp.handleBlur}
                    />
                    {formikSignUp.touched.email && formikSignUp.errors.email ? (
                        <div className="error">{formikSignUp.errors.email}</div>
                    ) : null}

                    <div className="input-wrapper">
                        <input type={showPasswordSignUp ? 'text' : 'password'} name="matKhau" placeholder="Password"
                            value={formikSignUp.values.matKhau}
                            onChange={formikSignUp.handleChange}
                            onBlur={formikSignUp.handleBlur}
                        />
                        <button type="button" className="eye-btn" onClick={() => setShowPasswordSignUp(s => !s)} aria-label="Toggle password visibility">
                            {showPasswordSignUp ? '👁️' : '🙈'}
                        </button>
                    </div>
                    {formikSignUp.touched.matKhau && formikSignUp.errors.matKhau ? (
                        <div className="error">{formikSignUp.errors.matKhau}</div>
                    ) : null}

                    <div className="input-wrapper">
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmMatKhau" placeholder="Confirm Password"
                            value={formikSignUp.values.confirmMatKhau}
                            onChange={formikSignUp.handleChange}
                            onBlur={formikSignUp.handleBlur}
                        />
                        <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(s => !s)} aria-label="Toggle confirm password visibility">
                            {showConfirmPassword ? '👁️' : '🙈'}
                        </button>
                    </div>
                    {formikSignUp.touched.confirmMatKhau && formikSignUp.errors.confirmMatKhau ? (
                        <div className="error">{formikSignUp.errors.confirmMatKhau}</div>
                    ) : null}

                    <button type="submit" disabled={loading}>{loading ? 'Please wait...' : 'Đăng ký'}</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form onSubmit={formikSignIn.handleSubmit}>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Login Form</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g" /></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f" /></a>
                        <a href="#" className="icon"><i className="fa-brands fa-apple" /></a>
                    </div>
                    <input type="text" name="taiKhoan" placeholder="Username"
                        value={formikSignIn.values.taiKhoan}
                        onChange={formikSignIn.handleChange}
                        onBlur={formikSignIn.handleBlur}
                    />
                    {formikSignIn.touched.taiKhoan && formikSignIn.errors.taiKhoan ? (
                        <div className="error">{formikSignIn.errors.taiKhoan}</div>
                    ) : null}

                    <div className="input-wrapper">
                        <input type={showPasswordSignIn ? 'text' : 'password'} name="matKhau" placeholder="Password"
                            value={formikSignIn.values.matKhau}
                            onChange={formikSignIn.handleChange}
                            onBlur={formikSignIn.handleBlur}
                        />
                        <button type="button" className="eye-btn" onClick={() => setShowPasswordSignIn(s => !s)} aria-label="Toggle password visibility">
                            {showPasswordSignIn ? '👁️' : '🙈'}
                        </button>
                    </div>
                    {formikSignIn.touched.matKhau && formikSignIn.errors.matKhau ? (
                        <div className="error">{formikSignIn.errors.matKhau}</div>
                    ) : null}
                    <a href="#">Forget Your Password?</a>
                    <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Đăng Nhập'}</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1 className='text-3xl font-bold text-center'>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button onClick={() => setActive(false)} id="login">Đăng Nhập</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1 className='text-3xl'>Hello, Friend!</h1>
                        <p>
                            Register with your personal details to use all of site features
                        </p>
                        <button onClick={() => setActive(true)} id="register">Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthTemplate
