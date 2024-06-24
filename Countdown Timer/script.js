const days = document.getElementById("days");
const hours = document.getElementById("hours");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");


const formatTime =(time) =>{
    return time<10? `0${time}` : time;
}
const updateCountDown =(deadline) =>{
    const currentTime = new Date();
    const timeDiff = deadline - currentTime; //in millisecs
    // Calculate days, hours , mins and secs from timediff
 let calSecs = Math.floor(timeDiff/1000) % 60;
 let calMins = Math.floor(timeDiff/1000/60) % 60;
 let calHours = Math.floor(timeDiff/1000/60/60) % 24;
 let calDays = Math.floor(timeDiff/1000/60/60/24);
 
 days.textContent = formatTime(calDays);
 hours.textContent = formatTime(calHours);
 mins.textContent = formatTime(calMins);
 secs.textContent = formatTime(calSecs);
}

const countDown = (target) =>{
    setInterval(()=> updateCountDown(target), 1000);
}

const target = new Date("April 07 2024");
countDown(target);