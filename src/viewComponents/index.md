## 视图组件

#### 图片放大镜

```tsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';
import { ImgZoom } from 'myDumi';
import image from '../img/油菜花.jpeg';

export default () => <ImgZoom src={image} multiple={3} />;
```

<API src="./components/ImgZoom/index.tsx"></API>

#### 打字稿

```tsx
/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React, { useRef, useState, Ref } from 'react';
import { Typer } from 'myDumi';
import { Button, Input, Radio } from 'antd';

export default () => {
  const ref = useRef<any>(null);
  const [text, setText] = useState('如果那天能回家早一点，是不是结果会更好一点？');
  const [type, setType] = useState<1 | 2 | 3 | 4>(1);
  const [speed, setSpeed] = useState<1 | 2 | 3 | 4>(1);

  const handle = () => {
    if (ref?.current?.start) {
      ref.current.start();
    }
  };

  const InputChange = (e) => {
    console.log('e', e);
    e.persist();
    setText(e.target.value);
  };
  const onTypeChange = (e) => {
    setType(e.target.value);
  };
  const onSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  return (
    <div style={{ lineHeight: '2em' }}>
      <Input
        placeholder={'请输入文字'}
        onChange={InputChange}
        defaultValue={'如果那天能回家早一点，是不是结果会更好一点？'}
        style={{ width: 500 }}
      />{' '}
      <br />
      <span>打字类型：</span>
      <Radio.Group onChange={onTypeChange} value={type}>
        <Radio value={1}>动画</Radio>
        <Radio value={2}>左动画</Radio>
        <Radio value={3}>下动画</Radio>
        <Radio value={4}>拼音（要求汉字）</Radio>
      </Radio.Group>{' '}
      <br />
      <span>打字速度：</span>
      <Radio.Group onChange={onSpeedChange} value={speed}>
        <Radio value={1}>极快</Radio>
        <Radio value={2}>快</Radio>
        <Radio value={3}>慢</Radio>
        <Radio value={4}>随机</Radio>
      </Radio.Group>
      <br />
      <Button onClick={handle}>开始</Button>
      <div style={{ fontSize: 14, backgroundColor: 'rgb(236, 231, 231)' }}>
        <Typer text={text} ref={ref} type={type} speed={speed} />
      </div>
    </div>
  );
};
```

<API src="./components/Typer/index.tsx"></API>
