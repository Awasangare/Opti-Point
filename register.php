<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;port=3307;dbname=ma_base;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Connexion à la base de données échouée',
        'erreur' => $e->getMessage()
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (
    !isset($data['nomEntreprise']) ||
    !isset($data['email']) ||
    !isset($data['telephone'])
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Données incomplètes']);
    exit;
}

$stmt = $pdo->prepare('INSERT INTO inscriptions (nomEntreprise, email, telephone) VALUES (?, ?, ?)');
$success = $stmt->execute([
    $data['nomEntreprise'],
    $data['email'],
    $data['telephone']
]);

if ($success) {
    echo json_encode(['success' => true, 'message' => 'Inscription enregistrée']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'enregistrement']);
}