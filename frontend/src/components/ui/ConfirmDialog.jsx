import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, Trash2, CheckCircle, Info } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'danger',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
}) => {
  const icons = {
    danger: <Trash2 className="w-6 h-6 text-red-600" />,
    warning: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
    success: <CheckCircle className="w-6 h-6 text-green-600" />,
    info: <Info className="w-6 h-6 text-blue-600" />,
  };

  const buttonVariants = {
    danger: 'danger',
    warning: 'warning',
    success: 'success', 
    info: 'primary',
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="sm"
      closeOnBackdrop={!loading}
    >
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          {icons[type]}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={buttonVariants[type]}
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

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['danger', 'warning', 'success', 'info']),
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
};

ConfirmDialog.defaultProps = {
  type: 'danger',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  loading: false,
};

export default ConfirmDialog;