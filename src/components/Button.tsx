import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled.button`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    padding: 0 1rem;
    box-sizing: border-box;
    cursor: pointer;
    &:disabled {
        color: ${(props) =>
            props.disabled == undefined ||
            props.disabled == null ||
            props.disabled === true
                ? "var(--disabled-color)"
                : "white"};
    }

    &:hover {
        opcaity: 0.5;
    }

    &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
`;
