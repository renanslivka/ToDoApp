<?php



	$conn = mysqli_connect("localhost", "root", "", "todo");
	//$result = mysqli_query($conn, "SELECT * FROM tasks");
	$method = $_SERVER['REQUEST_METHOD'];

	switch($method) {
		case 'PUT':
		if (isset($_REQUEST['id']) && isset($_REQUEST['data']) && isset($_REQUEST['category'])){

			$id = $_REQUEST['id'];	
			$task = $_REQUEST['data'];	
			$category = $_REQUEST['category'];	

			mysqli_query($conn,"UPDATE tasks SET task=('$task') WHERE id=$id");
			$result = mysqli_query($conn, "SELECT * FROM tasks WHERE category='$category'");			
			$data = array();
			while ($row = mysqli_fetch_object($result))
			{
			    array_push($data, $row);
			}
			echo json_encode($data);		
		}else{
			echo "string";
		}

		break;
		
		case 'POST':
			if (isset($_POST['data'])) {					
				$task = $_POST['data'];	
				$category = $_POST['category'];	
				mysqli_query($conn,"INSERT INTO tasks (task , category) VALUES ('$task','$category')");
				$result = mysqli_query($conn, "SELECT * FROM tasks WHERE category='$category'");			
				$data = array();
				while ($row = mysqli_fetch_object($result))
				{
				    array_push($data, $row);
				}
				echo json_encode($data);	
			}
			
		break;

		case 'DELETE':
			
			if (isset($_REQUEST['id']))
			{
				$id = $_REQUEST['id'];	
				mysqli_query($conn,"DELETE FROM tasks WHERE id=$id");	
			
				$category = $_REQUEST['category'];
		$result = mysqli_query($conn, "SELECT * FROM tasks WHERE category='$category'");
				$data = array();
				while ($row = mysqli_fetch_object($result))
				{
				    array_push($data, $row);
				}
				echo json_encode($data);	
			}else{
				echo "string";
			}				
			
			break;

		case 'GET':
			/*if (isset($_GET['id'])) {
				$id = $_GET['id'];	
				$result = mysqli_query($conn,"SELECT * FROM tasks WHERE id=$id");
			}
			else{*/
				$category = $_REQUEST['category'];
		$result = mysqli_query($conn, "SELECT * FROM tasks WHERE category='$category'");			
			//}
			$data = array();
			while ($row = mysqli_fetch_object($result))
			{
			    array_push($data, $row);
			}
			echo json_encode($data);										
			
			break;	
	}
?>
