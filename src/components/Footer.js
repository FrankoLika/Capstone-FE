import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="z-index1">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <ul className="list-inline">
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">Informazioni</a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">Blog</a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">Lavora con noi</a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">Aiuto</a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">Privacy</a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">Condizioni</a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">Luoghi</a>
                            </li>
                            <li className="list-inline-item mx-2">
                                <a href="#" className="text-decoration-none text-secondary">API</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-3">
                        <small>&copy; {new Date().getFullYear()} PostVerse from Lika Franko</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;