'use strict';
import * as functions from 'firebase-functions';
const cors = require("cors")({ origin: "*", credentials: true, methods: "GET" });
const admin = require("firebase-admin");


admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        console.log("Probando!!")
        response.send({ text: "Hello from Firebase!" });
    });
});

export const getPurchasesByEmail = functions.https.onRequest((request, response) => {
    cors(request, response, async () =>{
        const reqInfo = request.query;
        // let purchases: any = [];
        let totalDebit: number = 0;
        let totalCredit: number = 0;

        await firestore
        .collection("purchases")
        .get()
        .then(
            (snapshot: any) => {
                snapshot.forEach((pur:any) => {
                    const participant =  pur.data().participants.find((data:any) => data.email === reqInfo.email);
                    if (participant && !participant.paid) {
                        // purchases = purchases.concat(pur.data());
                        if(participant.owe > 0) {
                            totalCredit = totalCredit + participant.owe;
                        }
                        else if(participant.owe < 0) {
                            totalDebit = totalDebit + participant.owe;
                        }
                    }
                });
                response.send({totalCredit: totalCredit, totalDebit:totalDebit});
                return "";
            }
        )

    })
})