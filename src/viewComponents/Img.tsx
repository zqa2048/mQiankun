import React, { useLayoutEffect } from 'react';
import './index.less';

export default (props: any) => {
  useLayoutEffect(() => {
    fn(props.multiple);
  }, []);
  const queryElm = (tag: string): HTMLElement => {
    return document.getElementById(tag) as HTMLElement;
  };

  const fn = (num = 1) => {
    const small = queryElm('small');
    const move = queryElm('move');

    const big = queryElm('big');
    const look_girl = queryElm('look_girl');

    look_girl.style.width = small.clientWidth * num + 'px';
    look_girl.style.height = small.clientHeight * num + 'px';

    small.onmousemove = function (event) {
      event = event || window.event;
      let move_left = event.clientX - small.offsetLeft - move.offsetWidth / 2;
      let move_top = event.clientY - small.offsetTop - move.offsetHeight / 2;
      // console.log('move_left11',move_left,move_top)
      move_left = move_left < 0 ? 0 : move_left;
      move_left =
        move_left > small.offsetWidth - move.offsetWidth
          ? small.offsetWidth - move.offsetWidth
          : move_left;

      move_top = move_top < 0 ? 0 : move_top;
      move_top =
        move_top > small.offsetHeight - move.offsetHeight
          ? small.offsetHeight - move.offsetHeight
          : move_top;

      // console.log('move_left',move_left,move_top)
      move.style.left = move_left + 'px';
      move.style.top = move_top + 'px';

      // big_x/(look_girl.offsetwidth - big.offsetWeight) = move_left / (small.offsetWidth - move.offsetWidth)
      let big_x =
        (move_left / (small.offsetWidth - move.offsetWidth)) *
        (look_girl.offsetWidth - big.offsetWidth);
      let big_y =
        (move_top / (small.offsetHeight - move.offsetHeight)) *
        (look_girl.offsetHeight - big.offsetHeight);

      // look_girl.style = {...look_girl.style,left:-big_x + 'px',top:-big_y+'px'}
      look_girl.style.left = -big_x + 'px';
      look_girl.style.top = -big_y + 'px';
    };
    small.onmouseover = function () {
      // console.log('move',move)
      move.style.display = 'block';
      big.style.display = 'block';
    };
    small.onmouseout = function () {
      move.style.display = 'none';
      big.style.display = 'none';
    };
  };
  return (
    <>
      <div className="zoom">
        <div id="small">
          <img src={props.src} alt="" />
          <p id="move"></p>
        </div>
        <div id="big">
          <img src={props.src} alt="" id="look_girl" />
        </div>
      </div>
    </>
  );
};
