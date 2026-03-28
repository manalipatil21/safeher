const { Mistral } = require('@mistralai/mistralai');
require('fs');

// Read .env manually
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [key, ...values] = line.split('=');
    if (key && values.length) {
      process.env[key.trim()] = values.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
}

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
  console.error('❌ MISTRAL_API_KEY not found in .env file!');
  process.exit(1);
}

console.log(`🔑 Key found: ${apiKey.slice(0, 6)}...${apiKey.slice(-4)}`);
console.log('⏳ Testing connection to Mistral API...\n');

const client = new Mistral({ apiKey });

client.chat.complete({
  model: 'mistral-large-latest',
  messages: [{ role: 'user', content: 'Say "SafeHer AI is online!" in one sentence.' }],
  maxTokens: 50,
}).then(res => {
  const msg = res.choices?.[0]?.message?.content;
  console.log('✅ Mistral key is WORKING!');
  console.log('📨 Response:', msg);
}).catch(err => {
  console.error('❌ Mistral key FAILED!');
  console.error('Error:', err?.message || err);
});
