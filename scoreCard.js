// Get references to the HTML elements
const form = document.querySelector('form');
const scoreCardTable = document.querySelector('#scoreCard');
const winner = document.querySelector('#winner');

// Define variables to store the score card data
let courseName = '';
let numHoles = 0;
let players = [];

// Load the score card data from localStorage, if it exists
if (localStorage.getItem('scoreCardData')) {
    const scoreCardData = JSON.parse(localStorage.getItem('scoreCardData'));
    courseName = scoreCardData.courseName;
    numHoles = scoreCardData.numHoles;
    players = scoreCardData.players;
    displayScoreCard();
}

// Add event listener to the form
form.addEventListener('submit', startGame);


function startGame(event) {
    event.preventDefault();

    // Get the input values from the form
    courseName = form.elements.courseName.value;
    numHoles = parseInt(form.elements.numHoles.value);
    players = [
        { id: 1, name: form.elements.player1.value, scores: [] },
        { id: 2, name: form.elements.player2.value, scores: [] }
    ];
    if (form.elements.player3.value != '') {
        players.push({ id: 3, name: form.elements.player3.value, scores: [] });
    }
    if (form.elements.player4.value != '') {
        players.push({ id: 4, name: form.elements.player4.value, scores: [] });
    }

    // Save the score card data to localStorage
    const scoreCardData = { courseName, numHoles, players };
    localStorage.setItem('scoreCardData', JSON.stringify(scoreCardData));

    // Display the score card table
    displayScoreCard();
    $(".score").change(function () {
        player = $(this).attr("player");


    })

    $('.score').blur(function () {
        var sum = 0;
        player = $(this).attr("player");

        console.log(player);

        $(`input[player='${player}']`).each(function () {
            sum += Number($(this).val());
        });
        console.log(sum);

        $(`#player${player}Total`).html(sum);        
        // here, you have your sum
    });

}

function displayScoreCard() {
    // Add the course name and number of holes to the table
    var table =
      `
    <thead>
      <tr>
        <th>Hole</th>
        <th>Par</th>
  `;

    for (const player of players) {
        table += `<th>${player.name}</th>`;
    }
    table += `
      </tr>
    </thead>
    <tbody id="scoreCardBody">
  `;



    // Add a row for each hole to the table
    for (let i = 1; i <= numHoles; i++) {
        table += `
      <tr>
        <td>${i}</td>
        <td><input type="number" min="1" id="par${i}" name="par${i}"></td>
    `;
        for (const player of players) {
            table += `
        <td><input class="score" type="number" min="1" player="${player.id}"  id="${player.name}-hole${i}" name="${player.name}-hole${i}"></td>
      `;
        }
        table  += `
      </tr>
    `;
    }
    // Add the total scores for each player to the table
    table += `
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">Total</td>
        <td id="player1Total"></td>
        <td id="player2Total"></td>
        <td id="player3Total"></td>
        <td id="player4Total"></td>
      </tr>
      <tr>
        <td colspan="5" id="winner"></td>
      </tr>
    </tfoot>
  `;

    scoreCardTable.innerHTML = table;

}

    //// Add event listeners to the input fields for each hole
    //for (let i = 1; i <= numHoles; i++) {
    //    const parInput = document.querySelector(`#par${i}`);

    //}