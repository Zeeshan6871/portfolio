import githubIcon from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import reactIcon from "../../assets/react-icon.svg";
import whatsapp from "../../assets/whatsapp.svg";
import { Container } from "./styles";
// import discordIcon from '../../assets/discord.png'

export function Footer() {
  return (
    <Container className="footer">
      <a href="" className="logo">
        <span>zeeshnahmad</span>
        <span>6871@gmail.com</span>
      </a>
      <div>
        <p>
          This Website was made with <img src={reactIcon} alt="React" />
          {/* <span>❤️</span> */}
        </p>
      </div>
      <div className="social-media">
        <a
          href="https://www.linkedin.com/in/zeeshan-ahmad-417791293/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedin} alt="Linkedin" />
        </a>
        <a
          href="https://github.com/Zeeshan6871/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=%2B916393416871&text=Hello+Zeeshan"
          target="_blank"
          rel="noreferrer"
        >
          <img src={whatsapp} alt="Whatsapp" />
        </a>
      </div>
    </Container>
  );
}
