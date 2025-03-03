import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { startLoading, endLoading } from "../features/loadingSlice";

export default function useFirestoreQuery(config){
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) return;

        let didUnsubscribe = false;
        let unsubscribe = () => {};
        
        const executeQuery = async () => {
            try {
                dispatch(startLoading());
                const q = query(collection(db, config.collectionName), ...config.queryConditions(user));
                const initialSnapshot = await getDocs(q);
                if (!didUnsubscribe){
                    config.onDataReceived(initialSnapshot.docs);
                };
                unsubscribe = onSnapshot(q, snapshot => {
                    if (!didUnsubscribe){
                        config.onDataReceived(snapshot.docs);
                    };
                });
            } catch (err){
                config.onError(err);
            } finally {
                if(!didUnsubscribe){
                    dispatch(endLoading());
                };
            };
        };

        executeQuery();

        return () => {
            didUnsubscribe = true;
            unsubscribe();
            dispatch(endLoading());
        }
    }, [user, dispatch, ...(config.dependencies || [])]);
}

// Configuration object structure:
// {
//     collectionName: 'your_collection',  // Required
//     queryConditions: (user) => [],      // Function returns query conditions
//     onDataReceived: (docs) => {},       // Required data handler
//     onError: (error) => {},             // Optional error handler
//     dependencies: []                    // Optional extra dependencies
// }