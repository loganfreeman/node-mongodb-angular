/**
 * Module dependencies.
 */

var crypto = require( 'crypto' );

var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    relationship = require( 'mongoose-relationship' );


var uniqueValidator = require( 'mongoose-unique-validator' );

var Promise = require( 'bluebird' );


/**
 * User Schema
 */

var UserSchema = new Schema( {
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    username: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        default: ''
    },
    salt: {
        type: String,
        default: ''
    },
    authToken: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'User'
    },
    groups: [{
        type: Schema.ObjectId,
        ref: 'Group'
    }],
    stacks: [{
        type: Schema.ObjectId,
        ref: 'Stack'
    }],

    instances: [{
        type: Schema.ObjectId,
        ref: 'Instance'
    }]
} );

/**
 * Virtuals
 */

UserSchema
    .virtual( 'password' )
    .set( function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword( password );
    } )
    .get( function() {
        return this._password;
    } );

UserSchema
    .virtual( 'fullname' )
    .get( function() {
        return this.firstname + ' ' + this.lastname;
    } );

UserSchema
    .virtual( 'user_info' )
    .get( function() {
        return {
            '_id': this._id,
            'username': this.username,
            'fullname': this.fullname,
            'email': this.email,
            'type': this.type,
            'groups': this.groups
        };
    } );

/**
 * Validations
 */

var validatePresenceOf = require( '../../utils.js' ).validatePresenceOf;


UserSchema.path( 'email' ).validate( function(email) {
    return email.length;
}, 'Email cannot be blank' );

UserSchema.path( 'email' ).validate( function(email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test( email );
}, 'The specified email is invalid.' );

UserSchema.path( 'username' ).validate( function(username) {
    return username.length;
}, 'Username cannot be blank' );

UserSchema.path( 'hashed_password' ).validate( function(hashed_password) {
    return hashed_password.length;
}, 'Password cannot be blank' );


/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

    authenticate: function(plainText) {
        return this.encryptPassword( plainText ) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

    makeSalt: function() {
        return Math.round(( new Date().valueOf() * Math.random() )) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac( 'sha1', this.salt )
                .update( password )
                .digest( 'hex' );
        } catch ( err ) {
            return '';
        }
    }
};

UserSchema.statics.load = function(criteria) {
    var findUser = this.findOne( criteria ).select( '-salt -hashed_password' ).exec();

    return new Promise( function(resolve, reject) {
            findUser.then( function(user) {
                resolve( user );
            } );
        } );

};

UserSchema.plugin( uniqueValidator );

mongoose.model( 'User', UserSchema );