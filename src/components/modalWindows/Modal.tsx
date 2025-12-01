import { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // CERRAR AL PRESIONAR ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // CERRAR AL HACER CLICK FUERA DEL MODAL
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        ref={modalRef}
        className="
          bg-white rounded-2xl shadow-xl 
          w-full max-w-lg md:max-w-xl lg:max-w-2xl
          p-6 relative animate-[fadeIn_0.25s_ease]

          max-h-[90vh] overflow-y-auto
        "
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>

        {children}
      </div>
    </div>
  );
}
