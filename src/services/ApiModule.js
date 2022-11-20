import axios from 'axios';
const headers = () => {
    let myHeaders = {
        'Content-Type': 'application/json'
    };


/*    let store = require('store');
    console.log(store.get());
    if(store.get('user_key') && store.get('session_key')){
        myHeaders['X-Poker-User'] = store.get('user_key');
        myHeaders['X-Poker-Session'] = store.get('session_key');
    }*/

    return myHeaders;
};

export default axios.create({
    baseURL: 'http://poker-api.tomh/',
    headers: headers(),
    withCredentials: false
})