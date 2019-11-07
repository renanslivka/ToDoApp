
function deleteTask(c)
{    
    var ajax = new XMLHttpRequest();       
    console.log(c);
    if (c == null)
    {
      alert("Eror id = null");
    }
    else{
    
        ajax.open("DELETE","test.php?id="+c, true);
        ajax.send();         
    }    
}

function putTask(c) {
    console.log(c);
    var t = $(".txtb").val();
    console.log(t);
    var ajax = new XMLHttpRequest();       
    if(c == null || t == null)
    {
      alert("Eror id = null or task = null");
    }
    else if(isNaN(c)){
        alert("Eror id is not number");    
    }
    else{     
        c = encodeURIComponent(c);
        t = encodeURIComponent(t);          
        ajax.open("PUT","test.php?id="+c+"&task="+t, true);       
        ajax.send();    
        getTask();    
    }
}

function postTask() {   
    var t = $(".txtb").val();
    var ajax = new XMLHttpRequest();   

    if (t == null)
    {
      alert("Eror task = null");
    }
    else{
        ajax.open("POST","test.php?task="+t, true);
        getTasks();
        console.log("1234");
        ajax.send();
    }
}


function RENAN_getTask(c)
{
    document.getElementById("data").innerHTML ="";
    var ajax = new XMLHttpRequest();         
    if (c == null || c == "")
    {                
        ajax.open("GET","test.php", true);            
    }
    else{
        ajax.open("GET","test.php?id="+c, true);
    }
        ajax.send();
    ajax.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            var data = JSON.parse(this.responseText);
            console.log(data);

            //alert(this.responseText);
                
           var html = "";
           
            for(var a = 0; a < data.length; a++)
            {                    
                var id = data[a].id;
                
                var task1 = $("<div class='task' id="+id+"></div>").text("id= "+id + "  task= "+data[a].task);
                var del = $("<i class='fas fa-trash-alt'></i>").click(function(){
                    var p = $(this).parent();
                    var d = $(this).parent().text();
                    var o = d.substring(3, 6);
                    p.fadeOut(function() {
                        p.remove();
                    deleteTask(o);
                    });                                         
                });

                var edit = $("<i class='fas fa-edit' id="+id+"></i>").click(function () {
                    var p = $(this).parent();
                    var d = $(this).parent().text();
                    var o = d.substring(3, 6);
                    putTask(o);
                });
                task1.append(del,edit);

                $(".notcomp").append(task1);
            }          
        }
    };
}