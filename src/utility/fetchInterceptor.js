import fetchIntercept from 'fetch-intercept';
import {LOGIN_API_URL, NEWSFEED_API_URL, SIGNUP_API_URL} from './constants'

export const fetchInterceptor = () => {
     const unregister = fetchIntercept.register({
        request: function (url, config) {
            config.headers = {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            };
            if(url == NEWSFEED_API_URL){
                const user = JSON.parse(localStorage.getItem('user'));
                config.headers['Authorization'] = `Bearer ${user.token}`;
            }
            return [url, config];
        },
    
        requestError: function (error) {
            // Called when an error occured during another 'request' interceptor call
            // like auth 2.0
            return Promise.reject(error);
        },
    
        response: function (response) {
            //modify and manipulate response data from here
            return response;
        },
    
        responseError: function (error) {
            // Handle an fetch error
            return Promise.reject(error);
        }
    }); 
    return () => { unregister() };
}
