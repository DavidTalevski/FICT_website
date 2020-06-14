<?php
if(!empty($_POST['delete'])){
    $file_pointer = $_POST['delete']."/image.jpg";
   
    // Use unlink() function to delete a file  
    if (!unlink($file_pointer)) {  
        echo ("$file_pointer cannot be deleted due to an error");  
    }  
    else {  
        echo ("$file_pointer has been deleted"); 
        rmdir($_POST['delete']); 
    }  
}

if (!empty($_POST['content'])) {
    file_put_contents("products.json", $_POST['content']);
    exit("<p>TXT file written successfully!</p>");
}
else {
    exit("<p>No text string submitted.</p>");
}

?>