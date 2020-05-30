import React from 'react';
import { listUser } from '../firebase';

const test = () => {
    listUser()
    .then((res)=>{
        console.log(res);
    })

    return null;
}

export default test;