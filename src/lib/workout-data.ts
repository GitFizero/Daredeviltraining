export interface ExerciseTemplate {
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  weightKg: number;
  notes: string;
  gifUrl: string;
  alternatives: {
    name: string;
    muscleGroup: string;
    reason: string;
    gifUrl: string;
  }[];
}

export interface DayPlan {
  dayType: string;
  label: string;
  tag: string;
  tagColor: string;
  exercises: ExerciseTemplate[];
}

export const weeklyPlan: Record<number, DayPlan> = {
  // Sunday = 0 — REST
  0: {
    dayType: "REST",
    label: "Repos complet",
    tag: "Repos",
    tagColor: "devil-blue",
    exercises: [],
  },
  // Monday = 1 — PUSH
  1: {
    dayType: "PUSH",
    label: "Push — Pectoraux, Épaules, Triceps",
    tag: "Force",
    tagColor: "devil-red",
    exercises: [
      {
        name: "Développé couché",
        muscleGroup: "Pectoraux",
        sets: 4,
        reps: "8-10",
        weightKg: 60,
        notes: "Garde les omoplates serrées, pieds au sol. Descends la barre au niveau des tétons.",
        gifUrl: "/exercises/bench-press.gif",
        alternatives: [
          { name: "Développé incliné haltères", muscleGroup: "Pectoraux supérieurs", reason: "Cible le haut des pecs, meilleure amplitude de mouvement", gifUrl: "/exercises/incline-db-press.gif" },
          { name: "Pompes lestées", muscleGroup: "Pectoraux", reason: "Travail fonctionnel, engage le core", gifUrl: "/exercises/weighted-pushup.gif" },
        ],
      },
      {
        name: "Développé militaire",
        muscleGroup: "Épaules",
        sets: 4,
        reps: "8-10",
        weightKg: 40,
        notes: "Garde le core serré, ne cambre pas le dos. Pousse droit au-dessus de la tête.",
        gifUrl: "/exercises/ohp.gif",
        alternatives: [
          { name: "Élévations latérales", muscleGroup: "Épaules", reason: "Isole le deltoïde moyen, moins de stress sur les articulations", gifUrl: "/exercises/lateral-raise.gif" },
          { name: "Arnold press", muscleGroup: "Épaules", reason: "Travaille les 3 faisceaux du deltoïde en un mouvement", gifUrl: "/exercises/arnold-press.gif" },
        ],
      },
      {
        name: "Dips",
        muscleGroup: "Pectoraux/Triceps",
        sets: 3,
        reps: "10-12",
        weightKg: 77,
        notes: "Penche-toi légèrement en avant pour cibler les pecs. Descends jusqu'à 90° aux coudes.",
        gifUrl: "/exercises/dips.gif",
        alternatives: [
          { name: "Développé décliné", muscleGroup: "Pectoraux inférieurs", reason: "Cible le bas des pecs avec charge contrôlée", gifUrl: "/exercises/decline-press.gif" },
          { name: "Pompes diamant", muscleGroup: "Triceps", reason: "Excellent pour les triceps sans matériel", gifUrl: "/exercises/diamond-pushup.gif" },
        ],
      },
      {
        name: "Élévations latérales",
        muscleGroup: "Épaules",
        sets: 3,
        reps: "12-15",
        weightKg: 12,
        notes: "Mouvement contrôlé, coudes légèrement fléchis. Ne monte pas au-dessus des épaules.",
        gifUrl: "/exercises/lateral-raise.gif",
        alternatives: [
          { name: "Élévations frontales", muscleGroup: "Épaules antérieures", reason: "Cible l'avant de l'épaule", gifUrl: "/exercises/front-raise.gif" },
          { name: "Face pulls", muscleGroup: "Épaules postérieures", reason: "Bon pour la posture et l'équilibre musculaire", gifUrl: "/exercises/face-pull.gif" },
        ],
      },
      {
        name: "Extensions triceps poulie",
        muscleGroup: "Triceps",
        sets: 3,
        reps: "12-15",
        weightKg: 20,
        notes: "Garde les coudes collés au corps. Contracte bien en bas du mouvement.",
        gifUrl: "/exercises/tricep-pushdown.gif",
        alternatives: [
          { name: "Skull crushers", muscleGroup: "Triceps", reason: "Étirement complet du triceps, excellent pour la masse", gifUrl: "/exercises/skull-crusher.gif" },
          { name: "Kickbacks triceps", muscleGroup: "Triceps", reason: "Bonne isolation, parfait en finition", gifUrl: "/exercises/tricep-kickback.gif" },
        ],
      },
      {
        name: "Push-ups finisher",
        muscleGroup: "Pectoraux",
        sets: 2,
        reps: "max",
        weightKg: 0,
        notes: "Dernière série : va jusqu'à l'échec. Garde une bonne forme même fatigué.",
        gifUrl: "/exercises/pushup.gif",
        alternatives: [
          { name: "Cable crossover", muscleGroup: "Pectoraux", reason: "Tension constante, excellent pour la contraction", gifUrl: "/exercises/cable-crossover.gif" },
          { name: "Pec deck", muscleGroup: "Pectoraux", reason: "Machine guidée, bonne isolation en fin de séance", gifUrl: "/exercises/pec-deck.gif" },
        ],
      },
    ],
  },
  // Tuesday = 2 — PULL
  2: {
    dayType: "PULL",
    label: "Pull — Dos, Biceps",
    tag: "Force",
    tagColor: "devil-red",
    exercises: [
      {
        name: "Tractions",
        muscleGroup: "Dos",
        sets: 4,
        reps: "6-8",
        weightKg: 82,
        notes: "Prise pronation largeur d'épaules. Tire les coudes vers le bas, pas les mains.",
        gifUrl: "/exercises/pullup.gif",
        alternatives: [
          { name: "Lat pulldown", muscleGroup: "Dos", reason: "Même mouvement mais charge ajustable", gifUrl: "/exercises/lat-pulldown.gif" },
          { name: "Tractions assistées", muscleGroup: "Dos", reason: "Permet de travailler le mouvement avec moins de charge", gifUrl: "/exercises/assisted-pullup.gif" },
        ],
      },
      {
        name: "Rowing barre",
        muscleGroup: "Dos",
        sets: 4,
        reps: "8-10",
        weightKg: 50,
        notes: "Dos à 45°, tire la barre vers le nombril. Serre les omoplates en haut.",
        gifUrl: "/exercises/barbell-row.gif",
        alternatives: [
          { name: "Rowing haltère", muscleGroup: "Dos", reason: "Meilleure amplitude unilatérale", gifUrl: "/exercises/db-row.gif" },
          { name: "Rowing machine", muscleGroup: "Dos", reason: "Mouvement guidé, bon pour les débutants", gifUrl: "/exercises/machine-row.gif" },
        ],
      },
      {
        name: "Rowing un bras haltère",
        muscleGroup: "Dos",
        sets: 3,
        reps: "10-12",
        weightKg: 22,
        notes: "Un genou sur le banc, dos plat. Tire le coude vers le plafond.",
        gifUrl: "/exercises/single-arm-row.gif",
        alternatives: [
          { name: "Rowing câble bas", muscleGroup: "Dos", reason: "Tension constante grâce au câble", gifUrl: "/exercises/cable-row.gif" },
          { name: "T-bar row", muscleGroup: "Dos", reason: "Excellent pour l'épaisseur du dos", gifUrl: "/exercises/tbar-row.gif" },
        ],
      },
      {
        name: "Face pulls",
        muscleGroup: "Épaules postérieures",
        sets: 3,
        reps: "15-20",
        weightKg: 15,
        notes: "Tire vers le visage, coudes hauts. Rotation externe en fin de mouvement.",
        gifUrl: "/exercises/face-pull.gif",
        alternatives: [
          { name: "Rear delt fly", muscleGroup: "Épaules postérieures", reason: "Bonne isolation du deltoïde postérieur", gifUrl: "/exercises/rear-delt-fly.gif" },
          { name: "Band pull-aparts", muscleGroup: "Épaules postérieures", reason: "Excellent échauffement et activation", gifUrl: "/exercises/band-pullapart.gif" },
        ],
      },
      {
        name: "Curl biceps barre",
        muscleGroup: "Biceps",
        sets: 3,
        reps: "10-12",
        weightKg: 25,
        notes: "Garde les coudes fixes le long du corps. Monte en 2s, descends en 3s.",
        gifUrl: "/exercises/barbell-curl.gif",
        alternatives: [
          { name: "Curl haltères", muscleGroup: "Biceps", reason: "Meilleure supination, travail unilatéral", gifUrl: "/exercises/db-curl.gif" },
          { name: "Curl marteau", muscleGroup: "Biceps/Avant-bras", reason: "Cible le brachial et les avant-bras", gifUrl: "/exercises/hammer-curl.gif" },
        ],
      },
      {
        name: "Curl marteau",
        muscleGroup: "Biceps/Avant-bras",
        sets: 2,
        reps: "12-15",
        weightKg: 14,
        notes: "Prise neutre, mouvement contrôlé. Ne balance pas le corps.",
        gifUrl: "/exercises/hammer-curl.gif",
        alternatives: [
          { name: "Curl concentré", muscleGroup: "Biceps", reason: "Isolation maximale du biceps", gifUrl: "/exercises/concentration-curl.gif" },
          { name: "Curl incliné", muscleGroup: "Biceps", reason: "Étirement complet du biceps pour plus d'amplitude", gifUrl: "/exercises/incline-curl.gif" },
        ],
      },
    ],
  },
  // Wednesday = 3 — CARDIO HIIT
  3: {
    dayType: "CARDIO_HIIT",
    label: "Cardio HIIT",
    tag: "Cardio",
    tagColor: "devil-orange",
    exercises: [
      {
        name: "Rameur (intervalles)",
        muscleGroup: "Cardio complet",
        sets: 5,
        reps: "2min",
        weightKg: 0,
        notes: "2 min intensité haute, 1 min récup. Pousse avec les jambes d'abord.",
        gifUrl: "/exercises/rowing-machine.gif",
        alternatives: [
          { name: "Vélo assault", muscleGroup: "Cardio complet", reason: "Impact faible, intensité ajustable", gifUrl: "/exercises/assault-bike.gif" },
          { name: "Corde à sauter", muscleGroup: "Cardio complet", reason: "Portable, excellent pour la coordination", gifUrl: "/exercises/jump-rope.gif" },
        ],
      },
      {
        name: "Burpees",
        muscleGroup: "Cardio complet",
        sets: 4,
        reps: "10",
        weightKg: 0,
        notes: "Mouvement explosif. Garde le core engagé pendant la planche.",
        gifUrl: "/exercises/burpee.gif",
        alternatives: [
          { name: "Mountain climbers", muscleGroup: "Cardio/Core", reason: "Moins d'impact sur les articulations", gifUrl: "/exercises/mountain-climber.gif" },
          { name: "Jumping jacks", muscleGroup: "Cardio complet", reason: "Mouvement simple, bon pour récupérer entre séries", gifUrl: "/exercises/jumping-jack.gif" },
        ],
      },
      {
        name: "Kettlebell swings",
        muscleGroup: "Postérieur/Cardio",
        sets: 4,
        reps: "15",
        weightKg: 16,
        notes: "Pousse avec les hanches, pas les bras. Contracte les fessiers en haut.",
        gifUrl: "/exercises/kb-swing.gif",
        alternatives: [
          { name: "Box jumps", muscleGroup: "Jambes/Cardio", reason: "Travail explosif des jambes", gifUrl: "/exercises/box-jump.gif" },
          { name: "Jump squats", muscleGroup: "Jambes/Cardio", reason: "Plyométrie simple et efficace", gifUrl: "/exercises/jump-squat.gif" },
        ],
      },
      {
        name: "Battle ropes",
        muscleGroup: "Haut du corps/Cardio",
        sets: 3,
        reps: "30sec",
        weightKg: 0,
        notes: "Alterne les bras, garde le rythme. Core engagé, genoux légèrement fléchis.",
        gifUrl: "/exercises/battle-ropes.gif",
        alternatives: [
          { name: "Med ball slams", muscleGroup: "Full body/Cardio", reason: "Excellent pour évacuer le stress", gifUrl: "/exercises/ball-slam.gif" },
          { name: "Tire flips", muscleGroup: "Full body", reason: "Travail fonctionnel complet", gifUrl: "/exercises/tire-flip.gif" },
        ],
      },
      {
        name: "Mountain climbers",
        muscleGroup: "Core/Cardio",
        sets: 3,
        reps: "30sec",
        weightKg: 0,
        notes: "Mains sous les épaules, hanches basses. Ramène les genoux rapidement.",
        gifUrl: "/exercises/mountain-climber.gif",
        alternatives: [
          { name: "Planche", muscleGroup: "Core", reason: "Version statique, bon pour l'endurance du core", gifUrl: "/exercises/plank.gif" },
          { name: "Bicycle crunches", muscleGroup: "Core", reason: "Cible les obliques", gifUrl: "/exercises/bicycle-crunch.gif" },
        ],
      },
      {
        name: "Sprint tapis",
        muscleGroup: "Cardio",
        sets: 4,
        reps: "30sec",
        weightKg: 0,
        notes: "Sprint maximal 30sec, marche 60sec. Monte progressivement la vitesse.",
        gifUrl: "/exercises/treadmill-sprint.gif",
        alternatives: [
          { name: "Sprint extérieur", muscleGroup: "Cardio", reason: "Plus naturel, surface variée", gifUrl: "/exercises/outdoor-sprint.gif" },
          { name: "Vélo HIIT", muscleGroup: "Cardio", reason: "Zéro impact, parfait si articulations sensibles", gifUrl: "/exercises/bike-hiit.gif" },
        ],
      },
    ],
  },
  // Thursday = 4 — LEGS
  4: {
    dayType: "LEGS",
    label: "Jambes — Quadriceps, Ischio-jambiers, Mollets",
    tag: "Force",
    tagColor: "devil-red",
    exercises: [
      {
        name: "Squat barre",
        muscleGroup: "Quadriceps",
        sets: 4,
        reps: "8-10",
        weightKg: 70,
        notes: "Barre sur les trapèzes, pieds largeur d'épaules. Descends jusqu'à parallèle minimum.",
        gifUrl: "/exercises/barbell-squat.gif",
        alternatives: [
          { name: "Leg press", muscleGroup: "Quadriceps", reason: "Moins de stress sur le dos, charge plus lourde possible", gifUrl: "/exercises/leg-press.gif" },
          { name: "Squat goblet", muscleGroup: "Quadriceps", reason: "Bon pour apprendre le pattern de squat", gifUrl: "/exercises/goblet-squat.gif" },
        ],
      },
      {
        name: "Soulevé de terre roumain",
        muscleGroup: "Ischio-jambiers",
        sets: 4,
        reps: "8-10",
        weightKg: 80,
        notes: "Jambes quasi tendues, barre le long des cuisses. Sens l'étirement dans les ischios.",
        gifUrl: "/exercises/romanian-deadlift.gif",
        alternatives: [
          { name: "Good mornings", muscleGroup: "Ischio-jambiers", reason: "Excellent étirement de la chaîne postérieure", gifUrl: "/exercises/good-morning.gif" },
          { name: "Leg curl", muscleGroup: "Ischio-jambiers", reason: "Isolation parfaite des ischios", gifUrl: "/exercises/leg-curl.gif" },
        ],
      },
      {
        name: "Fentes marchées",
        muscleGroup: "Quadriceps/Fessiers",
        sets: 3,
        reps: "12/jambe",
        weightKg: 20,
        notes: "Pas long, genou arrière frôle le sol. Garde le buste droit.",
        gifUrl: "/exercises/walking-lunge.gif",
        alternatives: [
          { name: "Split squat bulgare", muscleGroup: "Quadriceps/Fessiers", reason: "Unilatéral intense, excellent pour l'équilibre", gifUrl: "/exercises/bulgarian-split.gif" },
          { name: "Step-ups", muscleGroup: "Quadriceps/Fessiers", reason: "Mouvement fonctionnel, ajustable en hauteur", gifUrl: "/exercises/step-up.gif" },
        ],
      },
      {
        name: "Leg press",
        muscleGroup: "Quadriceps",
        sets: 3,
        reps: "10-12",
        weightKg: 120,
        notes: "Pieds à mi-plateforme. Ne verrouille pas les genoux en haut.",
        gifUrl: "/exercises/leg-press.gif",
        alternatives: [
          { name: "Hack squat", muscleGroup: "Quadriceps", reason: "Guidé, excellent pour cibler les quads", gifUrl: "/exercises/hack-squat.gif" },
          { name: "Sissy squat", muscleGroup: "Quadriceps", reason: "Isolation extrême des quadriceps", gifUrl: "/exercises/sissy-squat.gif" },
        ],
      },
      {
        name: "Leg curl machine",
        muscleGroup: "Ischio-jambiers",
        sets: 3,
        reps: "12-15",
        weightKg: 40,
        notes: "Mouvement lent et contrôlé. Contracte bien en position haute.",
        gifUrl: "/exercises/leg-curl-machine.gif",
        alternatives: [
          { name: "Nordic curl", muscleGroup: "Ischio-jambiers", reason: "Exercice excentrique puissant", gifUrl: "/exercises/nordic-curl.gif" },
          { name: "Swiss ball curl", muscleGroup: "Ischio-jambiers", reason: "Engage les stabilisateurs", gifUrl: "/exercises/swiss-ball-curl.gif" },
        ],
      },
      {
        name: "Mollets debout",
        muscleGroup: "Mollets",
        sets: 4,
        reps: "15-20",
        weightKg: 60,
        notes: "Amplitude complète : descends bien le talon, monte sur la pointe. Pause en haut.",
        gifUrl: "/exercises/standing-calf.gif",
        alternatives: [
          { name: "Mollets assis", muscleGroup: "Mollets", reason: "Cible le soléaire, complémentaire aux mollets debout", gifUrl: "/exercises/seated-calf.gif" },
          { name: "Mollets presse", muscleGroup: "Mollets", reason: "Charge lourde possible, bonne amplitude", gifUrl: "/exercises/leg-press-calf.gif" },
        ],
      },
    ],
  },
  // Friday = 5 — FULL BODY
  5: {
    dayType: "FULL_BODY",
    label: "Full Body — Composé",
    tag: "Force",
    tagColor: "devil-red",
    exercises: [
      {
        name: "Deadlift conventionnel",
        muscleGroup: "Dos/Jambes",
        sets: 4,
        reps: "6-8",
        weightKg: 80,
        notes: "Dos droit, barre contre les tibias. Pousse le sol avec les pieds, ne tire pas avec le dos.",
        gifUrl: "/exercises/deadlift.gif",
        alternatives: [
          { name: "Trap bar deadlift", muscleGroup: "Dos/Jambes", reason: "Plus facile sur le dos, position plus naturelle", gifUrl: "/exercises/trap-bar-dl.gif" },
          { name: "Sumo deadlift", muscleGroup: "Dos/Jambes", reason: "Plus de travail des adducteurs et quads", gifUrl: "/exercises/sumo-deadlift.gif" },
        ],
      },
      {
        name: "Développé incliné haltères",
        muscleGroup: "Pectoraux supérieurs",
        sets: 3,
        reps: "10-12",
        weightKg: 24,
        notes: "Banc à 30-45°. Descends les haltères au niveau des clavicules.",
        gifUrl: "/exercises/incline-db-press.gif",
        alternatives: [
          { name: "Développé couché", muscleGroup: "Pectoraux", reason: "Mouvement de base pour les pecs", gifUrl: "/exercises/bench-press.gif" },
          { name: "Cable fly incliné", muscleGroup: "Pectoraux supérieurs", reason: "Tension constante sur le haut des pecs", gifUrl: "/exercises/incline-cable-fly.gif" },
        ],
      },
      {
        name: "Squat goblet",
        muscleGroup: "Quadriceps",
        sets: 3,
        reps: "12-15",
        weightKg: 24,
        notes: "Haltère contre la poitrine, coudes entre les genoux. Dos droit.",
        gifUrl: "/exercises/goblet-squat.gif",
        alternatives: [
          { name: "Squat avant", muscleGroup: "Quadriceps", reason: "Plus de travail des quads et du core", gifUrl: "/exercises/front-squat.gif" },
          { name: "Squat sumo", muscleGroup: "Quadriceps/Adducteurs", reason: "Travaille les adducteurs en plus", gifUrl: "/exercises/sumo-squat.gif" },
        ],
      },
      {
        name: "Rowing câble assis",
        muscleGroup: "Dos",
        sets: 3,
        reps: "10-12",
        weightKg: 45,
        notes: "Tire vers le nombril, poitrine sortie. Serre les omoplates 1 seconde.",
        gifUrl: "/exercises/seated-cable-row.gif",
        alternatives: [
          { name: "Rowing T-bar", muscleGroup: "Dos", reason: "Excellent pour l'épaisseur du dos", gifUrl: "/exercises/tbar-row.gif" },
          { name: "Pull-over", muscleGroup: "Dos/Pectoraux", reason: "Étire et travaille le grand dorsal", gifUrl: "/exercises/pullover.gif" },
        ],
      },
      {
        name: "Presse épaules haltères",
        muscleGroup: "Épaules",
        sets: 3,
        reps: "10-12",
        weightKg: 20,
        notes: "Assis ou debout. Pousse les haltères au-dessus de la tête sans verrouiller.",
        gifUrl: "/exercises/db-shoulder-press.gif",
        alternatives: [
          { name: "Landmine press", muscleGroup: "Épaules", reason: "Mouvement naturel, moins de stress articulaire", gifUrl: "/exercises/landmine-press.gif" },
          { name: "Push press", muscleGroup: "Épaules", reason: "Permet de charger plus grâce à l'élan des jambes", gifUrl: "/exercises/push-press.gif" },
        ],
      },
      {
        name: "Planche (gainage)",
        muscleGroup: "Core",
        sets: 3,
        reps: "60sec",
        weightKg: 0,
        notes: "Corps aligné de la tête aux pieds. Contracte abdos et fessiers. Respire normalement.",
        gifUrl: "/exercises/plank.gif",
        alternatives: [
          { name: "Ab wheel", muscleGroup: "Core", reason: "Très intense pour les abdos et les épaules", gifUrl: "/exercises/ab-wheel.gif" },
          { name: "Dead bug", muscleGroup: "Core", reason: "Excellent pour la stabilisation et la coordination", gifUrl: "/exercises/dead-bug.gif" },
        ],
      },
    ],
  },
  // Saturday = 6 — ACTIVE RECOVERY
  6: {
    dayType: "ACTIVE_RECOVERY",
    label: "Récupération active",
    tag: "Récup",
    tagColor: "devil-teal",
    exercises: [
      {
        name: "Marche rapide",
        muscleGroup: "Cardio léger",
        sets: 1,
        reps: "30min",
        weightKg: 0,
        notes: "Rythme soutenu mais confortable. Idéal en extérieur pour l'air frais.",
        gifUrl: "/exercises/brisk-walk.gif",
        alternatives: [
          { name: "Vélo léger", muscleGroup: "Cardio léger", reason: "Zéro impact, bon pour les articulations", gifUrl: "/exercises/easy-bike.gif" },
          { name: "Natation", muscleGroup: "Cardio complet", reason: "Travail complet sans impact", gifUrl: "/exercises/swimming.gif" },
        ],
      },
      {
        name: "Foam rolling",
        muscleGroup: "Récupération",
        sets: 1,
        reps: "15min",
        weightKg: 0,
        notes: "Roule lentement sur chaque groupe musculaire. Insiste sur les zones tendues.",
        gifUrl: "/exercises/foam-rolling.gif",
        alternatives: [
          { name: "Stretching statique", muscleGroup: "Récupération", reason: "Améliore la flexibilité à long terme", gifUrl: "/exercises/static-stretch.gif" },
          { name: "Yoga", muscleGroup: "Récupération/Mobilité", reason: "Combine étirements et respiration", gifUrl: "/exercises/yoga.gif" },
        ],
      },
      {
        name: "Étirements dynamiques",
        muscleGroup: "Mobilité",
        sets: 1,
        reps: "15min",
        weightKg: 0,
        notes: "Mouvements amples et contrôlés. Cercles de bras, fentes avec rotation, etc.",
        gifUrl: "/exercises/dynamic-stretch.gif",
        alternatives: [
          { name: "Yoga flow", muscleGroup: "Mobilité", reason: "Enchaînement fluide qui travaille tout le corps", gifUrl: "/exercises/yoga-flow.gif" },
          { name: "Mobilité articulaire", muscleGroup: "Mobilité", reason: "Cible spécifiquement les articulations raides", gifUrl: "/exercises/joint-mobility.gif" },
        ],
      },
      {
        name: "Yoga léger",
        muscleGroup: "Flexibilité/Mental",
        sets: 1,
        reps: "20min",
        weightKg: 0,
        notes: "Séance douce, focus sur la respiration. Sun salutations et postures de base.",
        gifUrl: "/exercises/yoga-light.gif",
        alternatives: [
          { name: "Méditation", muscleGroup: "Mental", reason: "Récupération mentale, réduit le cortisol", gifUrl: "/exercises/meditation.gif" },
          { name: "Respiration guidée", muscleGroup: "Mental", reason: "Technique box breathing pour la récupération", gifUrl: "/exercises/breathing.gif" },
        ],
      },
    ],
  },
};
