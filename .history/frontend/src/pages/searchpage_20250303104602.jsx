import { useState } from "react";
import { useNavigate } from "react-router";

const SearchPage = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    return (

        <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-10">
      <p className="cursor-pointer py-3" onClick={() => navigate("/")}>
        &larr; Back
      </p>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-sm md:max-w-xl lg:max-w-3xl text-base lg:text-lg" >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Purple hibiscus"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg placeholder:text-gray-600 bg-white border border-gray-500"/>
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 bg-[#403D39] text-[#f5f5f5] px-4 border border-white transitionfont-semibold rounded-r-lg" >
            Search
          </button>
        </form>
      </div>

      <h1 className="font-semibold pt-8 pb-6 text-xl md:text-2xl ">
        Search results
      </h1>
      </div>

    )};

    export default SearchPage