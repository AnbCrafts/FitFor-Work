// hashSecret.js
import dotenv from 'dotenv';
dotenv.config(); 

export const getHashSecret = (fixedTime = '') => {
  const part1 = process.env.HASH_SECRET || 'fallbackSecret123';
  const time = fixedTime || Date.now().toString().slice(-4);  // Use only last 4 digits of timestamp
  const part2 = 'XyZ123!#$_@' + time;
  return [...part1].map((ch, i) => ch + (part2[i] || '')).join('');
};

 


/*
const secret = getHashSecret();
const hash = crypto.createHash('sha256').update(userId + loginTime + secret).digest('hex');

*/


