import Cookie from 'js-cookie'
import axios from '../Apis/axios';

const LOG_OUT= '/logout'
export function getCookie(cookieName:string) {
    const value = Cookie.get(cookieName);
    return value;
}
export function setCookie(cookieValue:string,cookieName:string) {
    Cookie.set(cookieName,cookieValue,{
        expires:1,
        secure:true,
        sameSite:'strict',
        path:'/'
    });
}
export function removeCookie(cookieName:string) {
    Cookie.remove(cookieName,{path:'/'});
    return true;
}

export async function destroyCookie(){
    try {
        const response = await axios.post(LOG_OUT,{
            headers:{'Content-Type':'application/json'},
            withCredentials:true
        });
        if(response.data.success){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        alert(error);
        return false;
    }
}