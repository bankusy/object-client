import styled from "styled-components";

export default function CheckBoxLabel({
    ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <StyledCheckBoxLabel {...props} />;
}

const StyledCheckBoxLabel = styled.label`
    width: 100%;
    background-color: transparent;
    pointer-events: none;
    border-radius: 2px;
`;
