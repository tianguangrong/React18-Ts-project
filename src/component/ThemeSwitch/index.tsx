import React, { useContext } from 'react'
import { Space, Switch } from 'antd';
// import { ThemeContext } from '../../App';
import { UseTheme } from '../../utils/ThemeProvider';
const ThemeSwitch = () => {
    
    const {theme, toggleTheme} = UseTheme()
    const changeCurrentTheme = (checked: boolean) => {
        console.log('checked', checked);
        toggleTheme!()
    }
    return (
        <div>
            {/* <span>{theme}</span> */}
            <Switch checkedChildren="暗" unCheckedChildren="亮" checked={theme=== 'dark' ? true : false}   onChange={changeCurrentTheme} />
        </div>
    )
}

export default ThemeSwitch
