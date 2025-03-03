import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startLoading, endLoading } from "../features/loadingSlice";

export default function useFetchData(parameter) {
    const [data, setData] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startLoading());
        axios.get(`https://fakestoreapi.com/${parameter}`)
            .then(res => {
                setData(res.data);
                dispatch(endLoading());
            })
            .catch(err => {
                console.error(err)
                dispatch(endLoading());
            })
    }, [parameter, dispatch])

    return data;
}