import React, {
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Pinyin from 'pinyin';
import './index.less';

interface IProps {
  text: string;
  forwardedRef?: Ref<any>;
  type: 1 | 2 | 3 | 4;
  speed: 1 | 2 | 3 | 4;
}

export interface ITyperProps {
  /**
   * @description       需要展示的文本
   * @default
   */
  text: string;
  /**
   * @description       展示动画类型
   * @default
   */
  type: 1 | 2 | 3 | 4;

  /**
   * @description       打印速度
   * @default
   */
  speed: 1 | 2 | 3 | 4;
  /**
   * @description
   * @default
   */
  forwardedRef?: Ref<any>;
}

const speedUnit = {
  1: 50,
  2: 200,
  3: 500,
  4: Math.random() * 500,
};

const Typer: React.FC<ITyperProps> = (props): JSX.Element => {
  const textRef = useRef<any>(null);
  const [timer, setTimer] = useState<number>(0);

  const { text, forwardedRef, type, speed } = props;

  useEffect(() => {
    return clearTimeout(timer);
  }, [props]);

  useLayoutEffect(() => {
    // if(forwardedRef?.current){
    if (textRef?.current) {
      textRef.current.innerHTML = '';
      textRef.current.classList.add('cursorPoint');
    }
    // }
  }, []);

  useImperativeHandle(forwardedRef, () => ({
    start,
  }));

  const start = () => {
    clearTimeout(timer);
    clean();
    writing();
  };

  const clean = () => {
    //如果那天能回家早一点，是不是结果会更好一点？
    if (textRef?.current?.innerHTML) {
      textRef.current.innerHTML = '';
    }
  };

  const writing = useCallback(
    (index = 0) => {
      const arr = text.split('');
      const pinyinData = Pinyin(text);

      if (index < arr.length) {
        switch (type) {
          case 1:
            textRef.current.innerHTML =
              textRef.current.innerHTML.replace(/span1/g, '') +
              `<span class='span1'>${arr[index]}</span>`;
            break;
          case 2:
            textRef.current.innerHTML =
              textRef.current.innerHTML.replace(/span-left/g, '') +
              `<span class='span-left'>${arr[index]}</span>`;
            break;
          case 3:
            textRef.current.innerHTML =
              textRef.current.innerHTML.replace(/span-bottom/g, '') +
              `<span class='span-bottom'>${arr[index]}</span>`;
            break;
          case 4:
            textRef.current.innerHTML += `${arr[index]}<sup>(${pinyinData[index]})</sup>`;
            break;
          default:
            textRef.current.innerHTML += `${arr[index]}`;
        }

        let id = setTimeout(writing, speedUnit[speed], ++index);
        setTimer(id);
      } else {
        clearTimeout(timer);
      }
    },
    [props],
  );

  return (
    <div>
      <span className="span-bottom"></span>
      <div ref={textRef}></div>
    </div>
  );
};
export default React.forwardRef((props: IProps, ref: any) => (
  <Typer {...props} forwardedRef={ref} />
));
