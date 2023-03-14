const FooterLink = ({ href, label }) => {
  return (
    <a
      className="text-light fw-bold fs-5 text-decoration-none"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
};

export default FooterLink;
