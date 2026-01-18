type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function BaseModal({ open, onClose, title, children }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-lg md:max-w-xl rounded-2xl shadow-xl max-h-[90vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="text-center mb-4 px-5 pt-5">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
