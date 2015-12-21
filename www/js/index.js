var dbUp = false;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    createTable();
    loadTable();
}

//Check off todos
$("ul").on("touchstart", "li", function () { //when a li is clicked inside a ul. necessary for dynamicly added elements same for delete function
    $(this).toggleClass("selected");
    $(this).children("span").toggleClass("delete");
});

$("ul").on("touchstart", "span", function () { //on click of a span within a ul, run this event
    var test = $(this).parent().index();
    deleteCommand(test); //da alle elemente wieder geladen werden entspricht das n-te element auch dem todos array index in storage

    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });

    event.stopPropagation();
});


$("div").on("touchstart", "#plus", function (e) {
    e.stopPropagation();
    var todoText = $("input[type='text']").val();
    if (todoText !== "") {
        $("input[type='text']").val("");
        $("ul").append("<li class='table-view-cell'><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
        insertCommand(todoText);
    } else {
        alert("Please enter text!");
    }
});
