function test(){
alert("Test")
const express = require('express')
const Event = require('../models/events')
alert("Test233")
Event.find({}).then((events)=>{
    for(i=0;events[i];i++){
        // document.getElementById("eventId").innerHTML=events[i]
        console.log(events[i].email)
    }
    return events
}).catch((e)=>{
    console.log("Error!")
})
}