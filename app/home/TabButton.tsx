export default function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-3 text-center text-base font-extrabold ${
        active ? "text-[#2C7FB8]" : "text-gray-300"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-6 bottom-0 rounded-full ${
          active ? "h-[3px] bg-[#2C7FB8]" : "h-[2px] bg-gray-100"
        }`}
      />
    </button>
  );
}
