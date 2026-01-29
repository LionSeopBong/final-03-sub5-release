export default function GoalFilter() {
  return (
    <>
      <div className="flex justify-start w-full">
        <select
          name="goal"
          id=""
          className="w-auto border rounded-sm  px-3 py-1 border-gray-400"
        >
          <option value="select">전체</option>
          <option value="select">진행중</option>
          <option value="select">미진행</option>
          <option value="select">완료</option>
        </select>
      </div>
    </>
  );
}
