// 主题样式
import fs from 'fs';
import path from 'path';
import lessToJs from 'less-vars-to-js';

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './variable.less'), 'utf-8'));

export default themeVariables;
