import ApiModule from "./ApiModule";
import useCookies from 'react-cookie';

const store = require('store');


export default class api {
    static async post(route, inputs) {

        return new Promise(function (success, error) {

            let json = JSON.stringify(inputs);
            let config = {};
            if (store.get('user_key') && store.get('session_key')) {
                config = {
                    headers: {
                        'X-Poker-User': store.get('user_key'),
                        'X-Poker-Session': store.get('session_key')
                    }
                };
            }
            console.log(json);
            ApiModule.post(route, json, config)
                .then(async (res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        success(await api.processData(res.data));
                    }
                })
                .catch(function (e) {
                    // console.log(e);
                    // window.location = ('/login');
                    error(e);
                });
        });

    }

    static async get(route) {

        return new Promise(function (success, error) {
            let config = {};
            if (store.get('user_key') && store.get('session_key')) {
                config = {
                    headers: {
                        'X-Poker-User': store.get('user_key'),
                        'X-Poker-Session': store.get('session_key')
                    }
                };
            }
            ApiModule.get(route, config)
                .then(async (res) => {
                    if (res.status === 200) {
                        success(await api.processData(res.data));
                    }
                })
                .catch(function (e) {
                    // console.log(e);
                    // window.location = ('/login');
                    error(e);
                });
        });

    }


    static processData(inputs) {

        return new Promise(function (success, error) {
            if (inputs.result !== true || typeof inputs.session_key !== "string") {
                error("User ID missing");
                window.location.href = '/login '
            }

            store.set('session_key', inputs.session_key);

            if (inputs.auth) {
                store.set('user_key', inputs.auth.user_key);
            }
            console.log('processData')
            success(inputs.data);
        });
    }

    static processKeys(data) {

    }
}