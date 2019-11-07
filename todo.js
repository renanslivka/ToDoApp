
$(document).ready(function(){	
	$("#taskTitle").text('shopping');
	runApp("shopping");
});

$("#shopping").on('click', function(event) {
	$("#taskTitle").text('shopping');
	runApp("shopping");
});

$("#Work").on('click', function(event) {
	$("#taskTitle").text('Work');
	runApp("Work");
});

$("#Grocery").on('click', function(event) {
	$("#taskTitle").text('Grocery');
	runApp("Grocery");
});
		
$("#txtb").on("keyup",function(e)
{	
	if (e.keyCode == 13 && $("#txtb").val() != "") 
	{
		var input = $("#txtb").val();		
		console.log(input);
		var category = $(".mySelect option:selected").text();
		console.log(category);
		var api = new ApiService;
		api.createTask(input,category).then(function(tasks){
			$("#txtb").val('');
			$("#taskTitle").text(category);
			printTasks(tasks);
		});
	}	
});

function HttpService(type = "GET",data = null,id = null, category = null){
	if (id == null) {
		var url = "test.php";
	}
	else{
		if (data != null) {
			var url = "test.php?id="+id+"&data="+data+"&category="+category;	
			console.log(category);			
			console.log(data);			
			console.log(id);			
		}
		else{
			var url = "test.php?id="+id+"&category="+category;
		}
	}
	return $.ajax({
		url: url,
		type: type,
		dataType: 'json',
		data: {
			'data' : data,
			'category' : category,
			'id' : id
		}
	})
	.done(function(res) {
		console.log("success",res);
		return res;
	})
	.fail(function(err) {
		console.log("error",err);
		throw err;
	});
}

function runApp(category){
	var api = new ApiService;
	api.getTasks(category).then(function(tasks){
		printTasks(tasks);
	});
}



function printTasks(tasks){
	$(".notcomp").html("");
	console.log("tasks",tasks)
	for (var i = tasks.length - 1; i >= 0; i--) {
		$(".notcomp").append(TaskRow(tasks[i]));
	}
}

function TaskRow(data){
	var edit = $(`<i class='fas fa-edit' id="${data.id}"></i>`).click(function()
			{
                var api = new ApiService;
        		var input = $("#txtb").val();   
        		var category = $("#taskTitle").text();     		
        		api.updateTask(input,`${data.id}`,category).then(function(tasks){
					printTasks(tasks);
				});
            });

	var del = $(`<i class='fas fa-trash-alt'  id="${data.id}"></i>`).click(function()
			{
                var p = $(this).parent();
                var api = new ApiService;
                var category = $("#taskTitle").text();     		
                p.fadeOut(function()
                {
            	   	p.remove();
            	   	console.log(`${data.id}` + " " + category);
            		api.deleteTask(`${data.id}`,category);
            	});                                         
            });
	var taskRow = $(`<div class='task' id="${data.id}">${data.task}</div>`);
	taskRow.append(del,edit);
	return  taskRow;
}

function ApiService(type,data){
	return {
		getTasks: function (category){
			return HttpService("GET",null,null,category)
		},
		getTask: function (id){
			return HttpService("GET",{id:id})
		},
		createTask: function(task,category){
			return HttpService("POST",task,null,category)
		},
		updateTask: function(task,id,category){
			return HttpService("PUT",task,id,category)
		},
		deleteTask: function(id,category){
			return HttpService("DELETE",null,id,category)
		}
	}
}

