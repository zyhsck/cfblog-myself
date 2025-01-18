document.addEventListener('DOMContentLoaded', function() {
    // Get the current date
    var today = new Date();

    // Get the year
    var year = today.getFullYear();

    // Get the month (note: months start from 0, so add 1)
    var month = today.getMonth() + 1;
    if(month.toString().length == 1){
        month = "0" + month;
    }

    // Get the day
    var day = today.getDate();
    if(day.toString().length == 1){
        day = "0" + day;
    }

    // Get elements
    var clash_u1 = document.getElementById("clash_url1");
    var clash_u2 = document.getElementById("clash_url2");
    clash_u1.href = "https://www.freeclashnode.com/uploads/" + year + "/" + month + "/1-" + year + month + day + ".yaml";
    clash_u2.href = "https://www.freeclashnode.com/uploads/" + year + "/" + month + "/0-" + year + month + day + ".yaml";
    clash_u1.innerHTML = "https://www.freeclashnode.com/uploads/" + year + "/" + month + "/1-" + year + month + day + ".yaml";
    clash_u2.innerHTML = "https://www.freeclashnode.com/uploads/" + year + "/" + month + "/0-" + year + month + day + ".yaml";
});
