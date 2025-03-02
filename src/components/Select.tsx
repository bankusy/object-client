import styled from "styled-components";

export default function Select({
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <StyledSelectContainer>
            <StyledSelect {...props} />
            <StyledSelectArrow />
        </StyledSelectContainer>
    );
}

const StyledSelectContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
`;

const StyledSelect = styled.select`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    appearance: none;
    padding: 0 1rem;
`;

const StyledSelectArrow = styled.div`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    pointer-events: none;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--border-color);
`;
