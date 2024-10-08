import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import { TodoHome } from './components/modules/TodoHome';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="Todo" element={<TodoHome />} />
    </Route>
  )
);

const App = () => {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
