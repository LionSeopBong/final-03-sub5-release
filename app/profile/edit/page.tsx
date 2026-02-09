"use client";

import Navi from "@/app/components/common/Navi";
import ProfileButton from "@/app/profile/components/ProfileButton";
import ProfileHeader from "@/app/profile/components/ProfileHeader";
import useUserStore from "@/zustand/user";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function ProfileEdit() {
  // zustand에서 현재 저장된 값 가져오기
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  // 모달
  const [openPhotoSetter, setOpenPhotoSetter] = useState(false);
  const [openGalleryModal, setOpenGalleryModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  // 숨겨진 <input type="file"> 클릭
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 사진 촬영 버튼용 input (카메라)
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // zustand 값으로 초기화
  const [selectedImage, setSelectedImage] = useState(
    user?.profileImage || null,
  );
  const [gender, setGender] = useState(user?.extra?.gender || "male");
  const [nickname, setNickname] = useState(user?.name || "");
  const [birth, setBirth] = useState(user?.extra?.birthDate || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일 가져오기
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 미리보기 URL 생성
      setSelectedImage(imageUrl); // state 업데이트
    }
  };

  const handleRemovePhoto = () => {
    setSelectedImage(null);
    setOpenPhotoSetter(false);
  };

  const handleSubmit = () => {
    if (!user) return;

    // zustand에 저장
    setUser({
      ...user,
      name: nickname,
      profileImage: selectedImage,
      extra: {
        ...user.extra,
        gender: gender as "male" | "female",
        birthDate: birth,
      },
    });

    setOpenSuccessModal(true); // 정보 업데이트 성공 모달 열기
  };

  return (
    <>
      <ProfileHeader title="프로필 수정" />

      {/* ----------------- 프로필 수정 : edit-profile ----------------- */}
      <main className="edit-profile mx-4 pb-20">
        {/* 프로필 사진 + 카메라 아이콘 */}
        <div className="flex items-center justify-center relative w-[70px] h-[70px] mx-auto">
          <Image
            src={selectedImage || "/icons/profile-main.svg"}
            alt="프로필 사진"
            fill
            className="object-cover"
          />
          <button
            type="button"
            aria-label="프로필 사진 설정 버튼"
            className="cursor-pointer"
          >
            <Image
              src="/icons/profile-camera.svg"
              alt="프로필 사진 선택"
              className="absolute bottom-0 right-0"
              width={30}
              height={30}
              onClick={() => setOpenPhotoSetter(true)}
            />
          </button>
        </div>

        {/* 닉네임  |  성별  |  생년월일  |  완료 버튼 */}
        <div className="flex flex-col my-4">
          {/* 닉네임 + input */}
          <div className="input-name flex flex-col m-4 gap-1.5">
            <label className="font-semibold">닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
              className="border border-[#d3d3d3] p-2 rounded-[6px]"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          {/* 성별 radio */}
          <div className="input-radio flex flex-col m-4 gap-1.5">
            <h3 className="font-semibold">성별</h3>
            <div className="radio-pair flex items-center justify-center gap-4">
              <label className="flex items-center justify-center bg-[#f4f4f4] w-full py-3 cursor-pointer gap-4 rounded-lg">
                <input
                  type="radio"
                  name="gender"
                  className="hidden"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) =>
                    setGender(e.target.value as "male" | "female")
                  }
                />
                <span className="w-4 h-4 rounded border border-[#d3d3d3] flex items-center justify-center">
                  {gender === "male" && (
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                  )}
                </span>
                <span>남성</span>
              </label>
              <label className="flex items-center justify-center bg-[#f4f4f4] w-full py-3 cursor-pointer gap-4 rounded-lg">
                <input
                  type="radio"
                  name="gender"
                  className="hidden"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) =>
                    setGender(e.target.value as "male" | "female")
                  }
                />

                <span className="w-4 h-4 rounded border border-[#d3d3d3] flex items-center justify-center">
                  {gender === "female" && (
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                  )}
                </span>

                <span>여성</span>
              </label>
            </div>
          </div>

          {/* 생년월일 dropdown */}
          <div className="input-birth flex flex-col m-4 gap-1.5">
            <label className="font-semibold">생년월일</label>
            <input
              type="date"
              className="border border-[#d3d3d3] p-2 rounded-[6px]"
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </div>

          <ProfileButton onSubmit={handleSubmit} />
        </div>
      </main>

      <Navi />

      {/* ●●●●● ① 프로필 사진 설정 modal 전체 레이어 */}
      {openPhotoSetter && (
        <div
          id="photo-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* --------------------- 실제 카메라 연결 input --------------------- */}
          <input
            type="file"
            ref={cameraInputRef}
            className="hidden"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />

          {/* ★ dim 추가 */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* 모달 카드 */}
          <div className="modal-setter-wrap px-8 w-full relative z-10">
            <div className="modal-photo-setter flex flex-col items-center justify-center border border-gray-200 rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
              <h2 className="font-semibold border-b border-gray-300 p-3 w-full text-center text-gray-500">
                프로필 사진 설정
              </h2>
              <button
                className="modal-photo-action flex items-center gap-3 border-b border-gray-200 px-7 py-3 w-full cursor-pointer"
                onClick={() => {
                  cameraInputRef.current?.click();
                  setOpenPhotoSetter(false);
                }}
              >
                <Image
                  src="/icons/edit-camera.svg"
                  alt="사진 촬영"
                  width={20}
                  height={20}
                />
                <span>사진 촬영</span>
              </button>
              <button
                className="modal-photo-select flex items-center gap-3 border-b border-gray-200 px-7 py-3 w-full cursor-pointer"
                onClick={() => {
                  setOpenGalleryModal(true);
                }}
              >
                <Image
                  src="/icons/edit-photo.svg"
                  alt="갤러리에서 선택"
                  width={20}
                  height={20}
                />
                <span>갤러리에서 선택</span>
              </button>
              <button
                className="modal-photo-remove flex items-center gap-3 border-b border-gray-200 px-7 py-3 w-full cursor-pointer"
                onClick={handleRemovePhoto}
              >
                <Image
                  src="/icons/edit-remove.svg"
                  alt="현재 사진 삭제"
                  width={20}
                  height={20}
                />
                <span>현재 사진 삭제</span>
              </button>
              <button
                className="modal-photo-cancel font-semibold text-[--color-primary] border-t border-gray-300 p-3 w-full cursor-pointer"
                onClick={() => setOpenPhotoSetter(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ●●●●● ② 갤러리 사진 선택 modal 전체 레이어 */}
      {openGalleryModal && (
        <div
          id="gallery-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* --------------- 실제 사진첩 연결 --------------- */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* ★ dim 추가 */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* 모달 카드 */}
          <div className="modal-gallery-wrap px-8 w-full relative z-10">
            <div className="modal-gallery-setter rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
              <h2 className="font-semibold border-b border-gray-200 py-4 w-full text-center text-gray-500 text-lg">
                갤러리에서 사진 선택
              </h2>
              <div className="relative w-full h-[160px] px-4 py-2">
                <Image
                  src={selectedImage || "/icons/photo-gallery.svg"}
                  alt="프로필 선택"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="modal-gallery-actions flex items-center justify-between gap-3 w-full p-3">
                <button
                  type="button"
                  className="w-1/2 border border-gray-200 rounded-[5px] py-3 cursor-pointer"
                  onClick={() => {
                    setOpenGalleryModal(false);
                  }}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="w-1/2 border border-[#003458] rounded-[5px] py-3 bg-[#003458] text-white cursor-pointer"
                  onClick={() => {
                    if (selectedImage) {
                      setOpenPhotoSetter(false);
                      setOpenGalleryModal(false);
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ●●●●● 프로필 저장 성공 시에만 렌더링되는 모달창 */}
      {openSuccessModal && (
        <div
          id="post-submit-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* ★ dim 추가 */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          {/* 모달 카드 */}
          <div className="post-submit-card px-8 w-full relative z-10">
            <div className="modal-photo-setter flex flex-col items-center justify-center rounded-[20px] mx-auto max-w-[420px] w-full bg-[#ffffff]">
              <Image
                src="/icons/post-submitted.svg"
                alt=""
                width={65}
                height={65}
                className="my-4"
              />

              <div className="submit-alert items-center justify-center flex flex-col mb-4 pb-5">
                <h2 className="font-semibold w-full text-gray-600 text-lg">
                  프로필이 저장되었습니다.
                </h2>
              </div>

              <button
                className="post-submit-btn font-semibold text-white border border-[#003458] bg-[#003458] rounded-b-[20px] p-3 w-full cursor-pointer"
                onClick={() => setOpenSuccessModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
