function calElements() {
    var x = document.getElementById("LoginForm").elements.length;
    var y = document.getElementById("LoginForm").elements[0].value;
    document.getElementById("displayItems").innerHTML = "Total number of elements: " + x + " and value: " + y;
}