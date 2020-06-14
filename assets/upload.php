<?php

$filename = $_POST['name'];
// Da se kreira folderot ako ne postoi
if (!file_exists($filename)) {
    mkdir($filename, 0777, true);
}
// Lokacija za da se zapishi slikata
$location = $filename."/image.jpg";
$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

// Da funkcionira so slednite ekstenzi
$valid_extensions = array("jpg","jpeg","png");
if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
   $uploadOk = 0;
}

if($uploadOk == 0){
   echo 0;
}else{
   if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
      echo $location;
   }else{
      echo 0;
   }
}