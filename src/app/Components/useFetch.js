import React, { useEffect, useState } from 'react'

function useFetch(url) {
  
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async() =>{
            const data = await fetch(url);
            try{
                const result = await data.json();
                if(result.length > 0){
                    setData(result)
                }else{
                    setError('Data not found')
                }
                setLoading(false)
            }catch{
                setLoading(false)
                setError('something went wrong')
            }
        }
        fetchData();
    }, [url])

    return {data, loading, error}

}

export default useFetch