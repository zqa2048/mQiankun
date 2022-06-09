/**
 * title: demo2
 */

import React from 'react';
import { Button, message } from 'antd';
import { useRequest } from 'ahooks';

type IChangeProps = () => Promise<{ name?: string; code: number }>;

const changeUsername: IChangeProps = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      random > 0.5 ? resolve({ name: 'zqa', code: 200 }) : reject({ code: 500 });
    }, 2000);
  });
};

const Bar = ({ title }: { title: string }) => {
  const { loading, run, data } = useRequest<
    { name?: string; code: number },
    [{ [key: string]: any }]
  >(changeUsername, {
    manual: true,
  });
  console.log('data', data);
  {
    data?.code !== 200 ? message.warn('请求错误') : null;
  }

  return (
    <div>
      <Button type="primary" loading={loading} onClick={run}>
        <div>Query</div>
      </Button>
      <p>{data?.name}</p>
    </div>
  );
};

export default Bar;
