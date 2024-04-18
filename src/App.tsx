import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LayoutProvider from "./provider/LayoutProvider"
import AuthPage from "./pages/AuthPage"

const App = () => {

  const isLogin = false

  return (
    <BrowserRouter >
      <Routes>
        <Route element={<LayoutProvider />}>
          {
            isLogin ? (
              <>

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