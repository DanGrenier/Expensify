import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  firebase.initializeApp(config);
  const database = firebase.database();

  export {firebase, database as default};



  //database.ref('expenses').on('child_changed', (snapshot)=> {
  //  console.log(snapshot.key, snapshot.val());
  //});

  


//   database.ref('expenses')
//   .on('value', (snapshot) => {
//       const expenses = [];
//       snapshot.forEach((child) => {
//           expenses.push({
//               id: child.key,
//               ...child.val()
//           });
//       });
//       console.log(expenses);
//   })

//   database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//       const expenses = [];
//       snapshot.forEach((childSnapshot) => {
//           expenses.push({
//            id: childSnapshot.key,
//            ...childSnapshot.val()    
//           });
//       })
//       console.log(expenses);
//     });
  

//   const expenses = [{
//      description: "Grocery",
//      note: "Grocery for January",
//      amount: 12500,
//      createdAt: 456788
//   },
//   {
//    description: "Electric Bill",
//    note: "Electricity for January",
//    amount: 20500,
//    createdAt: 456794
// }
// ]

// expenses.map((expense) => {
//     database.ref('expenses').push(expense);
// })



  //const notes = [{
  //    id: 12,
  //    title: 'First note',
  //    body: 'This is my first note' },
  //    {
  //      id: 13,
  //      title: 'Second note',
  //      body: 'This is my second note' }
  //  ]

 //   database.ref('notes').set(notes);
//   database.ref().on('value', (snapshot)=> {
//       const text = snapshot.val().name + " is a "+snapshot.val().job.title + " at "+snapshot.val().job.company;
//       console.log(text); 
//   });
  

//   setTimeout(() => {
//       database.ref().update({
//        'job/title' : 'Manager',
//        'job/company' : 'Google'});

//   },3500);

//   setTimeout(() => {
//     database.ref().off() ;
// },7000);

 



//    database.ref().set({
//        name: 'Daniel Grenier',
//        age: 26,
//        stressLevel: 6,
//        job:{
//            title: "Software Developer",
//            company: "Google"},
//        location: { 
//            city: 'Atlanta',
//            country: 'United States'
//        }
//    }).then(() => {
//        console.log('Data is Saved')
//    }).catch((e) => {
//        console.log("This failed. ",e)})
//   ;

// //const myRef = database.ref('issingle');
// //database.ref('issingle').set(null);

// database.ref().update({
//     stressLevel: 9,
//     'job/company': "Amazon",
//     'location/city': "Seattle"
// });
  

  