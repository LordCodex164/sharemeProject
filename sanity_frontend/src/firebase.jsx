import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import "firebase/auth"



const firebaseConfig = {
        apiKey: "AIzaSyCJbnKW-dAnCVcfhyDLnzEHehak0j8iXeg",
        authDomain: "shareme-project-377300.firebaseapp.com",
        projectId: "shareme-project-377300",
        storageBucket: "shareme-project-377300.appspot.com",
        messagingSenderId: "1068137702275",
        appId: "1:1068137702275:web:0d1a0ec1b829c87fc6ccb6",
        measurementId: "G-XDQN4VQYLJ"
      };

//initialize auth

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)


