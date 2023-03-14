import { BsArrowLeftRight } from 'react-icons/bs';

const ReverseButton = ({ onClick }) => {
  return (
    <span className="fs-5 text-primary" role="button" onClick={onClick}>
      <BsArrowLeftRight />
    </span>
  );
};

export default ReverseButton;
