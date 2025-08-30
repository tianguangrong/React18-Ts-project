import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";


function useToken() {
    const [ token, setToken ] = useState('')
    const result = useSelector((state: any) => state.user);
    useEffect(() => {
        if (result) {
            setToken(result.datas?.token)
        }
    })
  return token
}

export default useToken
