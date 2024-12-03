# Unstoppable Domains subdomain minter

Script designed to mass mint subdomains from your main domain [(Unstoppable Domains)](https://unstoppabledomains.com) on the Polygon network.

## Features

- **mass mint subdomains**

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- Main domain from [Unstoppable Domains](https://unstoppabledomains.com)
- A funded account on the Polygon network.

## Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/recitativonika/ud-sub-minter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ud-sub-minter
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Usage

1. Prepare configuration files:
    - edit `priv.txt` with your private key
        ```
        yourprivkey
        ```
    - edit `maindomain.txt` with your main Unstoppable Domain
        ```
        example.domain
        ```
    - edit `sub.txt` with list of subname of your domain that you want to mint, for example if you want to mint `sub1.example.domain` put `sub1` in the sub.txt
        ```
        subname1
        subname2
        subname3
        ```
      For above example, the script will mint `subname1.example.domain` `subname2.example.domain` and `subname3.example.domain`

2. run the script
    ```bash
   node index.js
    ```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Note
This script is for testing purposes only, I am not responsible for anything that happens with your account/wallet.
