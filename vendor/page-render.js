function loadAndRenderTemplate(url) {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = function() {
      renderTemplate(client.responseText);
    }
    client.send();
}
function renderTemplate(template) {
    // TODO: add actual templating engine?
    document.getElementById('templated-section').innerHTML = template;
}
function showPage(page) {
    if (page.template) {
        renderTemplate(page.template);
    } else if (page.templateUrl) {
        loadAndRenderTemplate(page.templateUrl);
        window[page.controller]();
    } else {
        alert(`No template found for the page ${page.url}`);
    }
}
function goToPage(pageName) {
    let newPage = PAGES[pageName];
    if (!newPage) {
        alert('No such page');
        return false;
    }
    let newState = (history.state && history.state[0] instanceof Object) ? history.state : [];
    newState.push({page: newPage});
    history.pushState(newState, newPage.url, newPage.url);
    showPage(newPage);
    return false; // Needed to avoid default link behavior
}
window.onpopstate = function() {
    let newState = (history.state && history.state[0] instanceof Object) ? history.state : [];
    let previousPage = (newState.length) ? newState.pop().page : PAGES['home'];
    history.replaceState(newState, previousPage.url, previousPage.url)
    renderTemplate(previousPage.template);
};
goToPage('home');
