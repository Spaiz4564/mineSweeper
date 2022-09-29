var interval
var seconds = 0o0
var tens = 0o0


function resetTimer() {
    var outputSeconds = document.getElementById('seconds')
    var outputTens = document.getElementById('tens')
    clearInterval(interval)
    clearInterval(startTime)
    interval = null
    seconds = 0o0
    tens = 0o0
    outputSeconds.innerHTML = "0" + '0'
    outputTens.innerHTML = "0" + '0'
}

function collapse(item) {
    var coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        item.classList.toggle("active");
        var content = item.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
            document.querySelector('.expand').style.transform = "rotate(90deg)"
        } else {
            content.style.display = "block";
            document.querySelector('.expand').style.transform = "rotate(270deg)"
        }
    }
    for (let i = 0; i < coll.length; i++) {
        item.classList.toggle("active");
        var content = item.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
}

function startTime() {
    var outputSeconds = document.getElementById('seconds')
    var outputTens = document.getElementById('tens')
    tens++
    if (tens <= 9) outputTens.innerHTML = "0" + tens;

    if (tens > 9) outputTens.innerHTML = tens

    if (tens > 99) {
        seconds++
        outputSeconds.innerHTML = "0" + seconds
        tens = 0
        outputTens.innerHTML = "0" + tens
    }

    if (seconds > 9)
        outputSeconds.innerHTML = seconds

}