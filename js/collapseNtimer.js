var interval
var seconds = 0o0
var tens = 0o0
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
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