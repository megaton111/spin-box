import React, { useState, useEffect } from 'react' ; 
import styled, { createGlobalStyle } from 'styled-components' ;

const 
  GlobalStyle = createGlobalStyle`
    html, body, #root {
      height: 100% ; 
      background:#eee ; 
      display:flex ; 
      justify-content : center; 
      align-items:center ; 
    }
  ` 
, SpinBoxWrap = styled.div`
    display:inline-flex ; 
    border-radius : 10px ;
    overflow: hidden ; 
  `
, InputBlock = styled.input.attrs({
    readOnly : true ,
  })`
    height : 60px ;
    border:0;
    font-size:24px;
    text-align:center;
    outline:none;
    width:100px; 
  `
, BtnBlock = styled.button`
    width:60px ; height:60px ; 
    color:#fff ; 
    background:#3498db ; 
    border:0;
    cursor:pointer;
    font-size:24px;
  `
; 

const SpinBox = _ => {
  return(<>
    <GlobalStyle />
    <SpinBoxWrap>
      <BtnBlock />
      <InputBlock value={20} />
      <BtnBlock />
    </SpinBoxWrap>
  </>)
}

export default SpinBox;
