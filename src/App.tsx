import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LayoutProvider from "./provider/LayoutProvider"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"
import Task from "./pages/task/Task"
import { useAuth } from "./auth/AuthInit"
import AuthLayout from "./provider/AuthLayout"

const App = () => {

  const { isUserAuthenticated, ...rest } = useAuth();
  console.log({ isUserAuthenticated, ...rest });

  return (
    <BrowserRouter >
      <Routes>
        <Route element={<LayoutProvider />}>
          {
            isUserAuthenticated ? (
              <>
                <Route element={<AuthLayout />}>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='task' element={<Task />} />
                  <Route path='*' element={<Navigate to='/dashboard' />} />
                </Route>
              </>
            ) : (
              <>
                <Route path='auth/*' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
              </>
            )
          }
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App