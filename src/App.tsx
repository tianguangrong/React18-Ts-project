import './App.css';
import routeList from './routes/list'
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
//  在react-redux中引入 redux 提供器组件
import { Provider } from 'react-redux';
import store from './store'
function App() {
  const RouteElement = () => {
    return useRoutes(routeList)
  }
  return (
    <Provider store={store}>
      <Router>
        <RouteElement />
      </Router>
    </Provider>
  )
}

export default App
