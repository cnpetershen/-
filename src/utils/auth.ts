// 从cookie中获取用户的token，并区分管理员和普通用户
// import {atob} from 'abab';
// import Cookies from 'js-cookie';

const TokenKey = process?.env?.VUE_APP_TOKEN_KEY || 'token';

// 定义用户类型，主要有:医生、患者、管理员
export type UserType = 'doctor' | 'patient' | 'admin';

// 定义userinfo类型
export type UserInfo ={
    isAdmin: boolean ;
    username: string;
    accessToken: string;
    roles: string[];
    userType: UserType;
}

// 获取用户信息,返回UserInfo类型
export function getUserInfo(): Partial<UserInfo> | UserInfo | null {
    let token = getToken();
    if (token) {
        let user = JSON.parse(atob(token.split('.')[1]));
        user.roles = user.roles || [];
        // 判断用户是否为管理员, 管理员的角色为admin, 普通用户的角色为user
        // user.roles 是字符串数组，判断是否包含admin
        // 注意：这里的判断是字符串数组，所以需要用includes方法，而不是用==
        let isAdmin = user.roles.includes('admin');

        //返回UserInfo类型
        return { isAdmin,
            accessToken: token,
            username: user.username,
            roles: user.roles,
            userType: user.userType?? 'patient'
        };
    } else {
        return null;
    }
}

export function getToken():string | null {
    let token:string | null = localStorage.getItem(TokenKey);
    return token||null;
}

export function setToken(token:string):void {
    localStorage.setItem(TokenKey, token);
}

export function removeToken():void {
    localStorage.removeItem(TokenKey);
}

export function getUsername():string | null {
    let userInfo:Partial<UserInfo> | UserInfo | null = getUserInfo();
    return userInfo?.username || null;
}

export function isAdmin():boolean {
    let userInfo:Partial<UserInfo> | UserInfo | null = getUserInfo();
    return userInfo?.isAdmin || false;
}

export function getRoles():string[] {
    let userInfo:Partial<UserInfo> | UserInfo | null = getUserInfo();
    return userInfo?.roles || [];
}

