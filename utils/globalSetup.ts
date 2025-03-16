const { FullConfig } = require('@playwright/test');

const dotenv = require('dotenv');

// async function globalSetup(FullConfig){

//     if(process.env.test_env){
//         dotenv.config({
//             path: `tests/helper/env/.env.${process.env.test_env}`,
//             override: true
//         })
//     }
// }

async function globalSetup(config:any) {
    const testEnv = process.env.test_env || 'test'; // Default to 'test' if not specified
    const envPath = `tests/helper/env/.env.${testEnv}`;

    console.log(`Loading environment variables from: ${envPath}`); // Debugging log

    dotenv.config({
        path: envPath,
        override: true,
    });

    // Check if BASEURL is loaded
    if (!process.env.BASEURL) {
        throw new Error(`BASEURL is not defined in ${envPath}`);
    }
}

export default globalSetup;