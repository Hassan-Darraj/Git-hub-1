
function checkTweetLength(tweet) {
    return tweet.length <= 280;
}console.log(checkTweetLength("tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet tweet"));


function capitalizeUsername(username) {
    return username.charAt(0).toUpperCase() + username.slice(1);
}console.log(capitalizeUsername("hassan"));


function formatTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
}console.log(formatTitle("convert to uppercase"));


function cleanEmail(email) {
    return email.trim();
}console.log(cleanEmail(" email@example.com  "));


function previewArticle(article, length) {
    return article.slice(0, length) + '...';
}console.log(previewArticle("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis fugiat, deleniti iusto recusandae maiores aliquid quibusdam molestiae, id ullam accusamus assumenda velit impedit magni, hic inventore reiciendis est eum a!", 50));


function maskPhoneNumber(phone) {
    return phone.slice(-4).padStart(phone.length, '*');
}console.log(maskPhoneNumber("0797979797"));


function censorBadWords(text) {
    return text.replace("badword", '****');
}console.log( censorBadWords("comment badword"));


function commentToArray(comment) {
    return comment.split(' ');
}console.log(commentToArray("comment new comment"));



function isImageFile(filename) {
    return filename.endsWith('.jpg') || filename.endsWith('.png');
}console.log(isImageFile("filename.jpg"));


function generateDivider(length) {
    return '*'.repeat(length);
}console.log(generateDivider(30));


function combineTitle(part1, part2) {
    return part1.concat(' ', part2);
}console.log(combineTitle("part1", "part2"));

let paragraph = "هذا النص يحتوي على كلمة معينة في أماكن مختلفة. الكلمة نفسها تظهر هنا وهناك.";
let keyword = "كلمة";
function findKeywordOccurrences(text, keyword) {
    return {
        first: text.indexOf(keyword),
        last: text.lastIndexOf(keyword)
    };
}console.log(findKeywordOccurrences(paragraph, keyword));
