import React from 'react'
import {AiTwotoneMail} from 'react-icons/ai'
import { Space, Typography } from 'antd'

type myProps = {
    title: string
}
const AuthChip: React.FC<myProps> = ({title}) => {
  return (
    <Space style={{display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, padding: 5, backgroundColor: '#10333f'}}>
        <Typography color={'#fff'} style={{
          fontFamily: 'Raleway, sans-serif',
          color: '#fff'
        }}>
            {title} using &nbsp;
        </Typography>
        <AiTwotoneMail color='#fff' />
    </Space>
  )
}

export default AuthChip