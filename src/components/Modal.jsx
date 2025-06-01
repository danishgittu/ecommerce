import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCart } from "../context/context";

const Modall = () => {
  const { closeModal, Logged } = useCart();
  return (
    <>
      {Logged === false && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="modal show"
            style={{ display: "block", position: "initial" }}
          >
            <Modal.Dialog className="!w-[32rem] !h-[28rem]">
              <Modal.Header closeButton onClick={closeModal}>
                <Modal.Title>Login Required</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>Please log in to add items to your cart.</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default Modall;
