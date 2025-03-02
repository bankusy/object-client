import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function AuthSuccess() {
    const [searchParams, setSearchParams] = useSearchParams();

    const userId = searchParams.get("userId");
    const userNickname = searchParams.get("userNickname");
    const userAvatar = searchParams.get("userAvatar");

    useEffect(() => {
        if (userId || userNickname) {
            console.log("로그인 정보 존재하여 사용자 정보 입력");

            localStorage.setItem("userId", userId!);
            localStorage.setItem("userNickname", userNickname!);
            localStorage.setItem("userAvatar", userAvatar!);
        } else {
            console.log("로그인 정보 존재하지 않아 사용자 정보 삭제");
            localStorage.removeItem("userId");
            localStorage.removeItem("userNickname");
            localStorage.removeItem("userAvatar");
        }
        window.location.href = "/home";
    }, [userId, userNickname, userAvatar]);

    return <div>AuthSuccess</div>;
}
