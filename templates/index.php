<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversions</title>
    <link rel="stylesheet" href="../static/css/output.css">
    <script type="module" src="../static/js/binary.mjs"></script>
    <script type="module" src="../static/js/decimal.mjs"></script>
</head>
<body><!-- Header -->
<header class="bg-blue-500 text-white p-4 flex justify-center">
    <div class="outline w-7 mx-7 transform transition duration-500 ease-in-out hover:scale-110 hover:translate-y-1">1</div>
    <div class="outline w-7 mx-7 transform transition duration-500 ease-in-out hover:scale-110 hover:translate-y-1">2</div>
</header>

<!-- Content -->
<main class="p-4">
    <!-- Your content goes here -->
    <h2>Binary Input</h2>

    <label for="binaryInput">Enter a binary number:</label>
    <input type="text" id="binaryInput" oninput="updateOutput()">

    <p>Output:</p>

    <p id="output"></p>


    <script type="module">
        import { binaryToDecimal } from '../static/js/binary.mjs';

        window.updateOutput = function() {
            let binary = document.getElementById('binaryInput').value;
            document.getElementById('output').innerHTML = binaryToDecimal(binary);
        };
    </script>
    <br>
    <h2>Decimal Input</h2>

    <label for="decimalInput">Enter a decimal number:</label>
    <input type="text" id="decimalInput" oninput="updateOutput1()">

    <p>Output:</p>

    <p id="output1"></p>

    <script type="module">
        import { decimalToBinary } from '../static/js/decimal.mjs';

        window.updateOutput1 = function() {
            let decimal = document.getElementById('decimalInput').value;
            document.getElementById('output1').innerHTML = decimalToBinary(decimal);
        };
    </script>
</main>

<!-- Footer -->
<footer class="fixed bottom-0 w-full bg-blue-500 text-white p-4">
    <p class="text-center">Jian &copy;2024</p>
</footer>


</body>
</html>
