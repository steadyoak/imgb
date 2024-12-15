// ==UserScript==
// @name         IMAGEBAM
// @namespace    http://tampermonkey.net/
// @version      2024-12-15
// @description  try to take over the world!
// @author       You
// @match        https://www.imagebam.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=imagebam.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js
// @grant        GM_addStyle
// ==/UserScript==

(async function() {
    'use strict';
    const href = window.location.href.toLowerCase();

    if (href === 'https://www.imagebam.com/') {
        let date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        const expires = "; expires=" + date.toUTCString();
        document.cookie = "nsfw_inter=1" + expires + "; path=/";

        document.querySelector('.dz-hidden-input').addEventListener('change',function (){
            document.querySelector("[value='nsfw']").click();
            document.querySelector(".btn").click();
        });

    } else if (href.startsWith('https://www.imagebam.com/upload/complete')) {
        const showcase = document.querySelector('.link-inner div input').value;
        await originHref(showcase);
    }
})();

async function originHref(showcase) {
    fetch(showcase).then(function (response) {
        return response.text();
    }).then(function (html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const origin = doc.querySelector('a.dropdown-item.text-capitalize').href;
        pop(origin);
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
}

function funcA(imghref) {
    return "生成的字符串：" + imghref;
}

// 创建并显示弹出框
function pop(imghref) {
    // 创建弹出层
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // 创建弹出框内容
    const popupBox = document.createElement('div');
    popupBox.style.backgroundColor = '#333';
    popupBox.style.padding = '20px';
    popupBox.style.borderRadius = '10px';
    popupBox.style.display = 'flex';
    popupBox.style.flexDirection = 'column';
    popupBox.style.gap = '10px';
    popupBox.style.color = '#fff';

    // 第一行：显示imghref
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.value = imghref;
    input1.style.width = '100%';
    input1.style.marginBottom = '10px';
    input1.readOnly = true;
    input1.addEventListener('click', () => {
        input1.select();
        document.execCommand('copy');
    });

    // 第二行：显示funcA(imghref)的结果
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.value = funcA(imghref);
    input2.style.width = '100%';
    input2.style.marginBottom = '10px';
    input2.readOnly = true;
    input2.addEventListener('click', () => {
        input2.select();
        document.execCommand('copy');
    });

    const tip = document.createElement('div');
    tip.innerHTML = '点击上方文字框即可复制';
    tip.style.width = '100%';
    tip.style.textAlign = 'center';

    // 将文字框加入弹出框
    popupBox.appendChild(input1);
    popupBox.appendChild(input2);
    popupBox.appendChild(tip);


    // 将弹出框加入到overlay中
    overlay.appendChild(popupBox);

    // 将overlay加入到页面中
    document.body.appendChild(overlay);

    // 点击overlay外部区域关闭弹出框
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}
