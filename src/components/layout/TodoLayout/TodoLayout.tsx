import React from 'react'
import Footer from '../../template/Footer/Footer';
import Header from '../../template/Header/Header';
import './TodoLayout.scss';

export interface TodoProps {
  children: React.ReactNode
}

export const TodoLayout = (props: TodoProps) => {
  const { children } = props;
  return (
    <div id="container" className='todo-layout'>
      <Header></Header>
      <div id="container-body">
        {children}
      </div>
      {/* <Footer></Footer> */}
    </div>
  )
}
