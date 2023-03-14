import { BsGithub, BsLinkedin } from 'react-icons/bs';
import FooterLink from './FooterLink';

const Footer = () => {
  return (
    <footer className="row fixed-bottom bg-secondary p-2 text-light">
      <div className="d-flex justify-content-center align-items-center gap-3">
        <FooterLink
          href="https://andreisava-webdev.github.io/portfolio/"
          label="&copy; Andrei Sava"
        />

        <div className="d-flex gap-2">
          <FooterLink
            href="https://github.com/andreisava-webdev"
            label={<BsGithub />}
          />
          <FooterLink
            href="https://www.linkedin.com/in/andrei-sava-aa939b24b/"
            label={<BsLinkedin />}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
