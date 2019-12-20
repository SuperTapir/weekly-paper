import { message } from 'antd';
import dayjs from 'dayjs';
import { WEEKLY_PAPER } from '../constant/index';

export function copy2ClipBoard(str: string) {
  var tempInput = document.createElement('textarea');
  tempInput.value = str;
  document.body.appendChild(tempInput);
  tempInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  tempInput.style.display = 'none';
  message.success('已将内容复制到剪贴版');
}

export function savePaperData2Storage(state: object) {
  window.localStorage.setItem(WEEKLY_PAPER, JSON.stringify(state));
}

export function getPaperData2Storage() {
  return JSON.parse(window.localStorage.getItem(WEEKLY_PAPER) || '{}');
}

export function replaceTimeStrFromContent(str: string) {
  let reg = /\[day=(\S+)\]/;
  return str.replace(reg, (match, p1) => {
    return dayjs().format(p1);
  });
}
