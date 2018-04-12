const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


function getDetails(id, value, ref)
{
    const data = value;
    const sensor = id;
    return{
        status: data.status,
        start: data.start
    };

}



exports.pushTransaction = functions.database.ref('/Sensors/{id}').onUpdate(event=>{

    console.log(event.data);
    console.log("inside function");
    const rootRef = event.data.ref.parent.parent;
    const countRef = rootRef.child('count');
    
    console.log(event.data);

    const values = getDetails(event.params.id, event.data.val(), event.data.ref);
    console.log(values);




});



// Inside Sensor.....{id}.....if status is now 1,....increment count......if 0 decrement count
