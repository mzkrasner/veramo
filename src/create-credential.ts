import { agent } from "./veramo/setup.js";

async function main() {
  const identifier = await agent.didManagerGetByAlias({ alias: "default" });
  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://beta.api.schemas.serto.id/v1/public/valid-research-object/2.0/ld-context.json",
      ],
      issuer: { id: identifier.did },
      type: ["VerifiableCredential", "ValidResearchObject"],
      credentialSchema: {
        id: "https://beta.api.schemas.serto.id/v1/public/valid-research-object/2.0/json-schema.json",
        type: "JsonSchemaValidator2018",
      },
      issuanceDate: "2023-09-27T15:19:32.711Z",
      credentialSubject: {
        id: "w3ccred:credentialSubject",
        cid: "b45165ed3cd437b9ffad02a2aad22a4ddc69162470e2622982889ce5826f6e3d",
        isVettedResearchObject: true,
        context: "This is my reasoning",
      },
    },
    proofFormat: "EthereumEip712Signature2021",
  });
  console.log(`New credential created`);
  console.log(JSON.stringify(verifiableCredential, null, 2));
}

main().catch(console.log);
