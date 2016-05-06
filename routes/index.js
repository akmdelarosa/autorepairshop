
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express', user : req.user });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', user : req.user });
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', user : req.user });
};

exports.hoursandmap = function (req, res) {
    res.render('hoursandmap', { title: 'Hours and Map', user : req.user });
};

exports.meetthestaff = function (req, res) {
    res.render('meetthestaff', { title: 'Meet The Staff', user : req.user });
};

exports.searchResults = function (req, res) {
    res.render('searchResults', { title: 'Search Results', user : req.user });
};