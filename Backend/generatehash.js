const bcrypt = require('bcryptjs');

const password = 'bujang';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error saat hashing password:', err);
    } else {
        console.log('Password yang di-hash:', hash);
    }
});
