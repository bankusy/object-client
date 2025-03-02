import styled from "styled-components";

export default function Input({
    children,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.backgroundColor = "var(--background-color)";
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.backgroundColor = "var(--background-color)";
    };

    return <StyledInput onFocus={handleFocus} onBlur={handleBlur} {...props} />;
}

const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    outline: none;
    padding: 0 1rem;
    box-sizing: border-box;

    &:disabled {
        color: ${(props) =>
            props.disabled == undefined ||
            props.disabled == null ||
            props.disabled === true
                ? "var(--disabled-color)"
                : "white"};
    }

    &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
    }
`;
