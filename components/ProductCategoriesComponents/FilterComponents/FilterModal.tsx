import React from 'react';
import { Modal } from 'react-bootstrap';
import WebFilter from './WebFilter';

function FilterModal({ show, handleClose, title }: any) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-uppercase">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="web-filter">
          <WebFilter />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilterModal;
