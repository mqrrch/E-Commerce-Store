import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../features/loadingSlice";

export default function useFetchSingleProduct(id) {
    const [data, setData] = useState();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true));
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setData(res.data);
                dispatch(setLoading(false));
            })
            .catch(err => {
                console.error(err)
                dispatch(setLoading(false));
            })
    }, [id, dispatch])

    return data;
}