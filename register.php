<?php
session_start();
$conn = new mysqli("localhost", "root", "", "skill_exchange_db");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = htmlspecialchars($_POST['fullName']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $department = htmlspecialchars($_POST['department']);
    $rawPassword = $_POST['password'];

    if (!preg_match("/^[a-zA-Z0-9._%+-]+@woxsen\.edu\.in$/", $email)) {
        die("Validation Error: Institutional @woxsen.edu.in email required.");
    }

    $passwordHash = password_hash($rawPassword, PASSWORD_BCRYPT, ['cost' => 10]);

    $stmt = $conn->prepare("INSERT INTO student (FullName, UniversityEmail, PasswordHash, AcademicDepartment) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullName, $email, $passwordHash, $department);

    if ($stmt->execute()) {
        $_SESSION['student_id'] = $stmt->insert_id;
        header("Location: index.html");
        exit();
    }
}
?>