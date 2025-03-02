import styled from "styled-components";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    width?: string;
    height?: string;
}

export default function CheckBox({ width, height, ...props }: CheckBoxProps) {
    return (
        <div
            style={{
                position: "relative",
                display: "inline-block",
                height: "100%",
            }}
        >
            <StyledCheckBox
                type="checkbox"
                width={width}
                height={height}
                {...props}
            />
            <StyledCheckBoxMark />
        </div>
    );
}

const StyledCheckBox = styled.input`
    height: ${(props) => props.height ?? "30px"};
    width: ${(props) => props.width ?? "30px"};

    border-radius: 4px;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    appearance: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:checked + div {
        background-color: var(--border-color);
    }
`;

const StyledCheckBoxMark = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: transparent;
    pointer-events: none;
    border-radius: 2px;
`;
