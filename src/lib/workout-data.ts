const IMG = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

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
        gifUrl: `${IMG}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
        alternatives: [
          { name: "Développé incliné haltères", muscleGroup: "Pectoraux supérieurs", reason: "Cible le haut des pecs, meilleure amplitude de mouvement", gifUrl: `${IMG}/Incline_Dumbbell_Press/0.jpg` },
          { name: "Pompes lestées", muscleGroup: "Pectoraux", reason: "Travail fonctionnel, engage le core", gifUrl: `${IMG}/Pushups/0.jpg` },
        ],
      },
      {
        name: "Développé militaire",
        muscleGroup: "Épaules",
        sets: 4,
        reps: "8-10",
        weightKg: 40,
        notes: "Garde le core serré, ne cambre pas le dos. Pousse droit au-dessus de la tête.",
        gifUrl: `${IMG}/Standing_Military_Press/0.jpg`,
        alternatives: [
          { name: "Élévations latérales", muscleGroup: "Épaules", reason: "Isole le deltoïde moyen, moins de stress sur les articulations", gifUrl: `${IMG}/Side_Lateral_Raise/0.jpg` },
          { name: "Arnold press", muscleGroup: "Épaules", reason: "Travaille les 3 faisceaux du deltoïde en un mouvement", gifUrl: `${IMG}/Arnold_Dumbbell_Press/0.jpg` },
        ],
      },
      {
        name: "Dips",
        muscleGroup: "Pectoraux/Triceps",
        sets: 3,
        reps: "10-12",
        weightKg: 77,
        notes: "Penche-toi légèrement en avant pour cibler les pecs. Descends jusqu'à 90° aux coudes.",
        gifUrl: `${IMG}/Dips_-_Chest_Version/0.jpg`,
        alternatives: [
          { name: "Développé décliné", muscleGroup: "Pectoraux inférieurs", reason: "Cible le bas des pecs avec charge contrôlée", gifUrl: `${IMG}/Decline_Dumbbell_Bench_Press/0.jpg` },
          { name: "Pompes diamant", muscleGroup: "Triceps", reason: "Excellent pour les triceps sans matériel", gifUrl: `${IMG}/Pushups/0.jpg` },
        ],
      },
      {
        name: "Élévations latérales",
        muscleGroup: "Épaules",
        sets: 3,
        reps: "12-15",
        weightKg: 12,
        notes: "Mouvement contrôlé, coudes légèrement fléchis. Ne monte pas au-dessus des épaules.",
        gifUrl: `${IMG}/Side_Lateral_Raise/0.jpg`,
        alternatives: [
          { name: "Élévations frontales", muscleGroup: "Épaules antérieures", reason: "Cible l'avant de l'épaule", gifUrl: `${IMG}/Front_Dumbbell_Raise/0.jpg` },
          { name: "Face pulls", muscleGroup: "Épaules postérieures", reason: "Bon pour la posture et l'équilibre musculaire", gifUrl: `${IMG}/Face_Pull/0.jpg` },
        ],
      },
      {
        name: "Extensions triceps poulie",
        muscleGroup: "Triceps",
        sets: 3,
        reps: "12-15",
        weightKg: 20,
        notes: "Garde les coudes collés au corps. Contracte bien en bas du mouvement.",
        gifUrl: `${IMG}/Triceps_Pushdown/0.jpg`,
        alternatives: [
          { name: "Skull crushers", muscleGroup: "Triceps", reason: "Étirement complet du triceps, excellent pour la masse", gifUrl: `${IMG}/EZ-Bar_Skullcrusher/0.jpg` },
          { name: "Kickbacks triceps", muscleGroup: "Triceps", reason: "Bonne isolation, parfait en finition", gifUrl: `${IMG}/Dumbbell_Tricep_Kickback/0.jpg` },
        ],
      },
      {
        name: "Push-ups finisher",
        muscleGroup: "Pectoraux",
        sets: 2,
        reps: "max",
        weightKg: 0,
        notes: "Dernière série : va jusqu'à l'échec. Garde une bonne forme même fatigué.",
        gifUrl: `${IMG}/Pushups/0.jpg`,
        alternatives: [
          { name: "Cable crossover", muscleGroup: "Pectoraux", reason: "Tension constante, excellent pour la contraction", gifUrl: `${IMG}/Cable_Crossover/0.jpg` },
          { name: "Pec deck", muscleGroup: "Pectoraux", reason: "Machine guidée, bonne isolation en fin de séance", gifUrl: `${IMG}/Butterfly/0.jpg` },
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
        gifUrl: `${IMG}/Pullups/0.jpg`,
        alternatives: [
          { name: "Lat pulldown", muscleGroup: "Dos", reason: "Même mouvement mais charge ajustable", gifUrl: `${IMG}/Wide-Grip_Lat_Pulldown/0.jpg` },
          { name: "Tractions assistées", muscleGroup: "Dos", reason: "Permet de travailler le mouvement avec moins de charge", gifUrl: `${IMG}/Pullups/0.jpg` },
        ],
      },
      {
        name: "Rowing barre",
        muscleGroup: "Dos",
        sets: 4,
        reps: "8-10",
        weightKg: 50,
        notes: "Dos à 45°, tire la barre vers le nombril. Serre les omoplates en haut.",
        gifUrl: `${IMG}/Bent_Over_Barbell_Row/0.jpg`,
        alternatives: [
          { name: "Rowing haltère", muscleGroup: "Dos", reason: "Meilleure amplitude unilatérale", gifUrl: `${IMG}/One-Arm_Dumbbell_Row/0.jpg` },
          { name: "Rowing machine", muscleGroup: "Dos", reason: "Mouvement guidé, bon pour les débutants", gifUrl: `${IMG}/Seated_Cable_Rows/0.jpg` },
        ],
      },
      {
        name: "Rowing un bras haltère",
        muscleGroup: "Dos",
        sets: 3,
        reps: "10-12",
        weightKg: 22,
        notes: "Un genou sur le banc, dos plat. Tire le coude vers le plafond.",
        gifUrl: `${IMG}/One-Arm_Dumbbell_Row/0.jpg`,
        alternatives: [
          { name: "Rowing câble bas", muscleGroup: "Dos", reason: "Tension constante grâce au câble", gifUrl: `${IMG}/Seated_Cable_Rows/0.jpg` },
          { name: "T-bar row", muscleGroup: "Dos", reason: "Excellent pour l'épaisseur du dos", gifUrl: `${IMG}/Bent_Over_Barbell_Row/0.jpg` },
        ],
      },
      {
        name: "Face pulls",
        muscleGroup: "Épaules postérieures",
        sets: 3,
        reps: "15-20",
        weightKg: 15,
        notes: "Tire vers le visage, coudes hauts. Rotation externe en fin de mouvement.",
        gifUrl: `${IMG}/Face_Pull/0.jpg`,
        alternatives: [
          { name: "Rear delt fly", muscleGroup: "Épaules postérieures", reason: "Bonne isolation du deltoïde postérieur", gifUrl: `${IMG}/Dumbbell_Rear_Delt_Row/0.jpg` },
          { name: "Band pull-aparts", muscleGroup: "Épaules postérieures", reason: "Excellent échauffement et activation", gifUrl: `${IMG}/Face_Pull/0.jpg` },
        ],
      },
      {
        name: "Curl biceps barre",
        muscleGroup: "Biceps",
        sets: 3,
        reps: "10-12",
        weightKg: 25,
        notes: "Garde les coudes fixes le long du corps. Monte en 2s, descends en 3s.",
        gifUrl: `${IMG}/Barbell_Curl/0.jpg`,
        alternatives: [
          { name: "Curl haltères", muscleGroup: "Biceps", reason: "Meilleure supination, travail unilatéral", gifUrl: `${IMG}/Dumbbell_Bicep_Curl/0.jpg` },
          { name: "Curl marteau", muscleGroup: "Biceps/Avant-bras", reason: "Cible le brachial et les avant-bras", gifUrl: `${IMG}/Hammer_Curls/0.jpg` },
        ],
      },
      {
        name: "Curl marteau",
        muscleGroup: "Biceps/Avant-bras",
        sets: 2,
        reps: "12-15",
        weightKg: 14,
        notes: "Prise neutre, mouvement contrôlé. Ne balance pas le corps.",
        gifUrl: `${IMG}/Hammer_Curls/0.jpg`,
        alternatives: [
          { name: "Curl concentré", muscleGroup: "Biceps", reason: "Isolation maximale du biceps", gifUrl: `${IMG}/Concentration_Curls/0.jpg` },
          { name: "Curl incliné", muscleGroup: "Biceps", reason: "Étirement complet du biceps pour plus d'amplitude", gifUrl: `${IMG}/Incline_Dumbbell_Curl/0.jpg` },
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
        gifUrl: `${IMG}/Seated_Cable_Rows/0.jpg`,
        alternatives: [
          { name: "Vélo assault", muscleGroup: "Cardio complet", reason: "Impact faible, intensité ajustable", gifUrl: `${IMG}/Air_Bike/0.jpg` },
          { name: "Corde à sauter", muscleGroup: "Cardio complet", reason: "Portable, excellent pour la coordination", gifUrl: `${IMG}/Rope_Jumping/0.jpg` },
        ],
      },
      {
        name: "Burpees",
        muscleGroup: "Cardio complet",
        sets: 4,
        reps: "10",
        weightKg: 0,
        notes: "Mouvement explosif. Garde le core engagé pendant la planche.",
        gifUrl: `${IMG}/Pushups/0.jpg`,
        alternatives: [
          { name: "Mountain climbers", muscleGroup: "Cardio/Core", reason: "Moins d'impact sur les articulations", gifUrl: `${IMG}/Mountain_Climbers/0.jpg` },
          { name: "Jumping jacks", muscleGroup: "Cardio complet", reason: "Mouvement simple, bon pour récupérer entre séries", gifUrl: `${IMG}/Rope_Jumping/0.jpg` },
        ],
      },
      {
        name: "Kettlebell swings",
        muscleGroup: "Postérieur/Cardio",
        sets: 4,
        reps: "15",
        weightKg: 16,
        notes: "Pousse avec les hanches, pas les bras. Contracte les fessiers en haut.",
        gifUrl: `${IMG}/Kettlebell_Sumo_High_Pull/0.jpg`,
        alternatives: [
          { name: "Box jumps", muscleGroup: "Jambes/Cardio", reason: "Travail explosif des jambes", gifUrl: `${IMG}/Barbell_Full_Squat/0.jpg` },
          { name: "Jump squats", muscleGroup: "Jambes/Cardio", reason: "Plyométrie simple et efficace", gifUrl: `${IMG}/Barbell_Full_Squat/0.jpg` },
        ],
      },
      {
        name: "Battle ropes",
        muscleGroup: "Haut du corps/Cardio",
        sets: 3,
        reps: "30sec",
        weightKg: 0,
        notes: "Alterne les bras, garde le rythme. Core engagé, genoux légèrement fléchis.",
        gifUrl: `${IMG}/Rope_Jumping/0.jpg`,
        alternatives: [
          { name: "Med ball slams", muscleGroup: "Full body/Cardio", reason: "Excellent pour évacuer le stress", gifUrl: `${IMG}/Kettlebell_Sumo_High_Pull/0.jpg` },
          { name: "Tire flips", muscleGroup: "Full body", reason: "Travail fonctionnel complet", gifUrl: `${IMG}/Barbell_Deadlift/0.jpg` },
        ],
      },
      {
        name: "Mountain climbers",
        muscleGroup: "Core/Cardio",
        sets: 3,
        reps: "30sec",
        weightKg: 0,
        notes: "Mains sous les épaules, hanches basses. Ramène les genoux rapidement.",
        gifUrl: `${IMG}/Mountain_Climbers/0.jpg`,
        alternatives: [
          { name: "Planche", muscleGroup: "Core", reason: "Version statique, bon pour l'endurance du core", gifUrl: `${IMG}/Plank/0.jpg` },
          { name: "Bicycle crunches", muscleGroup: "Core", reason: "Cible les obliques", gifUrl: `${IMG}/Air_Bike/0.jpg` },
        ],
      },
      {
        name: "Sprint tapis",
        muscleGroup: "Cardio",
        sets: 4,
        reps: "30sec",
        weightKg: 0,
        notes: "Sprint maximal 30sec, marche 60sec. Monte progressivement la vitesse.",
        gifUrl: `${IMG}/Mountain_Climbers/0.jpg`,
        alternatives: [
          { name: "Sprint extérieur", muscleGroup: "Cardio", reason: "Plus naturel, surface variée", gifUrl: `${IMG}/Mountain_Climbers/0.jpg` },
          { name: "Vélo HIIT", muscleGroup: "Cardio", reason: "Zéro impact, parfait si articulations sensibles", gifUrl: `${IMG}/Air_Bike/0.jpg` },
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
        gifUrl: `${IMG}/Barbell_Squat/0.jpg`,
        alternatives: [
          { name: "Leg press", muscleGroup: "Quadriceps", reason: "Moins de stress sur le dos, charge plus lourde possible", gifUrl: `${IMG}/Leg_Press/0.jpg` },
          { name: "Squat goblet", muscleGroup: "Quadriceps", reason: "Bon pour apprendre le pattern de squat", gifUrl: `${IMG}/Goblet_Squat/0.jpg` },
        ],
      },
      {
        name: "Soulevé de terre roumain",
        muscleGroup: "Ischio-jambiers",
        sets: 4,
        reps: "8-10",
        weightKg: 80,
        notes: "Jambes quasi tendues, barre le long des cuisses. Sens l'étirement dans les ischios.",
        gifUrl: `${IMG}/Romanian_Deadlift/0.jpg`,
        alternatives: [
          { name: "Good mornings", muscleGroup: "Ischio-jambiers", reason: "Excellent étirement de la chaîne postérieure", gifUrl: `${IMG}/Stiff-Legged_Barbell_Deadlift/0.jpg` },
          { name: "Leg curl", muscleGroup: "Ischio-jambiers", reason: "Isolation parfaite des ischios", gifUrl: `${IMG}/Seated_Leg_Curl/0.jpg` },
        ],
      },
      {
        name: "Fentes marchées",
        muscleGroup: "Quadriceps/Fessiers",
        sets: 3,
        reps: "12/jambe",
        weightKg: 20,
        notes: "Pas long, genou arrière frôle le sol. Garde le buste droit.",
        gifUrl: `${IMG}/Barbell_Walking_Lunge/0.jpg`,
        alternatives: [
          { name: "Split squat bulgare", muscleGroup: "Quadriceps/Fessiers", reason: "Unilatéral intense, excellent pour l'équilibre", gifUrl: `${IMG}/Barbell_Lunge/0.jpg` },
          { name: "Step-ups", muscleGroup: "Quadriceps/Fessiers", reason: "Mouvement fonctionnel, ajustable en hauteur", gifUrl: `${IMG}/Barbell_Step_Ups/0.jpg` },
        ],
      },
      {
        name: "Leg press",
        muscleGroup: "Quadriceps",
        sets: 3,
        reps: "10-12",
        weightKg: 120,
        notes: "Pieds à mi-plateforme. Ne verrouille pas les genoux en haut.",
        gifUrl: `${IMG}/Leg_Press/0.jpg`,
        alternatives: [
          { name: "Hack squat", muscleGroup: "Quadriceps", reason: "Guidé, excellent pour cibler les quads", gifUrl: `${IMG}/Barbell_Hack_Squat/0.jpg` },
          { name: "Sissy squat", muscleGroup: "Quadriceps", reason: "Isolation extrême des quadriceps", gifUrl: `${IMG}/Barbell_Full_Squat/0.jpg` },
        ],
      },
      {
        name: "Leg curl machine",
        muscleGroup: "Ischio-jambiers",
        sets: 3,
        reps: "12-15",
        weightKg: 40,
        notes: "Mouvement lent et contrôlé. Contracte bien en position haute.",
        gifUrl: `${IMG}/Seated_Leg_Curl/0.jpg`,
        alternatives: [
          { name: "Nordic curl", muscleGroup: "Ischio-jambiers", reason: "Exercice excentrique puissant", gifUrl: `${IMG}/Seated_Leg_Curl/0.jpg` },
          { name: "Swiss ball curl", muscleGroup: "Ischio-jambiers", reason: "Engage les stabilisateurs", gifUrl: `${IMG}/Seated_Leg_Curl/0.jpg` },
        ],
      },
      {
        name: "Mollets debout",
        muscleGroup: "Mollets",
        sets: 4,
        reps: "15-20",
        weightKg: 60,
        notes: "Amplitude complète : descends bien le talon, monte sur la pointe. Pause en haut.",
        gifUrl: `${IMG}/Standing_Calf_Raises/0.jpg`,
        alternatives: [
          { name: "Mollets assis", muscleGroup: "Mollets", reason: "Cible le soléaire, complémentaire aux mollets debout", gifUrl: `${IMG}/Barbell_Seated_Calf_Raise/0.jpg` },
          { name: "Mollets presse", muscleGroup: "Mollets", reason: "Charge lourde possible, bonne amplitude", gifUrl: `${IMG}/Calf_Press_On_The_Leg_Press_Machine/0.jpg` },
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
        gifUrl: `${IMG}/Barbell_Deadlift/0.jpg`,
        alternatives: [
          { name: "Trap bar deadlift", muscleGroup: "Dos/Jambes", reason: "Plus facile sur le dos, position plus naturelle", gifUrl: `${IMG}/Barbell_Deadlift/0.jpg` },
          { name: "Sumo deadlift", muscleGroup: "Dos/Jambes", reason: "Plus de travail des adducteurs et quads", gifUrl: `${IMG}/Sumo_Deadlift/0.jpg` },
        ],
      },
      {
        name: "Développé incliné haltères",
        muscleGroup: "Pectoraux supérieurs",
        sets: 3,
        reps: "10-12",
        weightKg: 24,
        notes: "Banc à 30-45°. Descends les haltères au niveau des clavicules.",
        gifUrl: `${IMG}/Incline_Dumbbell_Press/0.jpg`,
        alternatives: [
          { name: "Développé couché", muscleGroup: "Pectoraux", reason: "Mouvement de base pour les pecs", gifUrl: "/exercises/bench-press.gif" },
          { name: "Cable fly incliné", muscleGroup: "Pectoraux supérieurs", reason: "Tension constante sur le haut des pecs", gifUrl: `${IMG}/Incline_Dumbbell_Press/0.jpg` },
        ],
      },
      {
        name: "Squat goblet",
        muscleGroup: "Quadriceps",
        sets: 3,
        reps: "12-15",
        weightKg: 24,
        notes: "Haltère contre la poitrine, coudes entre les genoux. Dos droit.",
        gifUrl: `${IMG}/Goblet_Squat/0.jpg`,
        alternatives: [
          { name: "Squat avant", muscleGroup: "Quadriceps", reason: "Plus de travail des quads et du core", gifUrl: `${IMG}/Barbell_Full_Squat/0.jpg` },
          { name: "Squat sumo", muscleGroup: "Quadriceps/Adducteurs", reason: "Travaille les adducteurs en plus", gifUrl: `${IMG}/Barbell_Full_Squat/0.jpg` },
        ],
      },
      {
        name: "Rowing câble assis",
        muscleGroup: "Dos",
        sets: 3,
        reps: "10-12",
        weightKg: 45,
        notes: "Tire vers le nombril, poitrine sortie. Serre les omoplates 1 seconde.",
        gifUrl: `${IMG}/Seated_Cable_Rows/0.jpg`,
        alternatives: [
          { name: "Rowing T-bar", muscleGroup: "Dos", reason: "Excellent pour l'épaisseur du dos", gifUrl: `${IMG}/Bent_Over_Barbell_Row/0.jpg` },
          { name: "Pull-over", muscleGroup: "Dos/Pectoraux", reason: "Étire et travaille le grand dorsal", gifUrl: `${IMG}/Bent-Arm_Barbell_Pullover/0.jpg` },
        ],
      },
      {
        name: "Presse épaules haltères",
        muscleGroup: "Épaules",
        sets: 3,
        reps: "10-12",
        weightKg: 20,
        notes: "Assis ou debout. Pousse les haltères au-dessus de la tête sans verrouiller.",
        gifUrl: `${IMG}/Standing_Dumbbell_Press/0.jpg`,
        alternatives: [
          { name: "Landmine press", muscleGroup: "Épaules", reason: "Mouvement naturel, moins de stress articulaire", gifUrl: `${IMG}/Standing_Dumbbell_Press/0.jpg` },
          { name: "Push press", muscleGroup: "Épaules", reason: "Permet de charger plus grâce à l'élan des jambes", gifUrl: `${IMG}/Standing_Military_Press/0.jpg` },
        ],
      },
      {
        name: "Planche (gainage)",
        muscleGroup: "Core",
        sets: 3,
        reps: "60sec",
        weightKg: 0,
        notes: "Corps aligné de la tête aux pieds. Contracte abdos et fessiers. Respire normalement.",
        gifUrl: `${IMG}/Plank/0.jpg`,
        alternatives: [
          { name: "Ab wheel", muscleGroup: "Core", reason: "Très intense pour les abdos et les épaules", gifUrl: `${IMG}/Ab_Roller/0.jpg` },
          { name: "Dead bug", muscleGroup: "Core", reason: "Excellent pour la stabilisation et la coordination", gifUrl: `${IMG}/Plank/0.jpg` },
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
        gifUrl: `${IMG}/Mountain_Climbers/0.jpg`,
        alternatives: [
          { name: "Vélo léger", muscleGroup: "Cardio léger", reason: "Zéro impact, bon pour les articulations", gifUrl: `${IMG}/Air_Bike/0.jpg` },
          { name: "Natation", muscleGroup: "Cardio complet", reason: "Travail complet sans impact", gifUrl: `${IMG}/Plank/0.jpg` },
        ],
      },
      {
        name: "Foam rolling",
        muscleGroup: "Récupération",
        sets: 1,
        reps: "15min",
        weightKg: 0,
        notes: "Roule lentement sur chaque groupe musculaire. Insiste sur les zones tendues.",
        gifUrl: `${IMG}/Plank/0.jpg`,
        alternatives: [
          { name: "Stretching statique", muscleGroup: "Récupération", reason: "Améliore la flexibilité à long terme", gifUrl: `${IMG}/Cat_Stretch/0.jpg` },
          { name: "Yoga", muscleGroup: "Récupération/Mobilité", reason: "Combine étirements et respiration", gifUrl: `${IMG}/Cat_Stretch/0.jpg` },
        ],
      },
      {
        name: "Étirements dynamiques",
        muscleGroup: "Mobilité",
        sets: 1,
        reps: "15min",
        weightKg: 0,
        notes: "Mouvements amples et contrôlés. Cercles de bras, fentes avec rotation, etc.",
        gifUrl: `${IMG}/Dynamic_Chest_Stretch/0.jpg`,
        alternatives: [
          { name: "Yoga flow", muscleGroup: "Mobilité", reason: "Enchaînement fluide qui travaille tout le corps", gifUrl: `${IMG}/Cat_Stretch/0.jpg` },
          { name: "Mobilité articulaire", muscleGroup: "Mobilité", reason: "Cible spécifiquement les articulations raides", gifUrl: `${IMG}/Dynamic_Chest_Stretch/0.jpg` },
        ],
      },
      {
        name: "Yoga léger",
        muscleGroup: "Flexibilité/Mental",
        sets: 1,
        reps: "20min",
        weightKg: 0,
        notes: "Séance douce, focus sur la respiration. Sun salutations et postures de base.",
        gifUrl: `${IMG}/Cat_Stretch/0.jpg`,
        alternatives: [
          { name: "Méditation", muscleGroup: "Mental", reason: "Récupération mentale, réduit le cortisol", gifUrl: `${IMG}/Plank/0.jpg` },
          { name: "Respiration guidée", muscleGroup: "Mental", reason: "Technique box breathing pour la récupération", gifUrl: `${IMG}/Plank/0.jpg` },
        ],
      },
    ],
  },
};
