const natural = require('natural');
const fs = require('fs');

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Read the JSON file
fs.readFile('courses_sahlgrenska_sv.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data
    const documents = JSON.parse(data);

    // Add documents to the TF-IDF model
    documents.forEach((doc) => {
        tfidf.addDocument(doc._source.body);
    });

    // Define a search query
    const query = 'medicine';

    // Perform a TF-IDF search with the query
    tfidf.tfidfs(query, (i, measure) => {
        console.log(`Document #${documents[i]._source.id} (${documents[i]._source.title}): ${measure}`);
    });
});