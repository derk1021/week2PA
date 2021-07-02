var fetch = require('node-fetch');

module.exports = async function (context, req) {

    // req.query.textToTranslate looks like ?textToTranslate='input text'
    var result = await translateText(req.query.textToTranslate, req.query.language);

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result.contents.translated
    };
}

async function translateText(text, language){
    //const subscriptionKey = "3cc99a9edd9a476aa17c9fc36b2fa5bf";
    const uriBase = "https://api.funtranslations.com/translate/" +language +".json";
    //const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    //const uriBase = process.env.ENDPOINT;
    // remember when testing with postman, hardcode teh subscription
    // key and azure url

    let params = new URLSearchParams({
        'text': text,
    })
    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'GET',  //WHAT TYPE OF REQUEST?
    })
    // data returns the 
    let data = await resp.json();
    //console.log('data:', data);
    return data; 
}