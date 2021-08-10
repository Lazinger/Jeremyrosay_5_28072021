const queryString_url_id = window.location.search;

const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
console.log(id);
