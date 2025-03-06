import BgVideo from "../assets/bg_video.mp4";

const Hero = () => {
    return (
        <div className="relative h-[75vh] lg:h-[90vh] text-[#FFFCF2] px-4 md:px-12 overflow-hidden">

            <div className="bg-[#252422] w-full h-full absolute top-0 left-0 opacity-80 -z-10"></div>
            <div className="absolute inset-0 -z-20">
                <video className="object-cover object-center w-full h-full"
                    autoPlay loop muted>
                    <source src={BgVideo} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default Hero;