<?php
include 'database.php'; // Dołącz plik z połączeniem do bazy danych

// Funkcja do generowania tokenu
function generateToken($email) {
    global $conn;
    $char = "123abcde.fmnopqlABCDE@FJKLMNOPQRSTUVWXYZ456789stuvwxyz0!#$%&ijkrgh'*+-/=?^_${'`'}{|}~";
    $token = '';

    for ($i = 0; $i < strlen($email); $i++) {
        $index = strpos($char, $email[$i]) !== false ? strpos($char, $email[$i]) : strlen($char) / 2;
        $randomIndex = mt_rand(0, $index - 1);
        $token .= $char[$randomIndex] . $char[$index - $randomIndex];
    }

    return $token;
}

// Przykład użycia generowania tokenu na podstawie emaila użytkownika
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['email'])) {
        $email = $data['email'];

        // Przygotuj zapytanie do bazy danych
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $row['authToken'] = generateToken($email);
            echo json_encode($row);
        } else {
            echo json_encode(["alert" => "Brak użytkownika"]);
        }
    }
}
?>
