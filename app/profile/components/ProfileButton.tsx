// ■■■■■ 완료 버튼 컴포넌트 ■■■■■

interface ProfileButtonProps {
  onSubmit: () => void;
}

export default function ProfileButton({ onSubmit }: ProfileButtonProps) {
  return (
    <button
      className="m-4 p-2 rounded-[20px] bg-[#003458] border border-[#003458] text-white cursor-pointer"
      onClick={onSubmit}
    >
      완료
    </button>
  );
}
