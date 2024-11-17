let web3;
let contract;

// Replace with your contract address and ABI
const contractAddress = "0x8ebb2109478480d5312ceff45c0a4c5a90fc82c9";
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_choice",
				"type": "string"
			}
		],
		"name": "play",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "gameHistory",
		"outputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "enum RockPaperScissors.Choice",
				"name": "playerChoice",
				"type": "uint8"
			},
			{
				"internalType": "enum RockPaperScissors.Choice",
				"name": "computerChoice",
				"type": "uint8"
			},
			{
				"internalType": "enum RockPaperScissors.Result",
				"name": "result",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGameHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "player",
						"type": "address"
					},
					{
						"internalType": "enum RockPaperScissors.Choice",
						"name": "playerChoice",
						"type": "uint8"
					},
					{
						"internalType": "enum RockPaperScissors.Choice",
						"name": "computerChoice",
						"type": "uint8"
					},
					{
						"internalType": "enum RockPaperScissors.Result",
						"name": "result",
						"type": "uint8"
					}
				],
				"internalType": "struct RockPaperScissors.Game[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(abi, contractAddress);
    } else {
        alert('MetaMask is required!');
    }
});

async function play(choice) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.play(choice).send({ from: accounts[0] });
        alert("Move sent to the smart contract!");
        displayHistory();
    } catch (error) {
        console.error("Error playing the game:", error);
    }
}

async function displayHistory() {
    try {
        const history = await contract.methods.getGameHistory().call();
        const historyList = document.getElementById("history");
        historyList.innerHTML = "";
        history.forEach(game => {
            const listItem = document.createElement("li");
            listItem.textContent = `Player: ${game.player}, Choice: ${game.playerChoice}, Computer: ${game.computerChoice}, Result: ${game.result}`;
            historyList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching game history:", error);
    }
}
