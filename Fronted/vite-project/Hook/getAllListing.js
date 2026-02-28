import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getListings } from "../Redux/Listing.js";


const useFetchAllListing = () => {
    const dispatch = useDispatch();

    const fetchListings = async() => {
        try {
            const res = await axios.get("http://localhost:3000/api/listing/all/listings", { withCredentials: true });

            if (res.data.success) {
                dispatch(getListings(res.data.listings));
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return fetchListings;
};

export default useFetchAllListing;