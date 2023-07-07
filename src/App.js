import React from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Read from './components/Read';
import {useSelector} from 'react-redux';
import Update from './components/Update';

const App = () => {

  const router = createHashRouter([
    {path: "/", element: <Navbar />, children: [
      {index: true, element: <Create />},
      {path: "/read", element: <Read />},
      {path: "/update/:id", element: <Update />},
    ]}
  ]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App