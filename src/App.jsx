import { store } from './common/redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './common/containers/layout'
import Public from './views/public'
import Protected from './views/protected'
import Dashboard from './views/dashboard'
import Unauthorized from './views/unauthorized'
import Admin from './views/admin'

const ROLES = {
  dueño: process.env.REACT_APP_DUENIO,
  encargado: process.env.REACT_APP_ENCARGADO,
  empleado: process.env.REACT_APP_EMPLEADO
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/login" element={<Public />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* protected routes */}
            <Route path="/" element={<Protected allowedRoles={[ROLES.empleado]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* encargado routes */}
            <Route element={<Protected allowedRoles={[ROLES.encargado, ROLES.dueño]} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/productos" element={<Admin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
