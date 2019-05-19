var queryBtn = document.getElementById("test");

// Pi = 4/1 - 4/3 + 4/5 - 4/7...

function clacPI(iterations){
    //const piVal = 3.14159
    let pi = 0, divisor = 1;
    for(i=0; i<= iterations; i++) {
        pi = pi + (4/divisor) - (4/divisor +2);
        divisor += 4;
    }
    document.getElementById("output1").value = pi.toFixed(10);
}


function returnQueryText(dateDiff) {
    var baseQuery = "| multisearch  " +
"\n[search (earliest=latestDate:00:00:00 latest=latestDate:latestTime ) index=test sourcetype=\"test-logs-gateway-activity\" Error1  ] " +
"\n[search (earliest=earliestDate:00:00:00 latest=earliestDate:latestTime ) index=test sourcetype=\"test-logs-gateway-activity\" Error1  ] " +
"\n| eval dateStr = \"HD_\" . strftime(_time, \"%Y%m%d\") " +
"\n| chart limit=200 count over actionStep by dateStr " +
"\n| `errorDeviation(\"HD_latestFormattedDate\",\"HD_earliestFormattedDate\")` " +
"\n| eval HD_latestFormattedDate_DIFF = HD_latestFormattedDate - HD_earliestFormattedDate"
    var curFullDate = new Date();

    var date = curFullDate.getDate() < 10 ? '0'+curFullDate.getDate() : curFullDate.getDate();
    var month = curFullDate.getMonth() < 9 ? '0'+(curFullDate.getMonth()+1) : curFullDate.getMonth()+1;
    var year = curFullDate.getFullYear();
    var hour = curFullDate.getHours() < 10 ? '0'+curFullDate.getHours() : curFullDate.getHours();
    var minute = curFullDate.getMinutes() < 10 ? '0'+curFullDate.getMinutes() : curFullDate.getMinutes();
    var second = curFullDate.getSeconds() < 10 ? '0'+curFullDate.getSeconds() : curFullDate.getSeconds();

    var latestDate = month + '/' + date + '/' + year;
    var latestFormattedDate = year + month + date;
    var latestTime = hour + ':' + minute + ':' + second;

    curFullDate.setDate(curFullDate.getDate()-dateDiff)

    var date = curFullDate.getDate() < 10 ? '0'+curFullDate.getDate() : curFullDate.getDate();
    var month = curFullDate.getMonth() < 9 ? '0'+(curFullDate.getMonth()+1) : curFullDate.getMonth()+1;
    var year = curFullDate.getFullYear();

    var earliestDate = month + '/' + date + '/' + year;
    var earliestFormattedDate = year + month + date;

    baseQuery = baseQuery.replace(new RegExp('latestDate','g'), latestDate);
    baseQuery = baseQuery.replace(new RegExp('latestFormattedDate','g'), latestFormattedDate);
    baseQuery = baseQuery.replace(new RegExp('latestTime','g'), latestTime);
    baseQuery = baseQuery.replace(new RegExp('earliestDate','g'), earliestDate);
    baseQuery = baseQuery.replace(new RegExp('earliestFormattedDate','g'), earliestFormattedDate);

    return baseQuery;
    //document.getElementById("output1").innerHTML = baseQuery;
    
}

function getQueryText(dateDiff) {
    document.getElementById("output1").value = '';
    document.getElementById("output1").value =  returnQueryText(dateDiff);
}

queryBtn.addEventListener("click", function () {
    if (document.getElementById("output1") != null) {
        if(document.getElementById("output1").value.startsWith('sqd1')) {
            document.getElementById("output1").value = returnQueryText(1);
        } else if (document.getElementById("output1").value.startsWith('sqd7')) {
            document.getElementById("output1").value = returnQueryText(7);
        }
    }
});

//getFibList

// 1,1,2,3,5,8,13,21,34,55

let fibList = [];

function getFibList(howMany) {
    for (i =0; i < howMany; i++) {
        fibList[i] = fib(i);
    }
    document.getElementById("output1").value = fibList.join(", ");
}


function fib(whichNum) {
    let num1 =1, num2=0, temp, i=0;
    while(i < whichNum) {
        temp = num1;
        num1 = num1 + num2;
        num2 = temp;
        i++;
    }
    return num2;
}

//madLibGenerator