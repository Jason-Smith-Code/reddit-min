import "./BackToTop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const BackToTop = () => {
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <button data-testid="back-to-top" onClick={topFunction} id="back-top-top">
      <FontAwesomeIcon size="xl" icon={faAngleUp} />
    </button>
  );
};

export default BackToTop;
