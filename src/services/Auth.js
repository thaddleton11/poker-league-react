


export default function () {
    let store = require('store');
    if( typeof store.get('user_key') !== "undefined" && typeof store.get('session_key') !== "undefined"){
        return true;
    }

    return false;
}