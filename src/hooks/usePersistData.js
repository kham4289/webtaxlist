import { useEffect } from "react";

export const usePersistData = ({ setFirst, setList, setStep })=>{
useEffect(() =>{
    let isMounted = true
    const firstData = JSON.parse(localStorage.getItem('firstData'))
    const listData = JSON.parse(localStorage.getItem('listData'))
    const step = JSON.parse(localStorage.getItem('step'))|| 0
    if ((firstData || listData) && isMounted){
        setFirst(firstData);
        setList(listData);
        setStep(step)
    }
    // console.log(firstData);
    return () =>{
        isMounted = false
    }
}, [setFirst, setList, setStep])
}