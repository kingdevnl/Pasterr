import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import axios from "axios";

export function Paste() {
    const [data, setData] = useState(null)
    const params = useParams()
    const id = params.id


    useEffect(() => {
        setTimeout(()=> {
            axios.get(`/api/paste/${id}`)
                .then(value => {
                    console.log(value.data.data)
                    setData(value.data.data)
                }).catch(reason => {
                console.error(reason)
            })
        }, 100)

    }, [])

    if (data == null) {
        return <h1>Loading..</h1>
    }

    return (
        <div>
            <pre>
                {data.content}
            </pre>
        </div>
    )
}