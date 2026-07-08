#!/usr/bin/env node
/**
 * Script para agregar 30 minutos de preguntas de geografía e historia
 * Distribuye 15 preguntas a través de los 23 días
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(dataPath, 'utf-8');

const GEO_HIST_QUESTIONS = [
  // Geografía
  'Q("¿En qué continente está Colombia?", ["América del Sur", "América Central", "África", "Europa"], "América del Sur", "soc")',
  'Q("¿Cuál es la capital de Colombia?", ["Medellín", "Bogotá", "Cali", "Barranquilla"], "Bogotá", "soc")',
  'Q("¿Cuántos océanos rodean América del Sur?", ["1", "2", "3", "4"], "2", "soc")',
  'Q("¿Qué es la línea ecuatorial?", ["Una línea imaginaria que divide la Tierra", "Una montaña", "Un río", "Una frontera"], "Una línea imaginaria que divide la Tierra", "soc")',
  'Q("¿Cuál es el río más largo de América del Sur?", ["Río de la Plata", "Amazonas", "Orinoco", "Magdalena"], "Amazonas", "soc")',

  // Historia
  'Q("¿En qué siglo llegó Cristóbal Colón a América?", ["Siglo XV", "Siglo XVI", "Siglo XVII", "Siglo XVIII"], "Siglo XV", "soc")',
  'Q("¿Quiénes eran los muiscas?", ["Pueblo indígena de Colombia", "Conquistadores españoles", "Animales del rancho", "Plantas"], "Pueblo indígena de Colombia", "soc")',
  'Q("¿Cuándo se declaró la independencia de Colombia?", ["1808", "1810", "1816", "1819"], "1810", "soc")',
  'Q("¿Quién fue Simón Bolívar?", ["Libertador de varios países de América", "Rey de España", "Cazador de caballos", "Inventor"], "Libertador de varios países de América", "soc")',
  'Q("¿En qué año se formó la República de la Gran Colombia?", ["1800", "1819", "1830", "1850"], "1819", "soc")',

  // Geografía física
  'Q("¿Qué son las cordilleras?", ["Cadenas de montañas", "Ríos grandes", "Océanos", "Ciudades"], "Cadenas de montañas", "soc")',
  'Q("¿Cuántas cordilleras principales tiene Colombia?", ["2", "3", "4", "5"], "3", "soc")',
  'Q("¿Qué región de Colombia es llana y con ríos navegables?", ["Región de la Orinoquía", "Región Andina", "Región Pacífica", "Región Caribeña"], "Región de la Orinoquía", "soc")',
  'Q("¿Cuál es el pico más alto de Colombia?", ["Nevado del Ruiz", "Pico Cristóbal Colón", "Nevado del Huila", "Pico Pan de Azúcar"], "Pico Cristóbal Colón", "soc")',
  'Q("¿A cuántos metros sobre el nivel del mar está Bogotá?", ["1500 m", "2600 m", "500 m", "4000 m"], "2600 m", "soc")',
];

// Distribuir las preguntas a lo largo de los días
let dayIndex = 0;
let questionIndex = 0;

content = content.replace(
  /subjectQuestions: \[([\s\S]*?)\],/g,
  (match) => {
    if (dayIndex >= 23 || questionIndex >= GEO_HIST_QUESTIONS.length) {
      dayIndex++;
      return match;
    }

    // Agregar una pregunta de geografía/historia cada 2 días
    if (dayIndex % 2 === 0 && questionIndex < GEO_HIST_QUESTIONS.length) {
      const newQuestion = GEO_HIST_QUESTIONS[questionIndex];
      questionIndex++;
      dayIndex++;
      return match.replace('],', `,\n      ${newQuestion}\n    ],`);
    }

    dayIndex++;
    return match;
  }
);

fs.writeFileSync(dataPath, content, 'utf-8');
console.log('✅ Contenido de geografía e historia agregado');
console.log(`   - ${questionIndex} preguntas agregadas`);
console.log('   - Distribuidas a lo largo de los 23 días');
console.log('   - Total de tiempo adicional: ~30 minutos');
