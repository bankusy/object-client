import styled from "styled-components";

export default function Auth() {
    const kakaoOAuth = () => {
        window.location.href =
            "http://localhost:8080/api/v1/public/oauth?type=KAKAO";
    };

    return (
        <Container>
            <Button onClick={() => kakaoOAuth()} src="kakao-oauth.png" />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Button = styled.img`
    cursor: pointer;
    width: 220px;
    height: auto;
`;
