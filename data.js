const DAYS = [
  {
    "date": "Miércoles 1 de julio",
    "title": "Bienvenida al Rancho",
    "subjectLabel": "Diagnóstico",
    "intro": "¡Hola! Hoy Miranda llega por primera vez al rancho y elige a su caballo. Vamos a conocernos y a ver qué tanto sabemos.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Cuánto es 8 + 5?",
        "options": [
          "12",
          "13",
          "14",
          "15"
        ],
        "answer": "13",
        "cat": "mate"
      },
      {
        "text": "¿Cuál de estas palabras es un sustantivo?",
        "options": [
          "Caballo",
          "Correr",
          "Rápido",
          "Y"
        ],
        "answer": "Caballo",
        "cat": "leng"
      },
      {
        "text": "¿Qué necesita todo ser vivo para sobrevivir?",
        "options": [
          "Agua y alimento",
          "Solo dinero",
          "Solo aire",
          "Nada"
        ],
        "answer": "Agua y alimento",
        "cat": "cien"
      },
      {
        "text": "¿Cuánto es 15 - 7?",
        "options": [
          "6",
          "7",
          "8",
          "9"
        ],
        "answer": "8",
        "cat": "mate"
      },
      {
        "text": "¿Cuál de estas palabras es un verbo?",
        "options": [
          "Correr",
          "Caballo",
          "Rápido",
          "Establo"
        ],
        "answer": "Correr",
        "cat": "leng"
      },
      {
        "text": "¿Qué necesitan las plantas para vivir?",
        "options": [
          "Agua y luz del sol",
          "Solo tierra",
          "Nada",
          "Solo aire"
        ],
        "answer": "Agua y luz del sol",
        "cat": "cien"
      },
      {
        "text": "¿En qué continente está Colombia?",
        "options": [
          "América del Sur",
          "América Central",
          "África",
          "Europa"
        ],
        "answer": "América del Sur",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Hello",
        "es": "Hola",
        "e": "👋"
      },
      {
        "w": "Horse",
        "es": "Caballo",
        "e": "🐴"
      },
      {
        "w": "Name",
        "es": "Nombre",
        "e": "🏷️"
      },
      {
        "w": "Stable",
        "es": "Establo",
        "e": "🏠"
      },
      {
        "w": "Please",
        "es": "Por favor",
        "e": "🙏"
      },
      {
        "w": "Thank you",
        "es": "Gracias",
        "e": "💐"
      },
      {
        "w": "Friend",
        "es": "Amigo(a)",
        "e": "🤝"
      },
      {
        "w": "Welcome",
        "es": "Bienvenida(o)",
        "e": "🎉"
      }
    ],
    "frenchVocab": [
      {
        "w": "Bonjour",
        "es": "Hola",
        "e": "👋"
      },
      {
        "w": "Cheval",
        "es": "Caballo",
        "e": "🐴"
      },
      {
        "w": "Je m'appelle",
        "es": "Me llamo",
        "e": "🏷️"
      },
      {
        "w": "Écurie",
        "es": "Establo",
        "e": "🏠"
      },
      {
        "w": "S'il te plaît",
        "es": "Por favor",
        "e": "🙏"
      },
      {
        "w": "Merci",
        "es": "Gracias",
        "e": "💐"
      },
      {
        "w": "Ami(e)",
        "es": "Amigo(a)",
        "e": "🤝"
      },
      {
        "w": "Bienvenue",
        "es": "Bienvenida(o)",
        "e": "🎉"
      }
    ],
    "englishDialogue": [
      {
        "t": "Hello! What's your name?",
        "es": "¡Hola! ¿Cómo te llamas?"
      },
      {
        "t": "My name is Miranda.",
        "es": "Me llamo Miranda."
      },
      {
        "t": "I have a horse!",
        "es": "¡Tengo un caballo!"
      },
      {
        "t": "Thank you for showing me the ranch!",
        "es": "¡Gracias por mostrarme el rancho!"
      },
      {
        "t": "You're welcome, friend!",
        "es": "¡De nada, amiga!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Bonjour! Comment tu t'appelles?",
        "es": "¡Hola! ¿Cómo te llamas?"
      },
      {
        "t": "Je m'appelle Miranda.",
        "es": "Me llamo Miranda."
      },
      {
        "t": "J'ai un cheval!",
        "es": "¡Tengo un caballo!"
      },
      {
        "t": "Merci de me montrer l'écurie!",
        "es": "¡Gracias por mostrarme el establo!"
      },
      {
        "t": "De rien, mon amie!",
        "es": "¡De nada, amiga!"
      }
    ],
    "journalPrompt": "Dibuja (o describe con palabras) cómo se ve tu caballo. ¿Qué nombre le pusiste y por qué? Escribe al menos 5 líneas.",
    "expedition": {
      "title": "Colombia en el mapa",
      "reading": "Colombia está en América del Sur. Su capital es Bogotá. Un mapa representa lugares con símbolos y una leyenda.",
      "project": "Dibuja el rancho y una ruta hasta una ciudad; crea cuatro símbolos y una leyenda.",
      "questions": [
        {
          "text": "¿En qué parte de América está Colombia?",
          "options": [
            "América del Sur",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "América del Sur",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre colombia en el mapa?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jueves 2 de julio",
    "title": "Lo que necesita un caballo",
    "subjectLabel": "Ciencias Naturales",
    "intro": "Antes de montar, hay que aprender a cuidar. Descubramos qué necesita un caballo para estar sano.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Cuál de estos NO es una necesidad básica de los seres vivos?",
        "options": [
          "Agua",
          "Alimento",
          "Aire",
          "Un teléfono"
        ],
        "answer": "Un teléfono",
        "cat": "cien"
      },
      {
        "text": "El caballo es un animal...",
        "options": [
          "Herbívoro",
          "Carnívoro",
          "Omnívoro",
          "Ninguno"
        ],
        "answer": "Herbívoro",
        "cat": "cien"
      },
      {
        "text": "¿Qué le da energía al caballo para trabajar?",
        "options": [
          "El alimento",
          "La música",
          "Los libros",
          "El silencio"
        ],
        "answer": "El alimento",
        "cat": "cien"
      },
      {
        "text": "¿Cada cuánto debe tomar agua limpia un caballo?",
        "options": [
          "Varias veces al día",
          "Una vez al mes",
          "Nunca",
          "Solo si llueve"
        ],
        "answer": "Varias veces al día",
        "cat": "cien"
      },
      {
        "text": "¿Por qué es importante que el establo esté limpio?",
        "options": [
          "Para evitar enfermedades",
          "Para que se vea bonito nada más",
          "No es importante",
          "Para que haga más calor"
        ],
        "answer": "Para evitar enfermedades",
        "cat": "cien"
      },
      {
        "text": "¿Qué parte del cuerpo usa el caballo para masticar el heno?",
        "options": [
          "Los dientes",
          "Las orejas",
          "La cola",
          "Los cascos"
        ],
        "answer": "Los dientes",
        "cat": "cien"
      }
    ],
    "englishVocab": [
      {
        "w": "Hay",
        "es": "Heno",
        "e": "🌾"
      },
      {
        "w": "Water",
        "es": "Agua",
        "e": "💧"
      },
      {
        "w": "Feed",
        "es": "Alimentar",
        "e": "🥕"
      },
      {
        "w": "Brush",
        "es": "Cepillo",
        "e": "🧹"
      },
      {
        "w": "Clean",
        "es": "Limpio",
        "e": "🧼"
      },
      {
        "w": "Healthy",
        "es": "Sano",
        "e": "💪"
      },
      {
        "w": "Grass",
        "es": "Pasto",
        "e": "🌱"
      },
      {
        "w": "Bucket",
        "es": "Balde",
        "e": "🪣"
      }
    ],
    "frenchVocab": [
      {
        "w": "Foin",
        "es": "Heno",
        "e": "🌾"
      },
      {
        "w": "Eau",
        "es": "Agua",
        "e": "💧"
      },
      {
        "w": "Nourrir",
        "es": "Alimentar",
        "e": "🥕"
      },
      {
        "w": "Brosse",
        "es": "Cepillo",
        "e": "🧹"
      },
      {
        "w": "Propre",
        "es": "Limpio",
        "e": "🧼"
      },
      {
        "w": "En bonne santé",
        "es": "Sano",
        "e": "💪"
      },
      {
        "w": "Herbe",
        "es": "Pasto",
        "e": "🌱"
      },
      {
        "w": "Seau",
        "es": "Balde",
        "e": "🪣"
      }
    ],
    "englishDialogue": [
      {
        "t": "Is the horse hungry?",
        "es": "¿El caballo tiene hambre?"
      },
      {
        "t": "Yes! Let's feed him hay and water.",
        "es": "¡Sí! Démosle heno y agua."
      },
      {
        "t": "Let's clean his bucket too.",
        "es": "Limpiemos también su balde."
      },
      {
        "t": "Good, now he is healthy and happy.",
        "es": "Bien, ahora está sano y feliz."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Le cheval a faim?",
        "es": "¿El caballo tiene hambre?"
      },
      {
        "t": "Oui! Donnons-lui du foin et de l'eau.",
        "es": "¡Sí! Démosle heno y agua."
      },
      {
        "t": "Nettoyons aussi son seau.",
        "es": "Limpiemos también su balde."
      },
      {
        "t": "Bien, maintenant il est en bonne santé.",
        "es": "Bien, ahora está sano."
      }
    ],
    "journalPrompt": "Escribe 5 cosas que necesita tu caballo cada día para estar sano y feliz, y explica por qué cada una es importante.",
    "expedition": {
      "title": "Puntos cardinales",
      "reading": "Los puntos cardinales son norte, sur, este y oeste. En un mapa convencional el norte suele estar arriba. La rosa de los vientos ayuda a orientarnos.",
      "project": "Dibuja una rosa de los vientos y da cuatro instrucciones para llegar al establo.",
      "questions": [
        {
          "text": "¿Qué dirección suele aparecer arriba en un mapa convencional?",
          "options": [
            "Norte",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Norte",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre puntos cardinales?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Viernes 3 de julio",
    "title": "Concurso de Bienvenida",
    "subjectLabel": "Repaso mixto",
    "isShowDay": true,
    "intro": "¡Primer Concurso Hípico del verano! Repasemos un poco de todo lo que hemos visto esta semana.",
    "subjectQuestions": [
      {
        "text": "Si el sol sale por el este, ¿por dónde se oculta?",
        "options": [
          "Oeste",
          "Norte",
          "Sur",
          "Centro"
        ],
        "answer": "Oeste",
        "cat": "soc"
      },
      {
        "text": "12 - 5 = ?",
        "options": [
          "5",
          "6",
          "7",
          "8"
        ],
        "answer": "7",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es el sinónimo de 'rápido'?",
        "options": [
          "Veloz",
          "Lento",
          "Triste",
          "Grande"
        ],
        "answer": "Veloz",
        "cat": "leng"
      },
      {
        "text": "¿Cuánto es 6 x 3?",
        "options": [
          "16",
          "18",
          "20",
          "9"
        ],
        "answer": "18",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es el antónimo de 'grande'?",
        "options": [
          "Pequeño",
          "Alto",
          "Fuerte",
          "Bonito"
        ],
        "answer": "Pequeño",
        "cat": "leng"
      },
      {
        "text": "¿Qué instrumento usamos para ubicarnos en un mapa?",
        "options": [
          "La brújula",
          "El termómetro",
          "La balanza",
          "El reloj"
        ],
        "answer": "La brújula",
        "cat": "soc"
      },
      {
        "text": "¿Cuál es la capital de Colombia?",
        "options": [
          "Medellín",
          "Bogotá",
          "Cali",
          "Barranquilla"
        ],
        "answer": "Bogotá",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "North",
        "es": "Norte",
        "e": "⬆️"
      },
      {
        "w": "South",
        "es": "Sur",
        "e": "⬇️"
      },
      {
        "w": "East",
        "es": "Este",
        "e": "➡️"
      },
      {
        "w": "West",
        "es": "Oeste",
        "e": "⬅️"
      },
      {
        "w": "Map",
        "es": "Mapa",
        "e": "🗺️"
      },
      {
        "w": "Sun",
        "es": "Sol",
        "e": "☀️"
      },
      {
        "w": "Ranch",
        "es": "Rancho",
        "e": "🏡"
      },
      {
        "w": "Fence",
        "es": "Cerca",
        "e": "🚧"
      }
    ],
    "frenchVocab": [
      {
        "w": "Nord",
        "es": "Norte",
        "e": "⬆️"
      },
      {
        "w": "Sud",
        "es": "Sur",
        "e": "⬇️"
      },
      {
        "w": "Est",
        "es": "Este",
        "e": "➡️"
      },
      {
        "w": "Ouest",
        "es": "Oeste",
        "e": "⬅️"
      },
      {
        "w": "Carte",
        "es": "Mapa",
        "e": "🗺️"
      },
      {
        "w": "Soleil",
        "es": "Sol",
        "e": "☀️"
      },
      {
        "w": "Ranch",
        "es": "Rancho",
        "e": "🏡"
      },
      {
        "w": "Clôture",
        "es": "Cerca",
        "e": "🚧"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the barn?",
        "es": "¿Dónde está el establo?"
      },
      {
        "t": "It's to the north, near the river.",
        "es": "Está al norte, cerca del río."
      },
      {
        "t": "The sun is shining today!",
        "es": "¡El sol brilla hoy!"
      },
      {
        "t": "Perfect day for our first ride.",
        "es": "Día perfecto para nuestro primer paseo."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est l'écurie?",
        "es": "¿Dónde está el establo?"
      },
      {
        "t": "Elle est au nord, près de la rivière.",
        "es": "Está al norte, cerca del río."
      },
      {
        "t": "Le soleil brille aujourd'hui!",
        "es": "¡El sol brilla hoy!"
      },
      {
        "t": "Jour parfait pour notre première balade.",
        "es": "Día perfecto para nuestro primer paseo."
      }
    ],
    "journalPrompt": "Cuenta cómo fue tu primera semana en el rancho. ¿Qué fue lo que más te gustó? Escribe al menos 5 líneas.",
    "expedition": {
      "title": "Escalas y distancias",
      "reading": "La escala relaciona la distancia del mapa con la real. Si un centímetro representa un kilómetro, tres centímetros representan tres kilómetros.",
      "project": "Traza una ruta de cinco centímetros y explica su distancia real con la escala del texto.",
      "questions": [
        {
          "text": "Con esa escala, ¿qué representan tres centímetros?",
          "options": [
            "Tres kilómetros",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Tres kilómetros",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre escalas y distancias?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Lunes 6 de julio",
    "title": "Raciones para mis caballos",
    "subjectLabel": "Matemáticas",
    "intro": "Hoy toca calcular cuánta comida y agua necesitan los caballos del establo.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Un caballo come 3 kg de heno. ¿Cuánto heno necesitan 3 caballos?",
        "options": [
          "6 kg",
          "9 kg",
          "12 kg",
          "3 kg"
        ],
        "answer": "9 kg",
        "cat": "mate"
      },
      {
        "text": "Cada caballo bebe 25 litros de agua. ¿Cuántos litros beben 2 caballos?",
        "options": [
          "25",
          "50",
          "75",
          "100"
        ],
        "answer": "50",
        "cat": "mate"
      },
      {
        "text": "¿Cuánto es 15 + 8?",
        "options": [
          "21",
          "22",
          "23",
          "24"
        ],
        "answer": "23",
        "cat": "mate"
      },
      {
        "text": "Si cada caballo come 3 kg de heno y tienes 4 caballos, ¿cuánto heno necesitas?",
        "options": [
          "9 kg",
          "12 kg",
          "15 kg",
          "10 kg"
        ],
        "answer": "12 kg",
        "cat": "mate"
      },
      {
        "text": "Un saco de alimento pesa 20 kg. Si usas 5 kg al día, ¿para cuántos días alcanza?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": "4",
        "cat": "mate"
      },
      {
        "text": "¿Cuánto es 40 ÷ 5?",
        "options": [
          "6",
          "7",
          "8",
          "9"
        ],
        "answer": "8",
        "cat": "mate"
      }
    ],
    "englishVocab": [
      {
        "w": "How much",
        "es": "Cuánto",
        "e": "❓"
      },
      {
        "w": "How many",
        "es": "Cuántos",
        "e": "🔢"
      },
      {
        "w": "Ten",
        "es": "Diez",
        "e": "🔟"
      },
      {
        "w": "Twenty",
        "es": "Veinte",
        "e": "2️⃣0️⃣"
      },
      {
        "w": "Bag",
        "es": "Saco/Bolsa",
        "e": "🛍️"
      },
      {
        "w": "Weigh",
        "es": "Pesar",
        "e": "⚖️"
      },
      {
        "w": "Enough",
        "es": "Suficiente",
        "e": "👍"
      },
      {
        "w": "Every day",
        "es": "Todos los días",
        "e": "📆"
      }
    ],
    "frenchVocab": [
      {
        "w": "Combien",
        "es": "Cuánto",
        "e": "❓"
      },
      {
        "w": "Dix",
        "es": "Diez",
        "e": "🔟"
      },
      {
        "w": "Vingt",
        "es": "Veinte",
        "e": "2️⃣0️⃣"
      },
      {
        "w": "Litre",
        "es": "Litro",
        "e": "🧴"
      },
      {
        "w": "Sac",
        "es": "Saco/Bolsa",
        "e": "🛍️"
      },
      {
        "w": "Peser",
        "es": "Pesar",
        "e": "⚖️"
      },
      {
        "w": "Assez",
        "es": "Suficiente",
        "e": "👍"
      },
      {
        "w": "Chaque jour",
        "es": "Todos los días",
        "e": "📆"
      }
    ],
    "englishDialogue": [
      {
        "t": "How much hay does the horse need?",
        "es": "¿Cuánto heno necesita el caballo?"
      },
      {
        "t": "It needs three kilograms.",
        "es": "Necesita tres kilogramos."
      },
      {
        "t": "Is this enough hay for today?",
        "es": "¿Es suficiente heno para hoy?"
      },
      {
        "t": "Yes, exactly enough!",
        "es": "¡Sí, justo suficiente!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Combien de foin le cheval a-t-il besoin?",
        "es": "¿Cuánto heno necesita el caballo?"
      },
      {
        "t": "Il a besoin de trois kilos.",
        "es": "Necesita tres kilos."
      },
      {
        "t": "Est-ce assez de foin pour aujourd'hui?",
        "es": "¿Es suficiente heno para hoy?"
      },
      {
        "t": "Oui, juste assez!",
        "es": "¡Sí, justo suficiente!"
      }
    ],
    "journalPrompt": "Si tuvieras 4 caballos, ¿cuánta comida y agua necesitarías cada día? Explica cómo lo calculaste, paso a paso.",
    "expedition": {
      "title": "Relieve colombiano",
      "reading": "Colombia tiene montañas, llanuras y valles. Una llanura es un terreno con pocos desniveles. El relieve influye en las rutas y las actividades de las personas.",
      "project": "Dibuja dos rutas para transportar alimento; compara una llanura y una montaña.",
      "questions": [
        {
          "text": "¿Qué terreno tiene pocos desniveles?",
          "options": [
            "Llanura",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Llanura",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre relieve colombiano?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Martes 7 de julio",
    "title": "Cómo cepillar a un caballo",
    "subjectLabel": "Lenguaje",
    "intro": "Vamos a escribir instrucciones, como las que usa el mozo de cuadra cada mañana.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Cuál es el primer paso para cepillar un caballo?",
        "options": [
          "Quitar el polvo del pelaje",
          "Darle de comer",
          "Ensillarlo",
          "Bañarlo con jabón"
        ],
        "answer": "Quitar el polvo del pelaje",
        "cat": "leng"
      },
      {
        "text": "Un texto instructivo sirve para...",
        "options": [
          "Explicar cómo hacer algo paso a paso",
          "Contar un cuento",
          "Describir un paisaje",
          "Expresar sentimientos"
        ],
        "answer": "Explicar cómo hacer algo paso a paso",
        "cat": "leng"
      },
      {
        "text": "¿Qué tipo de verbo se usa en instrucciones como 'Cepilla, moja, seca'?",
        "options": [
          "Verbos en imperativo",
          "Verbos en pasado",
          "Adjetivos",
          "Sustantivos"
        ],
        "answer": "Verbos en imperativo",
        "cat": "leng"
      },
      {
        "text": "¿Cuál palabra indica el último paso de una instrucción?",
        "options": [
          "Finalmente",
          "Primero",
          "Nunca",
          "Ayer"
        ],
        "answer": "Finalmente",
        "cat": "leng"
      },
      {
        "text": "En un texto instructivo, ¿qué se usa para organizar los pasos?",
        "options": [
          "Números o viñetas",
          "Rimas",
          "Colores solamente",
          "Nada"
        ],
        "answer": "Números o viñetas",
        "cat": "leng"
      },
      {
        "text": "¿Cuál de estas es una instrucción bien escrita?",
        "options": [
          "Cepilla el pelaje con cuidado",
          "El pelaje cepillar cuidado con",
          "Cepillando quizás pelaje",
          "Pelaje bonito muy"
        ],
        "answer": "Cepilla el pelaje con cuidado",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Brush",
        "es": "Cepilla",
        "e": "🧹"
      },
      {
        "w": "Comb",
        "es": "Peina",
        "e": "💇"
      },
      {
        "w": "Clean",
        "es": "Limpia",
        "e": "🧼"
      },
      {
        "w": "Feed",
        "es": "Alimenta",
        "e": "🥕"
      },
      {
        "w": "Careful",
        "es": "Con cuidado",
        "e": "🤲"
      },
      {
        "w": "Gently",
        "es": "Suavemente",
        "e": "🌸"
      },
      {
        "w": "Step",
        "es": "Paso",
        "e": "👣"
      },
      {
        "w": "Finish",
        "es": "Terminar",
        "e": "🏁"
      }
    ],
    "frenchVocab": [
      {
        "w": "Brosse",
        "es": "Cepilla",
        "e": "🧹"
      },
      {
        "w": "Peigne",
        "es": "Peina",
        "e": "💇"
      },
      {
        "w": "Nettoie",
        "es": "Limpia",
        "e": "🧼"
      },
      {
        "w": "Nourris",
        "es": "Alimenta",
        "e": "🥕"
      },
      {
        "w": "Avec soin",
        "es": "Con cuidado",
        "e": "🤲"
      },
      {
        "w": "Doucement",
        "es": "Suavemente",
        "e": "🌸"
      },
      {
        "w": "Étape",
        "es": "Paso",
        "e": "👣"
      },
      {
        "w": "Finir",
        "es": "Terminar",
        "e": "🏁"
      }
    ],
    "englishDialogue": [
      {
        "t": "Brush the mane, please.",
        "es": "Cepilla la crin, por favor."
      },
      {
        "t": "Okay! I will comb it gently.",
        "es": "¡Listo! La voy a peinar con cuidado."
      },
      {
        "t": "What is the next step?",
        "es": "¿Cuál es el siguiente paso?"
      },
      {
        "t": "Now we finish gently.",
        "es": "Ahora terminamos con suavidad."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Brosse la crinière, s'il te plaît.",
        "es": "Cepilla la crin, por favor."
      },
      {
        "t": "D'accord! Je vais la peigner doucement.",
        "es": "¡Listo! La voy a peinar con cuidado."
      },
      {
        "t": "Quelle est la prochaine étape?",
        "es": "¿Cuál es el siguiente paso?"
      },
      {
        "t": "Maintenant on finit doucement.",
        "es": "Ahora terminamos con suavidad."
      }
    ],
    "journalPrompt": "Escribe las instrucciones completas para bañar a un caballo (mínimo 6 pasos, usando verbos como 'moja', 'frota', 'enjuaga', 'seca').",
    "expedition": {
      "title": "Ríos y cuencas",
      "reading": "Una cuenca reúne las aguas que fluyen hacia un mismo río o cuerpo de agua. Cuidar el agua aguas arriba también ayuda a quienes viven aguas abajo.",
      "project": "Dibuja un río desde la montaña al rancho y marca tres maneras de evitar contaminarlo.",
      "questions": [
        {
          "text": "¿Cómo se llama el territorio cuyas aguas llegan a un mismo río?",
          "options": [
            "Cuenca",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Cuenca",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre ríos y cuencas?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Miércoles 8 de julio",
    "title": "El cuerpo del caballo",
    "subjectLabel": "Ciencias Naturales",
    "intro": "Comparemos el cuerpo del caballo con el nuestro: huesos, músculos y movimiento.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Qué parte del cuerpo usa el caballo para caminar y correr?",
        "options": [
          "Las patas",
          "Las orejas",
          "La cola",
          "Los ojos"
        ],
        "answer": "Las patas",
        "cat": "cien"
      },
      {
        "text": "El casco del caballo es como... en los humanos.",
        "options": [
          "La uña",
          "El cabello",
          "La oreja",
          "El diente"
        ],
        "answer": "La uña",
        "cat": "cien"
      },
      {
        "text": "¿Para qué le sirve la cola al caballo?",
        "options": [
          "Espantar insectos y mantener el equilibrio",
          "Para comer",
          "Para escuchar",
          "Para ver"
        ],
        "answer": "Espantar insectos y mantener el equilibrio",
        "cat": "cien"
      },
      {
        "text": "¿Cómo se llama el conjunto de huesos del cuerpo?",
        "options": [
          "Esqueleto",
          "Músculo",
          "Piel",
          "Sangre"
        ],
        "answer": "Esqueleto",
        "cat": "cien"
      },
      {
        "text": "¿Qué función cumplen los músculos?",
        "options": [
          "Permiten el movimiento",
          "Solo dan color",
          "No sirven para nada",
          "Sirven para respirar únicamente"
        ],
        "answer": "Permiten el movimiento",
        "cat": "cien"
      },
      {
        "text": "¿Qué parte protege el cerebro del caballo?",
        "options": [
          "El cráneo",
          "La cola",
          "Las patas",
          "El casco"
        ],
        "answer": "El cráneo",
        "cat": "cien"
      }
    ],
    "englishVocab": [
      {
        "w": "Hoof",
        "es": "Casco",
        "e": "🦶"
      },
      {
        "w": "Mane",
        "es": "Crin",
        "e": "💈"
      },
      {
        "w": "Tail",
        "es": "Cola",
        "e": "🎏"
      },
      {
        "w": "Leg",
        "es": "Pata",
        "e": "🦵"
      },
      {
        "w": "Bone",
        "es": "Hueso",
        "e": "🦴"
      },
      {
        "w": "Muscle",
        "es": "Músculo",
        "e": "💪"
      },
      {
        "w": "Skin",
        "es": "Piel",
        "e": "🫱"
      },
      {
        "w": "Ear",
        "es": "Oreja",
        "e": "👂"
      }
    ],
    "frenchVocab": [
      {
        "w": "Sabot",
        "es": "Casco",
        "e": "🦶"
      },
      {
        "w": "Crinière",
        "es": "Crin",
        "e": "💈"
      },
      {
        "w": "Queue",
        "es": "Cola",
        "e": "🎏"
      },
      {
        "w": "Jambe",
        "es": "Pata",
        "e": "🦵"
      },
      {
        "w": "Os",
        "es": "Hueso",
        "e": "🦴"
      },
      {
        "w": "Muscle",
        "es": "Músculo",
        "e": "💪"
      },
      {
        "w": "Peau",
        "es": "Piel",
        "e": "🫱"
      },
      {
        "w": "Oreille",
        "es": "Oreja",
        "e": "👂"
      }
    ],
    "englishDialogue": [
      {
        "t": "Look at the horse's mane!",
        "es": "¡Mira la crin del caballo!"
      },
      {
        "t": "It's so long and shiny.",
        "es": "Es tan larga y brillante."
      },
      {
        "t": "Horses have very strong bones.",
        "es": "Los caballos tienen huesos muy fuertes."
      },
      {
        "t": "And big muscles to run fast!",
        "es": "¡Y músculos grandes para correr rápido!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Regarde la crinière du cheval!",
        "es": "¡Mira la crin del caballo!"
      },
      {
        "t": "Elle est si longue et brillante.",
        "es": "Es tan larga y brillante."
      },
      {
        "t": "Les chevaux ont des os très forts.",
        "es": "Los caballos tienen huesos muy fuertes."
      },
      {
        "t": "Et de grands muscles pour courir vite!",
        "es": "¡Y músculos grandes para correr rápido!"
      }
    ],
    "journalPrompt": "Describe con palabras el cuerpo de un caballo, nombrando al menos 6 partes en español y explicando para qué sirve cada una.",
    "expedition": {
      "title": "Tiempo y clima",
      "reading": "El tiempo describe condiciones atmosféricas de un momento. El clima describe patrones de muchos años. Una tarde lluviosa no define por sí sola el clima.",
      "project": "Prepara una tabla para observar cinco días de tiempo y planifica el cuidado del caballo.",
      "questions": [
        {
          "text": "¿Qué describe la lluvia de esta tarde?",
          "options": [
            "El tiempo",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "El tiempo",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre tiempo y clima?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jueves 9 de julio",
    "title": "El rancho y su gente",
    "subjectLabel": "Ciencias Sociales",
    "intro": "¿Quién trabaja en un rancho? Descubramos los oficios y la economía ganadera de Colombia.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Qué actividad económica se relaciona con la cría de caballos y ganado?",
        "options": [
          "La ganadería",
          "La pesca",
          "La minería",
          "El comercio digital"
        ],
        "answer": "La ganadería",
        "cat": "soc"
      },
      {
        "text": "¿Qué región de Colombia es reconocida por su tradición ganadera y de caballos de paso fino?",
        "options": [
          "Los Llanos Orientales",
          "El Amazonas profundo",
          "La Guajira desértica",
          "Ninguna"
        ],
        "answer": "Los Llanos Orientales",
        "cat": "soc"
      },
      {
        "text": "El trabajo de cuidar y entrenar caballos lo hace un...",
        "options": [
          "Palafrenero (mozo de cuadra)",
          "Panadero",
          "Piloto",
          "Contador"
        ],
        "answer": "Palafrenero (mozo de cuadra)",
        "cat": "soc"
      },
      {
        "text": "¿Qué es una economía rural?",
        "options": [
          "La que depende del campo y la ganadería",
          "La que solo depende de la tecnología",
          "La que no existe",
          "La del mar únicamente"
        ],
        "answer": "La que depende del campo y la ganadería",
        "cat": "soc"
      },
      {
        "text": "¿Qué producto agrícola exporta mucho Colombia?",
        "options": [
          "Café",
          "Nieve",
          "Petróleo del desierto",
          "Ninguno"
        ],
        "answer": "Café",
        "cat": "soc"
      },
      {
        "text": "¿Por qué es importante cuidar a los animales de trabajo?",
        "options": [
          "Porque ayudan en las labores del campo",
          "No es importante",
          "Porque son decorativos",
          "Porque cuestan dinero solamente"
        ],
        "answer": "Porque ayudan en las labores del campo",
        "cat": "soc"
      },
      {
        "text": "¿Qué es la línea ecuatorial?",
        "options": [
          "Una línea imaginaria que divide la Tierra",
          "Una montaña",
          "Un río",
          "Una frontera"
        ],
        "answer": "Una línea imaginaria que divide la Tierra",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Farmer",
        "es": "Granjero",
        "e": "🧑‍🌾"
      },
      {
        "w": "Groom",
        "es": "Mozo de cuadra",
        "e": "🧑‍🔧"
      },
      {
        "w": "Vet",
        "es": "Veterinario",
        "e": "🩺"
      },
      {
        "w": "Rider",
        "es": "Jinete",
        "e": "🏇"
      },
      {
        "w": "Work",
        "es": "Trabajo",
        "e": "🔨"
      },
      {
        "w": "Countryside",
        "es": "Campo",
        "e": "🌾"
      },
      {
        "w": "Export",
        "es": "Exportar",
        "e": "🚢"
      },
      {
        "w": "Coffee",
        "es": "Café",
        "e": "☕"
      }
    ],
    "frenchVocab": [
      {
        "w": "Fermier",
        "es": "Granjero",
        "e": "🧑‍🌾"
      },
      {
        "w": "Palefrenier",
        "es": "Mozo de cuadra",
        "e": "🧑‍🔧"
      },
      {
        "w": "Vétérinaire",
        "es": "Veterinario",
        "e": "🩺"
      },
      {
        "w": "Cavalier",
        "es": "Jinete",
        "e": "🏇"
      },
      {
        "w": "Travail",
        "es": "Trabajo",
        "e": "🔨"
      },
      {
        "w": "Campagne",
        "es": "Campo",
        "e": "🌾"
      },
      {
        "w": "Exporter",
        "es": "Exportar",
        "e": "🚢"
      },
      {
        "w": "Café",
        "es": "Café",
        "e": "☕"
      }
    ],
    "englishDialogue": [
      {
        "t": "What do you want to be?",
        "es": "¿Qué quieres ser?"
      },
      {
        "t": "I want to be a horse rider!",
        "es": "¡Quiero ser jinete!"
      },
      {
        "t": "My family works in the countryside.",
        "es": "Mi familia trabaja en el campo."
      },
      {
        "t": "Colombia exports a lot of coffee!",
        "es": "¡Colombia exporta mucho café!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Que veux-tu être?",
        "es": "¿Qué quieres ser?"
      },
      {
        "t": "Je veux être cavalière!",
        "es": "¡Quiero ser jinete!"
      },
      {
        "t": "Ma famille travaille à la campagne.",
        "es": "Mi familia trabaja en el campo."
      },
      {
        "t": "La Colombie exporte beaucoup de café!",
        "es": "¡Colombia exporta mucho café!"
      }
    ],
    "journalPrompt": "¿Qué oficio del rancho te gustaría tener? Explica por qué, y describe cómo sería un día normal de trabajo en ese oficio.",
    "expedition": {
      "title": "Altitud y temperatura",
      "reading": "La altitud es la altura respecto al nivel del mar. En general, al subir una montaña la temperatura disminuye. También influyen otros factores.",
      "project": "Compara ropa y cuidados para visitar un rancho cálido y otro de montaña.",
      "questions": [
        {
          "text": "En general, ¿qué sucede con la temperatura al subir una montaña?",
          "options": [
            "Disminuye",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Disminuye",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre altitud y temperatura?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Viernes 10 de julio",
    "title": "Concurso Hípico #1",
    "subjectLabel": "Repaso de la semana",
    "isShowDay": true,
    "intro": "¡Es viernes de concurso! Organicemos el horario completo del establo con todo lo aprendido esta semana.",
    "subjectQuestions": [
      {
        "text": "El establo abre a las 6:00 am y el entrenamiento dura 2 horas. ¿A qué hora termina?",
        "options": [
          "7:00 am",
          "8:00 am",
          "9:00 am",
          "6:30 am"
        ],
        "answer": "8:00 am",
        "cat": "mate"
      },
      {
        "text": "Ordena: para montar primero hay que...",
        "options": [
          "Cepillar",
          "Ensillar",
          "Montar",
          "Ninguna de las anteriores"
        ],
        "answer": "Cepillar",
        "cat": "leng"
      },
      {
        "text": "¿Qué debe revisar el mozo de cuadra antes de montar?",
        "options": [
          "Que la silla esté bien puesta",
          "Que llueva",
          "Que haya luna llena",
          "Nada"
        ],
        "answer": "Que la silla esté bien puesta",
        "cat": "cien"
      },
      {
        "text": "Si el entrenamiento empieza a las 7:00 am y dura 90 minutos, ¿a qué hora termina?",
        "options": [
          "8:00 am",
          "8:30 am",
          "9:00 am",
          "7:30 am"
        ],
        "answer": "8:30 am",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es el sinónimo de 'limpio'?",
        "options": [
          "Aseado",
          "Sucio",
          "Roto",
          "Viejo"
        ],
        "answer": "Aseado",
        "cat": "leng"
      },
      {
        "text": "¿Qué debemos revisar en los cascos del caballo antes de montar?",
        "options": [
          "Que estén limpios y sin piedras",
          "Que tengan color bonito",
          "Nada",
          "Que sean grandes"
        ],
        "answer": "Que estén limpios y sin piedras",
        "cat": "cien"
      }
    ],
    "englishVocab": [
      {
        "w": "Morning",
        "es": "Mañana",
        "e": "🌅"
      },
      {
        "w": "Feed time",
        "es": "Hora de comer",
        "e": "⏰"
      },
      {
        "w": "Brush",
        "es": "Cepillar",
        "e": "🧹"
      },
      {
        "w": "Ride",
        "es": "Montar",
        "e": "🏇"
      },
      {
        "w": "Routine",
        "es": "Rutina",
        "e": "🔁"
      },
      {
        "w": "Check",
        "es": "Revisar",
        "e": "🔍"
      },
      {
        "w": "Ready",
        "es": "Listo",
        "e": "✅"
      },
      {
        "w": "Start",
        "es": "Empezar",
        "e": "🏁"
      }
    ],
    "frenchVocab": [
      {
        "w": "Matin",
        "es": "Mañana",
        "e": "🌅"
      },
      {
        "w": "Heure du repas",
        "es": "Hora de comer",
        "e": "⏰"
      },
      {
        "w": "Brosser",
        "es": "Cepillar",
        "e": "🧹"
      },
      {
        "w": "Monter",
        "es": "Montar",
        "e": "🏇"
      },
      {
        "w": "Routine",
        "es": "Rutina",
        "e": "🔁"
      },
      {
        "w": "Vérifier",
        "es": "Revisar",
        "e": "🔍"
      },
      {
        "w": "Prêt",
        "es": "Listo",
        "e": "✅"
      },
      {
        "w": "Commencer",
        "es": "Empezar",
        "e": "🏁"
      }
    ],
    "englishDialogue": [
      {
        "t": "What time do we feed the horses?",
        "es": "¿A qué hora alimentamos a los caballos?"
      },
      {
        "t": "At seven in the morning!",
        "es": "¡A las siete de la mañana!"
      },
      {
        "t": "Are we ready to start?",
        "es": "¿Estamos listos para empezar?"
      },
      {
        "t": "Let's check everything first.",
        "es": "Revisemos todo primero."
      }
    ],
    "frenchDialogue": [
      {
        "t": "À quelle heure nourrit-on les chevaux?",
        "es": "¿A qué hora alimentamos a los caballos?"
      },
      {
        "t": "À sept heures du matin!",
        "es": "¡A las siete de la mañana!"
      },
      {
        "t": "Sommes-nous prêts à commencer?",
        "es": "¿Estamos listos para empezar?"
      },
      {
        "t": "Vérifions tout d'abord.",
        "es": "Revisemos todo primero."
      }
    ],
    "journalPrompt": "Escribe el horario ideal de un día completo en el establo, desde que abre hasta que cierra.",
    "expedition": {
      "title": "Región Caribe",
      "reading": "La región Caribe colombiana está al norte del país junto al mar Caribe. Tiene diversidad de paisajes, comunidades y actividades económicas.",
      "project": "Crea una postal con costa, comunidad y una pregunta respetuosa sobre su vida cotidiana.",
      "questions": [
        {
          "text": "¿Qué mar bordea la región Caribe?",
          "options": [
            "Mar Caribe",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Mar Caribe",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre región caribe?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Lunes 13 de julio",
    "title": "Construyendo el corral",
    "subjectLabel": "Matemáticas",
    "intro": "Hoy diseñamos un corral nuevo: toca calcular perímetro y área.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Un corral rectangular mide 5 m de largo y 3 m de ancho. ¿Cuál es su perímetro?",
        "options": [
          "8 m",
          "15 m",
          "16 m",
          "10 m"
        ],
        "answer": "16 m",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es el área de ese mismo corral (5 m x 3 m)?",
        "options": [
          "8",
          "15",
          "16",
          "20"
        ],
        "answer": "15",
        "cat": "mate"
      },
      {
        "text": "¿Cuántos lados tiene un corral con forma de cuadrado?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": "4",
        "cat": "mate"
      },
      {
        "text": "Un corral cuadrado tiene lados de 4 m. ¿Cuál es su área?",
        "options": [
          "8",
          "12",
          "16",
          "20"
        ],
        "answer": "16",
        "cat": "mate"
      },
      {
        "text": "Si necesito 20 m de cerca y ya tengo 12 m, ¿cuántos metros me faltan?",
        "options": [
          "6",
          "8",
          "10",
          "12"
        ],
        "answer": "8",
        "cat": "mate"
      },
      {
        "text": "¿Cuántos lados tiene un hexágono (como algunos corrales)?",
        "options": [
          "4",
          "5",
          "6",
          "7"
        ],
        "answer": "6",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es el río más largo de América del Sur?",
        "options": [
          "Río de la Plata",
          "Amazonas",
          "Orinoco",
          "Magdalena"
        ],
        "answer": "Amazonas",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Shape",
        "es": "Forma",
        "e": "🔷"
      },
      {
        "w": "Square",
        "es": "Cuadrado",
        "e": "⬛"
      },
      {
        "w": "Fence",
        "es": "Cerca",
        "e": "🚧"
      },
      {
        "w": "Meter",
        "es": "Metro",
        "e": "📏"
      },
      {
        "w": "Wide",
        "es": "Ancho",
        "e": "↔️"
      },
      {
        "w": "Long",
        "es": "Largo",
        "e": "📐"
      },
      {
        "w": "Build",
        "es": "Construir",
        "e": "🔨"
      },
      {
        "w": "Wood",
        "es": "Madera",
        "e": "🪵"
      }
    ],
    "frenchVocab": [
      {
        "w": "Forme",
        "es": "Forma",
        "e": "🔷"
      },
      {
        "w": "Carré",
        "es": "Cuadrado",
        "e": "⬛"
      },
      {
        "w": "Clôture",
        "es": "Cerca",
        "e": "🚧"
      },
      {
        "w": "Mètre",
        "es": "Metro",
        "e": "📏"
      },
      {
        "w": "Large",
        "es": "Ancho",
        "e": "↔️"
      },
      {
        "w": "Long",
        "es": "Largo",
        "e": "📐"
      },
      {
        "w": "Construire",
        "es": "Construir",
        "e": "🔨"
      },
      {
        "w": "Bois",
        "es": "Madera",
        "e": "🪵"
      }
    ],
    "englishDialogue": [
      {
        "t": "We need a new fence.",
        "es": "Necesitamos una cerca nueva."
      },
      {
        "t": "How many meters do we need?",
        "es": "¿Cuántos metros necesitamos?"
      },
      {
        "t": "How wide should the fence be?",
        "es": "¿Qué tan ancha debe ser la cerca?"
      },
      {
        "t": "Let's build it with strong wood.",
        "es": "Construyámosla con madera fuerte."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Nous avons besoin d'une nouvelle clôture.",
        "es": "Necesitamos una cerca nueva."
      },
      {
        "t": "Combien de mètres avons-nous besoin?",
        "es": "¿Cuántos metros necesitamos?"
      },
      {
        "t": "Quelle largeur pour la clôture?",
        "es": "¿Qué tan ancha debe ser la cerca?"
      },
      {
        "t": "Construisons-la avec du bois solide.",
        "es": "Construyámosla con madera fuerte."
      }
    ],
    "journalPrompt": "Diseña tu propio corral: describe su forma, sus medidas, y calcula su perímetro y su área.",
    "expedition": {
      "title": "Región Pacífica",
      "reading": "La región Pacífica tiene costa sobre el océano Pacífico. Sus bosques, ríos y comunidades forman parte de un territorio diverso.",
      "project": "Diseña una ruta que combine río y camino; explica por qué cuidarías el bosque.",
      "questions": [
        {
          "text": "¿Qué océano bordea esta región?",
          "options": [
            "Océano Pacífico",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Océano Pacífico",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre región pacífica?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Martes 14 de julio",
    "title": "El caballo y el burro (fábula)",
    "subjectLabel": "Lenguaje",
    "intro": "Leamos una fábula sobre un caballo y un burro, y busquemos su moraleja.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Qué es la moraleja de una fábula?",
        "options": [
          "La enseñanza que deja la historia",
          "El título del cuento",
          "El nombre del autor",
          "La fecha"
        ],
        "answer": "La enseñanza que deja la historia",
        "cat": "leng"
      },
      {
        "text": "En las fábulas, los animales generalmente...",
        "options": [
          "Hablan y actúan como personas",
          "No aparecen",
          "Solo corren",
          "Vuelan"
        ],
        "answer": "Hablan y actúan como personas",
        "cat": "leng"
      },
      {
        "text": "¿Cuál es un personaje típico de una fábula de caballos?",
        "options": [
          "El caballo trabajador y el burro perezoso",
          "Un robot",
          "Un carro",
          "Un celular"
        ],
        "answer": "El caballo trabajador y el burro perezoso",
        "cat": "leng"
      },
      {
        "text": "¿Qué es un personaje principal?",
        "options": [
          "El que vive la historia central",
          "Un lugar de la historia",
          "El título del libro",
          "El autor"
        ],
        "answer": "El que vive la historia central",
        "cat": "leng"
      },
      {
        "text": "¿Las fábulas casi siempre tienen...?",
        "options": [
          "Una enseñanza o moraleja",
          "Solo dibujos",
          "Números",
          "Ninguna enseñanza"
        ],
        "answer": "Una enseñanza o moraleja",
        "cat": "leng"
      },
      {
        "text": "¿Qué palabra podría iniciar una fábula?",
        "options": [
          "Había una vez",
          "Mañana será",
          "Ahora mismo",
          "Nunca"
        ],
        "answer": "Había una vez",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Once upon a time",
        "es": "Había una vez",
        "e": "📖"
      },
      {
        "w": "Story",
        "es": "Historia",
        "e": "📚"
      },
      {
        "w": "Moral",
        "es": "Moraleja",
        "e": "💡"
      },
      {
        "w": "Fable",
        "es": "Fábula",
        "e": "🦊"
      },
      {
        "w": "Character",
        "es": "Personaje",
        "e": "🎭"
      },
      {
        "w": "Lesson",
        "es": "Enseñanza",
        "e": "🎓"
      },
      {
        "w": "Donkey",
        "es": "Burro",
        "e": "🫏"
      },
      {
        "w": "Heavy",
        "es": "Pesado",
        "e": "🏋️"
      }
    ],
    "frenchVocab": [
      {
        "w": "Il était une fois",
        "es": "Había una vez",
        "e": "📖"
      },
      {
        "w": "Histoire",
        "es": "Historia",
        "e": "📚"
      },
      {
        "w": "Morale",
        "es": "Moraleja",
        "e": "💡"
      },
      {
        "w": "Fable",
        "es": "Fábula",
        "e": "🦊"
      },
      {
        "w": "Personnage",
        "es": "Personaje",
        "e": "🎭"
      },
      {
        "w": "Leçon",
        "es": "Enseñanza",
        "e": "🎓"
      },
      {
        "w": "Âne",
        "es": "Burro",
        "e": "🫏"
      },
      {
        "w": "Lourd",
        "es": "Pesado",
        "e": "🏋️"
      }
    ],
    "englishDialogue": [
      {
        "t": "Do you know this fable?",
        "es": "¿Conoces esta fábula?"
      },
      {
        "t": "Yes, the moral is: work together!",
        "es": "Sí, la moraleja es: ¡trabajar en equipo!"
      },
      {
        "t": "Who is the main character?",
        "es": "¿Quién es el personaje principal?"
      },
      {
        "t": "The horse, and also the donkey.",
        "es": "El caballo, y también el burro."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Connais-tu cette fable?",
        "es": "¿Conoces esta fábula?"
      },
      {
        "t": "Oui, la morale est: travaillons ensemble!",
        "es": "Sí, la moraleja es: ¡trabajemos juntos!"
      },
      {
        "t": "Qui est le personnage principal?",
        "es": "¿Quién es el personaje principal?"
      },
      {
        "t": "Le cheval, et aussi l'âne.",
        "es": "El caballo, y también el burro."
      }
    ],
    "journalPrompt": "Inventa el final de esta fábula: 'Un caballo y un burro cargaban bultos muy pesados...' Escribe al menos 6 líneas e incluye una moraleja.",
    "expedition": {
      "title": "Región Andina",
      "reading": "Los Andes colombianos se organizan en tres cordilleras principales: Occidental, Central y Oriental. Entre ellas hay valles y numerosos asentamientos.",
      "project": "Representa las tres cordilleras con líneas y agrega un valle y una ruta segura.",
      "questions": [
        {
          "text": "¿Cuántas cordilleras principales menciona el texto?",
          "options": [
            "Tres",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Tres",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre región andina?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Miércoles 15 de julio",
    "title": "El agua del bebedero",
    "subjectLabel": "Ciencias Naturales",
    "intro": "¿De dónde viene el agua que beben los caballos? Sigamos el ciclo del agua.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Cuál es el primer paso del ciclo del agua?",
        "options": [
          "Evaporación",
          "Un terremoto",
          "Un nevado",
          "Ninguno"
        ],
        "answer": "Evaporación",
        "cat": "cien"
      },
      {
        "text": "El agua de lluvia llena los... para que beban los caballos.",
        "options": [
          "Bebederos y ríos",
          "Libros",
          "Sillas",
          "Cepillos"
        ],
        "answer": "Bebederos y ríos",
        "cat": "cien"
      },
      {
        "text": "¿Qué pasa cuando el agua se evapora?",
        "options": [
          "Sube al cielo y forma nubes",
          "Desaparece para siempre",
          "Se congela",
          "Se vuelve tierra"
        ],
        "answer": "Sube al cielo y forma nubes",
        "cat": "cien"
      },
      {
        "text": "¿Cómo se llama cuando el agua sube al cielo en forma de vapor?",
        "options": [
          "Evaporación",
          "Congelación",
          "Fusión",
          "Ninguna"
        ],
        "answer": "Evaporación",
        "cat": "cien"
      },
      {
        "text": "¿Cómo se llama cuando cae el agua de las nubes?",
        "options": [
          "Precipitación (lluvia)",
          "Evaporación",
          "Sequía",
          "Erupción"
        ],
        "answer": "Precipitación (lluvia)",
        "cat": "cien"
      },
      {
        "text": "¿Por qué es importante cuidar el agua?",
        "options": [
          "Es un recurso limitado y necesario para la vida",
          "Es infinita",
          "No es importante",
          "Solo sirve para bañarse"
        ],
        "answer": "Es un recurso limitado y necesario para la vida",
        "cat": "cien"
      },
      {
        "text": "¿En qué siglo llegó Cristóbal Colón a América?",
        "options": [
          "Siglo XV",
          "Siglo XVI",
          "Siglo XVII",
          "Siglo XVIII"
        ],
        "answer": "Siglo XV",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Rain",
        "es": "Lluvia",
        "e": "🌧️"
      },
      {
        "w": "Cloud",
        "es": "Nube",
        "e": "☁️"
      },
      {
        "w": "River",
        "es": "Río",
        "e": "🏞️"
      },
      {
        "w": "Water cycle",
        "es": "Ciclo del agua",
        "e": "🔄"
      },
      {
        "w": "Steam",
        "es": "Vapor",
        "e": "💨"
      },
      {
        "w": "Drop",
        "es": "Gota",
        "e": "💧"
      },
      {
        "w": "Sky",
        "es": "Cielo",
        "e": "🌤️"
      },
      {
        "w": "Important",
        "es": "Importante",
        "e": "❗"
      }
    ],
    "frenchVocab": [
      {
        "w": "Pluie",
        "es": "Lluvia",
        "e": "🌧️"
      },
      {
        "w": "Nuage",
        "es": "Nube",
        "e": "☁️"
      },
      {
        "w": "Rivière",
        "es": "Río",
        "e": "🏞️"
      },
      {
        "w": "Cycle de l'eau",
        "es": "Ciclo del agua",
        "e": "🔄"
      },
      {
        "w": "Vapeur",
        "es": "Vapor",
        "e": "💨"
      },
      {
        "w": "Goutte",
        "es": "Gota",
        "e": "💧"
      },
      {
        "w": "Ciel",
        "es": "Cielo",
        "e": "🌤️"
      },
      {
        "w": "Important",
        "es": "Importante",
        "e": "❗"
      }
    ],
    "englishDialogue": [
      {
        "t": "It's raining!",
        "es": "¡Está lloviendo!"
      },
      {
        "t": "Great, the horses will have more water.",
        "es": "Genial, los caballos tendrán más agua."
      },
      {
        "t": "Look, steam rises to the sky!",
        "es": "¡Mira, el vapor sube al cielo!"
      },
      {
        "t": "Water is very important to us.",
        "es": "El agua es muy importante para nosotros."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Il pleut!",
        "es": "¡Está lloviendo!"
      },
      {
        "t": "Super, les chevaux auront plus d'eau.",
        "es": "Genial, los caballos tendrán más agua."
      },
      {
        "t": "Regarde, la vapeur monte au ciel!",
        "es": "¡Mira, el vapor sube al cielo!"
      },
      {
        "t": "L'eau est très importante pour nous.",
        "es": "El agua es muy importante para nosotros."
      }
    ],
    "journalPrompt": "Explica con tus palabras (y dibujos si quieres) cómo el agua de lluvia llega hasta el bebedero de los caballos, paso a paso.",
    "expedition": {
      "title": "Orinoquía",
      "reading": "La Orinoquía incluye extensas llanuras y forma parte de la cuenca del Orinoco. Las temporadas de lluvia y sequía influyen en la vida local.",
      "project": "Escribe un plan de agua y alimento para los caballos durante dos temporadas distintas.",
      "questions": [
        {
          "text": "¿Con qué río se relaciona el nombre Orinoquía?",
          "options": [
            "Orinoco",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Orinoco",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre orinoquía?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jueves 16 de julio",
    "title": "El mapa del rancho",
    "subjectLabel": "Ciencias Sociales",
    "intro": "Vamos a trazar rutas de cabalgata usando el mapa y los puntos cardinales.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Si el río está al norte del establo, ¿hacia dónde debo caminar para llegar?",
        "options": [
          "Hacia arriba en el mapa (norte)",
          "Hacia abajo (sur)",
          "Hacia la derecha (este)",
          "No importa"
        ],
        "answer": "Hacia arriba en el mapa (norte)",
        "cat": "soc"
      },
      {
        "text": "¿Qué instrumento nos ayuda a saber dónde queda el norte?",
        "options": [
          "La brújula",
          "El termómetro",
          "La regla",
          "El reloj"
        ],
        "answer": "La brújula",
        "cat": "soc"
      },
      {
        "text": "En un mapa, ¿qué representan las líneas de una ruta?",
        "options": [
          "El camino a seguir",
          "Los colores del cielo",
          "Nada",
          "Los nombres de los caballos"
        ],
        "answer": "El camino a seguir",
        "cat": "soc"
      },
      {
        "text": "¿Qué representan los colores en un mapa?",
        "options": [
          "Diferentes tipos de terreno o zonas",
          "Nada",
          "Solo decoración",
          "El clima del día"
        ],
        "answer": "Diferentes tipos de terreno o zonas",
        "cat": "soc"
      },
      {
        "text": "¿Qué es una ruta?",
        "options": [
          "El camino que se sigue para llegar a un lugar",
          "Un tipo de animal",
          "Un instrumento musical",
          "Una comida"
        ],
        "answer": "El camino que se sigue para llegar a un lugar",
        "cat": "soc"
      },
      {
        "text": "Si camino hacia el este y luego hacia el sur, ¿qué dirección general tomé?",
        "options": [
          "Sureste",
          "Noroeste",
          "Norte",
          "Oeste"
        ],
        "answer": "Sureste",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa",
        "e": "🗺️"
      },
      {
        "w": "Compass",
        "es": "Brújula",
        "e": "🧭"
      },
      {
        "w": "North",
        "es": "Norte",
        "e": "⬆️"
      },
      {
        "w": "River",
        "es": "Río",
        "e": "🏞️"
      },
      {
        "w": "Direction",
        "es": "Dirección",
        "e": "🧭"
      },
      {
        "w": "Path",
        "es": "Camino",
        "e": "🛤️"
      },
      {
        "w": "Forest",
        "es": "Bosque",
        "e": "🌲"
      },
      {
        "w": "Near",
        "es": "Cerca",
        "e": "📍"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa",
        "e": "🗺️"
      },
      {
        "w": "Boussole",
        "es": "Brújula",
        "e": "🧭"
      },
      {
        "w": "Nord",
        "es": "Norte",
        "e": "⬆️"
      },
      {
        "w": "Rivière",
        "es": "Río",
        "e": "🏞️"
      },
      {
        "w": "Direction",
        "es": "Dirección",
        "e": "🧭"
      },
      {
        "w": "Chemin",
        "es": "Camino",
        "e": "🛤️"
      },
      {
        "w": "Forêt",
        "es": "Bosque",
        "e": "🌲"
      },
      {
        "w": "Près",
        "es": "Cerca",
        "e": "📍"
      }
    ],
    "englishDialogue": [
      {
        "t": "Which way is the river?",
        "es": "¿Hacia dónde queda el río?"
      },
      {
        "t": "Go north, then turn east.",
        "es": "Ve al norte, luego gira al este."
      },
      {
        "t": "Which direction is the forest?",
        "es": "¿En qué dirección está el bosque?"
      },
      {
        "t": "It's near the river, to the north.",
        "es": "Está cerca del río, al norte."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Quelle direction pour la rivière?",
        "es": "¿Hacia dónde queda el río?"
      },
      {
        "t": "Va au nord, puis tourne à l'est.",
        "es": "Ve al norte, luego gira al este."
      },
      {
        "t": "Dans quelle direction est la forêt?",
        "es": "¿En qué dirección está el bosque?"
      },
      {
        "t": "Elle est près de la rivière, au nord.",
        "es": "Está cerca del río, al norte."
      }
    ],
    "journalPrompt": "Describe un mapa sencillo del rancho: dónde está el establo, el río, el bosque y los corrales. Usa los puntos cardinales.",
    "expedition": {
      "title": "Amazonía",
      "reading": "La Amazonía alberga selvas, ríos y pueblos diversos. Protegerla implica cuidar la biodiversidad y respetar los conocimientos y derechos de sus comunidades.",
      "project": "Diseña un cartel de visita responsable con tres acciones y una explicación.",
      "questions": [
        {
          "text": "¿Cómo llamamos a la diversidad de seres vivos?",
          "options": [
            "Biodiversidad",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Biodiversidad",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre amazonía?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Viernes 17 de julio",
    "title": "Concurso Hípico #2",
    "subjectLabel": "Carrera de orientación",
    "isShowDay": true,
    "intro": "¡Carrera de orientación! Usa el mapa, calcula distancias y sigue las pistas.",
    "subjectQuestions": [
      {
        "text": "La ruta mide 12 km y ya recorriste 7 km. ¿Cuántos km faltan?",
        "options": [
          "4",
          "5",
          "6",
          "7"
        ],
        "answer": "5",
        "cat": "mate"
      },
      {
        "text": "La pista dice 'gira a la izquierda después del río'. ¿Qué debes hacer primero?",
        "options": [
          "Cruzar el río",
          "Girar",
          "Ambas a la vez",
          "Ninguna"
        ],
        "answer": "Cruzar el río",
        "cat": "leng"
      },
      {
        "text": "¿Qué región de Colombia tiene llanuras ideales para cabalgar largas distancias?",
        "options": [
          "Los Llanos Orientales",
          "La alta montaña nevada",
          "El fondo del mar",
          "Ninguna"
        ],
        "answer": "Los Llanos Orientales",
        "cat": "soc"
      },
      {
        "text": "La ruta completa mide 20 km. Si ya llevas la mitad, ¿cuántos km has recorrido?",
        "options": [
          "5",
          "10",
          "15",
          "20"
        ],
        "answer": "10",
        "cat": "mate"
      },
      {
        "text": "¿Qué tipo de palabra es 'rápidamente'?",
        "options": [
          "Adverbio",
          "Sustantivo",
          "Verbo",
          "Artículo"
        ],
        "answer": "Adverbio",
        "cat": "leng"
      },
      {
        "text": "¿Qué debemos llevar siempre en una cabalgata larga?",
        "options": [
          "Agua y un mapa",
          "Nada",
          "Solo dulces",
          "Un televisor"
        ],
        "answer": "Agua y un mapa",
        "cat": "soc"
      },
      {
        "text": "¿Quiénes eran los muiscas?",
        "options": [
          "Pueblo indígena de Colombia",
          "Conquistadores españoles",
          "Animales del rancho",
          "Plantas"
        ],
        "answer": "Pueblo indígena de Colombia",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Turn left",
        "es": "Gira a la izquierda",
        "e": "⬅️"
      },
      {
        "w": "Turn right",
        "es": "Gira a la derecha",
        "e": "➡️"
      },
      {
        "w": "Straight",
        "es": "Derecho",
        "e": "⬆️"
      },
      {
        "w": "Distance",
        "es": "Distancia",
        "e": "📏"
      },
      {
        "w": "Halfway",
        "es": "A mitad de camino",
        "e": "➗"
      },
      {
        "w": "Finish line",
        "es": "Meta",
        "e": "🏁"
      },
      {
        "w": "Fast",
        "es": "Rápido",
        "e": "⚡"
      },
      {
        "w": "Slow",
        "es": "Lento",
        "e": "🐢"
      }
    ],
    "frenchVocab": [
      {
        "w": "Tourne à gauche",
        "es": "Gira a la izquierda",
        "e": "⬅️"
      },
      {
        "w": "Tourne à droite",
        "es": "Gira a la derecha",
        "e": "➡️"
      },
      {
        "w": "Tout droit",
        "es": "Derecho",
        "e": "⬆️"
      },
      {
        "w": "Distance",
        "es": "Distancia",
        "e": "📏"
      },
      {
        "w": "À mi-chemin",
        "es": "A mitad de camino",
        "e": "➗"
      },
      {
        "w": "Ligne d'arrivée",
        "es": "Meta",
        "e": "🏁"
      },
      {
        "w": "Rapide",
        "es": "Rápido",
        "e": "⚡"
      },
      {
        "w": "Lent",
        "es": "Lento",
        "e": "🐢"
      }
    ],
    "englishDialogue": [
      {
        "t": "Turn left, then go straight!",
        "es": "¡Gira a la izquierda y luego sigue derecho!"
      },
      {
        "t": "Got it, I can see the finish line!",
        "es": "¡Entendido, ya veo la meta!"
      },
      {
        "t": "We are halfway there!",
        "es": "¡Vamos a mitad de camino!"
      },
      {
        "t": "The finish line is close now.",
        "es": "La meta está cerca ahora."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Tourne à gauche, puis va tout droit!",
        "es": "¡Gira a la izquierda y luego sigue derecho!"
      },
      {
        "t": "Compris, je vois la ligne d'arrivée!",
        "es": "¡Entendido, ya veo la meta!"
      },
      {
        "t": "Nous sommes à mi-chemin!",
        "es": "¡Vamos a mitad de camino!"
      },
      {
        "t": "La ligne d'arrivée est proche maintenant.",
        "es": "La meta está cerca ahora."
      }
    ],
    "journalPrompt": "Cuenta cómo te fue en la carrera de orientación de hoy: qué ruta seguiste y qué fue lo más difícil.",
    "expedition": {
      "title": "Islas colombianas",
      "reading": "Una isla es tierra rodeada de agua. Un archipiélago es un conjunto de islas. Los ecosistemas insulares requieren cuidado especial.",
      "project": "Dibuja un archipiélago ficticio y planifica cómo transportar alimentos sin dejar residuos.",
      "questions": [
        {
          "text": "¿Cómo se llama un conjunto de islas?",
          "options": [
            "Archipiélago",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Archipiélago",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre islas colombianas?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Lunes 20 de julio",
    "title": "El circuito de salto",
    "subjectLabel": "Matemáticas",
    "intro": "Los circuitos de salto se dividen en fracciones. Vamos a calcular el recorrido.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "El circuito tiene 8 obstáculos. Si ya saltaste la mitad, ¿cuántos saltaste?",
        "options": [
          "2",
          "4",
          "6",
          "8"
        ],
        "answer": "4",
        "cat": "mate"
      },
      {
        "text": "¿Cómo se escribe 'un cuarto' en fracción?",
        "options": [
          "1/4",
          "1/2",
          "1/3",
          "1/5"
        ],
        "answer": "1/4",
        "cat": "mate"
      },
      {
        "text": "Si el tiempo del circuito es 45.5 segundos, ¿cuál es la parte decimal?",
        "options": [
          ".5",
          ".45",
          ".0",
          "5"
        ],
        "answer": ".5",
        "cat": "mate"
      },
      {
        "text": "¿Cómo se escribe 'tres cuartos' en fracción?",
        "options": [
          "3/4",
          "4/3",
          "1/4",
          "3/3"
        ],
        "answer": "3/4",
        "cat": "mate"
      },
      {
        "text": "Si el circuito dura 60 segundos y ya pasaron 3/4, ¿cuántos segundos han pasado?",
        "options": [
          "30",
          "45",
          "15",
          "60"
        ],
        "answer": "45",
        "cat": "mate"
      },
      {
        "text": "¿Cuál fracción es mayor: 1/2 o 1/4?",
        "options": [
          "1/2",
          "1/4",
          "Son iguales",
          "Ninguna"
        ],
        "answer": "1/2",
        "cat": "mate"
      }
    ],
    "englishVocab": [
      {
        "w": "Half",
        "es": "Mitad",
        "e": "🌗"
      },
      {
        "w": "Quarter",
        "es": "Cuarto",
        "e": "🍕"
      },
      {
        "w": "Jump",
        "es": "Saltar",
        "e": "🤸"
      },
      {
        "w": "Time",
        "es": "Tiempo",
        "e": "⏱️"
      },
      {
        "w": "Course",
        "es": "Circuito",
        "e": "🏇"
      },
      {
        "w": "Obstacle",
        "es": "Obstáculo",
        "e": "🚧"
      },
      {
        "w": "Clear (a jump)",
        "es": "Superar (un salto)",
        "e": "✨"
      },
      {
        "w": "Fault",
        "es": "Falta",
        "e": "❌"
      }
    ],
    "frenchVocab": [
      {
        "w": "Demi",
        "es": "Mitad",
        "e": "🌗"
      },
      {
        "w": "Quart",
        "es": "Cuarto",
        "e": "🍕"
      },
      {
        "w": "Saut",
        "es": "Salto",
        "e": "🤸"
      },
      {
        "w": "Temps",
        "es": "Tiempo",
        "e": "⏱️"
      },
      {
        "w": "Parcours",
        "es": "Circuito",
        "e": "🏇"
      },
      {
        "w": "Obstacle",
        "es": "Obstáculo",
        "e": "🚧"
      },
      {
        "w": "Franchir",
        "es": "Superar",
        "e": "✨"
      },
      {
        "w": "Faute",
        "es": "Falta",
        "e": "❌"
      }
    ],
    "englishDialogue": [
      {
        "t": "How many jumps are left?",
        "es": "¿Cuántos saltos faltan?"
      },
      {
        "t": "Just half of the course!",
        "es": "¡Solo la mitad del circuito!"
      },
      {
        "t": "She clears the obstacle perfectly!",
        "es": "¡Ella supera el obstáculo perfectamente!"
      },
      {
        "t": "No faults, amazing round!",
        "es": "¡Sin faltas, ronda increíble!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Combien de sauts reste-t-il?",
        "es": "¿Cuántos saltos faltan?"
      },
      {
        "t": "Juste la moitié du parcours!",
        "es": "¡Solo la mitad del circuito!"
      },
      {
        "t": "Elle franchit l'obstacle parfaitement!",
        "es": "¡Ella supera el obstáculo perfectamente!"
      },
      {
        "t": "Aucune faute, ronde incroyable!",
        "es": "¡Sin faltas, ronda increíble!"
      }
    ],
    "journalPrompt": "Si el circuito tiene 8 obstáculos y saltas 1/4 de ellos, ¿cuántos son? Explica tu respuesta e inventa otro ejemplo con fracciones.",
    "expedition": {
      "title": "Campo y ciudad",
      "reading": "El campo y la ciudad intercambian alimentos, servicios y conocimientos. Ninguno funciona completamente aislado del otro.",
      "project": "Sigue el recorrido de una zanahoria desde una finca hasta una tienda en cinco pasos.",
      "questions": [
        {
          "text": "¿Qué relación permite compartir alimentos y servicios?",
          "options": [
            "Intercambio",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Intercambio",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre campo y ciudad?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Martes 21 de julio",
    "title": "Mi primera competencia",
    "subjectLabel": "Lenguaje",
    "intro": "Vamos a escribir una narración con inicio, nudo y desenlace.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Cuáles son las 3 partes de una narración?",
        "options": [
          "Inicio, nudo y desenlace",
          "Título, autor y fecha",
          "Solo el final",
          "Ninguna"
        ],
        "answer": "Inicio, nudo y desenlace",
        "cat": "leng"
      },
      {
        "text": "¿Qué palabras indican el orden de los sucesos? Ej: 'Primero, luego, finalmente'",
        "options": [
          "Conectores temporales",
          "Sustantivos",
          "Colores",
          "Números"
        ],
        "answer": "Conectores temporales",
        "cat": "leng"
      },
      {
        "text": "En el 'nudo' de una historia normalmente ocurre...",
        "options": [
          "El problema o conflicto principal",
          "El final feliz",
          "La portada del libro",
          "Nada importante"
        ],
        "answer": "El problema o conflicto principal",
        "cat": "leng"
      },
      {
        "text": "¿En qué parte de la narración se presenta el problema?",
        "options": [
          "En el nudo",
          "En el inicio",
          "En el desenlace",
          "En el título"
        ],
        "answer": "En el nudo",
        "cat": "leng"
      },
      {
        "text": "¿Cuál palabra conecta ideas en el tiempo?",
        "options": [
          "Después",
          "Caballo",
          "Rápido",
          "Establo"
        ],
        "answer": "Después",
        "cat": "leng"
      },
      {
        "text": "¿Qué debe tener el desenlace de una historia?",
        "options": [
          "La solución o el final",
          "El comienzo del problema",
          "Solo personajes nuevos",
          "Nada especial"
        ],
        "answer": "La solución o el final",
        "cat": "leng"
      },
      {
        "text": "¿Cuándo se declaró la independencia de Colombia?",
        "options": [
          "1808",
          "1810",
          "1816",
          "1819"
        ],
        "answer": "1810",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "First",
        "es": "Primero",
        "e": "1️⃣"
      },
      {
        "w": "Then",
        "es": "Luego",
        "e": "➡️"
      },
      {
        "w": "Finally",
        "es": "Finalmente",
        "e": "🏁"
      },
      {
        "w": "Competition",
        "es": "Competencia",
        "e": "🏆"
      },
      {
        "w": "Beginning",
        "es": "Inicio",
        "e": "🌱"
      },
      {
        "w": "Problem",
        "es": "Problema",
        "e": "❓"
      },
      {
        "w": "Ending",
        "es": "Final",
        "e": "🔚"
      },
      {
        "w": "Feeling",
        "es": "Sentimiento",
        "e": "💗"
      }
    ],
    "frenchVocab": [
      {
        "w": "D'abord",
        "es": "Primero",
        "e": "1️⃣"
      },
      {
        "w": "Ensuite",
        "es": "Luego",
        "e": "➡️"
      },
      {
        "w": "Enfin",
        "es": "Finalmente",
        "e": "🏁"
      },
      {
        "w": "Compétition",
        "es": "Competencia",
        "e": "🏆"
      },
      {
        "w": "Début",
        "es": "Inicio",
        "e": "🌱"
      },
      {
        "w": "Problème",
        "es": "Problema",
        "e": "❓"
      },
      {
        "w": "Fin",
        "es": "Final",
        "e": "🔚"
      },
      {
        "w": "Sentiment",
        "es": "Sentimiento",
        "e": "💗"
      }
    ],
    "englishDialogue": [
      {
        "t": "First, we warm up. Then, we compete!",
        "es": "Primero calentamos. ¡Luego competimos!"
      },
      {
        "t": "Finally, we celebrate!",
        "es": "¡Finalmente celebramos!"
      },
      {
        "t": "How does your story begin?",
        "es": "¿Cómo empieza tu historia?"
      },
      {
        "t": "With a big problem to solve!",
        "es": "¡Con un gran problema por resolver!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "D'abord, on s'échauffe. Ensuite, on participe!",
        "es": "Primero calentamos. ¡Luego competimos!"
      },
      {
        "t": "Enfin, on célèbre!",
        "es": "¡Finalmente celebramos!"
      },
      {
        "t": "Comment ton histoire commence-t-elle?",
        "es": "¿Cómo empieza tu historia?"
      },
      {
        "t": "Avec un grand problème à résoudre!",
        "es": "¡Con un gran problema por resolver!"
      }
    ],
    "journalPrompt": "Escribe la historia de 'Mi primera competencia' con inicio, nudo y desenlace, usando primero, luego y finalmente. Mínimo 6 líneas.",
    "expedition": {
      "title": "Fuentes de la historia",
      "reading": "Una carta antigua, un objeto y un testimonio pueden ser fuentes históricas. Comparar fuentes ayuda a reconocer coincidencias y diferencias.",
      "project": "Compara un relato familiar con una fotografía: escribe qué muestra cada uno y qué no sabes.",
      "questions": [
        {
          "text": "¿Qué son una carta antigua y un testimonio para investigar el pasado?",
          "options": [
            "Fuentes históricas",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Fuentes históricas",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre fuentes de la historia?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Miércoles 22 de julio",
    "title": "Razas de caballos",
    "subjectLabel": "Ciencias Naturales",
    "intro": "No todos los caballos son iguales. Aprendamos a clasificarlos por sus características.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Clasificar seres vivos según sus características se llama...",
        "options": [
          "Clasificación",
          "Alimentación",
          "Migración",
          "Extinción"
        ],
        "answer": "Clasificación",
        "cat": "cien"
      },
      {
        "text": "El caballo de paso fino es conocido por...",
        "options": [
          "Su caminado suave y elegante",
          "Volar",
          "Nadar rápido",
          "Cambiar de color"
        ],
        "answer": "Su caminado suave y elegante",
        "cat": "cien"
      },
      {
        "text": "¿Qué característica NO sirve para clasificar razas de caballos?",
        "options": [
          "El color favorito de su dueño",
          "El tamaño",
          "El color del pelaje",
          "El tipo de andar"
        ],
        "answer": "El color favorito de su dueño",
        "cat": "cien"
      },
      {
        "text": "¿Qué es una raza?",
        "options": [
          "Un grupo de animales con características similares heredadas",
          "Un color solamente",
          "Un país",
          "Una comida"
        ],
        "answer": "Un grupo de animales con características similares heredadas",
        "cat": "cien"
      },
      {
        "text": "¿Qué característica NO es física?",
        "options": [
          "El nombre que le puso su dueño",
          "El tamaño",
          "El color del pelaje",
          "La forma de las orejas"
        ],
        "answer": "El nombre que le puso su dueño",
        "cat": "cien"
      },
      {
        "text": "¿Qué caballo es conocido por ser muy veloz en carreras?",
        "options": [
          "El pura sangre (thoroughbred)",
          "El de paso fino",
          "El poni",
          "Ninguno"
        ],
        "answer": "El pura sangre (thoroughbred)",
        "cat": "cien"
      }
    ],
    "englishVocab": [
      {
        "w": "Breed",
        "es": "Raza",
        "e": "🐎"
      },
      {
        "w": "Gallop",
        "es": "Galopar",
        "e": "💨"
      },
      {
        "w": "Canter",
        "es": "Medio galope",
        "e": "🏃"
      },
      {
        "w": "Trot",
        "es": "Trotar",
        "e": "🚶"
      },
      {
        "w": "Speed",
        "es": "Velocidad",
        "e": "⚡"
      },
      {
        "w": "Strong",
        "es": "Fuerte",
        "e": "💪"
      },
      {
        "w": "Coat (fur)",
        "es": "Pelaje",
        "e": "🐴"
      },
      {
        "w": "Tall",
        "es": "Alto",
        "e": "📏"
      }
    ],
    "frenchVocab": [
      {
        "w": "Race",
        "es": "Raza",
        "e": "🐎"
      },
      {
        "w": "Galoper",
        "es": "Galopar",
        "e": "💨"
      },
      {
        "w": "Petit galop",
        "es": "Medio galope",
        "e": "🏃"
      },
      {
        "w": "Aller au trot",
        "es": "Trotar",
        "e": "🚶"
      },
      {
        "w": "Vitesse",
        "es": "Velocidad",
        "e": "⚡"
      },
      {
        "w": "Fort",
        "es": "Fuerte",
        "e": "💪"
      },
      {
        "w": "Pelage",
        "es": "Pelaje",
        "e": "🐴"
      },
      {
        "w": "Grand",
        "es": "Alto",
        "e": "📏"
      }
    ],
    "englishDialogue": [
      {
        "t": "Look, the horse is galloping!",
        "es": "¡Mira, el caballo está galopando!"
      },
      {
        "t": "Wow, that's so fast!",
        "es": "¡Vaya, qué rápido!"
      },
      {
        "t": "This breed has great speed.",
        "es": "Esta raza tiene gran velocidad."
      },
      {
        "t": "And a beautiful shiny coat!",
        "es": "¡Y un pelaje brillante hermoso!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Regarde, le cheval galope!",
        "es": "¡Mira, el caballo está galopando!"
      },
      {
        "t": "Wahou, comme c'est rapide!",
        "es": "¡Vaya, qué rápido!"
      },
      {
        "t": "Cette race a une grande vitesse.",
        "es": "Esta raza tiene gran velocidad."
      },
      {
        "t": "Et un beau pelage brillant!",
        "es": "¡Y un pelaje brillante hermoso!"
      }
    ],
    "journalPrompt": "Describe (o inventa) una raza de caballo y sus principales características: tamaño, color, velocidad y para qué se usa.",
    "expedition": {
      "title": "Líneas de tiempo",
      "reading": "Una línea de tiempo ordena acontecimientos. Antes y después indican secuencia; la duración expresa cuánto tiempo pasa entre dos momentos.",
      "project": "Organiza cinco acontecimientos del rancho e inventa fechas claramente señaladas como ficción.",
      "questions": [
        {
          "text": "¿Qué indican antes y después?",
          "options": [
            "Secuencia",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Secuencia",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre líneas de tiempo?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jueves 23 de julio",
    "title": "Deportes ecuestres del mundo",
    "subjectLabel": "Ciencias Sociales",
    "intro": "El caballo se monta en todo el mundo. Conozcamos algunos deportes ecuestres.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "El polo es un deporte ecuestre popular en países como...",
        "options": [
          "Argentina e Inglaterra",
          "Solo en Colombia",
          "Solo en Asia",
          "En ningún lugar"
        ],
        "answer": "Argentina e Inglaterra",
        "cat": "soc"
      },
      {
        "text": "El 'dressage' o doma clásica es un deporte ecuestre de origen...",
        "options": [
          "Francés/Europeo",
          "Africano",
          "Solo colombiano",
          "Ninguno"
        ],
        "answer": "Francés/Europeo",
        "cat": "soc"
      },
      {
        "text": "¿Qué valor es importante en los deportes ecuestres?",
        "options": [
          "El respeto y cuidado por el animal",
          "Ganar a cualquier costo",
          "La velocidad del carro",
          "Ninguno"
        ],
        "answer": "El respeto y cuidado por el animal",
        "cat": "soc"
      },
      {
        "text": "¿Qué deporte ecuestre se juega en equipo con un mazo y una bola?",
        "options": [
          "Polo",
          "Doma clásica",
          "Salto",
          "Ninguno"
        ],
        "answer": "Polo",
        "cat": "soc"
      },
      {
        "text": "¿Qué valor NO debería faltar en los deportes ecuestres?",
        "options": [
          "El respeto por el animal",
          "La velocidad extrema sin cuidado",
          "El maltrato",
          "Ninguno de los anteriores"
        ],
        "answer": "El respeto por el animal",
        "cat": "soc"
      },
      {
        "text": "¿En qué continente se originó gran parte de la equitación clásica moderna?",
        "options": [
          "Europa",
          "Oceanía",
          "Antártida",
          "Ninguno"
        ],
        "answer": "Europa",
        "cat": "soc"
      },
      {
        "text": "¿Quién fue Simón Bolívar?",
        "options": [
          "Libertador de varios países de América",
          "Rey de España",
          "Cazador de caballos",
          "Inventor"
        ],
        "answer": "Libertador de varios países de América",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Sport",
        "es": "Deporte",
        "e": "🏅"
      },
      {
        "w": "Competition",
        "es": "Competencia",
        "e": "🏆"
      },
      {
        "w": "Rider",
        "es": "Jinete",
        "e": "🏇"
      },
      {
        "w": "Country",
        "es": "País",
        "e": "🌍"
      },
      {
        "w": "Team",
        "es": "Equipo",
        "e": "👥"
      },
      {
        "w": "Rules",
        "es": "Reglas",
        "e": "📋"
      },
      {
        "w": "Respect",
        "es": "Respeto",
        "e": "🙏"
      },
      {
        "w": "Culture",
        "es": "Cultura",
        "e": "🎭"
      }
    ],
    "frenchVocab": [
      {
        "w": "Sport",
        "es": "Deporte",
        "e": "🏅"
      },
      {
        "w": "Compétition",
        "es": "Competencia",
        "e": "🏆"
      },
      {
        "w": "Cavalier",
        "es": "Jinete",
        "e": "🏇"
      },
      {
        "w": "Pays",
        "es": "País",
        "e": "🌍"
      },
      {
        "w": "Équipe",
        "es": "Equipo",
        "e": "👥"
      },
      {
        "w": "Règles",
        "es": "Reglas",
        "e": "📋"
      },
      {
        "w": "Respect",
        "es": "Respeto",
        "e": "🙏"
      },
      {
        "w": "Culture",
        "es": "Cultura",
        "e": "🎭"
      }
    ],
    "englishDialogue": [
      {
        "t": "Which equestrian sport do you like?",
        "es": "¿Qué deporte ecuestre te gusta?"
      },
      {
        "t": "I love show jumping!",
        "es": "¡Me encanta el salto de obstáculos!"
      },
      {
        "t": "Every sport needs rules.",
        "es": "Todo deporte necesita reglas."
      },
      {
        "t": "And respect for the horse always.",
        "es": "Y respeto por el caballo siempre."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Quel sport équestre aimes-tu?",
        "es": "¿Qué deporte ecuestre te gusta?"
      },
      {
        "t": "J'adore le saut d'obstacles!",
        "es": "¡Me encanta el salto de obstáculos!"
      },
      {
        "t": "Chaque sport a besoin de règles.",
        "es": "Todo deporte necesita reglas."
      },
      {
        "t": "Et du respect pour le cheval toujours.",
        "es": "Y respeto por el caballo siempre."
      }
    ],
    "journalPrompt": "¿Qué deporte ecuestre te gustaría practicar? Explica por qué, y qué reglas o valores importantes tiene ese deporte.",
    "expedition": {
      "title": "Pueblos indígenas",
      "reading": "Los pueblos indígenas tienen historias, lenguas y conocimientos diversos. Existen en el presente y no deben describirse como una sola cultura del pasado.",
      "project": "Escribe tres preguntas respetuosas para conocer una comunidad sin hacer suposiciones.",
      "questions": [
        {
          "text": "¿Qué idea evita presentar a todos los pueblos como una sola cultura?",
          "options": [
            "Diversidad",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Diversidad",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre pueblos indígenas?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Viernes 24 de julio",
    "title": "Concurso Hípico #3",
    "subjectLabel": "Simulación de competencia",
    "isShowDay": true,
    "intro": "¡El concurso más difícil hasta ahora! Simulemos una competencia real con puntaje.",
    "subjectQuestions": [
      {
        "text": "El puntaje inicia en 100 y se restan 5 por cada obstáculo derribado. Si derribaste 2, ¿cuál es tu puntaje?",
        "options": [
          "95",
          "90",
          "85",
          "80"
        ],
        "answer": "90",
        "cat": "mate"
      },
      {
        "text": "Ordena la secuencia de una competencia: Calentamiento, Competencia, Premiación. ¿Qué va primero?",
        "options": [
          "Calentamiento",
          "Competencia",
          "Premiación",
          "Ninguna"
        ],
        "answer": "Calentamiento",
        "cat": "leng"
      },
      {
        "text": "¿Qué país asocias con la tradición del caballo de paso fino?",
        "options": [
          "Colombia",
          "Rusia",
          "Egipto",
          "Canadá"
        ],
        "answer": "Colombia",
        "cat": "soc"
      },
      {
        "text": "Si tu puntaje inicial es 100 y pierdes 5 puntos por cada error, con 3 errores ¿cuál es tu puntaje?",
        "options": [
          "80",
          "85",
          "90",
          "95"
        ],
        "answer": "85",
        "cat": "mate"
      },
      {
        "text": "¿Cuál palabra describe cómo se sintió el jinete? 'El jinete estaba nervioso pero feliz'",
        "options": [
          "Nervioso y feliz",
          "Enojado",
          "Aburrido",
          "Cansado"
        ],
        "answer": "Nervioso y feliz",
        "cat": "leng"
      },
      {
        "text": "¿Qué representa una medalla de oro en una competencia?",
        "options": [
          "El primer lugar",
          "El último lugar",
          "Ninguna posición",
          "Un error"
        ],
        "answer": "El primer lugar",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Score",
        "es": "Puntaje",
        "e": "📊"
      },
      {
        "w": "Warm-up",
        "es": "Calentamiento",
        "e": "🔥"
      },
      {
        "w": "Medal",
        "es": "Medalla",
        "e": "🥇"
      },
      {
        "w": "Winner",
        "es": "Ganador",
        "e": "🏆"
      },
      {
        "w": "Nervous",
        "es": "Nervioso(a)",
        "e": "😬"
      },
      {
        "w": "Proud",
        "es": "Orgulloso(a)",
        "e": "🥰"
      },
      {
        "w": "Effort",
        "es": "Esfuerzo",
        "e": "💪"
      },
      {
        "w": "Result",
        "es": "Resultado",
        "e": "📈"
      }
    ],
    "frenchVocab": [
      {
        "w": "Score",
        "es": "Puntaje",
        "e": "📊"
      },
      {
        "w": "Échauffement",
        "es": "Calentamiento",
        "e": "🔥"
      },
      {
        "w": "Médaille",
        "es": "Medalla",
        "e": "🥇"
      },
      {
        "w": "Gagnant",
        "es": "Ganador",
        "e": "🏆"
      },
      {
        "w": "Nerveux/Nerveuse",
        "es": "Nervioso(a)",
        "e": "😬"
      },
      {
        "w": "Fier/Fière",
        "es": "Orgulloso(a)",
        "e": "🥰"
      },
      {
        "w": "Effort",
        "es": "Esfuerzo",
        "e": "💪"
      },
      {
        "w": "Résultat",
        "es": "Resultado",
        "e": "📈"
      }
    ],
    "englishDialogue": [
      {
        "t": "And she jumps! Great time!",
        "es": "¡Y ella salta! ¡Excelente tiempo!"
      },
      {
        "t": "She wins the gold medal!",
        "es": "¡Ella gana la medalla de oro!"
      },
      {
        "t": "I feel nervous but ready.",
        "es": "Me siento nerviosa pero lista."
      },
      {
        "t": "Your effort will show in the result!",
        "es": "¡Tu esfuerzo se verá en el resultado!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Et elle saute! Quel bon temps!",
        "es": "¡Y ella salta! ¡Excelente tiempo!"
      },
      {
        "t": "Elle gagne la médaille d'or!",
        "es": "¡Ella gana la medalla de oro!"
      },
      {
        "t": "Je me sens nerveuse mais prête.",
        "es": "Me siento nerviosa pero lista."
      },
      {
        "t": "Ton effort se verra dans le résultat!",
        "es": "¡Tu esfuerzo se verá en el resultado!"
      }
    ],
    "journalPrompt": "Describe cómo te sentiste en tu simulación de competencia de hoy, desde el calentamiento hasta el resultado final.",
    "expedition": {
      "title": "Los muiscas",
      "reading": "Los muiscas habitaron el altiplano cundiboyacense. La agricultura y el intercambio fueron importantes en su vida. Hoy existen comunidades que mantienen su identidad muisca.",
      "project": "Dibuja una red de intercambio de alimentos y explica qué pueden aprender sus participantes.",
      "questions": [
        {
          "text": "¿Qué territorio se menciona en la lectura?",
          "options": [
            "Altiplano cundiboyacense",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Altiplano cundiboyacense",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre los muiscas?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Lunes 27 de julio",
    "title": "Repaso final: Matemáticas",
    "subjectLabel": "Matemáticas",
    "intro": "Última semana antes del Gran Concurso. ¡Repasemos todo lo aprendido en matemáticas!",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Un caballo recorre 5 km por hora. ¿Cuántos km recorre en 3 horas?",
        "options": [
          "10",
          "15",
          "20",
          "8"
        ],
        "answer": "15",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es el perímetro de un corral cuadrado de lado 4 m?",
        "options": [
          "8",
          "12",
          "16",
          "20"
        ],
        "answer": "16",
        "cat": "mate"
      },
      {
        "text": "3/4 + 1/4 = ?",
        "options": [
          "1 (un entero)",
          "4/8",
          "2/4",
          "0"
        ],
        "answer": "1 (un entero)",
        "cat": "mate"
      },
      {
        "text": "¿Cuánto es 9 x 7?",
        "options": [
          "56",
          "63",
          "72",
          "54"
        ],
        "answer": "63",
        "cat": "mate"
      },
      {
        "text": "Un corral rectangular mide 8 m de largo y 5 m de ancho. ¿Cuál es su perímetro?",
        "options": [
          "13 m",
          "18 m",
          "26 m",
          "40 m"
        ],
        "answer": "26 m",
        "cat": "mate"
      },
      {
        "text": "¿Cuánto es 100 ÷ 4?",
        "options": [
          "20",
          "25",
          "30",
          "4"
        ],
        "answer": "25",
        "cat": "mate"
      },
      {
        "text": "¿En qué año se formó la República de la Gran Colombia?",
        "options": [
          "1800",
          "1819",
          "1830",
          "1850"
        ],
        "answer": "1819",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Distance",
        "es": "Distancia",
        "e": "📏"
      },
      {
        "w": "Hour",
        "es": "Hora",
        "e": "🕐"
      },
      {
        "w": "Fraction",
        "es": "Fracción",
        "e": "🍰"
      },
      {
        "w": "Perimeter",
        "es": "Perímetro",
        "e": "🔲"
      },
      {
        "w": "Multiply",
        "es": "Multiplicar",
        "e": "✖️"
      },
      {
        "w": "Divide",
        "es": "Dividir",
        "e": "➗"
      },
      {
        "w": "Total",
        "es": "Total",
        "e": "🧮"
      },
      {
        "w": "Number",
        "es": "Número",
        "e": "🔢"
      }
    ],
    "frenchVocab": [
      {
        "w": "Distance",
        "es": "Distancia",
        "e": "📏"
      },
      {
        "w": "Heure",
        "es": "Hora",
        "e": "🕐"
      },
      {
        "w": "Fraction",
        "es": "Fracción",
        "e": "🍰"
      },
      {
        "w": "Périmètre",
        "es": "Perímetro",
        "e": "🔲"
      },
      {
        "w": "Multiplier",
        "es": "Multiplicar",
        "e": "✖️"
      },
      {
        "w": "Diviser",
        "es": "Dividir",
        "e": "➗"
      },
      {
        "w": "Total",
        "es": "Total",
        "e": "🧮"
      },
      {
        "w": "Nombre",
        "es": "Número",
        "e": "🔢"
      }
    ],
    "englishDialogue": [
      {
        "t": "How far did we ride today?",
        "es": "¿Qué distancia cabalgamos hoy?"
      },
      {
        "t": "Fifteen kilometers in three hours!",
        "es": "¡Quince kilómetros en tres horas!"
      },
      {
        "t": "Let's multiply the numbers.",
        "es": "Multipliquemos los números."
      },
      {
        "t": "Great, now we have the total!",
        "es": "¡Genial, ya tenemos el total!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Quelle distance avons-nous parcourue?",
        "es": "¿Qué distancia recorrimos?"
      },
      {
        "t": "Quinze kilomètres en trois heures!",
        "es": "¡Quince kilómetros en tres horas!"
      },
      {
        "t": "Multiplions les nombres.",
        "es": "Multipliquemos los números."
      },
      {
        "t": "Super, maintenant nous avons le total!",
        "es": "¡Genial, ya tenemos el total!"
      }
    ],
    "journalPrompt": "Escribe 5 cosas de matemáticas que aprendiste este mes en el rancho, con un ejemplo de cada una.",
    "expedition": {
      "title": "Encuentro y conquista",
      "reading": "La llegada europea a América produjo intercambios y también conquista, violencia y grandes cambios para los pueblos indígenas. Un hecho puede tener perspectivas diferentes.",
      "project": "Escribe dos preguntas sobre cómo cambió la vida de distintas personas; separa hechos y opiniones.",
      "questions": [
        {
          "text": "¿Qué debemos comparar para comprender mejor un hecho histórico?",
          "options": [
            "Perspectivas diferentes",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Perspectivas diferentes",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre encuentro y conquista?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Martes 28 de julio",
    "title": "Repaso final: Lenguaje",
    "subjectLabel": "Lenguaje",
    "intro": "Vamos a escribir la crónica de todo el verano de Miranda en el rancho.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Qué tipo de texto usarías para contar tu verano en el rancho?",
        "options": [
          "Narrativo",
          "Instructivo",
          "Solo números",
          "Ninguno"
        ],
        "answer": "Narrativo",
        "cat": "leng"
      },
      {
        "text": "¿Cuál es un sinónimo de 'feliz'?",
        "options": [
          "Contento",
          "Triste",
          "Enojado",
          "Cansado"
        ],
        "answer": "Contento",
        "cat": "leng"
      },
      {
        "text": "¿Qué signo se usa al inicio y al final de una pregunta en español?",
        "options": [
          "¿ y ?",
          ". y ,",
          ", y ;",
          "Ninguno"
        ],
        "answer": "¿ y ?",
        "cat": "leng"
      },
      {
        "text": "¿Qué es una crónica?",
        "options": [
          "Un relato de hechos en orden de tiempo",
          "Una poesía sin sentido",
          "Un número",
          "Un dibujo"
        ],
        "answer": "Un relato de hechos en orden de tiempo",
        "cat": "leng"
      },
      {
        "text": "¿Cuál oración usa signos de interrogación correctamente?",
        "options": [
          "¿Cómo estás?",
          "Como estas?",
          "¿Como estas",
          "Cómo estás?."
        ],
        "answer": "¿Cómo estás?",
        "cat": "leng"
      },
      {
        "text": "¿Cuál es el antónimo de 'feliz'?",
        "options": [
          "Triste",
          "Contento",
          "Alegre",
          "Sonriente"
        ],
        "answer": "Triste",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Summer",
        "es": "Verano",
        "e": "☀️"
      },
      {
        "w": "Chronicle",
        "es": "Crónica",
        "e": "📰"
      },
      {
        "w": "Happy",
        "es": "Feliz",
        "e": "😄"
      },
      {
        "w": "Adventure",
        "es": "Aventura",
        "e": "🗺️"
      },
      {
        "w": "Question",
        "es": "Pregunta",
        "e": "❓"
      },
      {
        "w": "Answer",
        "es": "Respuesta",
        "e": "💬"
      },
      {
        "w": "Memory",
        "es": "Recuerdo",
        "e": "🧠"
      },
      {
        "w": "Learn",
        "es": "Aprender",
        "e": "🎓"
      }
    ],
    "frenchVocab": [
      {
        "w": "Été",
        "es": "Verano",
        "e": "☀️"
      },
      {
        "w": "Chronique",
        "es": "Crónica",
        "e": "📰"
      },
      {
        "w": "Heureux/Heureuse",
        "es": "Feliz",
        "e": "😄"
      },
      {
        "w": "Aventure",
        "es": "Aventura",
        "e": "🗺️"
      },
      {
        "w": "Question",
        "es": "Pregunta",
        "e": "❓"
      },
      {
        "w": "Réponse",
        "es": "Respuesta",
        "e": "💬"
      },
      {
        "w": "Souvenir",
        "es": "Recuerdo",
        "e": "🧠"
      },
      {
        "w": "Apprendre",
        "es": "Aprender",
        "e": "🎓"
      }
    ],
    "englishDialogue": [
      {
        "t": "How was your summer?",
        "es": "¿Cómo fue tu verano?"
      },
      {
        "t": "It was a wonderful adventure!",
        "es": "¡Fue una aventura maravillosa!"
      },
      {
        "t": "What is your favorite memory?",
        "es": "¿Cuál es tu recuerdo favorito?"
      },
      {
        "t": "Riding Luna for the first time!",
        "es": "¡Montar a Luna por primera vez!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Comment était ton été?",
        "es": "¿Cómo fue tu verano?"
      },
      {
        "t": "C'était une aventure merveilleuse!",
        "es": "¡Fue una aventura maravillosa!"
      },
      {
        "t": "Quel est ton souvenir préféré?",
        "es": "¿Cuál es tu recuerdo favorito?"
      },
      {
        "t": "Monter Luna pour la première fois!",
        "es": "¡Montar a Luna por primera vez!"
      }
    ],
    "journalPrompt": "Escribe la crónica de tu verano en el rancho, en orden: cómo empezó, qué aprendiste, y cómo te sientes ahora (mínimo 7 líneas).",
    "expedition": {
      "title": "La Colonia",
      "reading": "Durante la Colonia existieron fuertes desigualdades. Muchas personas africanas fueron esclavizadas. También hubo resistencia y búsqueda de libertad.",
      "project": "Redacta una reflexión sobre libertad y dignidad; explica por qué nadie debe ser propiedad de otra persona.",
      "questions": [
        {
          "text": "¿Cómo llamamos a acciones contra una dominación injusta?",
          "options": [
            "Resistencia",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Resistencia",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre la colonia?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Miércoles 29 de julio",
    "title": "Repaso final: Ciencias Naturales",
    "subjectLabel": "Ciencias Naturales",
    "intro": "Creemos un afiche con todo lo que aprendimos sobre el cuidado de los caballos.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Qué necesita un caballo para estar sano?",
        "options": [
          "Agua, alimento y cuidado",
          "Solo agua",
          "Solo compañía",
          "Nada"
        ],
        "answer": "Agua, alimento y cuidado",
        "cat": "cien"
      },
      {
        "text": "¿Qué parte del cuerpo usa el caballo para caminar?",
        "options": [
          "Las patas y cascos",
          "Las orejas",
          "Los ojos",
          "La cola"
        ],
        "answer": "Las patas y cascos",
        "cat": "cien"
      },
      {
        "text": "El agua de lluvia llega al bebedero gracias a...",
        "options": [
          "El ciclo del agua",
          "La magia",
          "El viento solo",
          "Nada"
        ],
        "answer": "El ciclo del agua",
        "cat": "cien"
      },
      {
        "text": "¿Qué grupo de seres vivos NO puede fabricar su propio alimento?",
        "options": [
          "Los animales",
          "Las plantas",
          "Ambos pueden",
          "Ninguno"
        ],
        "answer": "Los animales",
        "cat": "cien"
      },
      {
        "text": "¿Qué es un hábitat?",
        "options": [
          "El lugar donde vive un ser vivo",
          "Un tipo de comida",
          "Un color",
          "Un número"
        ],
        "answer": "El lugar donde vive un ser vivo",
        "cat": "cien"
      },
      {
        "text": "¿Por qué el ejercicio es bueno para los caballos?",
        "options": [
          "Fortalece sus músculos y huesos",
          "No sirve para nada",
          "Los hace más lentos",
          "Los enferma"
        ],
        "answer": "Fortalece sus músculos y huesos",
        "cat": "cien"
      },
      {
        "text": "¿Qué son las cordilleras?",
        "options": [
          "Cadenas de montañas",
          "Ríos grandes",
          "Océanos",
          "Ciudades"
        ],
        "answer": "Cadenas de montañas",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Healthy",
        "es": "Sano",
        "e": "💪"
      },
      {
        "w": "Care",
        "es": "Cuidado",
        "e": "❤️"
      },
      {
        "w": "Poster",
        "es": "Afiche",
        "e": "🖼️"
      },
      {
        "w": "Body",
        "es": "Cuerpo",
        "e": "🐴"
      },
      {
        "w": "Habitat",
        "es": "Hábitat",
        "e": "🏞️"
      },
      {
        "w": "Exercise",
        "es": "Ejercicio",
        "e": "🏃"
      },
      {
        "w": "Nature",
        "es": "Naturaleza",
        "e": "🌿"
      },
      {
        "w": "Living being",
        "es": "Ser vivo",
        "e": "🌍"
      }
    ],
    "frenchVocab": [
      {
        "w": "En bonne santé",
        "es": "Sano",
        "e": "💪"
      },
      {
        "w": "Soin",
        "es": "Cuidado",
        "e": "❤️"
      },
      {
        "w": "Affiche",
        "es": "Afiche",
        "e": "🖼️"
      },
      {
        "w": "Corps",
        "es": "Cuerpo",
        "e": "🐴"
      },
      {
        "w": "Habitat",
        "es": "Hábitat",
        "e": "🏞️"
      },
      {
        "w": "Exercice",
        "es": "Ejercicio",
        "e": "🏃"
      },
      {
        "w": "Nature",
        "es": "Naturaleza",
        "e": "🌿"
      },
      {
        "w": "Être vivant",
        "es": "Ser vivo",
        "e": "🌍"
      }
    ],
    "englishDialogue": [
      {
        "t": "How do we keep the horse healthy?",
        "es": "¿Cómo mantenemos sano al caballo?"
      },
      {
        "t": "With water, food and lots of care!",
        "es": "¡Con agua, comida y mucho cuidado!"
      },
      {
        "t": "Horses need daily exercise.",
        "es": "Los caballos necesitan ejercicio diario."
      },
      {
        "t": "Just like us, to stay healthy!",
        "es": "¡Igual que nosotros, para estar sanos!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Comment garder le cheval en bonne santé?",
        "es": "¿Cómo mantenemos sano al caballo?"
      },
      {
        "t": "Avec de l'eau, de la nourriture et des soins!",
        "es": "¡Con agua, comida y cuidados!"
      },
      {
        "t": "Les chevaux ont besoin d'exercice quotidien.",
        "es": "Los caballos necesitan ejercicio diario."
      },
      {
        "t": "Comme nous, pour rester en bonne santé!",
        "es": "¡Igual que nosotros, para estar sanos!"
      }
    ],
    "journalPrompt": "Describe con palabras un afiche sobre el cuidado integral de un caballo: qué dibujos tendría y qué consejos daría.",
    "expedition": {
      "title": "Independencia",
      "reading": "El 20 de julio de 1810 es una fecha conmemorativa de la independencia colombiana. La independencia fue un proceso de varios años con muchas personas participantes.",
      "project": "Crea una línea de tiempo que distinga una fecha conmemorativa de un proceso.",
      "questions": [
        {
          "text": "¿Cómo describe el texto la independencia?",
          "options": [
            "Un proceso de varios años",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Un proceso de varios años",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre independencia?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jueves 30 de julio",
    "title": "Repaso final: Ciencias Sociales",
    "subjectLabel": "Ciencias Sociales",
    "intro": "Presentemos el rancho completo: su mapa, su gente y su cultura.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "¿Qué región de Colombia es famosa por la ganadería y los llanos?",
        "options": [
          "Los Llanos Orientales",
          "La Amazonía profunda",
          "El desierto",
          "Ninguna"
        ],
        "answer": "Los Llanos Orientales",
        "cat": "soc"
      },
      {
        "text": "Un mapa nos ayuda a...",
        "options": [
          "Ubicarnos y encontrar rutas",
          "Cocinar",
          "Dormir",
          "Nada"
        ],
        "answer": "Ubicarnos y encontrar rutas",
        "cat": "soc"
      },
      {
        "text": "El polo y el dressage son ejemplos de...",
        "options": [
          "Deportes ecuestres",
          "Comidas típicas",
          "Animales",
          "Instrumentos"
        ],
        "answer": "Deportes ecuestres",
        "cat": "soc"
      },
      {
        "text": "¿Qué es la cultura de un lugar?",
        "options": [
          "Sus costumbres, comida, música y tradiciones",
          "Solo su clima",
          "Solo su idioma",
          "Nada"
        ],
        "answer": "Sus costumbres, comida, música y tradiciones",
        "cat": "soc"
      },
      {
        "text": "¿Qué región colombiana es reconocida por el café?",
        "options": [
          "La región Andina/Cafetera",
          "El desierto",
          "La Amazonía",
          "El mar Caribe únicamente"
        ],
        "answer": "La región Andina/Cafetera",
        "cat": "soc"
      },
      {
        "text": "¿Qué significa 'diversidad cultural'?",
        "options": [
          "Que existen muchas culturas diferentes conviviendo",
          "Que solo hay una cultura",
          "Que no hay reglas",
          "Ninguna"
        ],
        "answer": "Que existen muchas culturas diferentes conviviendo",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Region",
        "es": "Región",
        "e": "🗺️"
      },
      {
        "w": "Culture",
        "es": "Cultura",
        "e": "🎭"
      },
      {
        "w": "World",
        "es": "Mundo",
        "e": "🌎"
      },
      {
        "w": "Tradition",
        "es": "Tradición",
        "e": "🎉"
      },
      {
        "w": "Diverse",
        "es": "Diverso(a)",
        "e": "🌈"
      },
      {
        "w": "Community",
        "es": "Comunidad",
        "e": "🏘️"
      },
      {
        "w": "Celebrate",
        "es": "Celebrar",
        "e": "🎊"
      },
      {
        "w": "Proud",
        "es": "Orgulloso(a)",
        "e": "🥰"
      }
    ],
    "frenchVocab": [
      {
        "w": "Région",
        "es": "Región",
        "e": "🗺️"
      },
      {
        "w": "Culture",
        "es": "Cultura",
        "e": "🎭"
      },
      {
        "w": "Monde",
        "es": "Mundo",
        "e": "🌎"
      },
      {
        "w": "Tradition",
        "es": "Tradición",
        "e": "🎉"
      },
      {
        "w": "Divers(e)",
        "es": "Diverso(a)",
        "e": "🌈"
      },
      {
        "w": "Communauté",
        "es": "Comunidad",
        "e": "🏘️"
      },
      {
        "w": "Célébrer",
        "es": "Celebrar",
        "e": "🎊"
      },
      {
        "w": "Fier/Fière",
        "es": "Orgulloso(a)",
        "e": "🥰"
      }
    ],
    "englishDialogue": [
      {
        "t": "Tell me about your ranch.",
        "es": "Cuéntame sobre tu rancho."
      },
      {
        "t": "It has a map, a river and lots of tradition!",
        "es": "¡Tiene un mapa, un río y mucha tradición!"
      },
      {
        "t": "Our ranch community is diverse.",
        "es": "Nuestra comunidad del rancho es diversa."
      },
      {
        "t": "Let's celebrate all our traditions!",
        "es": "¡Celebremos todas nuestras tradiciones!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Parle-moi de ton ranch.",
        "es": "Cuéntame sobre tu rancho."
      },
      {
        "t": "Il a une carte, une rivière et beaucoup de tradition!",
        "es": "¡Tiene un mapa, un río y mucha tradición!"
      },
      {
        "t": "Notre communauté du ranch est diverse.",
        "es": "Nuestra comunidad del rancho es diversa."
      },
      {
        "t": "Célébrons toutes nos traditions!",
        "es": "¡Celebremos todas nuestras tradiciones!"
      }
    ],
    "journalPrompt": "Presenta (por escrito) el rancho completo: su mapa, su gente, sus oficios y su cultura. Mínimo 7 líneas.",
    "expedition": {
      "title": "Participación en la historia",
      "reading": "Mujeres, campesinos, indígenas, afrodescendientes y otros grupos participaron en cambios históricos. Estudiar solo líderes deja fuera muchas experiencias.",
      "project": "Escribe una historia ficticia sobre una comunidad que colabora; identifica qué deberías investigar para hacerla histórica.",
      "questions": [
        {
          "text": "¿Qué queda fuera si estudiamos solo a los líderes?",
          "options": [
            "Muchas experiencias",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Muchas experiencias",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre participación en la historia?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Viernes 31 de julio",
    "title": "🏆 Gran Concurso de Verano",
    "subjectLabel": "Evento final",
    "isShowDay": true,
    "isFinal": false,
    "intro": "¡Es el gran día! Miranda compite en el Gran Concurso de Verano usando todo lo aprendido en julio.",
    "subjectQuestions": [
      {
        "text": "Un corral mide 6 m x 4 m. ¿Cuál es su área?",
        "options": [
          "24",
          "20",
          "10",
          "28"
        ],
        "answer": "24",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es la moraleja típica de las fábulas?",
        "options": [
          "Enseñar un valor o lección",
          "Dar risa nada más",
          "No tiene sentido",
          "Ninguna"
        ],
        "answer": "Enseñar un valor o lección",
        "cat": "leng"
      },
      {
        "text": "¿Qué necesita todo ser vivo para vivir?",
        "options": [
          "Agua, alimento y aire",
          "Solo dinero",
          "Nada",
          "Solo juguetes"
        ],
        "answer": "Agua, alimento y aire",
        "cat": "cien"
      },
      {
        "text": "¿Qué representan los puntos cardinales en un mapa?",
        "options": [
          "Las direcciones norte, sur, este y oeste",
          "Los colores",
          "Los números",
          "Nada"
        ],
        "answer": "Las direcciones norte, sur, este y oeste",
        "cat": "soc"
      },
      {
        "text": "Un circuito de 100 m se divide en 4 partes iguales. ¿Cuánto mide cada parte?",
        "options": [
          "20 m",
          "25 m",
          "30 m",
          "50 m"
        ],
        "answer": "25 m",
        "cat": "mate"
      },
      {
        "text": "¿Qué debe tener una buena crónica del verano?",
        "options": [
          "Orden de los hechos y detalles interesantes",
          "Solo números",
          "Nada especial",
          "Solo dibujos"
        ],
        "answer": "Orden de los hechos y detalles interesantes",
        "cat": "leng"
      },
      {
        "text": "¿Qué aprendiste sobre el cuidado de los caballos este verano?",
        "options": [
          "Necesitan agua, comida, ejercicio y cariño",
          "No necesitan cuidado",
          "Solo necesitan agua",
          "Ninguna de las anteriores"
        ],
        "answer": "Necesitan agua, comida, ejercicio y cariño",
        "cat": "cien"
      },
      {
        "text": "¿Qué representa ganar el Gran Concurso de Verano?",
        "options": [
          "El esfuerzo y aprendizaje de todo el mes",
          "Solo suerte",
          "Nada importante",
          "Un error"
        ],
        "answer": "El esfuerzo y aprendizaje de todo el mes",
        "cat": "soc"
      },
      {
        "text": "¿Cuántas cordilleras principales tiene Colombia?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": "3",
        "cat": "soc"
      }
    ],
    "englishVocab": [
      {
        "w": "Grand Prix",
        "es": "Gran Premio",
        "e": "🏆"
      },
      {
        "w": "Champion",
        "es": "Campeona",
        "e": "👑"
      },
      {
        "w": "Congratulations",
        "es": "Felicitaciones",
        "e": "🎉"
      },
      {
        "w": "Proud",
        "es": "Orgullosa",
        "e": "🥰"
      },
      {
        "w": "Journey",
        "es": "Recorrido/Viaje",
        "e": "🛤️"
      },
      {
        "w": "Achievement",
        "es": "Logro",
        "e": "🏅"
      },
      {
        "w": "Together",
        "es": "Juntas(os)",
        "e": "🤝"
      },
      {
        "w": "Forever",
        "es": "Para siempre",
        "e": "♾️"
      }
    ],
    "frenchVocab": [
      {
        "w": "Grand Prix",
        "es": "Gran Premio",
        "e": "🏆"
      },
      {
        "w": "Championne",
        "es": "Campeona",
        "e": "👑"
      },
      {
        "w": "Félicitations",
        "es": "Felicitaciones",
        "e": "🎉"
      },
      {
        "w": "Fière",
        "es": "Orgullosa",
        "e": "🥰"
      },
      {
        "w": "Parcours",
        "es": "Recorrido/Viaje",
        "e": "🛤️"
      },
      {
        "w": "Réussite",
        "es": "Logro",
        "e": "🏅"
      },
      {
        "w": "Ensemble",
        "es": "Juntas(os)",
        "e": "🤝"
      },
      {
        "w": "Pour toujours",
        "es": "Para siempre",
        "e": "♾️"
      }
    ],
    "englishDialogue": [
      {
        "t": "Welcome to the Summer Grand Prix!",
        "es": "¡Bienvenidos al Gran Premio de Verano!"
      },
      {
        "t": "Miranda is ready to jump!",
        "es": "¡Miranda está lista para saltar!"
      },
      {
        "t": "And she wins the gold medal! Congratulations!",
        "es": "¡Y gana la medalla de oro! ¡Felicitaciones!"
      },
      {
        "t": "What an amazing journey this summer!",
        "es": "¡Qué recorrido tan increíble este verano!"
      },
      {
        "t": "We did it together, forever friends!",
        "es": "¡Lo logramos juntas, amigas para siempre!"
      }
    ],
    "frenchDialogue": [
      {
        "t": "Bienvenue au Grand Prix d'été!",
        "es": "¡Bienvenidos al Gran Premio de Verano!"
      },
      {
        "t": "Miranda est prête à sauter!",
        "es": "¡Miranda está lista para saltar!"
      },
      {
        "t": "Et elle gagne la médaille d'or! Félicitations!",
        "es": "¡Y gana la medalla de oro! ¡Felicitaciones!"
      },
      {
        "t": "Quel parcours incroyable cet été!",
        "es": "¡Qué recorrido tan increíble este verano!"
      },
      {
        "t": "On l'a fait ensemble, amies pour toujours!",
        "es": "¡Lo logramos juntas, amigas para siempre!"
      }
    ],
    "journalPrompt": "Escribe una carta a tu caballo agradeciéndole por este verano de aprendizaje. Cuéntale qué aprendiste y qué recordarás siempre (mínimo 8 líneas).",
    "expedition": {
      "title": "Gran Colombia",
      "reading": "La Gran Colombia se creó en 1819 y reunió territorios que hoy pertenecen a varios países. Las fronteras políticas pueden cambiar con el tiempo.",
      "project": "Compara un mapa imaginario antes y después de una separación; distingue territorio y población.",
      "questions": [
        {
          "text": "¿En qué año se creó la Gran Colombia?",
          "options": [
            "1819",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "1819",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre gran colombia?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jornada 24",
    "title": "Municipio y departamento",
    "subjectLabel": "Proyecto integrado",
    "intro": "Miranda investiga municipio y departamento y prepara una exposición del rancho.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Hay 24 sacos con 4 kg. ¿Cuántos kg hay?",
        "options": [
          "96",
          "28",
          "72",
          "97"
        ],
        "answer": "96",
        "cat": "mate"
      },
      {
        "text": "Se reparten 72 zanahorias entre 3 caballos. ¿Cuántas recibe cada uno?",
        "options": [
          "24",
          "25",
          "72",
          "23"
        ],
        "answer": "24",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es una opinión?",
        "options": [
          "El rancho es el más bonito",
          "Hay tres caballos",
          "El mapa tiene cuatro símbolos",
          "La ruta mide dos kilómetros"
        ],
        "answer": "El rancho es el más bonito",
        "cat": "leng"
      },
      {
        "text": "¿Qué acción protege el agua del rancho?",
        "options": [
          "Evitar tirar residuos al río",
          "Verter pintura",
          "Dejar la llave abierta",
          "Arrojar basura"
        ],
        "answer": "Evitar tirar residuos al río",
        "cat": "cien"
      },
      {
        "text": "¿Qué ayuda a resolver un desacuerdo?",
        "options": [
          "Escuchar a todos",
          "Gritar más fuerte",
          "Excluir a alguien",
          "Inventar rumores"
        ],
        "answer": "Escuchar a todos",
        "cat": "soc"
      },
      {
        "text": "¿Qué necesita una explicación clara?",
        "options": [
          "Una idea y razones",
          "Solo un título",
          "Solo dibujos sin contexto",
          "Palabras sin relación"
        ],
        "answer": "Una idea y razones",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa"
      },
      {
        "w": "River",
        "es": "Río"
      },
      {
        "w": "Mountain",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "History",
        "es": "Historia"
      },
      {
        "w": "Journey",
        "es": "Viaje"
      },
      {
        "w": "Community",
        "es": "Comunidad"
      },
      {
        "w": "Museum",
        "es": "Museo"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa"
      },
      {
        "w": "Rivière",
        "es": "Río"
      },
      {
        "w": "Montagne",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "Histoire",
        "es": "Historia"
      },
      {
        "w": "Voyage",
        "es": "Viaje"
      },
      {
        "w": "Communauté",
        "es": "Comunidad"
      },
      {
        "w": "Musée",
        "es": "Museo"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the village?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "It is near the river.",
        "es": "Está cerca del río."
      },
      {
        "t": "Can you show me the map?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Yes. Let us plan our journey.",
        "es": "Sí. Planifiquemos nuestro viaje."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est le village ?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "Il est près de la rivière.",
        "es": "Está cerca del río."
      },
      {
        "t": "Peux-tu me montrer la carte ?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Oui. Préparons notre voyage.",
        "es": "Sí. Preparemos nuestro viaje."
      }
    ],
    "journalPrompt": "Ubica tu municipio y departamento con ayuda de un adulto y dibuja su relación.",
    "isFinal": false,
    "expedition": {
      "title": "Municipio y departamento",
      "reading": "Colombia se organiza territorialmente en municipios y departamentos, entre otras entidades. Un municipio forma parte de un departamento.",
      "project": "Ubica tu municipio y departamento con ayuda de un adulto y dibuja su relación.",
      "questions": [
        {
          "text": "¿De qué entidad forma parte un municipio?",
          "options": [
            "Departamento",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Departamento",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre municipio y departamento?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jornada 25",
    "title": "Acuerdos de convivencia",
    "subjectLabel": "Proyecto integrado",
    "intro": "Miranda investiga acuerdos de convivencia y prepara una exposición del rancho.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Hay 25 sacos con 4 kg. ¿Cuántos kg hay?",
        "options": [
          "100",
          "29",
          "75",
          "101"
        ],
        "answer": "100",
        "cat": "mate"
      },
      {
        "text": "Se reparten 75 zanahorias entre 3 caballos. ¿Cuántas recibe cada uno?",
        "options": [
          "25",
          "26",
          "75",
          "24"
        ],
        "answer": "25",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es una opinión?",
        "options": [
          "El rancho es el más bonito",
          "Hay tres caballos",
          "El mapa tiene cuatro símbolos",
          "La ruta mide dos kilómetros"
        ],
        "answer": "El rancho es el más bonito",
        "cat": "leng"
      },
      {
        "text": "¿Qué acción protege el agua del rancho?",
        "options": [
          "Evitar tirar residuos al río",
          "Verter pintura",
          "Dejar la llave abierta",
          "Arrojar basura"
        ],
        "answer": "Evitar tirar residuos al río",
        "cat": "cien"
      },
      {
        "text": "¿Qué ayuda a resolver un desacuerdo?",
        "options": [
          "Escuchar a todos",
          "Gritar más fuerte",
          "Excluir a alguien",
          "Inventar rumores"
        ],
        "answer": "Escuchar a todos",
        "cat": "soc"
      },
      {
        "text": "¿Qué necesita una explicación clara?",
        "options": [
          "Una idea y razones",
          "Solo un título",
          "Solo dibujos sin contexto",
          "Palabras sin relación"
        ],
        "answer": "Una idea y razones",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa"
      },
      {
        "w": "River",
        "es": "Río"
      },
      {
        "w": "Mountain",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "History",
        "es": "Historia"
      },
      {
        "w": "Journey",
        "es": "Viaje"
      },
      {
        "w": "Community",
        "es": "Comunidad"
      },
      {
        "w": "Museum",
        "es": "Museo"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa"
      },
      {
        "w": "Rivière",
        "es": "Río"
      },
      {
        "w": "Montagne",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "Histoire",
        "es": "Historia"
      },
      {
        "w": "Voyage",
        "es": "Viaje"
      },
      {
        "w": "Communauté",
        "es": "Comunidad"
      },
      {
        "w": "Musée",
        "es": "Museo"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the village?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "It is near the river.",
        "es": "Está cerca del río."
      },
      {
        "t": "Can you show me the map?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Yes. Let us plan our journey.",
        "es": "Sí. Planifiquemos nuestro viaje."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est le village ?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "Il est près de la rivière.",
        "es": "Está cerca del río."
      },
      {
        "t": "Peux-tu me montrer la carte ?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Oui. Préparons notre voyage.",
        "es": "Sí. Preparemos nuestro viaje."
      }
    ],
    "journalPrompt": "Escribe cuatro acuerdos justos para el rancho y cómo podrían revisarse.",
    "isFinal": false,
    "expedition": {
      "title": "Acuerdos de convivencia",
      "reading": "Los acuerdos ayudan a convivir cuando respetan a todas las personas. Escuchar, proponer y revisar soluciones permite resolver desacuerdos.",
      "project": "Escribe cuatro acuerdos justos para el rancho y cómo podrían revisarse.",
      "questions": [
        {
          "text": "¿Qué acción ayuda a comprender un desacuerdo?",
          "options": [
            "Escuchar",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Escuchar",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre acuerdos de convivencia?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jornada 26",
    "title": "Patrimonio",
    "subjectLabel": "Proyecto integrado",
    "isShowDay": false,
    "intro": "Miranda investiga patrimonio y prepara una exposición del rancho.",
    "subjectQuestions": [
      {
        "text": "Hay 26 sacos con 4 kg. ¿Cuántos kg hay?",
        "options": [
          "104",
          "30",
          "78",
          "105"
        ],
        "answer": "104",
        "cat": "mate"
      },
      {
        "text": "Se reparten 78 zanahorias entre 3 caballos. ¿Cuántas recibe cada uno?",
        "options": [
          "26",
          "27",
          "78",
          "25"
        ],
        "answer": "26",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es una opinión?",
        "options": [
          "El rancho es el más bonito",
          "Hay tres caballos",
          "El mapa tiene cuatro símbolos",
          "La ruta mide dos kilómetros"
        ],
        "answer": "El rancho es el más bonito",
        "cat": "leng"
      },
      {
        "text": "¿Qué acción protege el agua del rancho?",
        "options": [
          "Evitar tirar residuos al río",
          "Verter pintura",
          "Dejar la llave abierta",
          "Arrojar basura"
        ],
        "answer": "Evitar tirar residuos al río",
        "cat": "cien"
      },
      {
        "text": "¿Qué ayuda a resolver un desacuerdo?",
        "options": [
          "Escuchar a todos",
          "Gritar más fuerte",
          "Excluir a alguien",
          "Inventar rumores"
        ],
        "answer": "Escuchar a todos",
        "cat": "soc"
      },
      {
        "text": "¿Qué necesita una explicación clara?",
        "options": [
          "Una idea y razones",
          "Solo un título",
          "Solo dibujos sin contexto",
          "Palabras sin relación"
        ],
        "answer": "Una idea y razones",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa"
      },
      {
        "w": "River",
        "es": "Río"
      },
      {
        "w": "Mountain",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "History",
        "es": "Historia"
      },
      {
        "w": "Journey",
        "es": "Viaje"
      },
      {
        "w": "Community",
        "es": "Comunidad"
      },
      {
        "w": "Museum",
        "es": "Museo"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa"
      },
      {
        "w": "Rivière",
        "es": "Río"
      },
      {
        "w": "Montagne",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "Histoire",
        "es": "Historia"
      },
      {
        "w": "Voyage",
        "es": "Viaje"
      },
      {
        "w": "Communauté",
        "es": "Comunidad"
      },
      {
        "w": "Musée",
        "es": "Museo"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the village?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "It is near the river.",
        "es": "Está cerca del río."
      },
      {
        "t": "Can you show me the map?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Yes. Let us plan our journey.",
        "es": "Sí. Planifiquemos nuestro viaje."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est le village ?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "Il est près de la rivière.",
        "es": "Está cerca del río."
      },
      {
        "t": "Peux-tu me montrer la carte ?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Oui. Préparons notre voyage.",
        "es": "Sí. Preparemos nuestro viaje."
      }
    ],
    "journalPrompt": "Entrevista a un adulto sobre una tradición y prepara una ficha sin publicar datos personales.",
    "isFinal": false,
    "expedition": {
      "title": "Patrimonio",
      "reading": "El patrimonio puede incluir edificios, objetos, música, relatos y prácticas compartidas. Cuidarlo permite transmitir memorias sin impedir que las culturas cambien.",
      "project": "Entrevista a un adulto sobre una tradición y prepara una ficha sin publicar datos personales.",
      "questions": [
        {
          "text": "Además de edificios, ¿qué puede ser patrimonio?",
          "options": [
            "Relatos y prácticas",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Relatos y prácticas",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre patrimonio?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jornada 27",
    "title": "Migraciones",
    "subjectLabel": "Proyecto integrado",
    "intro": "Miranda investiga migraciones y prepara una exposición del rancho.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Hay 27 sacos con 4 kg. ¿Cuántos kg hay?",
        "options": [
          "108",
          "31",
          "81",
          "109"
        ],
        "answer": "108",
        "cat": "mate"
      },
      {
        "text": "Se reparten 81 zanahorias entre 3 caballos. ¿Cuántas recibe cada uno?",
        "options": [
          "27",
          "28",
          "81",
          "26"
        ],
        "answer": "27",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es una opinión?",
        "options": [
          "El rancho es el más bonito",
          "Hay tres caballos",
          "El mapa tiene cuatro símbolos",
          "La ruta mide dos kilómetros"
        ],
        "answer": "El rancho es el más bonito",
        "cat": "leng"
      },
      {
        "text": "¿Qué acción protege el agua del rancho?",
        "options": [
          "Evitar tirar residuos al río",
          "Verter pintura",
          "Dejar la llave abierta",
          "Arrojar basura"
        ],
        "answer": "Evitar tirar residuos al río",
        "cat": "cien"
      },
      {
        "text": "¿Qué ayuda a resolver un desacuerdo?",
        "options": [
          "Escuchar a todos",
          "Gritar más fuerte",
          "Excluir a alguien",
          "Inventar rumores"
        ],
        "answer": "Escuchar a todos",
        "cat": "soc"
      },
      {
        "text": "¿Qué necesita una explicación clara?",
        "options": [
          "Una idea y razones",
          "Solo un título",
          "Solo dibujos sin contexto",
          "Palabras sin relación"
        ],
        "answer": "Una idea y razones",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa"
      },
      {
        "w": "River",
        "es": "Río"
      },
      {
        "w": "Mountain",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "History",
        "es": "Historia"
      },
      {
        "w": "Journey",
        "es": "Viaje"
      },
      {
        "w": "Community",
        "es": "Comunidad"
      },
      {
        "w": "Museum",
        "es": "Museo"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa"
      },
      {
        "w": "Rivière",
        "es": "Río"
      },
      {
        "w": "Montagne",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "Histoire",
        "es": "Historia"
      },
      {
        "w": "Voyage",
        "es": "Viaje"
      },
      {
        "w": "Communauté",
        "es": "Comunidad"
      },
      {
        "w": "Musée",
        "es": "Museo"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the village?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "It is near the river.",
        "es": "Está cerca del río."
      },
      {
        "t": "Can you show me the map?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Yes. Let us plan our journey.",
        "es": "Sí. Planifiquemos nuestro viaje."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est le village ?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "Il est près de la rivière.",
        "es": "Está cerca del río."
      },
      {
        "t": "Peux-tu me montrer la carte ?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Oui. Préparons notre voyage.",
        "es": "Sí. Preparemos nuestro viaje."
      }
    ],
    "journalPrompt": "Escribe una bienvenida para una nueva familia y propone dos maneras de ayudarla.",
    "isFinal": false,
    "expedition": {
      "title": "Migraciones",
      "reading": "Migrar significa cambiar de lugar de residencia. Las personas migran por diferentes razones y merecen respeto. Una sola historia no representa a todas.",
      "project": "Escribe una bienvenida para una nueva familia y propone dos maneras de ayudarla.",
      "questions": [
        {
          "text": "¿Qué significa migrar?",
          "options": [
            "Cambiar de residencia",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Cambiar de residencia",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre migraciones?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jornada 28",
    "title": "Transportes de ayer y hoy",
    "subjectLabel": "Proyecto integrado",
    "intro": "Miranda investiga transportes de ayer y hoy y prepara una exposición del rancho.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Hay 28 sacos con 4 kg. ¿Cuántos kg hay?",
        "options": [
          "112",
          "32",
          "84",
          "113"
        ],
        "answer": "112",
        "cat": "mate"
      },
      {
        "text": "Se reparten 84 zanahorias entre 3 caballos. ¿Cuántas recibe cada uno?",
        "options": [
          "28",
          "29",
          "84",
          "27"
        ],
        "answer": "28",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es una opinión?",
        "options": [
          "El rancho es el más bonito",
          "Hay tres caballos",
          "El mapa tiene cuatro símbolos",
          "La ruta mide dos kilómetros"
        ],
        "answer": "El rancho es el más bonito",
        "cat": "leng"
      },
      {
        "text": "¿Qué acción protege el agua del rancho?",
        "options": [
          "Evitar tirar residuos al río",
          "Verter pintura",
          "Dejar la llave abierta",
          "Arrojar basura"
        ],
        "answer": "Evitar tirar residuos al río",
        "cat": "cien"
      },
      {
        "text": "¿Qué ayuda a resolver un desacuerdo?",
        "options": [
          "Escuchar a todos",
          "Gritar más fuerte",
          "Excluir a alguien",
          "Inventar rumores"
        ],
        "answer": "Escuchar a todos",
        "cat": "soc"
      },
      {
        "text": "¿Qué necesita una explicación clara?",
        "options": [
          "Una idea y razones",
          "Solo un título",
          "Solo dibujos sin contexto",
          "Palabras sin relación"
        ],
        "answer": "Una idea y razones",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa"
      },
      {
        "w": "River",
        "es": "Río"
      },
      {
        "w": "Mountain",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "History",
        "es": "Historia"
      },
      {
        "w": "Journey",
        "es": "Viaje"
      },
      {
        "w": "Community",
        "es": "Comunidad"
      },
      {
        "w": "Museum",
        "es": "Museo"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa"
      },
      {
        "w": "Rivière",
        "es": "Río"
      },
      {
        "w": "Montagne",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "Histoire",
        "es": "Historia"
      },
      {
        "w": "Voyage",
        "es": "Viaje"
      },
      {
        "w": "Communauté",
        "es": "Comunidad"
      },
      {
        "w": "Musée",
        "es": "Museo"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the village?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "It is near the river.",
        "es": "Está cerca del río."
      },
      {
        "t": "Can you show me the map?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Yes. Let us plan our journey.",
        "es": "Sí. Planifiquemos nuestro viaje."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est le village ?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "Il est près de la rivière.",
        "es": "Está cerca del río."
      },
      {
        "t": "Peux-tu me montrer la carte ?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Oui. Préparons notre voyage.",
        "es": "Sí. Preparemos nuestro viaje."
      }
    ],
    "journalPrompt": "Compara caballo, bicicleta y autobús en una tabla con ventajas y límites.",
    "isFinal": false,
    "expedition": {
      "title": "Transportes de ayer y hoy",
      "reading": "Las formas de transporte cambian con la tecnología y las necesidades. Compararlas exige observar tiempo, accesibilidad, energía y efectos en el entorno.",
      "project": "Compara caballo, bicicleta y autobús en una tabla con ventajas y límites.",
      "questions": [
        {
          "text": "¿Qué criterio considera quién puede utilizar un transporte?",
          "options": [
            "Accesibilidad",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Accesibilidad",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre transportes de ayer y hoy?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jornada 29",
    "title": "Riesgos del territorio",
    "subjectLabel": "Proyecto integrado",
    "intro": "Miranda investiga riesgos del territorio y prepara una exposición del rancho.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Hay 29 sacos con 4 kg. ¿Cuántos kg hay?",
        "options": [
          "116",
          "33",
          "87",
          "117"
        ],
        "answer": "116",
        "cat": "mate"
      },
      {
        "text": "Se reparten 87 zanahorias entre 3 caballos. ¿Cuántas recibe cada uno?",
        "options": [
          "29",
          "30",
          "87",
          "28"
        ],
        "answer": "29",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es una opinión?",
        "options": [
          "El rancho es el más bonito",
          "Hay tres caballos",
          "El mapa tiene cuatro símbolos",
          "La ruta mide dos kilómetros"
        ],
        "answer": "El rancho es el más bonito",
        "cat": "leng"
      },
      {
        "text": "¿Qué acción protege el agua del rancho?",
        "options": [
          "Evitar tirar residuos al río",
          "Verter pintura",
          "Dejar la llave abierta",
          "Arrojar basura"
        ],
        "answer": "Evitar tirar residuos al río",
        "cat": "cien"
      },
      {
        "text": "¿Qué ayuda a resolver un desacuerdo?",
        "options": [
          "Escuchar a todos",
          "Gritar más fuerte",
          "Excluir a alguien",
          "Inventar rumores"
        ],
        "answer": "Escuchar a todos",
        "cat": "soc"
      },
      {
        "text": "¿Qué necesita una explicación clara?",
        "options": [
          "Una idea y razones",
          "Solo un título",
          "Solo dibujos sin contexto",
          "Palabras sin relación"
        ],
        "answer": "Una idea y razones",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa"
      },
      {
        "w": "River",
        "es": "Río"
      },
      {
        "w": "Mountain",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "History",
        "es": "Historia"
      },
      {
        "w": "Journey",
        "es": "Viaje"
      },
      {
        "w": "Community",
        "es": "Comunidad"
      },
      {
        "w": "Museum",
        "es": "Museo"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa"
      },
      {
        "w": "Rivière",
        "es": "Río"
      },
      {
        "w": "Montagne",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "Histoire",
        "es": "Historia"
      },
      {
        "w": "Voyage",
        "es": "Viaje"
      },
      {
        "w": "Communauté",
        "es": "Comunidad"
      },
      {
        "w": "Musée",
        "es": "Museo"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the village?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "It is near the river.",
        "es": "Está cerca del río."
      },
      {
        "t": "Can you show me the map?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Yes. Let us plan our journey.",
        "es": "Sí. Planifiquemos nuestro viaje."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est le village ?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "Il est près de la rivière.",
        "es": "Está cerca del río."
      },
      {
        "t": "Peux-tu me montrer la carte ?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Oui. Préparons notre voyage.",
        "es": "Sí. Preparemos nuestro viaje."
      }
    ],
    "journalPrompt": "Dibuja con un adulto un plano de encuentro seguro y explica cómo comunicarías una alerta.",
    "isFinal": false,
    "expedition": {
      "title": "Riesgos del territorio",
      "reading": "Reconocer amenazas del entorno ayuda a prepararse. Los planes deben seguir indicaciones de adultos responsables y autoridades, evitando improvisar ante emergencias.",
      "project": "Dibuja con un adulto un plano de encuentro seguro y explica cómo comunicarías una alerta.",
      "questions": [
        {
          "text": "¿Para qué sirve reconocer amenazas del entorno?",
          "options": [
            "Prepararse",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Prepararse",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre riesgos del territorio?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  },
  {
    "date": "Jornada 30",
    "title": "Museo del rancho",
    "subjectLabel": "Proyecto integrado",
    "intro": "Miranda investiga museo del rancho y prepara una exposición del rancho.",
    "isShowDay": false,
    "subjectQuestions": [
      {
        "text": "Hay 30 sacos con 4 kg. ¿Cuántos kg hay?",
        "options": [
          "120",
          "34",
          "90",
          "121"
        ],
        "answer": "120",
        "cat": "mate"
      },
      {
        "text": "Se reparten 90 zanahorias entre 3 caballos. ¿Cuántas recibe cada uno?",
        "options": [
          "30",
          "31",
          "90",
          "29"
        ],
        "answer": "30",
        "cat": "mate"
      },
      {
        "text": "¿Cuál es una opinión?",
        "options": [
          "El rancho es el más bonito",
          "Hay tres caballos",
          "El mapa tiene cuatro símbolos",
          "La ruta mide dos kilómetros"
        ],
        "answer": "El rancho es el más bonito",
        "cat": "leng"
      },
      {
        "text": "¿Qué acción protege el agua del rancho?",
        "options": [
          "Evitar tirar residuos al río",
          "Verter pintura",
          "Dejar la llave abierta",
          "Arrojar basura"
        ],
        "answer": "Evitar tirar residuos al río",
        "cat": "cien"
      },
      {
        "text": "¿Qué ayuda a resolver un desacuerdo?",
        "options": [
          "Escuchar a todos",
          "Gritar más fuerte",
          "Excluir a alguien",
          "Inventar rumores"
        ],
        "answer": "Escuchar a todos",
        "cat": "soc"
      },
      {
        "text": "¿Qué necesita una explicación clara?",
        "options": [
          "Una idea y razones",
          "Solo un título",
          "Solo dibujos sin contexto",
          "Palabras sin relación"
        ],
        "answer": "Una idea y razones",
        "cat": "leng"
      }
    ],
    "englishVocab": [
      {
        "w": "Map",
        "es": "Mapa"
      },
      {
        "w": "River",
        "es": "Río"
      },
      {
        "w": "Mountain",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "History",
        "es": "Historia"
      },
      {
        "w": "Journey",
        "es": "Viaje"
      },
      {
        "w": "Community",
        "es": "Comunidad"
      },
      {
        "w": "Museum",
        "es": "Museo"
      }
    ],
    "frenchVocab": [
      {
        "w": "Carte",
        "es": "Mapa"
      },
      {
        "w": "Rivière",
        "es": "Río"
      },
      {
        "w": "Montagne",
        "es": "Montaña"
      },
      {
        "w": "Village",
        "es": "Pueblo"
      },
      {
        "w": "Histoire",
        "es": "Historia"
      },
      {
        "w": "Voyage",
        "es": "Viaje"
      },
      {
        "w": "Communauté",
        "es": "Comunidad"
      },
      {
        "w": "Musée",
        "es": "Museo"
      }
    ],
    "englishDialogue": [
      {
        "t": "Where is the village?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "It is near the river.",
        "es": "Está cerca del río."
      },
      {
        "t": "Can you show me the map?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Yes. Let us plan our journey.",
        "es": "Sí. Planifiquemos nuestro viaje."
      }
    ],
    "frenchDialogue": [
      {
        "t": "Où est le village ?",
        "es": "¿Dónde está el pueblo?"
      },
      {
        "t": "Il est près de la rivière.",
        "es": "Está cerca del río."
      },
      {
        "t": "Peux-tu me montrer la carte ?",
        "es": "¿Puedes mostrarme el mapa?"
      },
      {
        "t": "Oui. Préparons notre voyage.",
        "es": "Sí. Preparemos nuestro viaje."
      }
    ],
    "journalPrompt": "Construye un museo de cinco fichas: mapa, línea de tiempo, fuente, relato y propuesta de cuidado.",
    "isFinal": true,
    "expedition": {
      "title": "Museo del rancho",
      "reading": "Un museo organiza objetos y relatos para aprender. Las fichas deben distinguir evidencias, interpretaciones y ficción. Explicar lo aprendido también ayuda a recordarlo.",
      "project": "Construye un museo de cinco fichas: mapa, línea de tiempo, fuente, relato y propuesta de cuidado.",
      "questions": [
        {
          "text": "¿Qué debemos distinguir al presentar una historia?",
          "options": [
            "Evidencias y ficción",
            "El texto no habla de ese tema",
            "Solo del cuidado de caballos",
            "Todas las opciones son iguales"
          ],
          "answer": "Evidencias y ficción",
          "cat": "soc"
        },
        {
          "text": "Para investigar este tema, ¿qué harías primero?",
          "options": [
            "Leer y comparar fuentes",
            "Inventar todos los datos",
            "Copiar sin comprender",
            "Elegir por el color"
          ],
          "answer": "Leer y comparar fuentes",
          "cat": "soc"
        },
        {
          "text": "¿Cómo presentarías lo aprendido sobre museo del rancho?",
          "options": [
            "Con una explicación y un ejemplo",
            "Con una respuesta sin razones",
            "Con información inventada como real",
            "Sin revisar lo escrito"
          ],
          "answer": "Con una explicación y un ejemplo",
          "cat": "soc"
        }
      ]
    },
    "plannedMinutes": 150
  }
];

const WEEKS = [
  {
    "title": "Semana 1 · Bienvenida al Rancho",
    "range": [
      0,
      2
    ]
  },
  {
    "title": "Semana 2 · Cuidando a mi Caballo",
    "range": [
      3,
      7
    ]
  },
  {
    "title": "Semana 3 · Explorando el Rancho y el Mapa",
    "range": [
      8,
      12
    ]
  },
  {
    "title": "Semana 4 · Entrenamiento y Deporte Ecuestre",
    "range": [
      13,
      17
    ]
  },
  {
    "title": "Semana 5 · Gran Concurso de Verano",
    "range": [
      18,
      22
    ]
  },
  {
    "title": "Expedición extra · Comunidad y memoria",
    "range": [
      23,
      29
    ]
  }
];

const BADGES = [
  {
    "id": "mate",
    "name": "Jinete Matemático",
    "cat": "mate",
    "emoji": "🐎"
  },
  {
    "id": "leng",
    "name": "Pluma de Oro",
    "cat": "leng",
    "emoji": "🪶"
  },
  {
    "id": "cien",
    "name": "Guardián de la Naturaleza",
    "cat": "cien",
    "emoji": "🌿"
  },
  {
    "id": "soc",
    "name": "Explorador del Rancho",
    "cat": "soc",
    "emoji": "🧭"
  },
  {
    "id": "en",
    "name": "English Trailblazer",
    "cat": "en",
    "emoji": "🏇"
  },
  {
    "id": "fr",
    "name": "Étoile du Français",
    "cat": "fr",
    "emoji": "🎪"
  }
];
