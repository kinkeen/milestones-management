class UserModel{

    constructor(id, userType, firstName, lastName, phone,
        email, password, country, street, city, province, postalCode ){

            this.id = id;
            this.userType = userType;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
            this.email = email;
            this.password = password;
            this.country = country;
            this.street = street;
            this.city = city;
            this.province = province;
            this.postalCode = postalCode
        }
}

module.exports = UserModel;