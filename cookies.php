<?php
    function setCookieFile($name, $value) {
        $date = time();

        $currentYear = date("Y");

        $september1st = strtotime("1 September $currentYear");
        $june30th = strtotime("30 June " . ($currentYear + 1));
        $august31st = strtotime("31 August $currentYear");

        if ($date >= $september1st && $date <= $june30th) {
            $expiry = $june30th;
        } else if ($date >= strtotime("30 June $currentYear") && $date <= $august31st) {
            $expiry = $august31st; 
        } else {
            $expiry = strtotime("30 June $currentYear");
        }

        setcookie($name, $value, $expiry, "/");
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_POST['cookieName']) && isset($_POST['cookieValue'])) {
            setCookieFile($_POST['cookieName'], $_POST['cookieValue']);
            echo "Zapisano plik cookie";
        }
    
        if (isset($_POST['get_cookies'])) {
            $cookiesData = [];
            foreach ($_COOKIE as $name => $value) {
                $cookiesData[$name] = $value;
            }
            echo json_encode($cookiesData);
        }
    }
?>