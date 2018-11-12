/**
 *
 * ErrorsListModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Semantic
import { Header } from 'semantic-ui-react';

// Ant
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';

/* eslint-disable react/prefer-stateless-function */
const ErrorsListModal = ({ errors, open, onClose }) => {
  const columns = [
    {
      title: 'Fila',
      dataIndex: 'row',
      key: 'row',
      align: 'center',
      width: '100px',
      render: text => <Header as="h5">{text}</Header>,
    },
    {
      title: 'Error',
      key: 'error',
      dataIndex: 'error',
    },
  ];
  return (
    <Modal
      visible={open}
      title="Se encontraron los siguientes errores en el archivo:"
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="submit" type="primary" onClick={onClose}>
          Cerrar
        </Button>,
      ]}
      width="80%"
    >
      <Table rowKey="id" columns={columns} dataSource={errors} />
    </Modal>
  );
};

ErrorsListModal.propTypes = {
  errors: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorsListModal;
