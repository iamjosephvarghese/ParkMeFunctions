const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


function getDetails(id,value,ref)
{
    const sensor = id;
    return{
        status: data.status,
        start: data.start
    };

}



exports.pushTransaction = functions.database.ref('/Sensors/{id}').onUpdate(event=>{
    const rootRef = event.data.ref.parent.parent;
    const countRef = rootRef.child('count');
    

    const values = getDetails(event.params.id, event.data.val(), event.data.ref);
  console.log(values);


});