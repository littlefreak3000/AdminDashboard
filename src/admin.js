var userPicker;
var taskPicker;
var taskSort;
var display;

$(() => {

    userID = sessionStorage.getItem('UID');
    hmacSecret = userSecret = sessionStorage.getItem('Key');

    title = document.getElementById("picker-title");

    userPicker = document.getElementById("user-picker");
    userPicker.addEventListener("SelectionChange", UserChanged);
    userPicker.Load("users", UserPicker, { sort: "groupID" });

    taskPicker = document.getElementById("task-picker");
    taskPicker.addEventListener("SelectionChange", TaskChanged);

    display = document.getElementById("display");

    onClickAll("user-sort", sortUsers);
    onClickAll("task-sort", sortTasks);

    $('#nav-users').tooltip({delay: 1000, title: 'Users', placement: 'right',  boundary: 'viewport'});
    $('#nav-tasks').tooltip({delay: 1000, title: 'Tasks', placement: 'right',  boundary: 'viewport'});
    $('#nav-groups').tooltip({delay: 1000, title: 'Groups', placement: 'right',  boundary: 'viewport'});
    $('#nav-logs').tooltip({delay: 1000, title: 'Logs', placement: 'right',  boundary: 'viewport'});
});

function logOut() {
    window.location = "index.html";
}

function loadUsers(path = "users", text = "USERS") {
    $("#task-picker").collapse('hide');
    $("#user-picker").collapse('show');

    title.innerText = text;

    userPicker.Load(path, UserPicker, { sort: "groupID" });
}

function loadTasks(path = "tasks", text = "TASKS") {
    $("#task-picker").collapse('show');
    $("#user-picker").collapse('hide');

    title.innerText = text;

    taskPicker.Load(path, TaskPicker, { sort: "taskID", desc: true });
}

function onClickAll(cls, event) {
    var sorts = document.getElementsByClassName(cls);
    for (let sort of sorts) {
        sort.onclick = event;
    }
}

function sortUsers() {
    document.querySelector(".user-sort.active").classList.remove("active");
    this.classList.add("active");
    userPicker.Update({ sort: this.dataset.sort, desc: this.dataset.desc })
}

function sortTasks() {
    document.querySelector(".task-sort.active").classList.remove("active");
    this.classList.add("active");
    taskPicker.Update({ sort: this.dataset.sort, desc: this.dataset.desc })
}

function UserChanged(e) {
    loadTasks(`tasks/${e.detail.id}`, `TASKS - ${e.detail.email}`);
    display.Load(`users/${e.detail.id}`, "UserDisplay.html", UserDisplay);
}

function UserPicker(item) {
    item.querySelector("#name").innerText = item.Data.firstName + ' ' + item.Data.lastName;
    item.querySelector("#email").innerText = item.Data.email;
    item.querySelector("#update").innerText = FormatTime(item.Data.updateTime);
    item.querySelector("#group").innerText = item.Data.group.name;
}

function UserDisplay(item) {
    item.querySelector("#name").innerText = item.data.firstName + " " + item.data.lastName;
    item.querySelector("#email").innerText = item.data.email;
    item.querySelector("#email").href = "mailto:" + item.data.email;
    item.querySelector("#update").innerText = FormatTime(item.data.updateTime);
    item.querySelector("#phone").innerText = item.data.phone;
    item.querySelector("#routing").innerText = item.data.routing;

    let g = item.querySelector("#group-display");
    g.data = item.data.group;
    GroupDisplay(g);

    // Show only 1 Modal at a time
    $(".modal").on("show.bs.modal", () => {
        $(".show").modal("hide");
    });

    $("#new-group").on("hide.bs.modal", () => {
        $("#change-group").modal('show');
    });

    // CHANGE GROUP DIALOG
    $("#change-group").on("show.bs.modal", () => {
        var gp = document.getElementById("group-picker");
        gp.Load('groups', GroupDisplay);

        item.querySelector('#save-changes').onclick = () => {
            item.data.group = gp.SelectedItem.Data;
            item.data.groupID = gp.SelectedItem.Data.groupID;

            PUT(`users/${item.data.userID}`, item.data, () => {
                display.Load(`users/${item.data.userID}`, "UserDisplay.html", UserDisplay);
            });
        };
    });

    // NEW GROUP DIALOG
    $("#new-group").on("show.bs.modal", () => {
        item.querySelector("#add").onclick = AddRight;
        item.querySelector("#remove").onclick = RemoveRight;

        document.getElementById("removed-picker").Load("rights", (r) => {
            r.querySelector("#name").innerText = r.data.name;
            r.querySelector("#description").innerText = r.data.description;
        });

        item.querySelector('#create-group').onclick = () => {
            item.querySelector('#create-group').disabled = true;

            var newgroup = {
                name: item.querySelector("#new-name").value,
                description: item.querySelector("#new-description").value
            }

            var items = item.querySelector("#added-picker").items;
            newgroup.rights = items.map((i) => {
                return { rightID: i.data.rightID }
            });

            POST('groups', newgroup, () => {
                $("#new-group").modal("hide");
                item.querySelector('#create-group').disabled = false;
            });
        };
    });
}

function AddRight() {
    let item = document.getElementById("removed-picker").Remove();
    document.getElementById("added-picker").Add(item);
}

function RemoveRight() {
    let item = document.getElementById("added-picker").Remove();
    document.getElementById("removed-picker").Add(item);
}

function GroupDisplay(item) {
    item.querySelector("#group").innerText = item.data.name + (item.data.description ? " - " + item.data.description : "");

    let rights = item.querySelector("#rights");
    item.data.rights.forEach((gr) => {
        let div = document.createElement("DIV");
        div.classList.add("row");
        div.innerHTML = `<div class='col-2'>${gr.name}</div><div class='col'>${gr.description}</div>`;
        rights.appendChild(div)
    });
}

function TaskChanged(item) {
    display.Load(`task/${item.detail.id}`, "TaskDisplay.html", TaskDisplay);
}

function TaskPicker(item) {
    item.querySelector('#task').innerText = item.Data.id;
    item.querySelector('#description').innerText = item.Data.description ? item.Data.description : "";
    item.querySelector('#update').innerText = FormatTime(item.Data.updateTime);
    item.querySelector('#status').innerText = item.Data.status;

    if (item.Data.unread) item.classList.add('unread');
}

function TaskDisplay(item) {
    var tProcess = loadTemplate("#processTemplate");
    var tFilter = loadTemplate("#filterTemplate");
    //var tJob = loadTemplate("#jobTemplate", "tbody");

    item.querySelector('#title').innerText = item.data.id + (item.data.description ? " - " + item.data.description : "")
    item.querySelector('#creation').innerText = FormatTime(item.data.updateTime);
    item.querySelector('#time').innerText = DTStr(item.data.startTime) + ' - ' + DTStr(item.data.endTime);

    var content = item.querySelector('#content')

    item.data.processes.forEach(p => {
        var proc = tProcess.cloneNode(true);

        content.appendChild(proc);

        proc.querySelector('#type').innerText = PROCCESS_TYPE[p.type];

        var filters = proc.querySelector('#filters');
        var jobs = proc.querySelector('#jobs');

        p.filters.forEach(f => {
            var div = tFilter.cloneNode(true);

            if (f.type < 7) {
                div.querySelector('#key').innerText = FILTER_TYPE[f.type];
                div.querySelector('#value').innerText = f.value;
            }
            else {
                var kv = f.value.split('|');
                div.querySelector('#key').innerText = kv[0];
                div.querySelector('#value').innerText = kv[1];
            }

            filters.appendChild(div);
        });

        var jPicker = proc.querySelector('#job-picker');
        jPicker.Load(`jobs/${p.id}`, (item) => {

            item.querySelector('#start').innerText = DTStr(item.data.startTime);
            item.querySelector('#end').innerText = DTStr(item.data.endTime);
            item.querySelector('#schedule').innerText = item.data.schedule;
            item.querySelector('#update').innerText = DTStr(item.data.updateTime);

            switch (item.data.status) {
                case 1:
                    item.classList.add('running');
                    break;
                case 2:
                    item.classList.add('error');
                    break;
                case 3:
                    item.classList.add('complete');
                    break;
            }
        },
            {
                filter: j => j.status > 0
            }
        );

        // p.jobs.forEach(j => {
        //     if (j.status != 0) {
        //         var row = tJob.cloneNode(true);

        //         row.querySelector('#start').innerText = j.startTime;
        //         row.querySelector('#end').innerText = j.endTime;
        //         row.querySelector('#schedule').innerText = j.schedule;
        //         row.querySelector('#status').innerText = j.status;
        //         row.querySelector('#update').innerText = j.updateTime;
        //         row.querySelector('#comment').innerText = j.comment;

        //         if (j.status == 2)
        //             row.classList.add('table-danger');
        //         else if (j.status == 3)
        //             row.classList.add('table-success');

        //         row.click = (e) => {
        //             //PATCH(`jobs/${j.jobID}`)
        //         };

        //         jobs.appendChild(row);
        //     }
        // });
    });
}