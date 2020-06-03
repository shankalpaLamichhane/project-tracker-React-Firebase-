const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.database();

class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'UnauthenticatedError';
    }
}

class NotAnAdminError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'NotAnAdminError';
    }
}

class InvalidRoleError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.type = 'InvalidRoleError';
    }
}

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.createUser = functions.https.onCall(async (data, context) => {

    try {

        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can create new users.');
        }

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        if (!callerUserRecord.customClaims.admin) {
            throw new NotAnAdminError('Only Admin users can create new users.');
        }

        const newUser = {
            email: data.email,
            password: data.password,
            displayName: data.displayName,
        }

        const userRecord = await admin
            .auth()
            .createUser(newUser);

        const userId = userRecord.uid;

        const role = 'user';
        const claims = {};
        claims[role] = true;

        await admin.auth().setCustomUserClaims(userId, claims);

                
        const userRef = db.ref().child("users"); 
        await userRef.child(userId)
        .set({
            displayName: data.displayName,
            userType: 2
        })             

        return { result: 'The new user has been successfully created.' };


    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }

    }

});

exports.updateUser = functions.https.onCall(async (data, context) => {

    try {

        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can update users.');
        }

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        if (!callerUserRecord.customClaims.admin) {
            throw new NotAnAdminError('Only Admin users can update users.');
        }

        const userData = data.password ? {
            email: data.email,
            password: data.password,
            displayName: data.displayName
        } :
        {
            email: data.email,
            displayName: data.displayName,
        };

        const userRecord = await admin
            .auth()
            .updateUser(data.id, userData);

        const userId = userRecord.uid;
            
        const userRef = db.ref().child("users"); 
        await userRef.child(userId)
        .update({
            displayName: data.displayName,
            userType: 2
        })             

        return { result: 'The user has been successfully updated.' };


    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }

    }

});

exports.deleteUser = functions.https.onCall(async (data, context) => {

    try {

        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can update users.');
        }

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        if (!callerUserRecord.customClaims.admin) {
            throw new NotAnAdminError('Only Admin users can update users.');
        }

        const userRecord = await admin
            .auth()
            .deleteUser(data.uid);
            
        const userRef = db.ref().child("users"); 
        await userRef.child(data.uid)
        .remove()             

        return { result: 'The user has been successfully deleted.' };


    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }

    }

});

function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    userList = [];
    admin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        userList.push(userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
    console.log(userList)
    return userList;
}

exports.getUser = functions.https.onCall(async (data, context) => {
    try {

        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can update users.');
        }

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        if (!callerUserRecord.customClaims.admin) {
            throw new NotAnAdminError('Only Admin users can update users.');
        }
        
        const userRecord = await admin.auth().getUser(data.uid);           

        return { userRecord };


    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }

    }
});


function mapUser(user) {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime
    }
}

exports.listUser = functions.https.onCall(async (data, context) => {
    

    try {

        //Checking that the user calling the Cloud Function is authenticated
        if (!context.auth) {
            throw new UnauthenticatedError('The user is not authenticated. Only authenticated Admin users can update users.');
        }

        //Checking that the user calling the Cloud Function is an Admin user
        const callerUid = context.auth.uid;  //uid of the user calling the Cloud Function
        const callerUserRecord = await admin.auth().getUser(callerUid);
        if (!callerUserRecord.customClaims.admin) {
            throw new NotAnAdminError('Only Admin users can update users.');
        }
        
        const listUsers = await admin.auth().listUsers();
        const users = listUsers.users.map(mapUser);

        return {users};            
    } catch (error) {

        if (error.type === 'UnauthenticatedError') {
            throw new functions.https.HttpsError('unauthenticated', error.message);
        } else if (error.type === 'NotAnAdminError' || error.type === 'InvalidRoleError') {
            throw new functions.https.HttpsError('failed-precondition', error.message);
        } else {
            throw new functions.https.HttpsError('internal', error.message);
        }

    }

});

  
