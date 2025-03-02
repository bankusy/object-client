import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import UserSetting from "./UserSetting";
import UserTerminate from "./UserTerminate";

export default function Setting() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    return (
        <SettingContainer>
            <ContentContainer>
                {type == "user" ? <UserSetting /> : <></>}
                {type == "terminate" ? <UserTerminate /> : <></>}
            </ContentContainer>
        </SettingContainer>
    );
}

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const SettingContainer = styled.div`
    overflow-y: hidden;
    display: flex;
    height: 100vh;
    width: 100vw;
`;
