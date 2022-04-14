const fs = require("fs");
const path = require("path");
const cardsData = require("../data/cardsData");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const buildDir = path.join(__dirname, "../assets/s1-w2/metadata");
const ipfsURI =
  "ipfs://bafybeid5fgwexoaoco5i2gautghtzxd3n4nrsmundtqmjbh7atzdtemnr4";

const metadataList = [];

async function generateTestMetadata() {
  console.log("cardsData: ", cardsData);
  const dir = await fs.promises.opendir(
    path.join(__dirname, "../assets/s1-w2")
  );
  for await (const dirent of dir) {
    const edition = dirent.name.split(".")[0];
    addMetadata(edition);
    saveMetaDataSingleFile(edition);
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
}

// const addMetadata = (_dna, _edition) => {
const addMetadata = (_edition) => {
  // let dateTime = Date.now();
  let tempMetadata = {
    // dna: sha1(_dna.join("")),
    name: `ClubCard S1 W2 #${_edition}`,
    // description: description,
    video: `${ipfsURI}/${_edition}.mp4`,
    edition: "Series 1 Wave 2",
    // date: dateTime,
    attributes: [
      {
        display_type: "number",
        trait_type: "Points",
        value: generateRandomNumber(50, 500),
      },
    ],
    // attributes: attributesList,
  };
  metadataList.push(tempMetadata);
  attributesList = [];
};

const saveMetaDataSingleFile = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/${_editionCount}`,
    JSON.stringify(
      metadataList.find((meta) => meta.edition == _editionCount),
      null,
      2
    )
  );
};

const shuffle = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

// metadata.map((card) => {
//   const supply = card.supply;
//   delete card.supply;
//   for (let i = 0; i < supply; i++) {
//     nfts.push(card);
//   }
// });

// const createMetaData = () => {
//   fs.stat(`${buildDir}/all.json`, (err) => {
//     if(err == null || err.code === 'ENOENT') {
//       fs.writeFileSync(`${buildDir}/${metDataFile}`, JSON.stringify(metadata, null, 2));
//     } else {
//         console.log('Oh no, error: ', err.code);
//     }
//   });
// };

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

generateTestMetadata().catch(console.error);
