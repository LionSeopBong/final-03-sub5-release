import ProfileFooter from "@/app/profile-main/components/ProfileFooter";
import ProfileHeader from "@/app/profile-main/components/ProfileHeader";

export default function PostDetailPage() {
  return (
    <>
      <ProfileHeader />

      {/* ---------------------------- 게시글 상세 ---------------------------- */}
      <main className="p-4 flex flex-col gap-4 min-h-[calc(100vh-120px)]">
        <section className="flex flex-col gap-4 px-4">
          <h2 className="border border-gray-200 text-center rounded-md py-1.5">
            제목
          </h2>
          <p className="border border-gray-200 rounded-md p-3 leading-relaxed">
            안녕하세요. 문의게시판 이용 중 불편한 점이 있어 문의드립니다. 게시글
            작성 후 수정 기능을 사용하려고 했으나, 일부 항목이 수정되지 않거나
            저장 버튼을 눌러도 변경 내용이 반영되지 않는 문제가 발생했습니다.
            특히 모바일 환경에서 해당 현상이 자주 발생하는 것 같습니다. 또한
            게시글 삭제 버튼을 눌렀을 때 삭제 확인 모달이 뜨지 않거나, 이전
            화면으로 바로 이동되는 경우도 있었습니다. 브라우저를 새로고침하면
            정상적으로 동작할 때도 있어 재현 조건이 궁금합니다. 현재 사용 중인
            환경은 크롬 브라우저이며, 동일한 문제가 다른 기기에서도 발생하는지
            확인 부탁드립니다. 사이트 이용에 참고 부탁드립니다.
          </p>
        </section>
        <div className="flex gap-4 ml-auto mt-auto mb-16 px-4">
          <button
            type="button"
            className="border border-[#003458] bg-[#003458] text-white rounded-md py-1 px-2 cursor-pointer"
          >
            답변하기
          </button>
          <button
            type="button"
            className="border border-gray-400 rounded-md py-1 px-2 cursor-pointer"
          >
            수정
          </button>
          <button
            type="button"
            className="border border-[#e85c5c] bg-[#e85c5c] text-white rounded-md py-1 px-2 cursor-pointer"
          >
            삭제
          </button>
        </div>
        {/* ●●●●● 답변하기 모달창 */}
        <div
          id="gallery-modal"
          className="fixed inset-0 z-50 flex items-center justify-center hidden"
        >
          {/* ★ dim 추가 */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* 모달 카드 */}
          <div className="modal-comment-wrap px-8 w-full relative z-10">
            <div className="modal-add-comment rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
              <h2 className="font-semibold border-b border-gray-200 py-2.5 w-full text-center text-gray-500 text-lg">
                답변 작성
              </h2>
              <div className="relative w-full h-[180px] px-4 py-2">
                <h3 className="mb-2 text-gray-500 px-2">
                  문의에 대한 답변을 작성해주세요.
                </h3>
                <textarea
                  placeholder="이곳에 답변 내용을 작성해 주세요."
                  maxLength={500}
                  className="w-full h-[100px] border border-gray-200 rounded-sm p-2 resize-none leading-relaxed"
                ></textarea>
                <span className="absolute bottom-2 right-4 text-sm text-gray-400">
                  0 / 500
                </span>
              </div>

              <div className="modal-comment-action flex items-center justify-between gap-3 w-full p-5">
                <button
                  type="button"
                  className="w-1/2 border border-[#003458] rounded-[5px] py-2 bg-[#003458] text-white cursor-pointer"
                >
                  등록
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-gray-300 rounded-[5px] py-2 cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ●●●●● 게시글 삭제 모달창 */}
        <div
          id="remove-post-modal"
          className="fixed inset-0 z-50 flex items-center justify-center hidden"
        >
          {/* ★ dim 추가 */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* 모달 카드 */}
          <div className="modal-comment-wrap px-8 w-full relative z-10">
            <div className="modal-add-comment rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
              <h2 className="font-semibold border-b border-gray-200 py-2.5 w-full text-center text-gray-400 text-lg">
                게시글 삭제
              </h2>
              <h3 className="mb-2 font-semibold flex items-center justify-center text-center min-h-[90px] text-gray-500 p-2">
                해당 게시글을 삭제하시겠습니까?
              </h3>

              <div className="modal-comment-action flex items-center justify-between gap-3 w-full p-5 border-t border-gray-200">
                <button
                  type="button"
                  className="w-1/2 border border-gray-300 rounded-[5px] py-2 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-[#e85c5c] rounded-[5px] py-2 bg-[#e85c5c] text-white cursor-pointer"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProfileFooter />
    </>
  );
}
