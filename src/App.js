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
        console.log( 'click' ) ;
        setNum(prevNum => prevNum += num ) ;
        break ; 
      case 'mousedown' :
        console.log( 'mousedown' ) ;
        timer = setTimeout(_=>{
          setLoopBln( true ) ;
        }, 1000) ;
        break ;
      case 'mouseup' : 
        console.log( 'mouseup' ) ;
        setLoopBln( false ) ; 
        break ; 
    }

  }

  useEffect(_=>{
    if( !loopBln ) return ;
    let timerLoop = null ; 
    let startTime = null ;
    let elapsedTime = 0 ; 

    const cancelHandler = _ => {
      console.log( 'cancelHandler in' ) ; 
      clearTimeout( timer ) ;
      cancelAnimationFrame( timerLoop ) ;
      setLoopBln( false ) ; 
    }

    const loop = timestamp => {
      console.log( 'loop in' ) ;
      if( startTime == null ) startTime = timestamp ;
      elapsedTime = Math.round( timestamp - startTime ) ;

      setNum( prevNum => prevNum += num ) ; 

      timerLoop = requestAnimationFrame( loop ) ;
    }

    timerLoop = requestAnimationFrame( loop ) ;
    window.addEventListener( 'click' , cancelHandler ) ; 

    // unmount
    return _ => {
      console.log( 'unmount in' ) ;
      window.removeEventListener( 'click' , cancelHandler ) ; 
      cancelHandler() ; 
    }

  }, [loopBln])

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
