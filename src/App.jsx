import { store } from './common/redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './common/containers/layout'
import Public from './common/views/public'
import Protected from './common/views/protected'
import Dashboard from './common/views/dashboard'
import Unauthorized from './common/views/unauthorized'
import Admin from './common/views/admin'

const ROLES = {
  dueño: '63f819a9388888ba95da84e3',
  encargado: '63f819a9388888ba95da84e2',
  emplado: '63f819a9388888ba95da84e1'
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
            <Route path="/" element={<Protected allowedRoles={[ROLES.encargado, ROLES.dueño]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* encargado routes */}
            <Route element={<Protected allowedRoles={[ROLES.encargado, ROLES.dueño]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
