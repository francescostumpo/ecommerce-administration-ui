import { Injectable } from '@angular/core';
import AppID from 'ibmcloud-appid-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appID = new AppID();

  constructor() {
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  async init() {
    console.log('initializing appId');
    try {
      await this.appID.init({
        clientId: '8bae8ba7-fa59-4c4a-afbd-c4771c9eddd1',
        discoveryEndpoint: 'https://eu-gb.appid.cloud.ibm.com/oauth/v4/081dba50-3a03-4e0d-a296-b6b098b22e68/.well-known/openid-configuration'
      });
    } catch (e) {
      alert(e);
    }
  }

  // tslint:disable-next-line:typedef
  async login() {
    try {
      const tokens = await this.appID.signin();
      const decodeIDTokens = tokens.idTokenPayload;
      console.log(tokens);
      const userName = 'Hi ' + decodeIDTokens.name + ', Congratulations!';
      console.log(userName);
      sessionStorage.setItem('token', JSON.stringify(tokens));
    } catch (e) {
      console.error(e);
    }
  }

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  getRoles(): string[] {
    if (this.isAuthenticated()) {
      const tokens = JSON.parse(sessionStorage.getItem('token'));
      return tokens.accessTokenPayload.roles;
    }
  }

  getUsername(): string {
    if (this.isAuthenticated()) {
      const tokens = JSON.parse(sessionStorage.getItem('token'));
      return tokens.idTokenPayload.name;
    }
  }

  getPreferredUserame(): string {
    if (this.isAuthenticated()) {
      const tokens = JSON.parse(sessionStorage.getItem('token'));
      return tokens.idTokenPayload.preferred_username;
    }
  }

  getAccessToken(): string {
    if (this.isAuthenticated()) {
      const tokens = JSON.parse(sessionStorage.getItem('token'));
      return tokens.accessToken;
    }
  }

  isAdmin(): boolean {
    if (this.isAuthenticated()) {
      const roles = this.getRoles();
      if (roles.includes('Amministratore')) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  isReporter(): boolean {
    if (this.isAuthenticated()) {
      const roles = this.getRoles();
      if (roles.includes('Reporter')) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }
}

