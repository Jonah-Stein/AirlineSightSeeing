import {COLORS} from '../style/constants'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


export function generateColorCSS(){
    return `
    :root {
        --color-background: #${COLORS.background};
        --color-secondary-background: #${COLORS.secondaryBackground};
        --color-lighter-background: #${COLORS.lighterBackground};
        --color-highlight: #${COLORS.highlight};
    }`
}

function writeColorCSSFile(){
    const css = generateColorCSS();

    // Get the directory of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const cssFilePath = path.join(__dirname, '../style/colors.css');
    fs.writeFileSync(cssFilePath, css);
}

if(fileURLToPath(import.meta.url) === process.argv[1]){
    console.log("Generating color CSS file");
    writeColorCSSFile();
}