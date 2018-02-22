/* eslint-disable */
import axios from 'axios';

console.log(document.body.outerHTML);

// step 1: clean up the dom
document.body.textContent = '';

// step 2: fetch our entry point
axios.get('/__october__').then((response) => {
    const october = document.createElement('html');
    october.innerHTML = response.data;

    // spread our header data into the document
    [...october.querySelector('head').children].forEach(node => {
        document.head.appendChild(node);
    });

    // also pull over anything that isn't a production script tag
    [...october.querySelector('body').children].forEach(node => {
        if (node.tagName !== 'SCRIPT' || !node.getAttribute('src').startsWith('/themes/')) {
            document.body.appendChild(node);
        }
    });
    
    require('./main');
});