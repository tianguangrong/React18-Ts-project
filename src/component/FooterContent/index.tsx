import React from 'react'
import { Layout } from 'antd';
const { Footer } = Layout

const FooterContent: React.FC = (props) => {
  return (
    <>
        <Footer style={{ textAlign: 'center' }}>
            Auth Right ©{new Date().getFullYear()} Created by tianguangrong
        </Footer>
    </>
  )
}

export default FooterContent
