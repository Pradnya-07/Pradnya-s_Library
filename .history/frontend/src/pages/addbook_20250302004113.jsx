import { React } from 'react'

const Addbook = () => {
  return (

    <div className="min-h-screen text-[#252422] bg-[#f5f5f5] px-4 md:px-12">
      <h2 className="text-center font-semibold pt-8 md:text-2xl w-full max-w-xl mx-auto">
        Add Book to Library
      </h2>

      <form
        // onSubmit={handleSignup} 
        className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-10">
       
       <div className="flex flex-col w-full">
          <label className="md:text-lg">Book Image*:</label>
          <input
            type="file"
            accept="image/*"
           // onChange={handleImageChange}
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg  bg-white border border-gray-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Username:</label>
          <input type="text"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg  bg-white border border-gray-500" />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">EmailId:</label>
          <input type="text"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg  bg-white border border-gray-500" />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Password:</label>
          <input type="password"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg  bg-white border border-gray-500" />
        </div>

        <div className="flex flex-col w-full">
          <label className="md:text-lg">Confirm Password:</label>
          <input type="password"
            className="w-full px-3 py-1.5 md:py-2 text-[#252422] rounded-lg  bg-white border border-gray-500" />
        </div>

        {/*{error && <p className="text-red-500">{error}</p>}*/}
        <button type="submit"
         // disabled={isLoading}
          className="w-full bg-[#403D39] text-[#FFFCF2] py-2 font-medium rounded-lg">

       Add Book
        </button>
        </form>

    </div>
  )
}

export default Addbook