export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCFENgaVDxdIvXbPzkhSVBjinIPNv64vEE",
    authDomain: "clearaccountsv2-prod.firebaseapp.com",
    databaseURL: "https://clearaccountsv2-prod.firebaseio.com",
    projectId: "clearaccountsv2-prod",
    storageBucket: "clearaccountsv2-prod.appspot.com",
    messagingSenderId: "306666158807",
    appId: "1:306666158807:web:ce565669008d27496dce92",
    measurementId: "G-9YB7FV513M"
  },
  firebaseFunctions: {
    getPurchasesByEmail: 'https://us-central1-clearaccountsv2-prod.cloudfunctions.net/getPurchasesByEmail?email='
  }
};