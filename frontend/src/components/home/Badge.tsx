// components/Badge.tsx
const Badge = ({ text, color }: { text: string; color: string }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${color} transition-all hover:scale-105`}
    >
      {text}
    </span>
  );
};

export default Badge;