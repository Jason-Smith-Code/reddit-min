import "./BackToTop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const BackToTop = () => {
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <button data-testid="back-to-top" onClick={topFunction} id="back-top-top">
      <FontAwesomeIcon size="xl" icon={faAngleUp} />
    </button>
  );
};

export default BackToTop;
