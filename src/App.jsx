import { store } from './common/redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './common/containers/layout'
import Public from './common/views/public'
import Protected from './common/views/protected'
import Dashboard from './common/views/dashboard'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/login" element={<Public />} />

            {/* protected routes */}
            <Route path="/" element={<Protected />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
