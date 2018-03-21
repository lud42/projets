function syntaxUser(user) {
    let address = user.address;

    user.birthday = user.birthday.join(' ');
    user.address = address.street_number + ' ' + address.route + ' ' + address.locality + ' ' + address.postal_code + ' ' + address.country;
    user.longitude = address.longitude;
    user.latitude = address.latitude;
    user.actif = 0;

    let tabUser = Object.values(user);
    tabUser.unshift(0);
    return tabUser;
}

module.exports.syntaxUser = syntaxUser;