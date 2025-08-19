import { SchoolBondsData } from './types/index.js';

export const schoolBondsData: SchoolBondsData = {
  "school_bonds": [
    {
      "id": 1,
      "school": "Karasuno",
      "school_jp": "烏野高校",
      "name": {
        "es": "Vínculo de Karasuno",
        "en": "Karasuno Bond"
      },
      "rich_text": {
        "template": {
          "es": "Todos los jugadores del equipo obtienen [QuickAttackBonus] de bonificación al [Ataque rápido] y [PowerAttackBonus] de bonificación al [Ataque poderoso].",
          "en": "All team players gain [QuickAttackBonus] bonus to [Quick Attack] and [PowerAttackBonus] bonus to [Power Attack]."
        },
        "variables": [
          {
            "name": "QuickAttackBonus",
            "levels": {
              "es": ["+10%"],
              "en": ["+10%"]
            }
          },
          {
            "name": "PowerAttackBonus",
            "levels": {
              "es": ["+10%"],
              "en": ["+10%"]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 2,
      "school": "Aoba Johsai",
      "school_jp": "青葉城西高校",
      "name": {
        "es": "Vínculo de Aoba Johsai",
        "en": "Aoba Johsai Bond"
      },
      "rich_text": {
        "template": {
          "es": "Todos los jugadores del equipo obtienen [PowerAttackBonus] de bonificación al [Ataque poderoso].",
          "en": "All team players gain [PowerAttackBonus] bonus to [Power Attack]."
        },
        "variables": [
          {
            "name": "PowerAttackBonus",
            "levels": {
              "es": ["+15%"],
              "en": ["+15%"]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 3,
      "school": "Nekoma",
      "school_jp": "音駒高校",
      "name": {
        "es": "Vínculo de Nekoma",
        "en": "Nekoma Bond"
      },
      "rich_text": {
        "template": {
          "es": "Todos los jugadores del equipo obtienen [ReceiveBonus] de bonificación a la [Recepción].",
          "en": "All team players gain [ReceiveBonus] bonus to [Receive]."
        },
        "variables": [
          {
            "name": "ReceiveBonus",
            "levels": {
              "es": ["+15%"],
              "en": ["+15%"]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 4,
      "school": "Date Tech",
      "school_jp": "伊達工業高校",
      "name": {
        "es": "Vínculo de Date Tech",
        "en": "Date Tech Bond"
      },
      "rich_text": {
        "template": {
          "es": "Todos los jugadores del equipo obtienen [BlockBonus] de bonificación al [Bloqueo].",
          "en": "All team players gain [BlockBonus] bonus to [Block]."
        },
        "variables": [
          {
            "name": "BlockBonus",
            "levels": {
              "es": ["+15%"],
              "en": ["+15%"]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 5,
      "school": "Shiratorizawa",
      "school_jp": "白鳥沢学園高校",
      "name": {
        "es": "Vínculo de Shiratorizawa",
        "en": "Shiratorizawa Bond"
      },
      "rich_text": {
        "template": {
          "es": "Todos los jugadores del equipo obtienen [PerceptionBonus] de bonificación a la [Percepción] y [StrengthBonus] de bonificación a la [Fuerza].",
          "en": "All team players gain [PerceptionBonus] bonus to [Perception] and [StrengthBonus] bonus to [Strength]."
        },
        "variables": [
          {
            "name": "PerceptionBonus",
            "levels": {
              "es": ["+10%"],
              "en": ["+10%"]
            }
          },
          {
            "name": "StrengthBonus",
            "levels": {
              "es": ["+10%"],
              "en": ["+10%"]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 6,
      "school": "Fukurodani",
      "school_jp": "梟谷学園高校",
      "name": {
        "es": "Vínculo de Fukurodani",
        "en": "Fukurodani Bond"
      },
      "rich_text": {
        "template": {
          "es": "Vínculo de escuela especial. [Efectos por determinar].",
          "en": "Special school bond. [Effects to be determined]."
        },
        "variables": [
          {
            "name": "Efectos por determinar",
            "levels": {
              "es": [""],
              "en": [""]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 7,
      "school": "Johzenji",
      "school_jp": "条善寺高校",
      "name": {
        "es": "Vínculo de Jōzenji",
        "en": "Jōzenji Bond"
      },
      "rich_text": {
        "template": {
          "es": "Vínculo de escuela especial. [Efectos por determinar].",
          "en": "Special school bond. [Effects to be determined]."
        },
        "variables": [
          {
            "name": "Efectos por determinar",
            "levels": {
              "es": [""],
              "en": [""]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 8,
      "school": "Inarizaki",
      "school_jp": "稲荷崎高校",
      "name": {
        "es": "Vínculo de Inarizaki",
        "en": "Inarizaki Bond"
      },
      "rich_text": {
        "template": {
          "es": "Vínculo de escuela especial. [Efectos por determinar].",
          "en": "Special school bond. [Effects to be determined]."
        },
        "variables": [
          {
            "name": "Efectos por determinar",
            "levels": {
              "es": [""],
              "en": [""]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 9,
      "school": "Kamomedai",
      "school_jp": "鴎台高校",
      "name": {
        "es": "Vínculo de Kamomedai",
        "en": "Kamomedai Bond"
      },
      "rich_text": {
        "template": {
          "es": "Vínculo de escuela especial. [Efectos por determinar].",
          "en": "Special school bond. [Effects to be determined]."
        },
        "variables": [
          {
            "name": "Efectos por determinar",
            "levels": {
              "es": [""],
              "en": [""]
            }
          }
        ],
        "maxLevels": 1
      }
    },
    {
      "id": 10,
      "school": "Seidatsuzan",
      "school_jp": "青達山学院",
      "name": {
        "es": "Vínculo de Seidatsuzan",
        "en": "Seidatsuzan Bond"
      },
      "rich_text": {
        "template": {
          "es": "Vínculo de escuela especial. [Efectos por determinar].",
          "en": "Special school bond. [Effects to be determined]."
        },
        "variables": [
          {
            "name": "Efectos por determinar",
            "levels": {
              "es": [""],
              "en": [""]
            }
          }
        ],
        "maxLevels": 1
      }
    }
  ]
};
