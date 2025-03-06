import BgVideo from "../assets/bg_video.mp4";

const Hero = () => {
    return (
        <div>
            <div></div>

            <div>
                <video autoPlay loop muted>
                    <source src={BgVideo} type="video/mp4"/>
                </video>
            </div>
        </div>
    )
}

export default Hero;