import { BondsData } from './types/index.js';

export const bondsData: BondsData = {
  "bonds": [
    {
      "name": {
        "es": "Dúo de Raros",
        "en": "Weird Duo"
      },
      "participants": [
        1,
        4
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 4,
          "bonuses": [
            {
              "attribute": {
                "es": "Espíritu Competitivo (acumulación cuando Hinata usa súper)",
                "en": "Competitive Spirit (stack when Hinata uses super)"
              },
              "levels": {
                "es": [
                  "1",
                  "1",
                  "1",
                  "1",
                  "1"
                ],
                "en": [
                  "1",
                  "1",
                  "1",
                  "1",
                  "1"
                ]
              }
            }
          ]
        },
        {
          "character_id": 1,
          "bonuses": [
            {
              "attribute": {
                "es": "Reacción (al usar habilidad de recepción con Espíritu Competitivo)",
                "en": "Reaction (when using reception skill with Competitive Spirit)"
              },
              "levels": {
                "es": [
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%"
                ],
                "en": [
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%"
                ]
              }
            }
          ]
        }
      ],
      "id": 1,
      "rich_text": {
        "template": {
          "es": "Cuando un miembro aliado activa una habilidad de recepción, se consume 1 acumulación del efecto [Espíritu Competitivo] y los [Reflejos] del miembro que recibe aumentan un 6%. Cuando se activa la habilidad de recepción de Hinata Shoyo (Hanami) y se consume un efecto de [Espíritu Competitivo], los [Reflejos] de Hinata Shoyo (Hanami) aumentan un 9% adicional, y Kageyama Tobio obtiene 1 acumulación del efecto [Espíritu Competitivo]. Cuando se activa el movimiento especial de Hinata Shoyo (Hanami), Kageyama Tobio obtiene 1 acumulación del efecto [Espíritu Competitivo].",
          "en": "When an ally member's receive skill is activated, consumes 1 stack of [Competitive Spirit] effect, and the receiving member's [Reflexes] increase by 6%. When Hinata Shoyo (Hanami)'s receive skill is activated and a [Competitive Spirit] effect is consumed, Hinata Shoyo (Hanami)'s [Reflexes] further increase by 9%, and Kageyama Tobio gains 1 stack of [Competitive Spirit] effect. When Hinata Shoyo (Hanami)'s special move is activated, Kageyama Tobio gains 1 stack of [Competitive Spirit] effect."
        },
        "variables": [],
        "maxLevels": 1
      }
    },
    {
      "name": {
        "es": "Contemplando los Cerezos en Flor",
        "en": "Cherry Blossom Viewing"
      },
      "participants": [
        1,
        89
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 89,
          "bonuses": [
            {
              "attribute": {
                "es": "Defensa sin Fisuras (acumulaciones iniciales)",
                "en": "Flawless Defense (initial stacks)"
              },
              "levels": {
                "es": [
                  "3",
                  "3",
                  "3",
                  "3",
                  "3"
                ],
                "en": [
                  "3",
                  "3",
                  "3",
                  "3",
                  "3"
                ]
              }
            },
            {
              "attribute": {
                "es": "Conciencia (por cada acumulación de Defensa sin Fisuras)",
                "en": "Awareness (per Flawless Defense stack)"
              },
              "levels": {
                "es": [
                  "+0.8%",
                  "+1%",
                  "+1%",
                  "+1%",
                  "+1.2%"
                ],
                "en": [
                  "+0.8%",
                  "+1%",
                  "+1%",
                  "+1%",
                  "+1.2%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 1,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido (en buena jugada)",
                "en": "Quick Attack (on good play)"
              },
              "levels": {
                "es": [
                  "+1%",
                  "+1.25%",
                  "+1.25%",
                  "+1.5%",
                  "+1.5%"
                ],
                "en": [
                  "+1%",
                  "+1.25%",
                  "+1.25%",
                  "+1.5%",
                  "+1.5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 2,
      "rich_text": {
        "template": {
          "es": "Al comienzo del partido, Kozume Kenma (Hanami) obtiene 3 acumulaciones del efecto [Defensa sin fisuras], y el número máximo de acumulaciones del efecto [Defensa sin fisuras] aumenta a [AcumulacionesMax]. Por cada acumulación del efecto [Defensa sin fisuras], la [Percepcion] de Kozume Kenma (Hanami) aumenta en [BonusPercepcion], y si la jugada de Hinata Shoyo (Hanami) es una buena jugada, su [Ataque rapido] aumenta en [BonusAtaqueRapido].",
          "en": "At the start of the match, Kozume Kenma (Hanami) gains 3 stacks of the [Gapless Defense] effect, and the maximum number of stacks for the [Gapless Defense] effect increases to [MaxStacks]. For each stack of the [Gapless Defense] effect, Kozume Kenma (Hanami)'s [Perception] increases by [PerceptionBonus], and if Hinata Shoyo (Hanami)'s play is a nice play, his [Quick Attack] increases by [QuickAttackBonus]."
        },
        "variables": [
          {
            "name": "AcumulacionesMax",
            "levels": {
              "es": [
                "13",
                "13",
                "14",
                "14",
                "15"
              ]
            }
          },
          {
            "name": "MaxStacks",
            "levels": {
              "en": [
                "13",
                "13",
                "14",
                "14",
                "15"
              ]
            }
          },
          {
            "name": "BonusPercepcion",
            "levels": {
              "es": [
                "0.8%",
                "1%",
                "1%",
                "1%",
                "1.2%"
              ]
            }
          },
          {
            "name": "PerceptionBonus",
            "levels": {
              "en": [
                "0.8%",
                "1%",
                "1%",
                "1%",
                "1.2%"
              ]
            }
          },
          {
            "name": "BonusAtaqueRapido",
            "levels": {
              "es": [
                "1%",
                "1.25%",
                "1.25%",
                "1.5%",
                "1.5%"
              ]
            }
          },
          {
            "name": "QuickAttackBonus",
            "levels": {
              "en": [
                "1%",
                "1.25%",
                "1.25%",
                "1.5%",
                "1.5%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Grupo de los 'Rojos' de Karasuno",
        "en": "Grupo de los 'Rojos' de Karasuno"
      },
      "participants": [
        1,
        4,
        12,
        15
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 1,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 12,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 3
    },
    {
      "name": {
        "es": "Amistad Peculiar",
        "en": "Amistad Peculiar"
      },
      "participants": [
        1,
        38
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 1,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 38,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Una relación de amistad que nace entre personas con personalidades muy diferentes. Aunque sean distintos, se complementan perfectamente.\n\n• Ataque Rápido: [quick_attack]\n• Bloqueo: [block]",
          "en": "A friendship relationship born between people with very different personalities. Even though they are different, they complement each other perfectly.\n\n• Quick Attack: [quick_attack]\n• Block: [block]"
        },
        "variables": [
          {
            "name": "quick_attack",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "block",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 4
    },
    {
      "name": {
        "es": "Dúo de Raros (SSR ver.)",
        "en": "Weird Duo (SSR ver.)"
      },
      "participants": [
        4,
        2
      ],
      "is_link_skill": true,
      "effect_summary": {
        "es": "Kageyama coloca para Hinata, quien realiza un ataque rápido con una potencia de 'Ataque Rápido' x 280%~340%. La 'Conciencia' de Hinata aumenta un 30% y su 'Potencia' aumenta según su 'Conciencia' (máximo 60%~100%). Este ataque no puede ser bloqueado. Al anotar, el tiempo de recarga de la habilidad se reinicia.",
        "en": "Kageyama coloca para Hinata, quien realiza un ataque rápido con una potencia de 'Ataque Rápido' x 280%~340%. La 'Conciencia' de Hinata aumenta un 30% y su 'Potencia' aumenta según su 'Conciencia' (máximo 60%~100%). Este ataque no puede ser bloqueado. Al anotar, el tiempo de recarga de la habilidad se reinicia."
      },
      "rich_text": {
        "template": {
          "es": "Kageyama Tobio coloca el balón, y Hinata Shoyo realiza un ataque rápido de raros con una potencia de [Ataque rapido] x [Multiplicador]. En esta jugada, la [Percepcion] de Hinata Shoyo aumenta un 30%, y su [Fuerza] aumenta en [Percepcion] x [MultiplicadorFuerza] (hasta un máximo de [BonusMaxFuerza]). Esta jugada no puede ser bloqueada. Cuando un aliado anota, el enfriamiento de <Dúo de raros> se reinicia. Si el efecto [Espíritu Competitivo] se consume cuando se activa <Dúo de raros>, Kageyama Tobio obtiene 1 acumulación del efecto [Espíritu Competitivo].",
          "en": "Kageyama Tobio sets the ball, and Hinata Shoyo performs a freak quick attack with a power of [Quick Attack] x [Multiplier]. In this play, Hinata Shoyo's [Perception] increases by 30%, and his [Strength] increases by [Perception] x [StrengthMultiplier] (up to a maximum of [MaxStrengthBonus]). This play cannot be blocked. When an ally scores, the cooldown for <Freak Duo> is reset. If the [Competitive Spirit] effect is consumed when <Freak Duo> is activated, Kageyama Tobio gains 1 stack of the [Competitive Spirit] effect."
        },
        "variables": [
          {
            "name": "Multiplicador",
            "levels": {
              "es": [
                "280%",
                "295%",
                "310%",
                "325%",
                "340%"
              ]
            }
          },
          {
            "name": "Multiplier",
            "levels": {
              "en": [
                "280%",
                "295%",
                "310%",
                "325%",
                "340%"
              ]
            }
          },
          {
            "name": "MultiplicadorFuerza",
            "levels": {
              "es": [
                "30%",
                "35%",
                "40%",
                "45%",
                "50%"
              ]
            }
          },
          {
            "name": "StrengthMultiplier",
            "levels": {
              "en": [
                "30%",
                "35%",
                "40%",
                "45%",
                "50%"
              ]
            }
          },
          {
            "name": "BonusMaxFuerza",
            "levels": {
              "es": [
                "60%",
                "70%",
                "80%",
                "90%",
                "100%"
              ]
            }
          },
          {
            "name": "MaxStrengthBonus",
            "levels": {
              "en": [
                "60%",
                "70%",
                "80%",
                "90%",
                "100%"
              ]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 5
    },
    {
      "name": {
        "es": "Amigos",
        "en": "Amigos"
      },
      "participants": [
        2,
        90
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 2,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 90,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Una amistad sincera que se desarrolla a través del voleibol. Las diferencias se dejan de lado para formar una relación basada en el respeto mutuo.\n\n• Ataque Rápido: [Quick_attack]\n• Colocación: [Set]",
          "en": "A sincere friendship that develops through volleyball. Differences are set aside to form a relationship based on mutual respect.\n\n• Quick Attack: [Quick_attack]\n• Set: [Set]"
        },
        "variables": [
          {
            "name": "quick_attack",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "set",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 6
    },
    {
      "name": {
        "es": "Aspirantes a As",
        "en": "Aspirantes a As"
      },
      "participants": [
        2,
        94
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 2,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 94,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Dos jóvenes jugadores con el sueño de convertirse en ases de sus respectivos equipos. La rivalidad los impulsa a mejorar constantemente.\n\n• Bloqueo: [Block]\n• Ataque Rápido: [Quick_attack]",
          "en": "Two young players with the dream of becoming aces of their respective teams. Rivalry drives them to constantly improve.\n\n• Block: [Block]\n• Quick Attack: [Quick_attack]"
        },
        "variables": [
          {
            "name": "block",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "quick_attack",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 7
    },
    {
      "name": {
        "es": "Buenos Rivales",
        "en": "Buenos Rivales"
      },
      "participants": [
        2,
        98
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 2,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 98,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Una rivalidad sana que los impulsa mutuamente a mejorar. A pesar de competir, mantienen el respeto y la admiración mutua.\n\n• Recepción: [Reception]\n• Colocación: [Set]",
          "en": "A healthy rivalry that mutually drives them to improve. Despite competing, they maintain mutual respect and admiration.\n\n• Reception: [Reception]\n• Set: [Set]"
        },
        "variables": [
          {
            "name": "reception",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "set",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 8
    },
    {
      "name": {
        "es": "Primer Dúo",
        "en": "First Combination"
      },
      "participants": [
        5,
        7
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Cuando se activa una habilidad de ataque rápido, la [Percepcion] del miembro correspondiente aumenta en [Porcentaje].",
          "en": "When a quick attack skill is activated, the corresponding member's [Perception] increases by [Percent]."
        },
        "variables": [
          { "name": "Porcentaje", "levels": { "es": ["6%", "7%", "8%", "9%", "10%"], "en": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Percent", "levels": { "en": ["6%", "7%", "8%", "9%", "10%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 5,
          "bonuses": [
            {
              "attribute": {
                "es": "Conciencia (al activar habilidad de ataque rápido)",
                "en": "Conciencia (al activar habilidad de ataque rápido)"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 7,
          "bonuses": [
            {
              "attribute": {
                "es": "Conciencia (al activar habilidad de ataque rápido)",
                "en": "Conciencia (al activar habilidad de ataque rápido)"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 9
    },
    {
      "name": {
        "es": "Confianza en Formación",
        "en": "Confianza en Formación"
      },
      "participants": [
        5,
        16
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 16,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 5,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "La confianza se construye gradualmente durante el entrenamiento. A través de la práctica constante, aprenden a confiar en las habilidades del otro.\n\n• Recepción: [Reception]\n• Saque: [Serve]",
          "en": "Trust is gradually built during training. Through constant practice, they learn to trust each other's abilities.\n\n• Reception: [Reception]\n• Serve: [Serve]"
        },
        "variables": [
          {
            "name": "reception",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "serve",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 10
    },
    {
      "name": {
        "es": "Tercer Año de Karasuno",
        "en": "Karasuno Third Years"
      },
      "participants": [
        6,
        10,
        9
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El consumo de resistencia para las habilidades de ataque poderoso y ataque rápido se reduce en un 10%. Al realizar un ataque poderoso, la [Tecnica ofensiva] del miembro correspondiente aumenta en [Porcentaje].",
          "en": "Stamina consumption for powerful attack and quick attack skills is reduced by 10%. When performing a powerful attack, the corresponding member's [Offensive Technique] increases by [Percent]."
        },
        "variables": [
          { "name": "Porcentaje", "levels": { "es": ["6%", "7%", "8%", "9%", "10%"], "en": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Percent", "levels": { "en": ["6%", "7%", "8%", "9%", "10%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 6,
          "bonuses": [
            {
              "attribute": {
                "es": "Stamina de habilidades fuertes/ataques (reducción)",
                "en": "Stamina de habilidades fuertes/ataques (reducción)"
              },
              "levels": {
                "es": [
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%"
                ],
                "en": [
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Técnica de Ataque (al atacar)",
                "en": "Técnica de Ataque (al atacar)"
              },
              "levels": {
                "es": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ],
                "en": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 10,
          "bonuses": [
            {
              "attribute": {
                "es": "Stamina de habilidades fuertes/ataques (reducción)",
                "en": "Stamina de habilidades fuertes/ataques (reducción)"
              },
              "levels": {
                "es": [
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%"
                ],
                "en": [
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Técnica de Ataque (al atacar)",
                "en": "Técnica de Ataque (al atacar)"
              },
              "levels": {
                "es": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ],
                "en": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 9,
          "bonuses": [
            {
              "attribute": {
                "es": "Stamina de habilidades fuertes/ataques (reducción)",
                "en": "Stamina de habilidades fuertes/ataques (reducción)"
              },
              "levels": {
                "es": [
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%"
                ],
                "en": [
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%",
                  "-10%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Técnica de Ataque (al atacar)",
                "en": "Técnica de Ataque (al atacar)"
              },
              "levels": {
                "es": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ],
                "en": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 11
    },
    {
      "name": {
        "es": "La Base de Karasuno",
        "en": "Karasuno's Foundation"
      },
      "participants": [
        6,
        22
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 6,
          "bonuses": [
            {
              "attribute": {
                "es": "Moral del equipo (cuando recepción es PERFECT)",
                "en": "Moral del equipo (cuando recepción es PERFECT)"
              },
              "levels": {
                "es": [
                  "+3%",
                  "+3%",
                  "+4%",
                  "+4%",
                  "+5%"
                ],
                "en": [
                  "+3%",
                  "+3%",
                  "+4%",
                  "+4%",
                  "+5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 22,
          "bonuses": [
            {
              "attribute": {
                "es": "Moral del equipo (cuando recepción es PERFECT)",
                "en": "Moral del equipo (cuando recepción es PERFECT)"
              },
              "levels": {
                "es": [
                  "+3%",
                  "+3%",
                  "+4%",
                  "+4%",
                  "+5%"
                ],
                "en": [
                  "+3%",
                  "+3%",
                  "+4%",
                  "+4%",
                  "+5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 12,
      "rich_text": {
        "template": {
          "es": "Si el resultado de una recepción es PERFECTO, la moral del equipo aumenta en [Porcentaje].",
          "en": "If the result of a reception is PERFECT, team morale increases by [Percent]."
        },
        "variables": [
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "3%",
                "3%",
                "4%",
                "4%",
                "5%"
              ],
              "en": [
                "3%",
                "3%",
                "4%",
                "4%",
                "5%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "3%",
                "3%",
                "4%",
                "4%",
                "5%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Detrás de las Sonrisas",
        "en": "Behind the Smiles"
      },
      "participants": [
        6,
        92
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 6,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 92,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Dos personas que, aunque aparenten estar siempre alegres, guardan en su interior preocupaciones y responsabilidades que pocos conocen.\n\n• Recepción: [Reception]",
          "en": "Two people who, although they appear to be always happy, keep inside concerns and responsibilities that few know about.\n\n• Reception: [Reception]"
        },
        "variables": [
          {
            "name": "reception",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 13
    },
    {
      "name": {
        "es": "'Guardián' y 'As'",
        "en": "'Guardian' and 'Ace'"
      },
      "participants": [
        10,
        13
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Cuando Nishinoya Yu o Azumane Asahi activan una habilidad, su propia [Tecnica ofensiva] y [Tecnica defensiva] aumentan en [Porcentaje].",
          "en": "When Nishinoya Yu or Azumane Asahi activates a skill, their own [Offensive Technique] and [Defensive Technique] increase by [Percent]."
        },
        "variables": [
          { "name": "Porcentaje", "levels": { "es": ["6%", "7%", "8%", "9%", "10%"], "en": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Percent", "levels": { "en": ["6%", "7%", "8%", "9%", "10%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 10,
          "bonuses": [
            {
              "attribute": {
                "es": "Técnica de Ataque",
                "en": "Attack Technique"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 13,
          "bonuses": [
            {
              "attribute": {
                "es": "Técnica de Defensa",
                "en": "Defense Technique"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 14
    },
    {
      "name": {
        "es": "Cañón y Muro de Hierro",
        "en": "Cannon and Iron Wall"
      },
      "participants": [
        10,
        39
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 10,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Una combinación imparable: la potencia de fuego del cañón y la defensa impenetrable del muro de hierro.\n\n• Remate: [Spike]",
          "en": "An unstoppable combination: the cannon's firepower and the iron wall's impenetrable defense.\n\n• Spike: [Spike]"
        },
        "variables": [
          {
            "name": "spike",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 15
    },
    {
      "name": {
        "es": "Club de Fans de Kiyoko-san",
        "en": "Kiyoko-san Fan Club"
      },
      "participants": [
        13,
        15
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Cuando se anota un punto, la moral del equipo aumenta en [Cantidad].",
          "en": "When a point is scored, team morale increases by [Amount]."
        },
        "variables": [
          { "name": "Cantidad", "levels": { "es": ["6", "7", "8", "9", "10"], "en": ["6", "7", "8", "9", "10"] } },
          { "name": "Amount", "levels": { "en": ["6", "7", "8", "9", "10"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 13,
          "bonuses": [
            {
              "attribute": {
                "es": "Moral del equipo (al anotar)",
                "en": "Moral del equipo (al anotar)"
              },
              "levels": {
                "es": [
                  "6",
                  "7",
                  "8",
                  "9",
                  "10"
                ],
                "en": [
                  "6",
                  "7",
                  "8",
                  "9",
                  "10"
                ]
              }
            }
          ]
        },
        {
          "character_id": 15,
          "bonuses": [
            {
              "attribute": {
                "es": "Moral del equipo (al anotar)",
                "en": "Moral del equipo (al anotar)"
              },
              "levels": {
                "es": [
                  "6",
                  "7",
                  "8",
                  "9",
                  "10"
                ],
                "en": [
                  "6",
                  "7",
                  "8",
                  "9",
                  "10"
                ]
              }
            }
          ]
        }
      ],
      "id": 16
    },
    {
      "name": {
        "es": "Segundo Año de Karasuno",
        "en": "Karasuno Second Years"
      },
      "participants": [
        15,
        13,
        22
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 22,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 13,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 15,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Los estudiantes de segundo año que forman el núcleo del equipo. Han superado la etapa de novatos y ahora lidean con responsabilidad.\n\n• Remate: [Spike]\n• Colocación: [Set]",
          "en": "Second-year students who form the core of the team. They have overcome the novice stage and now lead with responsibility.\n\n• Spike: [Spike]\n• Set: [Set]"
        },
        "variables": [
          {
            "name": "spike",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "set",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 17
    },
    {
      "name": {
        "es": "¡Amigo!",
        "en": "Friend!"
      },
      "participants": [
        15,
        95
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 15,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 95,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Una exclamación de alegría que marca el inicio de una amistad verdadera. La emoción compartida fortalece su vínculo en la cancha.\n\n• Remate: [Spike]",
          "en": "An exclamation of joy that marks the beginning of a true friendship. Shared emotion strengthens their bond on the court.\n\n• Spike: [Spike]"
        },
        "variables": [
          {
            "name": "spike",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 18
    },
    {
      "name": {
        "es": "'Escudo' y 'Lanza'",
        "en": "'Shield' and 'Spear'"
      },
      "participants": [
        18,
        20
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El [Bloqueo] de Tsukishima Kei y el [Saque] de Yamaguchi Tadashi aumentan en [Porcentaje].",
          "en": "Tsukishima Kei's [Block] and Tadashi Yamaguchi's [Serve] increase by [Percent]."
        },
        "variables": [
          { "name": "Bloqueo", "levels": { "es": ["Bloqueo"], "en": ["Block"] } },
          { "name": "Saque", "levels": { "es": ["Saque"], "en": ["Serve"] } },
          { "name": "Porcentaje", "levels": { "es": ["6%", "7%", "8%", "9%", "10%"], "en": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Percent", "levels": { "en": ["6%", "7%", "8%", "9%", "10%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 18,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 20,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 19
    },
    {
      "name": {
        "es": "Maestro y Discípulo",
        "en": "Teacher and Student"
      },
      "participants": [
        18,
        92
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 18,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 92,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Los más experimentados transmiten conocimientos técnicos a los aprendices, que con el tiempo dominarán el oficio.\n\n• Bloqueo: [Block]",
          "en": "The most experienced transmit technical knowledge to apprentices, who will master the craft over time.\n\n• Block: [Block]"
        },
        "variables": [
          {
            "name": "block",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 20
    },
    {
      "name": {
        "es": "Los Genios de Karasuno",
        "en": "Karasuno's Geniuses"
      },
      "participants": [
        8,
        12
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 12,
          "bonuses": [
            {
              "attribute": {
                "es": "Recibir (condicionado a movimiento especial)",
                "en": "Recibir (condicionado a movimiento especial)"
              },
              "levels": {
                "es": [
                  "+5%",
                  "+7%",
                  "+9%",
                  "+11%",
                  "+13%"
                ],
                "en": [
                  "+5%",
                  "+7%",
                  "+9%",
                  "+11%",
                  "+13%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Reacción",
                "en": "Reaction"
              },
              "levels": {
                "es": [
                  "+5%",
                  "+5%",
                  "+5%",
                  "+5%",
                  "+5%"
                ],
                "en": [
                  "+5%",
                  "+5%",
                  "+5%",
                  "+5%",
                  "+5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 21,
      "rich_text": {
        "template": {
          "es": "Los [Reflejos] de Nishinoya Yu (Después de clases) aumentan en [BonusReflejos]. Si Sugawara Koshi (Después de clases) está en la cancha y la resistencia de Nishinoya Yu (Después de clases) es inferior a 80, los [Reflejos] de Nishinoya Yu (Después de clases) aumentan adicionalmente en [BonusAdicionalReflejos].",
          "en": "Nishinoya Yu (After School)'s [Reflexes] increase by [ReflexesBonus]. If Sugawara Koshi (After School) is on the court and Nishinoya Yu (After School)'s stamina is less than 80, Nishinoya Yu (After School)'s [Reflexes] further increase by [AdditionalReflexesBonus]."
        },
        "variables": [
          {
            "name": "BonusReflejos",
            "levels": {
              "es": [
                "5%",
                "7.5%",
                "7.5%",
                "7.5%",
                "10%"
              ]
            }
          },
          {
            "name": "ReflexesBonus",
            "levels": {
              "en": [
                "5%",
                "7.5%",
                "7.5%",
                "7.5%",
                "10%"
              ]
            }
          },
          {
            "name": "BonusAdicionalReflejos",
            "levels": {
              "es": [
                "5%",
                "5%",
                "7.5%",
                "10%",
                "10%"
              ]
            }
          },
          {
            "name": "AdditionalReflexesBonus",
            "levels": {
              "en": [
                "5%",
                "5%",
                "7.5%",
                "10%",
                "10%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Colocadores de Karasuno",
        "en": "Karasuno Setters"
      },
      "participants": [
        8,
        4
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 8,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Los especialistas en colocación que dirigen el ritmo del juego. Su precisión y visión de campo determinan el éxito de los ataques.\n\n• Colocación: [set]",
          "en": "The setting specialists who direct the pace of the game. Their precision and court vision determine the success of attacks.\n\n• Set: [set]"
        },
        "variables": [
          {
            "name": "set",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 22
    },
    {
      "name": {
        "es": "Tercer Año de Karasuno (SP ver.)",
        "en": "Karasuno Third Years (SP ver.)"
      },
      "participants": [
        8,
        6,
        10
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 8,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 6,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 10,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Los estudiantes más experimentados del equipo que han llegado a su último año. Su liderazgo y sabiduría guían a los más jóvenes.\n\n• Bloqueo: [Block]\n• Recepción: [Reception]\n• Remate: [Spike]",
          "en": "The most experienced students on the team who have reached their final year. Their leadership and wisdom guide the younger ones.\n\n• Block: [Block]\n• Reception: [Reception]\n• Spike: [Spike]"
        },
        "variables": [
          {
            "name": "block",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "reception",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "spike",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 23
    },
    {
      "name": {
        "es": "Sol y Luna",
        "en": "Sun and Moon"
      },
      "participants": [
        1,
        17
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 1,
          "bonuses": [
            {
              "attribute": {
                "es": "Conciencia de miembros del equipo (durante colocación)",
                "en": "Conciencia de miembros del equipo (durante colocación)"
              },
              "levels": {
                "es": [
                  "+10%",
                  "+15%",
                  "+20%",
                  "+25%",
                  "+30%"
                ],
                "en": [
                  "+10%",
                  "+15%",
                  "+20%",
                  "+25%",
                  "+30%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Cooldown de 'Vuela Alto' reducido (cuando ataque rápido es nice play)",
                "en": "Cooldown de 'Vuela Alto' reducido (cuando ataque rápido es nice play)"
              },
              "levels": {
                "es": [
                  "activo",
                  "activo",
                  "activo",
                  "activo",
                  "activo"
                ],
                "en": [
                  "activo",
                  "activo",
                  "activo",
                  "activo",
                  "activo"
                ]
              }
            }
          ]
        },
        {
          "character_id": 17,
          "bonuses": [
            {
              "attribute": {
                "es": "Conciencia (basada en la Conciencia de Hinata)",
                "en": "Conciencia (basada en la Conciencia de Hinata)"
              },
              "levels": {
                "es": [
                  "+10%",
                  "+15%",
                  "+20%",
                  "+25%",
                  "+30%"
                ],
                "en": [
                  "+10%",
                  "+15%",
                  "+20%",
                  "+25%",
                  "+30%"
                ]
              }
            }
          ]
        }
      ],
      "id": 24,
      "rich_text": {
        "template": {
          "es": "Cuando un miembro aliado coloca, su [Percepcion] aumenta en [Porcentaje]. Este efecto dura hasta que el balón cruza la red dos veces. Si el ataque rápido de Hinata Shoyo (Hanami) se convierte en una buena jugada, el enfriamiento de <Saltar Alto> se reduce en 2 cruces de red, y la [Percepcion] de Tsukishima Kei (Festival de Fuegos Artificiales) aumenta un 50% de la [Percepcion] de Hinata Shoyo (Hanami), hasta un máximo del 50%. Este efecto dura hasta que el balón cruza la red 4 veces.",
          "en": "When an ally member tosses, their [Perception] increases by [Percent]. This effect lasts until the ball crosses the net twice. If Hinata Shoyo (Hanami)'s quick attack becomes a nice play, the cooldown of <Jump High> is reduced by 2 net crosses, and Tsukishima Kei (Fireworks Festival)'s [Perception] increases by 50% of Hinata Shoyo (Hanami)'s [Perception], up to a maximum of 50%. This effect lasts until the ball crosses the net 4 times."
        },
        "variables": [
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "10%",
                "15%",
                "20%",
                "25%",
                "30%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "10%",
                "15%",
                "20%",
                "25%",
                "30%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "El Momento de 'Engancharse' al Voleibol",
        "en": "The Moment of 'Getting Hooked' on Volleyball"
      },
      "participants": [
        17,
        61
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 61,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 17,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "El momento exacto en que alguien se enamora del voleibol. Esa pasión instantánea que los une y los motiva a seguir mejorando.\n\n• Remate: [Spike]\n• Ataque Rápido: [Quick_attack]",
          "en": "The exact moment someone falls in love with volleyball. That instant passion that unites them and motivates them to keep improving.\n\n• Spike: [Spike]\n• Quick Attack: [Quick_attack]"
        },
        "variables": [
          {
            "name": "spike",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "quick_attack",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 25
    },
    {
      "name": {
        "es": "'Coraje' y 'Espíritu Competitivo'",
        "en": "'Courage' and 'Competitive Spirit'"
      },
      "participants": [
        89,
        95
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 89,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 95,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Una combinación poderosa de valor para enfrentar cualquier desafío y la determinación de nunca rendirse. Juntos son imparables.\n\n• Colocación: [Set]\n• Recepción: [Reception]",
          "en": "A powerful combination of courage to face any challenge and the determination to never give up. Together they are unstoppable.\n\n• Set: [Set]\n• Reception: [Reception]"
        },
        "variables": [
          {
            "name": "set",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "reception",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 26
    },
    {
      "name": {
        "es": "'Cerebro' y 'Torre de Control'",
        "en": "'Brain' and 'Control Tower'"
      },
      "participants": [
        91,
        90
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 91,
          "bonuses": [
            {
              "attribute": {
                "es": "Toss para ataque rápido de Kuroo",
                "en": "Toss para ataque rápido de Kuroo"
              },
              "levels": {
                "es": [
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible"
                ],
                "en": [
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible"
                ]
              }
            }
          ]
        },
        {
          "character_id": 90,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido (potencia)",
                "en": "Ataque Rápido (potencia)"
              },
              "levels": {
                "es": [
                  "+265%",
                  "+280%",
                  "+295%",
                  "+310%",
                  "+325%"
                ],
                "en": [
                  "+265%",
                  "+280%",
                  "+295%",
                  "+310%",
                  "+325%"
                ]
              }
            }
          ]
        }
      ],
      "id": 27,
      "rich_text": {
        "template": {
          "es": "Kozume Kenma coloca el balón, y Kuroo Tetsuro realiza un ataque rápido con una potencia de [Ataque rapido] x [Multiplicador].",
          "en": "Kozume Kenma sets the ball, and Kuroo Tetsuro performs a quick attack with a power of [Quick Attack] x [Multiplier]."
        },
        "variables": [
          {
            "name": "Multiplicador",
            "levels": {
              "es": [
                "265%",
                "280%",
                "295%",
                "310%",
                "325%"
              ]
            }
          },
          {
            "name": "Multiplier",
            "levels": {
              "en": [
                "265%",
                "280%",
                "295%",
                "310%",
                "325%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Senpais Confiables",
        "en": "Reliable Senpais"
      },
      "participants": [
        91,
        93,
        96
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 91,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 28
    },
    {
      "name": {
        "es": "'Núcleo' y 'Torre de Control'",
        "en": "'Core' and 'Control Tower'"
      },
      "participants": [
        92,
        103
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 90,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 92,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 29,
      "rich_text": {
        "template": {
          "es": "La [Colocacion] de Kozume Kenma (Práctica) y el [Bloqueo] de Kuroo Tetsuro (Práctica) aumentan en [Porcentaje].",
          "en": "Kozume Kenma (Practice)'s [Toss] and Kuroo Tetsuro (Practice)'s [Block] increase by [Percent]."
        },
        "variables": [
          {
            "name": "Colocacion",
            "levels": {
              "es": [
                "Colocacion"
              ],
              "en": [
                "Toss"
              ]
            }
          },
          {
            "name": "Bloqueo",
            "levels": {
              "es": [
                "Bloqueo"
              ],
              "en": [
                "Block"
              ]
            }
          },
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ],
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Tipos Similares",
        "en": "Similar Types"
      },
      "participants": [
        92,
        7
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 7,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 92,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Dos personas con personalidades y características similares que se entienden intuitivamente. Su comprensión mutua los fortalece.\n\n• Recepción: [Reception]\n• Bloqueo: [Block]",
          "en": "Two people with similar personalities and characteristics who understand each other intuitively. Their mutual understanding strengthens them.\n\n• Reception: [Reception]\n• Block: [Block]"
        },
        "variables": [
          {
            "name": "reception",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          },
          {
            "name": "block",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 30
    },
    {
      "name": {
        "es": "Guía Educativa de 'Protección'",
        "en": "'Protection' Educational Guide"
      },
      "participants": [
        93,
        94
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "La [Recepcion] de Yaku Morisuke y el [Ataque rapido] de Haiba Lev aumentan en [Bonus].",
          "en": "Yaku Morisuke's [Reception] and Haiba Lev's [Quick Attack] increase by [Bonus]."
        },
        "variables": [
          { "name": "Bonus", "levels": { "es": ["+1%+5", "+2%+7", "+3%+9", "+4%+12", "+5%+15"], "en": ["+1%+5", "+2%+7", "+3%+9", "+4%+12", "+5%+15"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 93,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 94,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 31
    },
    {
      "name": {
        "es": "Guardianes del Equipo",
        "en": "Team Guardians"
      },
      "participants": [
        93,
        13
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 13,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 93,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "Los dos equipos de voleibol definen a estos dos como especialistas defensivos. Forman una dupla que protege al equipo como los guardianes de un castillo.\n\n• Recepción: [Reception]",
          "en": "Both volleyball teams define these two as defensive specialists. They form a duo that protects the team like castle guardians.\n\n• Reception: [Reception]"
        },
        "variables": [
          {
            "name": "reception",
            "levels": {
              "es": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"],
              "en": ["+5 +1%", "+7 +2%", "+9 +3%", "+12 +4%", "+15 +5%"]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 32
    },
    {
      "name": {
        "es": "Oponente 'Inconquistable'",
        "en": "'Unconquerable' Opponent"
      },
      "participants": [
        94,
        90
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 94,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 33
    },
    {
      "name": {
        "es": "Respiración Acompasada",
        "en": "Synchronized Breathing"
      },
      "participants": [
        26,
        28
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Oikawa Toru coloca el balón, e Iwaizumi Hajime realiza un ataque poderoso con una potencia de [Ataque poderoso] x [Multiplicador]. Gana 2 acumulaciones del efecto [Ritmo de Ataque]. Por cada acumulación de [Ritmo de Ataque], la [Percepcion] de los miembros en la cancha aliada aumenta un 1%. Máximo 10 acumulaciones.",
          "en": "Oikawa Toru sets the ball, and Iwaizumi Hajime performs a powerful attack with a power of [Powerful Attack] x [Multiplier]. Gain 2 stacks of the [Attack Rhythm] effect. For each stack of [Attack Rhythm], the [Perception] of members on the ally court increases by 1%. Maximum 10 stacks."
        },
        "variables": [
          { "name": "Multiplicador", "levels": { "es": ["255%", "270%", "285%", "300%", "315%"] } },
          { "name": "Multiplier", "levels": { "en": ["255%", "270%", "285%", "300%", "315%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 26,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación especial para Iwaizumi",
                "en": "Colocación especial para Iwaizumi"
              },
              "levels": {
                "es": [
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible"
                ],
                "en": [
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible",
                  "disponible"
                ]
              }
            },
            {
              "attribute": {
                "es": "Ritmo de Ataque (acumulaciones por combo)",
                "en": "Ritmo de Ataque (acumulaciones por combo)"
              },
              "levels": {
                "es": [
                  "2",
                  "2",
                  "2",
                  "2",
                  "2"
                ],
                "en": [
                  "2",
                  "2",
                  "2",
                  "2",
                  "2"
                ]
              }
            }
          ]
        },
        {
          "character_id": 28,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate (con colocación de Oikawa)",
                "en": "Remate (con colocación de Oikawa)"
              },
              "levels": {
                "es": [
                  "+255%",
                  "+275%",
                  "+295%",
                  "+315%",
                  "+315%"
                ],
                "en": [
                  "+255%",
                  "+275%",
                  "+295%",
                  "+315%",
                  "+315%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Conciencia del equipo (por acumulación de Ritmo de Ataque)",
                "en": "Conciencia del equipo (por acumulación de Ritmo de Ataque)"
              },
              "levels": {
                "es": [
                  "+1%",
                  "+1%",
                  "+1%",
                  "+1%",
                  "+1%"
                ],
                "en": [
                  "+1%",
                  "+1%",
                  "+1%",
                  "+1%",
                  "+1%"
                ]
              }
            }
          ]
        }
      ],
      "id": 34
    },
    {
      "name": {
        "es": "Rivales Predestinados",
        "en": "Destined Rivals"
      },
      "participants": [
        26,
        53
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 26,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 35
    },
    {
      "name": {
        "es": "'Rey' y 'Gran Rey'",
        "en": "'King' and 'Great King'"
      },
      "participants": [
        4,
        26
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 4,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 26,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 36
    },
    {
      "name": {
        "es": "Hacia Nuevas Alturas",
        "en": "Towards New Heights"
      },
      "participants": [
        26,
        34
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 26,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 37
    },
    {
      "name": {
        "es": "Confianza Despiadada",
        "en": "Ruthless Trust"
      },
      "participants": [
        26,
        36
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 26,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 36,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 38
    },
    {
      "name": {
        "es": "Compañero de Confianza",
        "en": "Trusted Partner"
      },
      "participants": [
        27,
        29
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 27,
          "bonuses": [
            {
              "attribute": {
                "es": "Conciencia",
                "en": "Awareness"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 29,
          "bonuses": [
            {
              "attribute": {
                "es": "Conciencia",
                "en": "Awareness"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "rich_text": {
        "template": {
          "es": "La [Percepcion] de Oikawa Toru (SSR) e Iwaizumi Hajime (SR) aumenta en [Porcentaje].",
          "en": "Oikawa Toru (SSR) and Iwaizumi Hajime (SR)'s [Perception] increases by [Percent]."
        },
        "variables": [
          { "name": "Porcentaje", "levels": { "es": ["6%", "7%", "8%", "9%", "10%"], "en": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Percent", "levels": { "en": ["6%", "7%", "8%", "9%", "10%"] } }
        ],
        "maxLevels": 5
      },
      "id": 39
    },
    {
      "name": {
        "es": "Sociedad de Lobos",
        "en": "Wolf Pack"
      },
      "participants": [
        28,
        36
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 28,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 36,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 40,
      "rich_text": {
        "template": {
          "es": "El [Ataque poderoso] de Iwaizumi Hajime y el [Ataque poderoso] de Kyotani Kentaro aumentan en [Porcentaje].",
          "en": "Iwaizumi Hajime's [Powerful Attack] and Kyotani Kentaro's [Powerful Attack] increase by [Percent]."
        },
        "variables": [
          {
            "name": "Ataque poderoso",
            "levels": {
              "es": [
                "Ataque poderoso"
              ],
              "en": [
                "Powerful Attack"
              ]
            }
          },
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ],
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Honestidad y Calma",
        "en": "Honesty and Calm"
      },
      "participants": [
        35,
        34
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 35,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 34,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 41,
      "rich_text": {
        "template": {
          "es": "El [Ataque rapido] de Kindaichi Yutaro (SR) y el [Ataque poderoso] de Kunimi Akira (SR) aumentan en [Porcentaje].",
          "en": "Kindaichi Yutaro (SR)'s [Quick Attack] and Kunimi Akira (SR)'s [Powerful Attack] increase by [Percent]."
        },
        "variables": [
          {
            "name": "Ataque rapido",
            "levels": {
              "es": [
                "Ataque rapido"
              ],
              "en": [
                "Quick Attack"
              ]
            }
          },
          {
            "name": "Ataque poderoso",
            "levels": {
              "es": [
                "Ataque poderoso"
              ],
              "en": [
                "Powerful Attack"
              ]
            }
          },
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ],
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Pasión Oculta",
        "en": "Hidden Passion"
      },
      "participants": [
        36,
        32
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 36,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 42
    },
    {
      "name": {
        "es": "Segundo Año de Aoba Johsai",
        "en": "Aoba Johsai Second Years"
      },
      "participants": [
        36,
        32,
        33
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 33,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 32,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 43
    },
    {
      "name": {
        "es": "Baño en el Mar",
        "en": "Sea Bathing"
      },
      "participants": [
        38,
        61,
        63
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 38,
          "bonuses": [
            {
              "attribute": {
                "es": "Reacción (en bloqueo de 2/3 durante moral de equipo)",
                "en": "Reaction (in 2/3 block during team morale)"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Moral del equipo (al inicio del rally)",
                "en": "Moral del equipo (al inicio del rally)"
              },
              "levels": {
                "es": [
                  "+20",
                  "+20",
                  "+20",
                  "+20",
                  "+20"
                ],
                "en": [
                  "+20",
                  "+20",
                  "+20",
                  "+20",
                  "+20"
                ]
              }
            }
          ]
        },
        {
          "character_id": 61,
          "bonuses": [
            {
              "attribute": {
                "es": "Reacción (en bloqueo de 2/3 durante moral de equipo)",
                "en": "Reaction (in 2/3 block during team morale)"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 63,
          "bonuses": [
            {
              "attribute": {
                "es": "Reacción (en bloqueo de 2/3 durante moral de equipo)",
                "en": "Reaction (in 2/3 block during team morale)"
              },
              "levels": {
                "es": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ],
                "en": [
                  "6%",
                  "7%",
                  "8%",
                  "9%",
                  "10%"
                ]
              }
            }
          ]
        }
      ],
      "id": 44,
      "rich_text": {
        "template": {
          "es": "Mientras la moral del equipo aliado está despierta, al activarse un bloqueo de 2 o 3 personas, los [Reflejos] de los miembros que participan en el bloqueo aumentan en [Porcentaje]. Este efecto dura hasta que el balón cruza la red dos veces. Al comienzo de un rally, la moral del equipo aliado aumenta en 20.",
          "en": "While an ally's team morale is awakened, upon activation of a 2 or 3-person block, the [Reflexes] of the members participating in the block increase by [Percent]. This effect lasts until the ball crosses the net twice. At the start of a rally, ally team morale increases by 20."
        },
        "variables": [
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ],
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Taciturno y Lengua Afilada",
        "en": "Taciturn and Sharp Tongue"
      },
      "participants": [
        38,
        41
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 38,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 45
    },
    {
      "participants": [
        39,
        41
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 39,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo de dos (potencia combinada)",
                "en": "Double Block (combined power)"
              },
              "levels": {
                "es": [
                  "x180%",
                  "x200%",
                  "x220%",
                  "x230%",
                  "x240%"
                ],
                "en": [
                  "x180%",
                  "x200%",
                  "x220%",
                  "x230%",
                  "x240%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 41,
          "bonuses": [
            {
              "attribute": {
                "es": "Ira al rematador oponente",
                "en": "Anger towards opposing spiker"
              },
              "levels": {
                "es": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ],
                "en": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ]
              }
            }
          ]
        }
      ],
      "name": { "es": "Taciturnidad y Sarcasmo", "en": "Taciturnity and Sarcasm" },
      "rich_text": {
        "template": {
          "es": "Aone Takanobu y Futakuchi Kenji participan en un bloqueo de 2 personas con una potencia de [Bloqueo] de Aone Takanobu x [Multiplicador]. Inflige el perjuicio [Ira] al miembro oponente que remató (ataque poderoso/ataque rápido) ([Ataque poderoso/Ataque rapido] disminuye un 10%).",
          "en": "Aone Takanobu and Futakuchi Kenji participate in a 2-person block with a power of Aone Takanobu's [Block] x [Multiplier]. Inflicts the [Anger] debuff on the opponent member who spiked (powerful attack/quick attack) ([Powerful Attack/Quick Attack] decreases by 10%)."
        },
        "variables": [
          { "name": "Multiplicador", "levels": { "es": ["180%", "195%", "210%", "225%", "240%"] } },
          { "name": "Multiplier", "levels": { "en": ["180%", "195%", "210%", "225%", "240%"] } }
        ],
        "maxLevels": 5
      },
      "id": 46
    },
    {
      "name": {
        "es": "Amistad Peculiar (SSR ver.)",
        "en": "Peculiar Friendship (SSR ver.)"
      },
      "participants": [
        39,
        2
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 39,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 47
    },
    {
      "name": {
        "es": "Nuevo Capitán y Gran Novato",
        "en": "New Captain and Great Rookie"
      },
      "participants": [
        41,
        43
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 41,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo de línea delantera (equipo)",
                "en": "Front Line Block (team)"
              },
              "levels": {
                "es": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ],
                "en": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 43,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo de línea delantera (equipo)",
                "en": "Front Line Block (team)"
              },
              "levels": {
                "es": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ],
                "en": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ]
              }
            }
          ]
        }
      ],
      "id": 48,
      "rich_text": {
        "template": {
          "es": "El [Bloqueo] de la fila delantera aumenta en [Porcentaje].",
          "en": "The front row's [Block] increases by [Percent]."
        },
        "variables": [
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "2%",
                "2.5%",
                "3%",
                "3.5%",
                "4%"
              ],
              "en": [
                "2%",
                "2.5%",
                "3%",
                "3.5%",
                "4%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "2%",
                "2.5%",
                "3%",
                "3.5%",
                "4%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Antiguo y Nuevo Capitán de Date Tech",
        "en": "Former and New Captain of Date Tech"
      },
      "participants": [
        41,
        47
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 41,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 49
    },
    {
      "name": {
        "es": "Colocadores de Date Tech",
        "en": "Date Tech Setters"
      },
      "participants": [
        43,
        47
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 43,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 50
    },
    {
      "name": { "es": "3º año de Date Tech", "en": "Date Tech 3rd Years" },
      "rich_text": {
        "template": {
          "es": "Cuando se activa una habilidad de bloqueo, la moral del equipo aumenta en [Porcentaje].",
          "en": "When a block skill is activated, team morale increases by [Percent]."
        },
        "variables": [
          { "name": "Porcentaje", "levels": { "es": ["3%", "3%", "4%", "4%", "5%"], "en": ["3%", "3%", "4%", "4%", "5%"] } },
          { "name": "Percent", "levels": { "en": ["3%", "3%", "4%", "4%", "5%"] } }
        ],
        "maxLevels": 5
      },
      "participants": [
        48,
        47,
        46
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 48,
          "bonuses": [
            {
              "attribute": {
                "es": "Moral del equipo (al activar bloqueo)",
                "en": "Team Morale (when activating block)"
              },
              "levels": {
                "es": [
                  "3%",
                  "3%",
                  "4%",
                  "4%",
                  "5%"
                ],
                "en": [
                  "3%",
                  "3%",
                  "4%",
                  "4%",
                  "5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 47,
          "bonuses": [
            {
              "attribute": {
                "es": "Moral del equipo (al activar bloqueo)",
                "en": "Team Morale (when activating block)"
              },
              "levels": {
                "es": [
                  "3%",
                  "3%",
                  "4%",
                  "4%",
                  "5%"
                ],
                "en": [
                  "3%",
                  "3%",
                  "4%",
                  "4%",
                  "5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 46,
          "bonuses": [
            {
              "attribute": {
                "es": "Moral del equipo (al activar bloqueo)",
                "en": "Team Morale (when activating block)"
              },
              "levels": {
                "es": [
                  "3%",
                  "3%",
                  "4%",
                  "4%",
                  "5%"
                ],
                "en": [
                  "3%",
                  "3%",
                  "4%",
                  "4%",
                  "5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 51
    },
    {
      "name": {
        "es": "Rematadores de Date Tech",
        "en": "Date Tech Spikers"
      },
      "participants": [
        48,
        50
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El [Ataque poderoso] de Sasaya Takehito y el [Bloqueo] de Obara Yutaka aumentan en [Bonus].",
          "en": "Sasaya Takehito's [Powerful Attack] and Obara Yutaka's [Block] increase by [Bonus]."
        },
        "variables": [
          { "name": "Ataque poderoso", "levels": { "es": ["Ataque poderoso"], "en": ["Powerful Attack"] } },
          { "name": "Bloqueo", "levels": { "es": ["Bloqueo"], "en": ["Block"] } },
          { "name": "Bonus", "levels": { "es": ["2%", "2.5%", "3%", "3.5%", "+4%"], "en": ["2%", "2.5%", "3%", "3.5%", "+4%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 48,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ],
                "en": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 50,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ],
                "en": [
                  "2%",
                  "2.5%",
                  "3%",
                  "3.5%",
                  "4%"
                ]
              }
            }
          ]
        }
      ],
      "id": 52
    },
    {
      "name": { "es": "Mejores Amigos' de por vida", "en": "Lifelong 'Best Friends'" },
      "rich_text": {
        "template": {
          "es": "La [Tecnica ofensiva] de Ushijima Wakatoshi y la [Tecnica defensiva] de Tendo Satori aumentan en [Porcentaje].",
          "en": "Ushijima Wakatoshi's [Offensive Technique] and Tendo Satori's [Defensive Technique] increase by [Percent]."
        },
        "variables": [
          { "name": "Tecnica ofensiva", "levels": { "es": ["Tecnica ofensiva"], "en": ["Offensive Technique"] } },
          { "name": "Tecnica defensiva", "levels": { "es": ["Tecnica defensiva"], "en": ["Defensive Technique"] } },
          { "name": "Porcentaje", "levels": { "es": ["3%", "3.5%", "4%", "4.5%", "5%"], "en": ["3%", "3.5%", "4%", "4.5%", "5%"] } },
          { "name": "Percent", "levels": { "en": ["3%", "3.5%", "4%", "4.5%", "5%"] } }
        ],
        "maxLevels": 5
      },
      "participants": [
        53,
        54
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 53,
          "bonuses": [
            {
              "attribute": {
                "es": "Técnica de Ataque",
                "en": "Attack Technique"
              },
              "levels": {
                "es": [
                  "3%",
                  "3.5%",
                  "4%",
                  "4.5%",
                  "5%"
                ],
                "en": [
                  "3%",
                  "3.5%",
                  "4%",
                  "4.5%",
                  "5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 54,
          "bonuses": [
            {
              "attribute": {
                "es": "Técnica de Defensa",
                "en": "Defense Technique"
              },
              "levels": {
                "es": [
                  "3%",
                  "3.5%",
                  "4%",
                  "4.5%",
                  "5%"
                ],
                "en": [
                  "3%",
                  "3.5%",
                  "4%",
                  "4.5%",
                  "5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 53
    },
    {
      "name": {
        "es": "'Campeón Absoluto' y Colocador Sólido",
        "en": "'Absolute Champion' and Solid Setter"
      },
      "rich_text": {
        "template": {
          "es": "Shirabu Kenjiro coloca el balón, y Ushijima Wakatoshi realiza un ataque poderoso con una potencia de [Ataque poderoso] x [Multiplicador]. En este ataque poderoso, la [Fuerza] de Ushijima Wakatoshi aumenta un 10%.",
          "en": "Shirabu Kenjiro sets the ball, and Ushijima Wakatoshi performs a powerful attack with a power of [Powerful Attack] x [Multiplier]. In this powerful attack, Ushijima Wakatoshi's [Strength] increases by 10%."
        },
        "variables": [
          { "name": "Multiplicador", "levels": { "es": ["260%", "275%", "290%", "305%", "320%"] } },
          { "name": "Multiplier", "levels": { "en": ["260%", "275%", "290%", "305%", "320%"] } }
        ],
        "maxLevels": 5
      },
      "participants": [
        53,
        56
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 53,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate (con colocación de Shirabu)",
                "en": "Spike (with Shirabu's set)"
              },
              "levels": {
                "es": [
                  "x260%",
                  "x280%",
                  "x300%",
                  "x310%",
                  "x320%"
                ],
                "en": [
                  "x260%",
                  "x280%",
                  "x300%",
                  "x310%",
                  "x320%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Potencia (en combo con Shirabu)",
                "en": "Power (in combo with Shirabu)"
              },
              "levels": {
                "es": [
                  "+10%",
                  "+10%",
                  "+10%",
                  "+10%",
                  "+10%"
                ],
                "en": [
                  "+10%",
                  "+10%",
                  "+10%",
                  "+10%",
                  "+10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 56,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación (para combo con Ushijima)",
                "en": "Set (for combo with Ushijima)"
              },
              "levels": {
                "es": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ],
                "en": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ]
              }
            }
          ]
        }
      ],
      "id": 54
    },
    {
      "name": {
        "es": "Tercer Año de Shiratorizawa",
        "en": "Shiratorizawa Third Years"
      },
      "participants": [
        53,
        54,
        57,
        58,
        60
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 54,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 57,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 58,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 60,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 55
    },
    {
      "name": {
        "es": "Del Gran As al As",
        "en": "From Great Ace to Ace"
      },
      "participants": [
        53,
        55
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 53,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 55,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 56
    },
    {
      "name": {
        "es": "'Ushiwaka' y 'Benkei'",
        "en": "'Ushiwaka' and 'Benkei'"
      },
      "participants": [
        53,
        58
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 53,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 58,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 57
    },
    {
      "name": {
        "es": "Bloqueadores Centrales de Shiratorizawa",
        "en": "Shiratorizawa Middle Blockers"
      },
      "participants": [
        54,
        59
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El [Bloqueo] de la fila delantera aliada aumenta en [Porcentaje].",
          "en": "The ally front row's [Block] increases by [Percent]."
        },
        "variables": [
          { "name": "Porcentaje", "levels": { "es": ["5%", "5.5%", "6%", "6.5%", "7%"], "en": ["5%", "5.5%", "6%", "6.5%", "7%"] } },
          { "name": "Percent", "levels": { "en": ["5%", "5.5%", "6%", "6.5%", "7%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 54,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo de línea delantera (equipo)",
                "en": "Front Line Block (team)"
              },
              "levels": {
                "es": [
                  "5%",
                  "5.5%",
                  "6%",
                  "6.5%",
                  "7%"
                ],
                "en": [
                  "5%",
                  "5.5%",
                  "6%",
                  "6.5%",
                  "7%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 59,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo de línea delantera (equipo)",
                "en": "Front Line Block (team)"
              },
              "levels": {
                "es": [
                  "5%",
                  "5.5%",
                  "6%",
                  "6.5%",
                  "7%"
                ],
                "en": [
                  "5%",
                  "5.5%",
                  "6%",
                  "6.5%",
                  "7%"
                ]
              }
            }
          ]
        }
      ],
      "id": 58
    },
    {
      "name": {
        "es": "Expectativa del Senpai",
        "en": "Senpai's Expectations"
      },
      "participants": [
        54,
        55
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 54,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 55,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 59
    },
    {
      "name": {
        "es": "Adivinanza vs. Sistema",
        "en": "Guess vs. System"
      },
      "participants": [
        54,
        18
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 54,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 60
    },
    {
      "name": {
        "es": "Rematadores de Shiratorizawa",
        "en": "Shiratorizawa Spikers"
      },
      "participants": [
        55,
        58
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El [Ataque poderoso] de los miembros aliados aumenta en [Porcentaje].",
          "en": "Ally members' [Powerful Attack] increases by [Percent]."
        },
        "variables": [
          { "name": "Porcentaje", "levels": { "es": ["4%", "4.5%", "5%", "5.5%", "6%"], "en": ["4%", "4.5%", "5%", "5.5%", "6%"] } },
          { "name": "Percent", "levels": { "en": ["4%", "4.5%", "5%", "5.5%", "6%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 55,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate del equipo",
                "en": "Team Spike"
              },
              "levels": {
                "es": [
                  "4%",
                  "4.5%",
                  "5%",
                  "5.5%",
                  "6%"
                ],
                "en": [
                  "4%",
                  "4.5%",
                  "5%",
                  "5.5%",
                  "6%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 58,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate del equipo",
                "en": "Team Spike"
              },
              "levels": {
                "es": [
                  "4%",
                  "4.5%",
                  "5%",
                  "5.5%",
                  "6%"
                ],
                "en": [
                  "4%",
                  "4.5%",
                  "5%",
                  "5.5%",
                  "6%"
                ]
              }
            }
          ]
        }
      ],
      "id": 61
    },
    {
      "name": {
        "es": "Segundo Año de Shiratorizawa",
        "en": "Shiratorizawa Second Years"
      },
      "participants": [
        56,
        59
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 56,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 59,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 62
    },
    {
      "name": {
        "es": "Colocadores de Diferentes Tipos",
        "en": "Different Type Setters"
      },
      "participants": [
        56,
        57
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 56,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 57,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 63
    },
    {
      "name": {
        "es": "As Milagroso y Colocador Atento",
        "en": "Miraculous Ace and Attentive Setter"
      },
      "participants": [
        62,
        64
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Bokuto Koutarou pierde el efecto [Modo desanimado]. Akaashi Keiji coloca el balón, y Bokuto Koutarou realiza un ataque poderoso con una potencia de [Ataque poderoso] x [Multiplicador]. Con este ataque poderoso, el [Ataque poderoso] de Bokuto Koutarou aumenta un 20%, y la moral del equipo aliado aumenta en 15.",
          "en": "Bokuto Koutarou loses the [Dejected Mode] effect. Akaashi Keiji sets the ball, and Bokuto Koutarou performs a powerful attack with a power of [Powerful Attack] x [Multiplier]. With this powerful attack, Bokuto Koutarou's [Powerful Attack] increases by 20%, and ally team morale increases by 15."
        },
        "variables": [
          { "name": "Multiplicador", "levels": { "es": ["265%", "280%", "295%", "310%", "325%"] } },
          { "name": "Multiplier", "levels": { "en": ["265%", "280%", "295%", "310%", "325%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 62,
          "bonuses": [
            {
              "attribute": {
                "es": "Modo Depresivo",
                "en": "Depressive Mode"
              },
              "levels": {
                "es": [
                  "Eliminado",
                  "Eliminado",
                  "Eliminado",
                  "Eliminado",
                  "Eliminado"
                ],
                "en": [
                  "Eliminado",
                  "Eliminado",
                  "Eliminado",
                  "Eliminado",
                  "Eliminado"
                ]
              }
            },
            {
              "attribute": {
                "es": "Remate (con colocación de Akaashi)",
                "en": "Spike (with Akaashi's set)"
              },
              "levels": {
                "es": [
                  "x265%",
                  "x285%",
                  "x305%",
                  "x315%",
                  "x325%"
                ],
                "en": [
                  "x265%",
                  "x285%",
                  "x305%",
                  "x315%",
                  "x325%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Remate (bonus adicional)",
                "en": "Spike (additional bonus)"
              },
              "levels": {
                "es": [
                  "+20%",
                  "+20%",
                  "+20%",
                  "+20%",
                  "+20%"
                ],
                "en": [
                  "+20%",
                  "+20%",
                  "+20%",
                  "+20%",
                  "+20%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 64,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación (para combo con Bokuto)",
                "en": "Set (for combo with Bokuto)"
              },
              "levels": {
                "es": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ],
                "en": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ]
              }
            },
            {
              "attribute": {
                "es": "Moral del equipo",
                "en": "Team Morale"
              },
              "levels": {
                "es": [
                  "+15",
                  "+15",
                  "+15",
                  "+15",
                  "+15"
                ],
                "en": [
                  "+15",
                  "+15",
                  "+15",
                  "+15",
                  "+15"
                ]
              }
            }
          ]
        }
      ],
      "id": 64
    },
    {
      "name": {
        "es": "Compañeros de Práctica de Tokio",
        "en": "Tokyo Practice Partners"
      },
      "participants": [
        62,
        64,
        91,
        18
      ],
      "is_link_skill": false,
      "rich_text": {
        "template": {
          "es": "El [Saque] de Sarukui Yamato aumenta en [Bonus].",
          "en": "Sarukui Yamato's [Serve] increases by [Bonus]."
        },
        "variables": [
          { "name": "Bonus", "levels": { "es": ["+1%+5", "+2%+7", "+3%+9", "+4%+12", "+5%+15"], "en": ["+1%+5", "+2%+7", "+3%+9", "+4%+12", "+5%+15"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 62,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 64,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 65
    },
    {
      "name": {
        "es": "Primer Discípulo",
        "en": "First Disciple"
      },
      "participants": [
        62,
        2
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 62,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 66
    },
    {
      "name": {
        "es": "Enganchados al Voleibol",
        "en": "Hooked on Volleyball"
      },
      "participants": [
        62,
        65
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 62,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 67
    },
    {
      "name": {
        "es": "Compañeros de Práctica de Tokio (Habilidad)",
        "en": "Tokyo Practice Partners (Skill)"
      },
      "participants": [
        62,
        66
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 66,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 68
    },
    {
      "name": {
        "es": "Tercer Año de Fukurōdani",
        "en": "Fukurōdani Third Years"
      },
      "participants": [
        62,
        65,
        69,
        67,
        66
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 69,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 66,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 65,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 67,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 69
    },
    {
      "name": {
        "es": "Bloqueadores Centrales de Fukurōdani",
        "en": "Fukurōdani Middle Blockers"
      },
      "participants": [
        69,
        68
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 69,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 70
    },
    {
      "name": {
        "es": "La Importancia de una 'Base'",
        "en": "The Importance of a 'Foundation'"
      },
      "participants": [
        70,
        6
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 70,
          "bonuses": [
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 71
    },
    {
      "name": {
        "es": "Dos de Alta Tensión",
        "en": "Two High-Tension"
      },
      "participants": [
        70,
        71
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 70,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 72
    },
    {
      "name": {
        "es": "Rematadores de Jōzenji",
        "en": "Jōzenji Spikers"
      },
      "participants": [
        70,
        73
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 70,
          "bonuses": [
            {
              "attribute": {
                "es": "Recepción",
                "en": "Reception"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 73,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 73
    },
    {
      "name": {
        "es": "Los Gemelos Más Fuertes de la Preparatoria",
        "en": "The Strongest Twins in High School"
      },
      "participants": [
        77,
        78
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 77,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación (para ataque rápido tempo negativo)",
                "en": "Colocación (para ataque rápido tempo negativo)"
              },
              "levels": {
                "es": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ],
                "en": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ]
              }
            }
          ]
        },
        {
          "character_id": 78,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido (tempo negativo, no bloqueabLe)",
                "en": "Ataque Rápido (tempo negativo, no bloqueabLe)"
              },
              "levels": {
                "es": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ],
                "en": [
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado",
                  "Activado"
                ]
              }
            },
            {
              "attribute": {
                "es": "Técnica de Ataque (hasta que uno deje cancha)",
                "en": "Técnica de Ataque (hasta que uno deje cancha)"
              },
              "levels": {
                "es": [
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%"
                ],
                "en": [
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%",
                  "+15%"
                ]
              }
            }
          ]
        }
      ],
      "id": 74,
      "rich_text": {
        "template": {
          "es": "Miya Atsumu coloca el balón, y Miya Osamu realiza un ataque rápido gemelo de tempo negativo con una potencia de [Ataque rapido] x [Multiplicador]. La [Tecnica ofensiva] de Miya Osamu aumenta un 15%. Este efecto persiste hasta que Miya Atsumu o Miya Osamu salgan de la cancha. Esta jugada no puede ser bloqueada.",
          "en": "Miya Atsumu sets the ball, and Miya Osamu performs a minus-tempo twin quick attack with a power of [Quick Attack] x [Multiplier]. Miya Osamu's [Offensive Technique] increases by 15%. This effect persists until either Miya Atsumu or Miya Osamu leaves the court. This play cannot be blocked."
        },
        "variables": [
          {
            "name": "Multiplicador",
            "levels": {
              "es": [
                "265%",
                "280%",
                "295%",
                "310%",
                "325%"
              ]
            }
          },
          {
            "name": "Multiplier",
            "levels": {
              "en": [
                "265%",
                "280%",
                "295%",
                "310%",
                "325%"
              ]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Cerebro y Eje",
        "en": "Brain and Axis"
      },
      "rich_text": {
        "template": {
          "es": "La [Tecnica ofensiva] de Miya Osamu aumenta en [Porcentaje1], y el parámetro principal de Kita Shinsuke aumenta en [Porcentaje2]. Al comienzo del partido, Miya Atsumu obtiene 3 acumulaciones del efecto [Perfectamente Claro]. Por cada acumulación, la [Colocacion] aumenta un 2%. Máx. 10 acumulaciones. Kita Shinsuke obtiene 1 acumulación del efecto [Acción Confiable]. Por cada acumulación, la [Recepcion] aumenta un 2%. Máx. 3 acumulaciones. La potencia del primer ataque rápido de Miya Osamu en cada set aumenta en [Ataque rapido] x 12%.",
          "en": "Miya Osamu's [Offensive Technique] increases by [Percent1], and Kita Shinsuke's main parameter increases by [Percent2]. At the start of the match, Miya Atsumu gains 3 stacks of the [Perfectly Clear] effect. For each stack, [Toss] increases by 2%. Max 10 stacks. Kita Shinsuke gains 1 stack of the [Reliable Action] effect. For each stack, [Reception] increases by 2%. Max 3 stacks. The power of Miya Osamu's first quick attack in each set increases by [Quick Attack] x 12%."
        },
        "variables": [
          { "name": "Porcentaje1", "levels": { "es": ["3%", "3.5%", "4%", "4.5%", "5%"] } },
          { "name": "Percent1", "levels": { "en": ["3%", "3.5%", "4%", "4.5%", "5%"] } },
          { "name": "Porcentaje2", "levels": { "es": ["3%", "3.5%", "4%", "4.5%", "5%"] } },
          { "name": "Percent2", "levels": { "en": ["3%", "3.5%", "4%", "4.5%", "5%"] } }
        ],
        "maxLevels": 5
      },
      "participants": [
        77,
        78,
        79
      ],
      "is_link_skill": true,
      "effects_by_character": [
        {
          "character_id": 77,
          "bonuses": [
            {
              "attribute": {
                "es": "Técnica de colocación",
                "en": "Técnica de colocación"
              },
              "levels": {
                "es": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ],
                "en": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ]
              }
            }
          ],
          "abilities": [
            {
              "name": {
                "es": "Donpishari",
                "en": "Donpishari"
              },
              "description": {
                "es": "Al inicio del partido, gana acumulaciones de efecto 3 stacks. Por cada stack, la técnica mejora un +3%. Máximo 10 stacks.",
                "en": "Al inicio del partido, gana acumulaciones de efecto 3 stacks. Por cada stack, la técnica mejora un +3%. Máximo 10 stacks."
              },
              "levels": {
                "es": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ],
                "en": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 78,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ],
                "en": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ]
              }
            }
          ],
          "abilities": [
            {
              "name": {
                "es": "Primer ataque rápido potenciado",
                "en": "Primer ataque rápido potenciado"
              },
              "description": {
                "es": "El primer ataque rápido de cada set aumenta su potencia de 'Ataque Rápido' en un 12%.",
                "en": "El primer ataque rápido de cada set aumenta su potencia de 'Ataque Rápido' en un 12%."
              },
              "levels": {
                "es": [
                  "+12%"
                ],
                "en": [
                  "+12%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 79,
          "bonuses": [
            {
              "attribute": {
                "es": "Parámetros de líder",
                "en": "Parámetros de líder"
              },
              "levels": {
                "es": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ],
                "en": [
                  "+3%",
                  "+3.5%",
                  "+4%",
                  "+4.5%",
                  "+5%"
                ]
              }
            }
          ],
          "abilities": [
            {
              "name": {
                "es": "Certeza",
                "en": "Certeza"
              },
              "description": {
                "es": "Al inicio del partido, gana efecto de certeza que mejora la estabilidad del equipo.",
                "en": "Al inicio del partido, gana efecto de certeza que mejora la estabilidad del equipo."
              },
              "levels": {
                "es": [
                  "+2%",
                  "+2.5%",
                  "+3%",
                  "+3.5%",
                  "+4%"
                ],
                "en": [
                  "+2%",
                  "+2.5%",
                  "+3%",
                  "+3.5%",
                  "+4%"
                ]
              }
            }
          ]
        }
      ],
      "id": 75
    },
    {
      "name": {
        "es": "Amigos de la Clase de Voleibol",
        "en": "Amigos de la Clase de Voleibol"
      },
      "participants": [
        77,
        78,
        81
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 77,
          "bonuses": [
            {
              "attribute": {
                "es": "Saque",
                "en": "Serve"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 78,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 81,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 76
    },
    {
      "name": {
        "es": "Compañeros Colocadores del Campamento Juvenil",
        "en": "Compañeros Colocadores del Campamento Juvenil"
      },
      "participants": [
        4,
        77
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 4,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 77,
          "bonuses": [
            {
              "attribute": {
                "es": "Colocación",
                "en": "Set"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 77
    },
    {
      "name": {
        "es": "Segundo Año de Inarizaki",
        "en": "Segundo Año de Inarizaki"
      },
      "participants": [
        77,
        78,
        80,
        83
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 80,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 83,
          "bonuses": [
            {
              "attribute": {
                "es": "Remate",
                "en": "Spike"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 78,
          "bonuses": [
            {
              "attribute": {
                "es": "Ataque Rápido",
                "en": "Quick Attack"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 78
    },
    {
      "name": {
        "es": "Compañeros del Campamento Intensivo Juvenil de Japón",
        "en": "Compañeros del Campamento Intensivo Juvenil de Japón"
      },
      "participants": [
        77,
        87
      ],
      "is_link_skill": false,
      "effect_summary": {
        "es": "Aumenta la 'Colocación' de Atsumu, el 'Remate Fuerte' de Sakusa, la 'Recepción' de Komori y el 'Remate Fuerte' de Hoshiumi según el nivel.",
        "en": "Aumenta la 'Colocación' de Atsumu, el 'Remate Fuerte' de Sakusa, la 'Recepción' de Komori y el 'Remate Fuerte' de Hoshiumi según el nivel."
      },
      "id": 79
    },
    {
      "name": {
        "es": "Amigos de la Infancia que Jugaron en Secundaria y Preparatoria",
        "en": "Best Friends from Middle and High School"
      },
      "participants": [
        87,
        88
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El parámetro principal de Hoshiumi Korai aumenta en [Porcentaje1], y el [Bloqueo] de la fila delantera aliada aumenta en [Porcentaje2]. Al comienzo del partido, Hoshiumi Korai obtiene 1 acumulación del efecto [Todoterreno], y Hirugami Sachiro obtiene 1 acumulación del efecto [Bloqueo Sólido].",
          "en": "Hoshiumi Korai's main parameter increases by [Percent1], and the ally front row's [Block] increases by [Percent2]. At the start of the match, Hoshiumi Korai gains 1 stack of the [All-Rounder] effect, and Hirugami Sachiro gains 1 stack of the [Solid Block] effect."
        },
        "variables": [
          { "name": "Porcentaje1", "levels": { "es": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Percent1", "levels": { "en": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Porcentaje2", "levels": { "es": ["6%", "7%", "8%", "9%", "10%"] } },
          { "name": "Percent2", "levels": { "en": ["6%", "7%", "8%", "9%", "10%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 87,
          "bonuses": [
            {
              "attribute": {
                "es": "Parámetro principal",
                "en": "Parámetro principal"
              },
              "levels": {
                "es": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ],
                "en": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ]
              }
            },
            {
              "attribute": {
                "es": "Bloqueo",
                "en": "Block"
              },
              "levels": {
                "es": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ],
                "en": [
                  "+6%",
                  "+7%",
                  "+8%",
                  "+9%",
                  "+10%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 88,
          "bonuses": [
            {
              "attribute": {
                "es": "All-Rounder (efecto al inicio del partido)",
                "en": "All-Rounder (efecto al inicio del partido)"
              },
              "levels": {
                "es": [
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack"
                ],
                "en": [
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack"
                ]
              }
            },
            {
              "attribute": {
                "es": "Bloqueo sólido (efecto al inicio del partido)",
                "en": "Bloqueo sólido (efecto al inicio del partido)"
              },
              "levels": {
                "es": [
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack"
                ],
                "en": [
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack",
                  "1 stack"
                ]
              }
            }
          ]
        }
      ],
      "id": 80
    },
    {
      "name": {
        "es": "Un atacante de primer nivel y un libero de primer nivel",
        "en": "Top Spiker and Top-Class Libero"
      },
      "participants": [
        101,
        102
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El [Ataque poderoso] de Sakusa Kiyoomi y la [Recepcion] de Komori Motoya aumentan en [Porcentaje]. La potencia de recepción de los miembros aliados aumenta en [Recepcion] x 20%.",
          "en": "Sakusa Kiyoomi's [Powerful Attack] and Komori Motoya's [Reception] increase by [Percent]. Ally members' reception power increases by [Reception] x 20%."
        },
        "variables": [
          { "name": "Ataque poderoso", "levels": { "es": ["Ataque poderoso"], "en": ["Powerful Attack"] } },
          { "name": "Recepcion", "levels": { "es": ["Recepcion"], "en": ["Reception"] } },
          { "name": "Porcentaje", "levels": { "es": ["10%", "12.5%", "15%", "17.5%", "20%"], "en": ["10%", "12.5%", "15%", "17.5%", "20%"] } },
          { "name": "Percent", "levels": { "en": ["10%", "12.5%", "15%", "17.5%", "20%"] } }
        ],
        "maxLevels": 5
      },
      "effects_by_character": [
        {
          "character_id": 101,
          "bonuses": [
            {
              "attribute": {
                "es": "Golpe Poderoso",
                "en": "Golpe Poderoso"
              },
              "levels": {
                "es": [
                  "10%",
                  "12.5%",
                  "15%",
                  "17.5%",
                  "20%"
                ],
                "en": [
                  "10%",
                  "12.5%",
                  "15%",
                  "17.5%",
                  "20%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 102,
          "bonuses": [
            {
              "attribute": {
                "es": "Recibir",
                "en": "Recibir"
              },
              "levels": {
                "es": [
                  "10%",
                  "12.5%",
                  "15%",
                  "17.5%",
                  "20%"
                ],
                "en": [
                  "10%",
                  "12.5%",
                  "15%",
                  "17.5%",
                  "20%"
                ]
              }
            }
          ]
        }
      ],
      "id": 81
    },
    {
      "name": {
        "es": "Compañeros de equipo en el campamento de entrenamiento juvenil de todo Japón (Kizuna)",
        "en": "Compañeros de equipo en el campamento de entrenamiento juvenil de todo Japón (Kizuna)"
      },
      "participants": [
        77,
        101,
        102,
        87
      ],
      "is_link_skill": false,
      "effects_by_character": [
        {
          "character_id": 77,
          "bonuses": [
            {
              "attribute": {
                "es": "Lanzamiento",
                "en": "Lanzamiento"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 101,
          "bonuses": [
            {
              "attribute": {
                "es": "Golpe Poderoso",
                "en": "Golpe Poderoso"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 102,
          "bonuses": [
            {
              "attribute": {
                "es": "Recibir",
                "en": "Recibir"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        },
        {
          "character_id": 87,
          "bonuses": [
            {
              "attribute": {
                "es": "Golpe Poderoso",
                "en": "Golpe Poderoso"
              },
              "levels": {
                "es": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ],
                "en": [
                  "+5 +1%",
                  "+7 +2%",
                  "+9 +3%",
                  "+12 +4%",
                  "+15 +5%"
                ]
              }
            }
          ]
        }
      ],
      "id": 82
    },
    {
      "name": {
        "es": "Los genios de Karasuno",
        "en": "Karasuno's Geniuses"
      },
      "participants": [
        4,
        12
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "La [Recepcion] de Nishinoya Yu (Después de clases) aumenta en [BonusRecepcion], y sus [Reflejos] aumentan un 5%. Cuando se activa el movimiento especial de Nishinoya Yu (Después de clases), Kageyama Tobio obtiene 1 acumulación del efecto [Espíritu Competitivo]. Si este movimiento especial se convierte en una buena jugada, la potencia del primer remate aliado (ataque poderoso/ataque rápido) después de que ocurra esta jugada aumenta en [Ataque poderoso/Ataque rapido] x 20% del miembro que remata.",
          "en": "Nishinoya Yu (After School)'s [Reception] increases by [ReceptionBonus], and his [Reflexes] increase by 5%. When Nishinoya Yu (After School)'s special move is activated, Kageyama Tobio gains 1 stack of the [Competitive Spirit] effect. If this special move becomes a nice play, the power of the first ally spike (powerful attack/quick attack) after this play occurs increases by the spiking member's [Powerful Attack/Quick Attack] x 20%."
        },
        "variables": [
          {
            "name": "BonusRecepcion",
            "levels": {
              "es": [
                "5%",
                "7%",
                "9%",
                "11%",
                "13%"
              ]
            }
          },
          {
            "name": "ReceptionBonus",
            "levels": {
              "en": [
                "5%",
                "7%",
                "9%",
                "11%",
                "13%"
              ]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 83
    },
    {
      "name": {
        "es": "Mejores Amigos' de por vida",
        "en": "Lifelong 'Best Friends'"
      },
      "participants": [
        53,
        58
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "El [Bloqueo] de Ushijima Wakatoshi y la [Recepcion] de Ohira Reon aumentan en [Bonus].",
          "en": "Ushijima Wakatoshi's [Block] and Ohira Reon's [Reception] increase by [Bonus]."
        },
        "variables": [
          {
            "name": "Bloqueo",
            "levels": {
              "es": [
                "Bloqueo"
              ]
            }
          },
          {
            "name": "Block",
            "levels": {
              "en": [
                "Block"
              ]
            }
          },
          {
            "name": "Recepcion",
            "levels": {
              "es": [
                "Recepcion"
              ]
            }
          },
          {
            "name": "Reception",
            "levels": {
              "en": [
                "Reception"
              ]
            }
          },
          {
            "name": "Bonus",
            "levels": {
              "es": [
                "+1%+5",
                "+2%+7",
                "+3%+9",
                "+4%+12",
                "+5%+15"
              ],
              "en": [
                "+1%+5",
                "+2%+7",
                "+3%+9",
                "+4%+12",
                "+5%+15"
              ]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 84
    },
    {
      "name": {
        "es": "Colocador Milagroso y Colocador Considerado",
        "en": "Miracle Setter and Considerate Setter"
      },
      "participants": [
        61,
        63
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "La [Colocacion] de Akaashi Keiji (Baño en el Mar) aumenta en [Porcentaje]. Mientras la moral del equipo aliado está despierta, el [Ataque poderoso] de Bokuto Koutarou (Baño en el Mar) aumenta un 18%, y la [Colocacion] de Akaashi Keiji (Baño en el Mar) aumenta un 5% adicional.",
          "en": "Akaashi Keiji (Sea Bathing)'s [Toss] increases by [Percent]. While an ally's team morale is awakened, Bokuto Koutarou (Sea Bathing)'s [Powerful Attack] increases by 18%, and Akaashi Keiji (Sea Bathing)'s [Toss] further increases by 5%."
        },
        "variables": [
          {
            "name": "Porcentaje",
            "levels": {
              "es": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          },
          {
            "name": "Percent",
            "levels": {
              "en": [
                "6%",
                "7%",
                "8%",
                "9%",
                "10%"
              ]
            }
          }
        ],
        "maxLevels": 5
      },
      "id": 85
    },
    {
      "name": {
        "es": "Dios Guardián y Estrella",
        "en": "Guardian God and Star"
      },
      "id": 86,
      "participants": [
        14,
        11
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Cuando YU NISHINOYA (práctica) o ASAHI AZUMANE (práctica) usan una habilidad, su Técnica Ofensiva y su Técnica Defensiva aumentan en un [Bonus].",
          "en": "When YU NISHINOYA (practice) or ASAHI AZUMANE (practice) use a skill, their Offensive Technique and Defensive Technique increase by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Estudiante de segundo año de KARASUNO",
        "en": "Second-Year Student of KARASUNO"
      },
      "id": 87,
      "participants": [
        14,
        16,
        23,
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Aumenta en un [Bonus] el atributo Recepción de los jugadores de la fila trasera.",
          "en": "Increases the Reception attribute of back row players by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Pilares del último año de SEIJOH",
        "en": "Final-Year Pillars of SEIJOH"
      },
      "id": 89,
      "participants": [
        30,
        31
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Aumenta el atributo Bloqueo de ISSEI MATSUKAWA en un [Bonus] y el atributo Recepción de TAKAHIRO HANAMAKI en un [Bonus].",
          "en": "Increases the Block attribute of ISSEI MATSUKAWA by [Bonus] and the Reception attribute of TAKAHIRO HANAMAKI by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Rematador Lateral de NEKOMA",
        "en": "Side Spiker of NEKOMA"
      },
      "id": 90,
      "participants": [
        96,
        97,
        95
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Aumenta en un [Bonus] los atributos Recepción y Ataque Poderoso de los jugadores presentes.",
          "en": "Increases the Reception and Powerful Attack attributes of present players by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["4%", "5%", "6%", "7%", "8%"],
              "en": ["4%", "5%", "6%", "7%", "8%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "El Silencioso y el Sarcástico",
        "en": "The Silent and the Sarcastic"
      },
      "id": 91,
      "participants": [
        42,
        40
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "TAKANOBU AONE y KENJI FUTAKUCHI ejecutan un Bloqueo Doble con un poder equivalente al [Power]% del atributo Bloqueo de AONE; aplica la desventaja «Enfurecer» al rematador rival (reduce los atributos Ataque Rápido/Poderoso en un [Debuff]).",
          "en": "TAKANOBU AONE and KENJI FUTAKUCHI perform a Double Block with power equal to [Power]% of AONE's Block attribute; applies the «Enrage» debuff to the opposing spiker (reduces Rapid/Powerful Attack attributes by [Debuff])."
        },
        "variables": [
          {
            "name": "Power",
            "levels": {
              "es": ["180", "195", "210", "225", "240"],
              "en": ["180", "195", "210", "225", "240"]
            }
          },
          {
            "name": "Debuff",
            "levels": {
              "es": ["10%", "10%", "10%", "10%", "10%"],
              "en": ["10%", "10%", "10%", "10%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "El Capitán Nuevo y el Novato Alto",
        "en": "The New Captain and the Tall Rookie"
      },
      "id": 92,
      "participants": [
        41,
        44
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Aumenta en un [Bonus] el atributo Bloqueo de los jugadores de la fila delantera.",
          "en": "Increases the Block attribute of front row players by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["2%", "2.5%", "3%", "3.5%", "4%"],
              "en": ["2%", "2.5%", "3%", "3.5%", "4%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Compañeros en la cancha",
        "en": "Teammates on the Court"
      },
      "id": 93,
      "participants": [
        3,
        5
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Al usar habilidades de Remate Rápido, aumenta la Percepción de este jugador en un [Bonus].",
          "en": "When using Quick Spike skills, this player's Perception increases by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "«Escudo» y «Lanza»",
        "en": "\"Shield\" and \"Lance\""
      },
      "id": 94,
      "participants": [
        19,
        21
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Aumenta el atributo Bloqueo de KEI TSUKISHIMA (práctica) en un [Bonus] y el atributo Saque de TADASHI YAMAGUCHI (práctica) en un [Bonus].",
          "en": "Increases KEI TSUKISHIMA's (practice) Block attribute by [Bonus] and TADASHI YAMAGUCHI's (practice) Serve attribute by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Código del paquete",
        "en": "Package Code"
      },
      "id": 95,
      "participants": [
        29,
        37
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Aumenta la Percepción de HAJIME IWAIZUMI (práctica) y KENTARO KYOTANI (práctica) en un [Bonus].",
          "en": "Increases the Perception of HAJIME IWAIZUMI (practice) and KENTARO KYOTANI (practice) by [Bonus]."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Festival de Fuegos Artificiales",
        "en": "Fireworks Festival"
      },
      "id": 96,
      "participants": [
        104,
        17
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "Aumenta el parámetro principal de los miembros aliados en un [Bonus].\nAl final de cada rally, aplica el efecto negativo [Ira] al delantero rival ([Remate/Remate rápido] se reduce en un 10%). Este efecto dura hasta que el balón cruce la red 8 veces.\nSi un miembro rival ya tiene el efecto negativo [Ira] y se vuelve a aplicar, en su lugar se aplica el efecto negativo [Distraído] ([Remate/Remate rápido] se reduce en un 20%). Este efecto dura hasta que el balón cruce la red 8 veces. El efecto [Distraído] no se puede eliminar.",
          "en": "Increases the main parameter of allied members by [Bonus].\nAfter each rally, applies the [Anger] debuff to the opposing front row ([Power Spike/Quick Attack] decreases by 10%). This effect lasts until the ball crosses the net 8 times.\nIf the opposing member already has the [Anger] debuff and it is applied again, the [Distracted] debuff is applied instead ([Power Spike/Quick Attack] decreases by 20%). This effect lasts until the ball crosses the net 8 times. The [Distracted] debuff cannot be removed."
        },
        "variables": [
          {
            "name": "Bonus",
            "levels": {
              "es": ["6%", "7%", "8%", "9%", "10%"],
              "en": ["6%", "7%", "8%", "9%", "10%"]
            }
          }
        ],
        "maxLevels": 5
      }
    },
    {
      "name": {
        "es": "Cerebro y Comandante",
        "en": "Brain and Commander"
      },
      "id": 97,
      "participants": [
        104,
        89
      ],
      "is_link_skill": true,
      "rich_text": {
        "template": {
          "es": "KENMA KOZUME (Hanami) realiza un pase y TETSURO KUROO (Festival de Fuegos Artificiales) ejecuta un remate rápido con una potencia de [QuickPower]. Esta jugada siempre será una jugada destacada. Los miembros aliados obtienen un aumento del 10% en [Técnica de Ataque] durante 1 set.",
          "en": "KENMA KOZUME (Hanami) sets the ball and TETSURO KUROO (Fireworks Festival) performs a quick attack with [QuickPower] power. This play will always be a Nice Play. Allied members' [Attack Technique] increases by 10% for 1 set."
        },
        "variables": [
          {
            "name": "QuickPower",
            "levels": {
              "ja": ["280%", "300%", "320%", "340%", "360%"],
              "es": ["280%", "300%", "320%", "340%", "360%"],
              "en": ["280%", "300%", "320%", "340%", "360%"]
            }
          }
        ],
        "maxLevels": 5
      }
    }
  ]
};
