import { Menu } from "@mui/icons-material";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
}

const MobileMenuToggle = ({ isOpen, onOpen }: Props) => {
  if (isOpen) return null;
  return (
    <button
      className="md:hidden fixed top-5 left-5 z-50 p-3 bg-slate-900 border border-slate-800 rounded-2xl text-indigo-400 shadow-2xl transition-all active:scale-95"
      onClick={onOpen}
    >
      <Menu />
    </button>
  );
};

export default MobileMenuToggle;
