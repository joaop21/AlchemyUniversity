const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  const body = Date.now() % 2 === 0 ? inTheList() : notInTheList();

  console.log(`Verifying ${body.name} ...`);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, body);

  console.log({ gift });
}

function notInTheList() {
  return {
    name: "foo bar",
    proof: [
      {
        data: "44a11637716a257506d13337979aabaf58fd2ac6cb36253905571b519d2bfb22",
        left: true,
      },
      {
        data: "cf209348f7b2723e7f5937ccaef23f006515ba0a765ca96057cc689c11a8dc5c",
        left: false,
      },
    ],
  };
}

function inTheList() {
  const merkleTree = new MerkleTree(niceList);
  const index = Math.floor(Math.random() * niceList.length);
  return {
    name: niceList[index],
    proof: merkleTree.getProof(index),
  };
}

main();

