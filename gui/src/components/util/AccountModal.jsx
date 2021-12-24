import React from "react";
import RegistrationLoginWrapper from "../auth/RegisterLoginWrapper";
import Modal from "react-bootstrap/Modal";
import { Button, Message } from "semantic-ui-react";
import history from "../../history";

const AccountModal = (props) => {
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login/Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.user !== undefined ? (
          <Message style={{ fontSize: "15px" }}>
            <Message.Header>
              Hello {`${props.user.firstname} ${props.user.lastname}`}
            </Message.Header>
            <p>You are logged in and now you do reservations.</p>
            <Button
              style={{ margin: "0 auto" }}
              color="blue"
              onClick={() => history.push("/restaurants")}
            >
              Go to restaurants
            </Button>
          </Message>
        ) : (
          <RegistrationLoginWrapper accountModal />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AccountModal;
