import { useFormik } from "formik"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { getUserByToken, login } from "../requests/_request";
import { toastAlert } from "../util/ToastAlert";
import { useAuth } from "../auth/AuthInit";

const initialValues = {
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    email: Yup.string().email().
        required('Email Required'),
    password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .min(4, 'Must be 4 characters or more')
        .required('Password is Required')
})

const Login = () => {

    const navigate: NavigateFunction = useNavigate();
    const { setIsUserAuthenticated, saveAuth } = useAuth()

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { data: auth } = await login(values);
                const { data: user } = await getUserByToken(auth.access_token);
                setIsUserAuthenticated(true)
            } catch (error: any) {
                toastAlert("error", error.message)
                saveAuth(undefined)
            }
        }
    });

    return (
        <>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={formik.handleSubmit} >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" {...formik.getFieldProps('email')} autoComplete="email" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            {formik.touched.email && formik.errors.email && (
                                <div className="flex justify-start">
                                    <p className="text-red-400">{formik.errors.email}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" {...formik.getFieldProps('password')} autoComplete="email" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            {formik.touched.password && formik.errors.password && (
                                <div className="flex justify-start">
                                    <p className="text-red-400">{formik.errors.password}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <Link to={'/auth/registration'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" > Sign Up</Link>
                </p>
            </div>
        </>
    )
}

export default Login