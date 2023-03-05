var userID = "";
var userSecret = "";

var view;
var viewScript;
var picker;
var display;

$(function(){

    userID = sessionStorage.getItem('UID');
    hmacSecret = userSecret = sessionStorage.getItem('Key');

    window.onhashchange = () => { UpdateView(location.hash) }; 
    
    picker = new Picker("#picker", SelectionChanged);

    UpdateView(location.hash ? location.hash : '#TASK');    
})

function SelectionChanged(item)
{
    var div = $(".info-frame").load("TaskDisplay.html", () =>
    {
        display.Display(item.Data);
    });   
}

function UpdateView(name)
{
    view = name.toUpperCase();
    var url = "";
    var html = "";
    switch(view)
    {
        case "#TASK":  ;        
            $.get("TaskPickerItem.html", (html) => {
                picker.Load("https://localhost:44382/api/task", html, (div, task) => {
                    div.find('#task').text(task.taskID);
                    div.find('#description').text(task.description ? task.description : "");
                    div.find('#update').text(FormatTime(task.creationTime));

                    if(task.unread) div.addClass('unread');
                });
            });
            display = new TaskDisplay("#display");
            break;
        case "#USER":
            $.get("UserPickerItem.html", (html) => {
                picker.Load("https://localhost:44382/api/users", html, (div, user) => {
                    div.find('#userID').text(user.userID);
                    div.find('#email').text(user.email);
                    div.find('#group').text(user.groupID);
                });
            });
            display = new UserDisplay("#display");
            break;
    }
}

function LoadView(name)
{
    if(viewScript)
        document.head.removeChild(viewScript);
    
    viewScript = document.createElement("script");
    viewScript.src = name + ".js";
    document.head.appendChild(viewScript);
}

function OrderByUpdateTime(a, b)
{
    a = new Date(a.updateTime);
    b = new Date(b.updateTime);

    return a - b;
}

function OrderByStatus(a,b)
{
    return a.Status - b.Status;
}
