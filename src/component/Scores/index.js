import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { axiosWithAuth } from '../../auth/axiosAuth';

import API_URL from '../../config';
import '../../App.css'

const Scores = ({ loggedIn }) => {

    const [topTen, setTopTen ] = useState([])
    const [ userScores, setUserScores ] = useState([])

    const nav = useNavigate()

    useEffect(() => {
        axios.get(API_URL + "scores/topTen/snake")
            .then(res => {
                setTopTen(res.data)
            })
            .catch(err => {
                setTopTen([{username: "no player available", score: 0}])
            });
        loggedIn &&
        axiosWithAuth().get(API_URL + 'scores/user/snake')
            .then(res => {
                setUserScores(res.data)
            })
            .catch(err => {
                setUserScores([{score: "no scores available"}])
            });
    }, [])
    return(
        <div className="flexColCenter">
            <div className="tableBox">
                <h2>Top Ten</h2>
                <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topTen.map( player => {
                            return (
                                <tr>
                                    <td>{player.username}</td>
                                    <td>{player.score}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
            
            <div>
                <h2>My Scores</h2>
                <table>
                    <thead>
                        <tr>
                        <th>scores</th>
                        </tr>
                    </thead>
                    { loggedIn?
                        <tbody>
                            {
                                userScores.map( player => {
                                    return (
                                        <tr> <td> {player.score} </td> </tr>
                                    )
                                })
                            }
                        </tbody>
                        : <tr><td>You must be logged in!!</td></tr>
                    }
                </table>
            </div>
            {/* <button className="startButton" onClick={() => nav('/')}>Back to home page</button> */}
        </div>
    )
}

export default Scores