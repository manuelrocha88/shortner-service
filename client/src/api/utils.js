export const API_PATH = {
    ENCODE: 'api/encode',
    DECODE: 'api/decode',
    STATISTIC: 'api/statistic',
    LIST: 'api/list',
};

export function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return `${process.env.REACT_APP_NODE_URL}`;
  }

  return window.location.origin;
}

export function getRequestUrl(url) {
  if (process.env.NODE_ENV !== 'production') {
    return `${process.env.REACT_APP_NODE_URL}/${url}`;
  }

  return url;
}

export async function postData(url = '', data = {}) {
    const response = await fetch(getRequestUrl(url), {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data) 
    });
    return response.json();
}

export async function getData(url = '') {    
    const response = await fetch(getRequestUrl(url), {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer'
    });
    return response.json();
}