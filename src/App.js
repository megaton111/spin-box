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

const Btn = ({ type, setNum }) => {
  const num = type ? 1 : -1 ; 
  const [ loopBln, setLoopBln ] = useState( false ) ;
  let timer = null ; 

  const btnHandler = e => {

    switch( e.type ) {
      case 'click' :
        clearTimeout( timer ) ; 
        setNum(prevNum => prevNum += num ) ;
        break ; 
      case 'mousedown' :
        timer = setTimeout(_=>{
          setLoopBln( true ) ;
        }, 1000) ;
        break ;
      case 'mouseup' : 
        setLoopBln( false ) ; 
        break ; 
    }

  } // end of btnHandler

  useEffect(_=>{
    console.log( 'useEffect : ', loopBln ) ; 
    if( !loopBln ) return ;
    let timerLoop = null ; 
    let startTime = null ;

    const cancelHandler = _ => {
      console.log( 'cancel in' ) ;
      clearTimeout( timer ) ;
      cancelAnimationFrame( timerLoop ) ;
      setLoopBln( false ) ; 
    } // end of cancelHandler

    const loop = timestamp => {
      if( startTime == null ) startTime = timestamp ;
      setNum( prevNum => prevNum += num ) ; 
      timerLoop = requestAnimationFrame( loop ) ;
    } // end of loop

    timerLoop = requestAnimationFrame( loop ) ;
    window.addEventListener( 'click' , cancelHandler ) ; 

    // unmount
    return _ => {
      window.removeEventListener( 'click' , cancelHandler ) ; 
      cancelHandler() ; 
    }

  }, [loopBln]) ; // end of useEffect

  return (
    <BtnBlock
      onMouseDown={ btnHandler }
      onMouseUp={ btnHandler }
      onClick={ btnHandler }
    >
      {type && '+' || '-'}
    </BtnBlock>
  )
} ;

const SpinBox = _ => {
  const [ num, setNum ] = useState( 0 ) ; // 기본값은 0
  return(<>
    <GlobalStyle />
    <SpinBoxWrap>
      <Btn type={false} setNum={setNum} />
      <InputBlock value={ num } />
      <Btn type={true} setNum={setNum} />
    </SpinBoxWrap>
  </>)
}

export default SpinBox;
