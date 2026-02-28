import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCity } from "../Redux/CityWise";

const useGetCityListings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/listing/city", { withCredentials: true }
                );


                if (res.data.success) {
                    dispatch(getCity(res.data.rows));
                }
            } catch (error) {
                console.log("fetching city wise data error", error);
            }
        };

        fetchData();
    }, [dispatch]);
};

export default useGetCityListings;