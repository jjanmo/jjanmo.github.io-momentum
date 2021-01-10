const quoteContainer = document.querySelector('.quoteContainer');
const quoteText = quoteContainer.querySelector('.quoteText');
const quoteSource = quoteContainer.querySelector('.quoteSource');

function getQuote() {
    fetch('https://api.quotable.io/random')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            quoteText.innerHTML = modifyContent(json.content);
            quoteSource.innerHTML = json.author;
        });
}

function modifyContent(content) {
    if (content.length > 130) getQuote();
    const index = content.indexOf('.');
    if (index === content.length - 1) return content;
    else {
        const tmp = content.split('.');
        if (tmp.length > 2) getQuote;
        else {
            const newContent = tmp.join('.<br>');
            return newContent;
        }
    }
}

function init() {
    getQuote();
}

init();
