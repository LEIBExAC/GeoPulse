import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuthStore } from "../../assets/store/authStore";
import { useNavigate } from "react-router-dom";



export default function LogoutModal({ show, handleClose }) {
    const navigate = useNavigate();

    const { logout, isLoading } = useAuthStore();

    const handleLogout = async () => {
        const res = await logout();
        if (res == true) {
            navigate("/")
            handleClose();
            alert("logout successful done");
        }

        else alert("some error had occured")
    }

    if (isLoading) {
        (
            <>
                <div>Spinner of Loading.....</div>
            </>
        )
    }
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Logout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to log out of your account?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
