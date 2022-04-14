const fs = require("fs");
const path = require("path");
const { cardsData } = require("../data/cardsData");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const buildDir = path.join(__dirname, "../assets/s1-w2/metadata");
const ipfsURI = "ipfs://Qmb7F4JpKF2cdq5JCHvyvjLnMouAixasiz4XqBchgmJwY9";

// QmatXMb9igwmEK8dyjGvwksfcovKG1ieJ9aj11iSgYNRUd;
const unlockableURI =
  "https://gateway.pinata.cloud/ipfs/QmatXMb9igwmEK8dyjGvwksfcovKG1ieJ9aj11iSgYNRUd";

const points = {
  COMMON: 10,
  RARE: 40,
  LEGENDARY: 100,
  DERIVATIVE: 110,
};

const metadataList = [];

const saveMetaDataSingleFile = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/${_editionCount}`,
    JSON.stringify(
      indexedMetadata.find((meta) => meta.tokenId == _editionCount),
      null,
      2
    )
  );
};

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
};

cardsData.map((card, index) => {
  const supply = card.supply;
  const video = card.video;
  delete card.supply;
  delete card.video;
  const id = index + 1;

  const attributes = [
    ...Object.entries(card).map(([key, value]) => ({
      trait_type: key,
      value,
    })),
    {
      display_type: "number",
      trait_type: "Points",
      value: points[card.type],
    },
    {
      display_type: "number",
      trait_type: "Wave",
      value: 2,
    },
  ];

  for (let i = 0; i < supply; i++) {
    metadataList.push({
      // tokenId: id + i,
      // name: `Club Cards ${id + i}`,
      animation_url: `${ipfsURI}/${video}`,
      attributes,
      locked: unlockableURI,
    });
  }
});

const shuffle = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const shuffledMetadataList = shuffle(metadataList);

const indexedMetadata = shuffledMetadataList.map((card, index) => ({
  tokenId: index + 1,
  name: `Club Cards Series 1 ${index + 1}`,
  ...card,
}));

writeMetaData(JSON.stringify(indexedMetadata, null, 2));

indexedMetadata.forEach((card, index) => saveMetaDataSingleFile(index + 1));

// shuffledMetadataList.forEach((card, index) => {
//   saveMetaDataSingleFile(index + 1);
// });
