import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import jwt_decode from "jwt-decode";

import { axiosWithAuth } from './auth/axiosAuth.js';

import { login } from "./actions/authActions"

import Snake from './component/snake'
import Lost from './component/Lost'
import RegisterForm from './component/RegisterForm';
import SignIn from './component/SignIn';
import Navbar from './component/Navbar';
import Option from './component/Option';
import Scores from './component/Scores';

import API_URL from './config'

import './App.css';


function App({ login, score, lost }) {
  
  useEffect(() => {
    login()
  }, [])

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={
        <>
        {lost && <Lost score={score} />}
          <Snake />
        </>
      }/>
      <Route path="/Option" element={<Option/>} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/SignIn" element={<SignIn/>} />
      <Route path="/Scores" element={<Scores />} />
    </Routes>
    </>
  );
}

const MapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    score: state.snake.score,
    lost: state.snake.lost,  }
}
export default connect(MapStateToProps, { login })(App);
