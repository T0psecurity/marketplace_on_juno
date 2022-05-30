import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 300px;
  @media (max-width: 650px) {
    margin: 0 10px;
  }
`;

export const Card = styled.div`
  border-radius: 30px;
  border: 1px solid black;
  width: 350px;
  height: 400px;
  position: relative;
  overflow: hidden;
  @media (max-width: 650px) {
    width: 100%;
    margin: 10px;
    }

`

export const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`

export const StyledImg = styled.img`
  width: auto;
  height: 200px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  position: absolute;
  top: calc(50% + 1px);
  left: calc(50% + 1px);
  transform: scale(1.01) translate(-50%,-50%);
  padding-bottom: calc( 0.56 * 100% );

`

export const Text = styled.div`
  margin-top: 240px;
  font-size: 20px;
  font-weight: bold;
`
export const StyledButton = styled.button`
display: inline-flex;
align-items: center;
margin: 40px 0;
justify-content: center;
position: relative;
box-sizing: border-box;
outline: 0;
border: 0;
cursor: pointer;
user-select: none;
vertical-align: middle;
text-decoration: none;
font-weight: 500;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: capitalize;
height: 50px;
width: 300px;
border-radius: 10px;
padding: 6px 16px;

color: #fff;
font-size: 20px;
font-weight: bold;
background-color: #39C639;
box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
  0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
  box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
  border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
  color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
&:hover {
  text-decoration: none;
  background-color: #1b5e20;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}
`