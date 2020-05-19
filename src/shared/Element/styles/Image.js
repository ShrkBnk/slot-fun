import styled from "styled-components";

const Image = styled.div`
    position: relative;
    width: 100%;
    height: ${props => props.height}%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Image;
