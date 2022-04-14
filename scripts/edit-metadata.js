const fs = require("fs");
const path = require("path");
const { metadata } = require("../assets/s1-w2/metadata/_metadata-source");
const metadataDir = path.join(
  __dirname,
  "../assets/s1-w2/metadata/updated-metadata"
);

const ipfsHash = "QmQFUYcdiidqeMmWtFmS8ZLk5ShPbrGQVhRoi8u3mX2rZE";

function readFiles(dir, processFile) {
  // read directory
  fs.readdir(dir, (error, fileNames) => {
    if (error) throw error;

    fileNames.forEach((filename) => {
      // get current file name
      const name = path.parse(filename).name;
      // get current file extension
      const ext = path.parse(filename).ext;
      // get current file path
      const filepath = path.resolve(dir, filename);

      // get information about the file
      fs.stat(filepath, function (error, stat) {
        if (error) throw error;

        // check if the current path is a file or a folder
        const isFile = stat.isFile();

        // exclude folders
        if (isFile) {
          // callback, do something with the file
          processFile(filepath, name, ext, stat);
        }
      });
    });
  });
}

// use an absolute path to the folder where files are located

// const namesMap = {
//   "KONG HANKS": {
//     type: "LEGENDARY",
//
//     name: "KONG HANKS",
//
//     type: "RARE",
//
//     name: "KONG HANKS",
//
//     type: "COMMON",
//   },
//   HAIRY APETON: {
//   name: "HAIRY APETON",
//
//     type: "LEGENDARY",
//
//     name: "HAIRY APETON",
//
//     type: "RARE",
//
//     name: "HAIRY APETON",
//
//     type: "COMMON",
// },
// JOCK KONGDALE: {
//   name: "JOCK KONGDALE",
//
//     type: "LEGENDARY",
//
//     name: "JOCK KONGDALE",
//
//     type: "RARE",
//
//     name: "JOCK KONGDALE",
//
//     type: "COMMON",
// },
//
// THE WIZARD OF KONG: {
//
//   name: "THE WIZARD OF KONG",
//
//     type: "LEGENDARY",
//
//     name: "THE WIZARD OF KONG",
//
//     type: "RARE",
//
//     name: "THE WIZARD OF KONG",
//
//     type: "COMMON",
// },
// THE DALAI BALLER: {
//   name: "THE DALAI BALLER",
//
//     type: "LEGENDARY",
//
//     name: "THE DALAI BALLER",
//
//     type: "RARE",
//
//     name: "THE DALAI BALLER",
//
//     type: "COMMON",
// },
// HAKEEM OLAJUKONG: {
//
//   name: "HAKEEM OLAJUKONG",
//
//     type: "LEGENDARY",
//
//     name: "HAKEEM OLAJUKONG",
//
//     type: "RARE",
//
//     name: "HAKEEM OLAJUKONG",
//
//     type: "COMMON",
//
// },
//
// DWAYNE KONGSON: {
//
//   name: "DWAYNE KONGSON",
//
//     type: "LEGENDARY",
//
//     name: "DWAYNE KONGSON",
//
//     type: "RARE",
//
//     name: "DWAYNE KONGSON",
//
//     type: "COMMON",
// },
// ALLEN IVERKONG: {
//
//   name: "ALLEN IVERKONG",
//
//     type: "LEGENDARY",
//
//     name: "ALLEN IVERKONG",
//
//     type: "RARE",
//
//     name: "ALLEN IVERKONG",
//
//     type: "COMMON",
// }
// KONGER McGREGOR: {
//
//   name: "KONGER McGREGOR",
//
//     type: "LEGENDARY",
//
//     name: "KONGER McGREGOR",
//
//     type: "RARE",
//
//     name: "KONGER McGREGOR",
//
//     type: "COMMON",
// },
// DIKONGBE MUKONGBO: {
//
//   name: "DIKONGBE MUKONGBO",
//
//     type: "LEGENDARY",
//
//     name: "DIKONGBE MUKONGBO",
//
//     type: "RARE",
//
//     name: "DIKONGBE MUKONGBO",
//
//     type: "COMMON",
// },
// name: "PIKAKONG": {
//
// }
// , name: "DARTH KONG": {
//
// }

// readFiles(metadataDir, (filepath, name, ext, stat) => {
//   if (name != "_metadata" && name != "contract_metadata") {
//     fs.readFile(filepath, { encoding: "utf-8" }, (err, data) => {
//       if (err) throw err;
//
//       if (!data) return;
//
//       // .replace(/^\uFEFF/, "")
//
//       const parsedData = JSON.parse(JSON.stringify(data.trim(), null, 2));
//       console.log("Parsed: ", parsedData);
//
//       const name = parsedData.attributes.find(
//         (el) => el.trait_type == "name"
//       ).value;
//       const type = parsedData.attributes.find(
//         (el) => el.trait_type == "type"
//       ).value;
//
//       const image = `ipfs://${ipfsHash}/${
//         name == "darth kong" || name == "pikakong"
//           ? `${name}`
//           : `${name} - ${type}`
//       }.png`;
//
//       console.log("NAME: ", { name, type });
//
//       // const card = {
//       //   ...parsedData,
//       //   image,
//       // };
//
//       // console.log("Data: ", data);
//     });
//     // console.log("file path:", filepath);
//     // console.log("file name:", name);
//     // console.log("file extension:", ext);
//     // console.log("file information:", stat);
//   }
// });

const saveMetaDataSingleFile = (item) => {
  fs.writeFileSync(
    `${metadataDir}/${item.tokenId}`,
    JSON.stringify(item, null, 2)
  );
};

const writeMetaData = (_data) => {
  fs.writeFileSync(
    `${metadataDir}/_metadata.json`,
    JSON.stringify(_data, null, 2)
  );
};

const updateMetadata = () => {
  const updatedMetadata = metadata.map((item) => {
    const characterName = item.attributes
      .find((el) => el.trait_type == "name")
      .value.replaceAll(" ", "_");
    const type = item.attributes.find((el) => el.trait_type == "type").value;

    const image = `ipfs://${ipfsHash}/${
      characterName == "DARTH KONG" || characterName == "PIKAKONG"
        ? `${characterName}`
        : `${characterName.toUpperCase()}_-_${type}`
    }.png`;

    const name = item.name.replace(
      "Club Cards Series 1 ",
      "Club Cards Series 1 #"
    );

    return { ...item, name, image };
  });
  console.log("updated: ", updatedMetadata);

  updatedMetadata.forEach((el) => saveMetaDataSingleFile(el));
  writeMetaData(updatedMetadata);
};

updateMetadata();
