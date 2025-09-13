import React from 'react'
import { Layout } from 'antd';
import dltStyle from  './DefaultLayout.module.scss';
import MenuComent from '../component/MenuContent';
import HeaderContent from '../component/HeaderContent';
import MainContent from '../component/MainContent';
import FooterContent from '../component/FooterContent';
import { ThemeProvider } from '../utils/ThemeProvider';
export default function DefaultLayout() {
  return (
    <ThemeProvider>
      <div className={dltStyle['default-layout-content']}>
        <Layout style={{
          width: '100%',
          height: '100%'
        }}>
          <MenuComent />
          <Layout>
              <HeaderContent />
            <MainContent />
            <FooterContent/>
          </Layout>
        </Layout>
      </div>
      </ThemeProvider>
  )
}
