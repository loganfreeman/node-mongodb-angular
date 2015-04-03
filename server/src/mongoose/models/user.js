
/**
 * Module dependencies.
 */

var crypto = require( 'crypto' );

var mongoose = require( 'mongoose' ),
    Promise = mongoose.Promise,
    Schema = mongoose.Schema;
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
        default: ''
    },
    username: {
        type: String,
        default: ''
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
    }
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

/**
 * Validations
 */

var validatePresenceOf = require( '../../utils.js' ).validatePresenceOf;


UserSchema.path( 'email' ).validate( function(email) {
    return email.length;
}, 'Email cannot be blank' );

UserSchema.path( 'email' ).validate( function(email, fn) {
    var User = mongoose.model( 'User' );

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified( 'email' )) {
        User.find( {
            email: email
        } ).exec( function(err, users) {
            fn( !err && users.length === 0 );
        } );
    } else {
        fn( true );
    }
}, 'Email already exists' );

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
    // return a Query
    return this.findOne( criteria );
};

mongoose.model( 'User', UserSchema );