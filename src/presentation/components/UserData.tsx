import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import React, { useEffect } from 'react'
import CallApi from '../../domain/https';

const UserData = () => {

    useEffect(()=>{
       getData();
    }, [])

    const getData = async () => {
        const res = await CallApi('myApi', '', '')
        console.log(res)
    }

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: `User Data`,
          children: `Content of Tab Pane 1`,
        },
        {
          key: '2',
          label: `Employee Data`,
          children: `Content of Tab Pane 2`,
        },
      ];

  return (
    <div style={{marginTop: 20}}>
        <Tabs size='large' tabPosition={'left'} centered animated defaultActiveKey="1" items={items} onChange={()=> {}} />
    </div>
  )
}

export default UserData