import axios from 'axios';

// remove absolutely everything from the dom
document.body.textContent = '';

// fetch our real entry point and inject contents into dom
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
    
    // launch our application
    require('./src/main');
}).catch(err => {
    // if anything went wrong, replace the entire document
    document.write(err.response.data);
    document.close();
});
