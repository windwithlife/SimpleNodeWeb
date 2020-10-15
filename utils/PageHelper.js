const isServer = typeof window == 'undefined';

export function getQuery() {
  const url = decodeURI(location.search); // 获取url中"?"符后的字串(包括问号)
  let query = {};
  if (url.indexOf("?") != -1) {
      const str = url.substr(1);
      const pairs = str.split("&");
      for(let i = 0; i < pairs.length; i ++) {
           const pair = pairs[i].split("=");
          query[pair[0]] = pair[1];
      }
  }
  return query ;  // 返回对象
}


export function doHref(path=''){
  location.href = `${location.origin}${baseUrl}/${path}` //首页登录成功处理
}


export const Loading = {
  show() {
      if (!isServer) {
          let divEle = document.createElement('div');
          divEle.className = "div_loading_con"
          divEle.innerHTML = `
              <div class="iconfont div_loading">\ue64a</div>
          `
          document.body.appendChild(divEle);
      }
  },
  hide() {
      if (!isServer) {
          let divEle = document.querySelector('.div_loading_con');
          if (divEle) document.body.removeChild(divEle);
      }
  }
}