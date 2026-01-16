import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, '../src/i18n');
const enPath = path.join(i18nDir, 'en.json');
const zhPath = path.join(i18nDir, 'zh.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const zh = JSON.parse(fs.readFileSync(zhPath, 'utf-8'));

function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(acc, flatten(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

function unflatten(data) {
  const result = {};
  for (const i in data) {
    const keys = i.split('.');
    keys.reduce((r, e, j) => {
      return r[e] || (r[e] = (keys.length - 1 === j ? data[i] : {}));
    }, result);
  }
  return result;
}

const enFlat = flatten(en);
const zhFlat = flatten(zh);

const missingKeys = Object.keys(enFlat).filter(k => !zhFlat[k]);

async function translate() {
  if (missingKeys.length === 0) {
    console.log('✅ All keys are translated!');
    return;
  }

  console.log(`🔍 Found ${missingKeys.length} missing keys. Translating...`);

  const apiKey = process.env.PUBLIC_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    console.warn('⚠️ No PUBLIC_DEEPSEEK_API_KEY found. Filling with placeholders.');
    missingKeys.forEach(k => {
      zhFlat[k] = `[TODO: ${enFlat[k]}]`;
    });
  } else {
    try {
      const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey
      });
      
      const itemsToTranslate = missingKeys.reduce((acc, k) => ({ ...acc, [k]: enFlat[k] }), {});
      
      const prompt = `Translate the following JSON object values from English to Chinese (Simplified). Keep the keys exactly the same. Return ONLY the JSON object, no markdown formatting.
      JSON: ${JSON.stringify(itemsToTranslate)}`;

      const response = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful translator.' },
          { role: 'user', content: prompt }
        ]
      });
      
      const responseText = response.choices[0].message.content || "{}";
      const cleanJson = responseText.replace(/```json|```/g, '').trim();
      const translations = JSON.parse(cleanJson);
      
      Object.assign(zhFlat, translations);
      console.log('✨ Translation successful!');
    } catch (e) {
      console.error('❌ Translation failed:', e);
      // Fallback
      missingKeys.forEach(k => {
        if (!zhFlat[k]) zhFlat[k] = `[FAILED: ${enFlat[k]}]`;
      });
    }
  }

  const newZh = unflatten(zhFlat);
  fs.writeFileSync(zhPath, JSON.stringify(newZh, null, 2));
  console.log(`💾 Updated ${zhPath}`);
}

translate();
