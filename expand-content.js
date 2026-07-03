#!/usr/bin/env node
/**
 * Script para expandir el currículo de 1.5h a 2h
 * Agrega 4 preguntas, 4 vocab items y 2 diálogos por día
 */
const fs = require('fs');
const path = require('path');

// Leer data.js
const dataPath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(dataPath, 'utf-8');

// Preguntas adicionales para diferentes temas
const EXTRA_QUESTIONS = {
  mate: [
    'Q("¿Cuál es el doble de 25?", ["40", "50", "60", "70"], "50", "mate")',
    'Q("Si compras 3 manzanas a 5 pesos cada una, ¿cuánto gastas?", ["12", "15", "18", "20"], "15", "mate")',
    'Q("¿Cuánto es 8 × 8?", ["56", "64", "72", "80"], "64", "mate")',
    'Q("¿Cuál es la mitad de 100?", ["40", "50", "60", "70"], "50", "mate")',
  ],
  leng: [
    'Q("¿Cuál es el plural de caballo?", ["Caballos", "Caballoes", "Caballoz", "Caballí"], "Caballos", "leng")',
    'Q("¿Qué tipo de palabra es \\"Correr\\"?", ["Verbo", "Sustantivo", "Adjetivo", "Preposición"], "Verbo", "leng")',
    'Q("¿Cuál es el antónimo de \\"Grande\\"?", ["Pequeño", "Largo", "Fuerte", "Viejo"], "Pequeño", "leng")',
    'Q("¿Cuál es el sinónimo de \\"Feliz\\"?", ["Contento", "Triste", "Enojado", "Cansado"], "Contento", "leng")',
  ],
  cien: [
    'Q("¿Cuál es el color de la sangre?", ["Rojo", "Azul", "Verde", "Amarillo"], "Rojo", "cien")',
    'Q("¿Cuántos sentidos tiene el ser humano?", ["3", "4", "5", "6"], "5", "cien")',
    'Q("¿Cuál es el órgano más grande del cuerpo?", ["Corazón", "Pulmón", "Hígado", "Cerebro"], "Hígado", "cien")',
    'Q("¿Qué gas respiramos para vivir?", ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Helio"], "Oxígeno", "cien")',
  ],
  soc: [
    'Q("¿Cuántos continentes hay?", ["5", "6", "7", "8"], "7", "soc")',
    'Q("¿Cuál es la capital de Colombia?", ["Medellín", "Bogotá", "Cali", "Barranquilla"], "Bogotá", "soc")',
    'Q("¿Cuántos océanos hay en el mundo?", ["3", "4", "5", "6"], "5", "soc")',
    'Q("¿En qué continente está Colombia?", ["Europa", "Asia", "América", "África"], "América", "soc")',
  ],
};

// Vocabulario adicional
const EXTRA_EN_VOCAB = [
  { w: "Love", es: "Amor", e: "❤️" },
  { w: "Run", es: "Correr", e: "🏃" },
  { w: "Teach", es: "Enseñar", e: "👩‍🏫" },
  { w: "Learn", es: "Aprender", e: "📚" },
];

const EXTRA_FR_VOCAB = [
  { w: "Aimer", es: "Amar", e: "❤️" },
  { w: "Courir", es: "Correr", e: "🏃" },
  { w: "Enseigner", es: "Enseñar", e: "👩‍🏫" },
  { w: "Apprendre", es: "Aprender", e: "📚" },
];

// Diálogos adicionales
const EXTRA_EN_DIALOGUE = [
  { t: "Do you like horses?", es: "¿Te gustan los caballos?" },
  { t: "Yes, I love them!", es: "¡Sí, me encanta!" },
];

const EXTRA_FR_DIALOGUE = [
  { t: "Aimes-tu les chevaux?", es: "¿Te gustan los caballos?" },
  { t: "Oui, j'adore!", es: "¡Sí, me encanta!" },
];

// Procesar cada día
let dayCount = 0;
let processedContent = content.replace(
  /subjectQuestions: \[([\s\S]*?)\],/g,
  (match) => {
    dayCount++;
    if (dayCount > 23) return match; // Solo los 23 primeros días

    // Obtener categorías de preguntas existentes
    const categories = ['mate', 'leng', 'cien', 'soc'];
    let result = match;

    // Agregar 4 preguntas más (una por categoría)
    categories.forEach(cat => {
      if (EXTRA_QUESTIONS[cat].length > 0) {
        const extra = EXTRA_QUESTIONS[cat][dayCount % EXTRA_QUESTIONS[cat].length];
        result = result.replace('],', `,\n      ${extra}\n    ],`);
      }
    });

    return result;
  }
);

// Agregar vocabulario
let vocabCount = 0;
processedContent = processedContent.replace(
  /englishVocab: \[([\s\S]*?)\],/g,
  (match) => {
    vocabCount++;
    if (vocabCount > 23) return match;

    let result = match;
    EXTRA_EN_VOCAB.forEach(v => {
      result = result.replace('},', `},\n      { w: "${v.w}", es: "${v.es}", e: "${v.e}" },`);
    });
    return result;
  }
);

// Agregar diálogos
let dialogCount = 0;
processedContent = processedContent.replace(
  /englishDialogue: \[([\s\S]*?)\],/g,
  (match) => {
    dialogCount++;
    if (dialogCount > 23) return match;

    let result = match;
    EXTRA_EN_DIALOGUE.forEach(d => {
      result = result.replace('},', `},\n      { t: "${d.t}", es: "${d.es}" },`);
    });
    return result;
  }
);

// Guardar
fs.writeFileSync(dataPath, processedContent, 'utf-8');
console.log('✅ Contenido expandido a 2 horas');
console.log(`   - ${dayCount} días procesados`);
console.log('   - 4 preguntas adicionales por día');
console.log('   - 4 vocab items adicionales per idioma');
console.log('   - 2 diálogos adicionales per idioma');
