<?php

function responseEmail($error, $mensaje, $adicional)
{
    $respuesta = array('error' => false, 
                       'mensaje' => 'Mensaje enviado correctamente', 
                       'tecnico' => '');

    if ($error) {
        $respuesta['error'] = true;
        
        isset($mensaje)
        ? $respuesta['mensaje'] = $mensaje
        : $respuesta['mensaje'] = 'No se pudo enviar el mensaje';

        if (isset($adicional)) {
            $respuesta['tecnico'] = $adicional;
        }
    }

    echo json_encode($respuesta);
}


function sendMail()
{
    $to         = 'holamundo@anclajemedia.com.mx';
    $from       = $_POST['email'];

    $nombre     = $_POST['nombre'];
    $asunto     = $_POST['asunto'];
    $mensaje    = $nombre . " " . " escribió lo siguiente:" . "\n\n" . $_POST['mensaje'];

    //
    // Headers
    $headers    = "MIME-Version: 1.0" . "\r\n";
    $headers    .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers    .= 'From: ' . $from . "\r\n" .
        'Reply-To: ' . $from . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    //
    // Guards
    if (empty($from)) return responseEmail(true, 'No se ha proporcionado un email', null);

    try {
        mail($to, $asunto, $mensaje, $headers)
            ? responseEmail(false, null, null)
            : responseEmail(true, null, null);
    } catch (Exception $e) {
        return responseEmail(true, null, $e->getMessage());
    }
}

sendMail();
