/*jshint browser: true, node: true, jquery: true*/
var db = null;
var todos = [];
var lastID = null;

function createTable() {
    db = window.sqlitePlugin.openDatabase({
        name: "todo.db"
    });
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS todo (id integer primary key AUTOINCREMENT, data text)");

    }, function (err) {
        if (navigator.notification) {
            window.alert = function () {
                navigator.notification.alert(
                    "An error occurred while initializing the app",
                    null,
                    "ERROR",
                    'OK'
                );
            };
        }
    });
}

function loadTable() {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM todo", [], function (tx, res) {
            for (var i = 0; i < res.rows.length; i++) {
                todos.push({
                    id: res.rows.item(i).id,
                    data: res.rows.item(i).data
                });
                $("ul").append("<li class='table-view-cell'><span><i class='fa fa-trash'></i></span> " + todos[i].data + "</li>");
            }
            lastID = todos[todos.length - 1].id;
        });
    }, function (err) {
        alert("Error Loading: " + err);
    });
}


function deleteCommand(arrayID) {
    var dbID = todos[arrayID].id;
    if (arrayID > -1) {
        db.transaction(function (tx) {
            tx.executeSql("DELETE FROM todo WHERE id=(?);", [dbID], function (tx, res) {});

        }, function (err) {
            alert("Error delete: " + err);
        }, function () {
            todos.splice(arrayID, 1);
            if (todos.length) {
                var ind = todos.length;
                lastID = todos[ind].id;
            } else {
                lastID = none;
            }
        });

    } else {
        alert("There is something wrong with the IDs");
        return null;
    }

}


function insertCommand(text) {
    db.transaction(function (tx) {
        tx.executeSql("INSERT INTO todo (data) VALUES (?)", [text], function (tx, res) {

        });
    }, function (err) {
        alert("Error Insert: " + err);
    });
    lastID = lastID + 1;
    todos.push({
        id: lastID,
        data: text
    });
}
