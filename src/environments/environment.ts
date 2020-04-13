// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDd7EGPwUdD0597fnLQ2z5JRJ6cO6y4oeM",
    authDomain: "clearaccountsv2.firebaseapp.com",
    databaseURL: "https://clearaccountsv2.firebaseio.com",
    projectId: "clearaccountsv2",
    storageBucket: "clearaccountsv2.appspot.com",
    messagingSenderId: "311577287400",
    appId: "1:311577287400:web:6a03afb639798061cf875d",
    measurementId: "G-WM3RN2X44G"
  },
  firebaseFunctions: {
    getPurchasesByEmail: 'https://us-central1-clearaccountsv2.cloudfunctions.net/getPurchasesByEmail?email='
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
