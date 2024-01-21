import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast, ToastContainer } from "react-bootstrap";

function ToastComponent({ errorMessage, show, setShow }: any) {
  return (
    <div aria-live="polite" aria-atomic="true" className="position-relative">
      <ToastContainer position={"top-center"} style={{ zIndex: 1 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header className="toast-header rounded" closeButton={true}>
            <span className="me-2">
              <FontAwesomeIcon
                className="text-success"
                icon={["fas", "circle-exclamation"]}
              />
            </span>

            <strong className="me-auto">
              {errorMessage && errorMessage.message}
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default ToastComponent;
