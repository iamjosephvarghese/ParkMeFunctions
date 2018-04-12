const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


function getDetails(id, value, ref)
{
    const data = value;
    const sensor = id;
    return {
        status: data.status,
        start: data.start
    };
}



exports.pushTransaction = functions.database.ref('/Sensors/{id}/status').onUpdate(change=>{
    const rootRef = change.after.ref.parent.parent;
    const status = change.after.val();
    const countRef = rootRef.child('count');
    let increment = 0;
    if(status===0) {
        increment = -1;
    } else if(status === 1) {
        increment = 1;
    }
    return countRef.transaction((current)=>{
        return (current||0)+increment;
    });
});



// Inside Sensor.....{id}.....if status is now 1,....increment count......if 0 decrement count
