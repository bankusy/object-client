import styled from "styled-components";
import { useDarkMode } from "../../../hooks/useDarkMode";

export default function NotFound() {
    const { isDarkMode } = useDarkMode();

    return (
        <NotFoundContainer>
            <Message
                src={isDarkMode ? "404-dark.png" : "404-light.png"}
                alt="404"
            />
        </NotFoundContainer>
    );
}

const NotFoundContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Message = styled.img`
    width: 25%;
    height: 25%;
    object-fit: contain;
`;
