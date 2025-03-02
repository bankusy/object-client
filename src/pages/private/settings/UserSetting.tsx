import styled from "styled-components";
import Input from "../../../components/Input";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useEffect, useState } from "react";
import { customAxios } from "../../../api/Auth";

type User = {
    userId: string;
    userEmail: string;
    userNickname: string;
    userAvatar: string;
};

export default function UserSetting() {
    const { isDarkMode } = useDarkMode();
    const [user, setUser] = useState<User | undefined | null>();

    const avatar =
        localStorage.getItem("userAvatar") ??
        (isDarkMode ? "default-profile-dark.svg" : "default-profile-light.svg");

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        console.log(1);

        customAxios
            .get<User>(`/users/${userId}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("에러 발생", error);
                setUser(null);
            });
    }, [userId]);

    return (
        <InfoContainer>
            <InfoInnerContainer>
                <Title>정보 변경</Title>
                <AvatarWrap>
                    <Avatar src={avatar} alt="Profile" />
                </AvatarWrap>
                <FormItem>
                    <Input
                        id="email"
                        type="email"
                        value={user?.userEmail}
                        placeholder="Email"
                        disabled={true}
                    />
                </FormItem>
                <FormItem>
                    <Input
                        id="nickname"
                        type="text"
                        value={user?.userNickname}
                        placeholder="닉네임"
                    />
                </FormItem>
            </InfoInnerContainer>
        </InfoContainer>
    );
}

const InfoContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
`;

const InfoInnerContainer = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Title = styled.h2`
    margin: 0;
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const AvatarWrap = styled.div`
    display: flex;
    justify-content: center;
`;

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;
