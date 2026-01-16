"use client";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message,
  confirmText = "Stoppen",
  cancelText = "Doorgaan",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-[390px] rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-5">{message}</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 rounded-2xl py-3 font-medium border border-gray-200"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-1/2 rounded-2xl py-3 font-medium bg-black text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
