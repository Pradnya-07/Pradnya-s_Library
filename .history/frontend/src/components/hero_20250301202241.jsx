import BgVideo from "../assets/bg_video.mp4";

const Hero = () => {
    return (
        <div>
            <div></div>

            <div>
                <video>
                    <source src={BgVideo}/>
                </video>
            </div>
        </div>
    )
}

export default Hero;