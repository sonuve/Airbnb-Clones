import React, { Suspense } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import useFetchAllListing from "../../Hook/getAllListing";
import useGetCityListings from "../../Hook/getCitywise";
import ErrorBoundary from "../Components/ErrorBoundary.jsx";
const ListingsComponenet=React.lazy(()=>import("../Components/ListingsComponenet.jsx"))

function Home() {

  // 🔥 Fetch All Listings
   useFetchAllListing();

  // 🔥 Fetch Citywise Listings
  useGetCityListings();

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-gray-100">
      <Nav />
      <ErrorBoundary>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ListingsComponenet />
      </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default Home;
