"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenExpired = isTokenExpired;
function isTokenExpired(timestamp) {
    const expirationTime = timestamp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    // Check if expired
    return currentTime > expirationTime;
}
