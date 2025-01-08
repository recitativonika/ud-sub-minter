const { ethers } = require('ethers');
const fs = require('fs');

const COLORS = {
  BOLD_YELLOW: '\x1b[1;33m',
  CYAN: '\x1b[36m',
  GREEN: '\x1b[32m',
  RESET: '\x1b[0m'
};

function centerAlignText(text, width) {
  const pad = Math.floor((width - text.length) / 2);
  return ' '.repeat(pad) + text + ' '.repeat(pad);
}

const consoleWidth = process.stdout.columns;

console.log("");
console.log(`${COLORS.BOLD_YELLOW}${centerAlignText("============================================", consoleWidth)}${COLORS.RESET}`);
console.log(`${COLORS.BOLD_YELLOW}${centerAlignText("Unstoppable Domains subdomain minter", consoleWidth)}${COLORS.RESET}`);
console.log(`${COLORS.BOLD_YELLOW}${centerAlignText("github.com/recitativonika", consoleWidth)}${COLORS.RESET}`);
console.log(`${COLORS.BOLD_YELLOW}${centerAlignText("============================================", consoleWidth)}${COLORS.RESET}`);
console.log("");

const privateKey = fs.readFileSync('priv.txt', 'utf8').trim();

const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com');

const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = '0x7be83293BeeDc9Eba1bd76c66A65F10F3efaeC26';
const contractABI = [
  {
    "constant": false,
    "inputs": [
      { "name": "address", "type": "address" },
      { "name": "subdomains", "type": "string[]" },
      { "name": "records1", "type": "string[]" },
      { "name": "records2", "type": "string[]" },
      { "name": "flag", "type": "bool" }
    ],
    "name": "issueWithRecords",
    "outputs": [],
    "type": "function"
  }
];
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function issueWithRecords() {
  const address = wallet.address;

  const mainDomain = fs.readFileSync('maindomain.txt', 'utf8').trim();
  const domainParts = mainDomain.split('.');

  if (domainParts.length < 2) {
    console.error('Invalid domain format in maindomain.txt');
    return;
  }

  const subContent = fs.readFileSync('sub.txt', 'utf8').trim();
  const subdomainsFromFile = subContent.split('\n').map(sub => sub.trim()).filter(sub => sub);

  if (subdomainsFromFile.length === 0) {
    console.error('No subdomains found in sub.txt');
    return;
  }

  const records1 = [];
  const records2 = [];
  const flag = false;

  for (const subdomain of subdomainsFromFile) {
    const subdomains = [subdomain, ...domainParts];
    console.log(`Attempting to mint subdomain: ${COLORS.CYAN}${subdomain}.${mainDomain}${COLORS.RESET}`);
    try {
      const tx = await contract.issueWithRecords(address, subdomains, records1, records2, flag);
      const receipt = await tx.wait();
      console.log(`${COLORS.GREEN}Successfully issued domain with records for subdomain: ${subdomain}${COLORS.RESET}`);
      console.log(`${COLORS.GREEN}Transaction hash: https://polygonscan.com/tx/${receipt.hash}${COLORS.RESET}`);
    } catch (error) {
      const reason = error.reason || 'Unknown error';
      console.error(`Failed to issue domain with records for subdomain: ${subdomain}. Reason: ${reason}`);
    }
  }
}

issueWithRecords();
