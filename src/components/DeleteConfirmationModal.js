import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { WarningFilled } from '@ant-design/icons';
import './DeleteConfirmationModal.css';

const { Title, Text } = Typography;

const DeleteConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  title = "Deseja excluir este cadastro?",
  message = "Esta ação não poderá ser desfeita.",
  confirmText = "Excluir",
  cancelText = "Cancelar",
  loading = false
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      closable={false}
      className="premium-delete-modal"
      width={360}
    >
      <div className="premium-delete-content">
        <div className="warning-icon-wrapper">
          <WarningFilled className="premium-warning-icon" />
        </div>
        
        <Title level={4} className="premium-delete-title">
          {title}
        </Title>
        
        <Text className="premium-delete-message">
          {message}
        </Text>

        <div className="premium-delete-actions">
          <Button
            className="premium-cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="primary"
            danger
            className="premium-confirm-btn"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
