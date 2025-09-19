const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUZQNWFJcitLOHFnK1F6MzAxbGExZWxmNDRSSVRwbkEzcE5mTWtobGxtdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWFV6NDVrZ1JaN1BjdGFOVnlrZVc0T1NpczN5UWtCMjR0ekVZaGpEVFlGQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRzdlYmFTYXNOdEk1SUxOTXk5b2puTGtNa2hCT2dmMFFtSDdZSUhiMG1FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1Y0FpWWpxUTZ4RVdRajlSc1I5N3JOVFl6cHl3bWtzdHJ3UGFDN0x4NjNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtKWGVMNjRYVVdVTFYzTlErc3IzNTNQRG9MMDNKVGwxMnlBQy9YaGZvbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQyWmc0K29OZERnYWdmMVJmZFBieHNLNU1ham9UUUFLSGlwOTRyMHF1Q2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUFlWWJ3a1hDVzF1QmRYY0V2ZTBYUDRkWFZXSGVnbEc5UHB3Y2xXN3NFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTRhQWFNWTY0K3dxZGtTQ2xtVFJRcmRKaDdYNlJCMGJkVy83N1I2YTQyST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9HZDByT01Hd1gvL2JuRUFMOUdEZTlZd051bUl5SVJhN001dzJpK214VW9QL25KdCt0R3hEWXY4bTdiNFdXWllsWklNSitNWjEvNmpBVFNQdnlHZ0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM3LCJhZHZTZWNyZXRLZXkiOiJleHJOblZHd2JGOE85QzNnZ052MXE3NEJoR2ovbFdkT2g4QmNqdFQzZjA0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc4NzY4Njk3OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2NDZFOTJFMjlCNDg1MUI1QTg2MkVENzNDMUFDOUVENCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU4MjI0Mzk4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3ODc2ODY5NzhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUY3NTE0NkMxQTI4QkIwM0I5RUQ0M0M0OTAzMTc4RDUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1ODIyNDQwMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiSEhOU01GUlQiLCJtZSI6eyJpZCI6IjI1NDc4NzY4Njk3ODozQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjUyMDM1NzI3NDAxNjI6M0BsaWQiLCJuYW1lIjoiTXIgUGFzdG9y8J+YiyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmlYdnFBQkVOdS9zY1lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTG44TWdLSmVHSFNBK05UeTN1UUtyNXpDQnN2WlhjZTFlYnl3ZWZ3dUUzUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRmRNbVV5REQ3Tm9ROW5ZcTY1WjVGOTU2d0ZpYjNMRWtoMmlUVFVYU1g5a1ExMmhsZ0xWcDYxazAzbHM0b0U3dXNIR3JGYjhCMUdDTjhOWnJ3dG52QlE9PSIsImRldmljZVNpZ25hdHVyZSI6InNyVEQ4ZmRwNFRvcHB4aTNNSndxMkdUQmpPY1d6eGp0MExmRzNxVlA0UFNXbi9rcWs4SEZ0bVZxZFYrcDVCSm80VzRKLzYrd2xjSmVXMUZOd0dmckRnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzg3Njg2OTc4OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUzUvRElDaVhoaDBnUGpVOHQ3a0NxK2N3Z2JMMlYzSHRYbThzSG44TGhOMCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU4MjI0MzYxLCJsYXN0UHJvcEhhc2giOiIzUjlaMzkiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU43NSJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/toxiclover-tech/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Brayoh",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254787686978",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by MrGoodVibes',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧JEEPERS CREEPER-XMD✧",
    BOT : process.env.BOT_NAME || '✧JEEPERS CREEPER-XMD TECH✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
