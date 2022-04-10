import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import { axiosWithAuth } from '../../auth/axiosAuth';

import API_URL from '../../config';
import '../../App.css'

const Scores = ({ loggedIn }) => {

    const [topTen, setTopTen ] = useState([])
    const [ userScores, setUserScores ] = useState([])

    const dateParser = (date) => {
        return date.split('T')[0].split('-').reverse().join('/')
    }

    useEffect(() => {
        axios.get(API_URL + "scores/topTen/snake")
            .then(res => {
                setTopTen(res.data.reverse())
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
                setUserScores([{score: "no score available"}])
            });
    }, [])
    return(
        <div className="flexColNoWrap center">
            <div className="tableBox">
                <h2>Top Ten</h2>
                <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>score</th>
                        <th>date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topTen.map((player, index) => {
                            return (
                                <tr key={player.created_at} className={index%2===0? "evenRow":"oddRow"}>
                                    <td>{index + 1}</td>
                                    <td>{player.username}</td>
                                    <td>{player.score}</td>
                                    <td>{dateParser(player.created_at)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
            
            <div className="tableBox">
                <h2>My Scores</h2>
                <table>
                    <thead>
                        <tr>
                            <th>score</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    { loggedIn?
                        <tbody>
                            {
                                userScores.map((player, index) => {
                                    return (
                                        <tr key={player.created_at} className={index%2===0? "evenRow":"oddRow"}> 
                                            <td> {player.score} </td> 
                                            <td>{player.created_at && dateParser(player.created_at)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        : 
                        <tbody>
                            <tr>
                                <td>You must be logged in!!</td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            {/* <button className="startButton" onClick={() => nav('/')}>Back to home page</button> */}
        </div>
    )
}

const MapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}
export default connect(MapStateToProps, {})(Scores)