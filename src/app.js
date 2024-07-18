const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [
  // Your contract ABI here
];

const consultingContract = new web3.eth.Contract(contractABI, contractAddress);

async function requestConsultation() {
  const accounts = await web3.eth.getAccounts();
  const description = document.getElementById('description').value;
  consultingContract.methods.requestConsultation(description).send({ from: accounts[0] })
    .on('receipt', function(receipt){
        console.log("Consultation requested", receipt);
    })
    .on('error', function(error){
        console.error("Error requesting consultation", error);
    });
}

async function completeConsultation() {
  const accounts = await web3.eth.getAccounts();
  const consultationId = document.getElementById('consultationId').value;
  consultingContract.methods.completeConsultation(consultationId).send({ from: accounts[0] })
    .on('receipt', function(receipt){
        console.log("Consultation completed", receipt);
    })
    .on('error', function(error){
        console.error("Error completing consultation", error);
    });
}
