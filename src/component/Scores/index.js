import { useEffect, useState } from 'react'

import { axiosWithAuth } from '../../auth/axiosAuth'

import API_URL from '../../config'

const Scores = ({ loggedIn }) => {

    const [topTen, setTopTen ] = useState([])

    useEffect(() => {
        axiosWithAuth().get(API_URL + "scores/topTen/snake")
            .then(res => {
                setTopTen(res.data)
            })
            .catch(err => {

            })
    }, [])
    return(
        <>
        {
            loggedIn?
            <div>
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
            :<div className="errorMessage">You must be logged in!!</div>
        }
        </>
    )
}

export default Scores