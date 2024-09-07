import styled from "styled-components";

const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

function Button(props){
    const {title, onClick, disabled} = props;

    return(
        <div>
            <StyledButton 
                onClick={onClick}
                disabled={disabled}>
                { title || "BUTTON"}
            </StyledButton>
        </div>
    )
}

export default Button;