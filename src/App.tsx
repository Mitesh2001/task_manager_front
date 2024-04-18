import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LayoutProvider from "./provider/LayoutProvider"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"
import Task from "./pages/task/Task"

const App = () => {

  const isLogin = true

  return (
    <BrowserRouter >
      <Routes>
        <Route element={<LayoutProvider />}>
          {
            isLogin ? (
              <>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='task' element={<Task />} />
                <Route path='*' element={<Navigate to='/dashboard' />} />
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