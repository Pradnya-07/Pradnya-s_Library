import { Link } from "react-router";
const Footer = () => {
    return (
        <div>
              <h3 className="border-t border-[#252422] pt-4 pb-6 italic">
        Designed and developed by{" "}
        <Link to={"/"} target="_blank" className="text-[#944424]">
          Pradnya Baviskar
        </Link>
      </h3>
        </div>
    )
}

export default Footer;