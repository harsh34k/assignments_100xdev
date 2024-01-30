const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
import { z } from 'zod'
const usernameSchema = z.coerce.string().email().min(5);
const passwordSchema = z.coerce.string().min(6);

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    const usernameValidation = usernameSchema.safeParse(username)
    const passwordValidation = passwordSchema.safeParse(password)
    if (usernameValidation.success && passwordValidation.success) {
        return jwt.sign({
            username: usernameValidation.value, password: passwordValidation.value
        }, jwtPassword)
    }
    return null

}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    try {
        const isVerified = jwt.verify(token, jwtPassword);
        return isVerified;
    } catch (error) {
        throw error;
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken;
    // Your code here yes
}


module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};
