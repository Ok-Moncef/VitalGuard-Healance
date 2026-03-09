// ============================================================
//  Healance — Mock Data
// ============================================================

export const currentPatient = {
  id: 'PX-8821',
  name: 'Alex Smith',
  age: 34,
  gender: 'Male',
  vitals: {
    heartRate: 72,
    spo2: 98,
    bloodPressure: '120/80',
    temperature: 37.1,
    activity: 'Active',
  },
  medications: [
    { name: 'Metformin 500mg', time: '10:00 AM', status: 'pending' },
    { name: 'Lisinopril 10mg', time: '8:00 PM', status: 'taken' },
  ],
  nextAppointment: { doctor: 'Dr. Sarah Miller', time: 'Tomorrow at 2 PM' },
  aiInsight:
    'Your vitals have been consistent for the last 4 hours. Great job staying hydrated. Your next medication is scheduled in 45 minutes.',
  steps: 10000,
  stepGoal: 10000,
  activityData: [65, 78, 55, 88, 72, 92, 85, 70, 95, 80, 75, 88],
};

export const doctors = [
  {
    id: 'DOC-001',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    clinic: 'Heart Care Clinic',
    eta: '4 min',
    distance: '1.2 miles',
    rating: 4.9,
    available: true,
    avatar: null,
    credentials: 'MD, PhD',
  },
  {
    id: 'DOC-002',
    name: 'Dr. James Wilson',
    specialty: 'Cardiology',
    status: 'Available',
    available: true,
    avatar: null,
  },
  {
    id: 'DOC-003',
    name: 'Dr. Alex Rivera',
    specialty: 'Trauma',
    status: 'In Surgery',
    available: false,
    avatar: null,
  },
  {
    id: 'DOC-004',
    name: 'Dr. Emily Blunt',
    specialty: 'ER',
    status: 'Available',
    available: true,
    avatar: null,
  },
  {
    id: 'DOC-005',
    name: 'Dr. Julianne',
    specialty: 'On-call Surgeon',
    status: 'Active',
    available: true,
    avatar: null,
  },
];

export const doctorProfile = {
  id: 'DOC-001',
  name: 'Dr. Sarah Jenkins',
  title: 'Senior Cardiologist',
  credentials: 'MD, PhD — 15 Years Experience',
  rating: 4.9,
  totalPatients: 2480,
  experience: 15,
  badges: ['Hero Badge', 'Top Rated', 'Fast Responder'],
  about:
    "Dr. Sarah Jenkins is a board-certified cardiologist with over 15 years of experience in managing complex cardiovascular conditions. She specializes in preventive cardiology, heart failure management, and advanced diagnostic imaging. Her patient-centered approach emphasizes lifestyle modification alongside cutting-edge medical treatments.",
  specializations: [
    'Preventive Cardiology',
    'Heart Failure Management',
    'Advanced Diagnostic Imaging',
    'Interventional Cardiology',
    'Electrophysiology',
  ],
  emergencyHistory: [
    {
      title: 'Rapid Response Unit',
      description:
        'Successfully led an emergency triage for acute myocardial infarction. Response time: 4 mins.',
    },
    {
      title: 'Critical Care Stabilization',
      description:
        'Stabilized two patients post-cardiac arrest during the Metropolitan Hospital surge.',
    },
  ],
  availability: {
    Mon: '8am–6pm',
    Tue: '8am–6pm',
    Wed: '10am–8pm',
    Thu: '8am–6pm',
    Fri: '8am–4pm',
    Sat: 'On-Call',
    Sun: 'Off',
  },
  location: 'Heart Care Clinic, 3rd Ave, New York, NY 10001',
};

export const emergencyAlert = {
  id: 'HEAL-9921',
  patientName: 'John Doe',
  patientAge: 58,
  patientGender: 'Male',
  reason: 'Potential Cardiac Arrest',
  distance: '0.8 miles',
  vitals: {
    heartRate: 38,
    bloodPressure: '85/50',
    spo2: 88,
    temperature: 36.2,
  },
  ambulanceEta: '4 min',
  expiresIn: 120, // seconds
};

export const activeEmergencies = [
  {
    id: 'EMG-001',
    patient: 'John Doe',
    type: 'Cardiac Arrest',
    location: '3rd & Main St',
    eta: '4 min',
    status: 'dispatched',
    severity: 'critical',
  },
  {
    id: 'EMG-002',
    patient: 'Maria Santos',
    type: 'Stroke',
    location: 'Central Park West',
    eta: '7 min',
    status: 'en_route',
    severity: 'high',
  },
  {
    id: 'EMG-003',
    patient: 'Robert Chen',
    type: 'Respiratory Distress',
    location: '5th Ave & 42nd',
    eta: '2 min',
    status: 'on_scene',
    severity: 'critical',
  },
  {
    id: 'EMG-004',
    patient: 'Lisa Park',
    type: 'Severe Allergic Reaction',
    location: 'Brooklyn Bridge',
    eta: '9 min',
    status: 'dispatched',
    severity: 'moderate',
  },
];

export const adminStats = {
  activeEmergencies: 24,
  availableDoctors: 142,
  avgResponseTime: '4m 12s',
  successRate: '94.2%',
  activeUnits: 12,
  district: 'Central District',
};

export const incidentReport = {
  id: 'INC-2024-0842',
  patientId: '#PX-8821',
  patientName: 'Sarah Jenkins',
  interventionType: 'Emergency Response',
  status: 'In Progress',
  reportedBy: 'Dr. James Wilson',
  timeline: [
    {
      time: '09:14 AM',
      title: 'Emergency Alert Triggered',
      description:
        'Initial notification received from bedside monitoring system (Room 402).',
    },
    {
      time: '09:17 AM',
      title: 'Team Response',
      description:
        'Rapid response team arrived on site. Vitals stabilization initiated.',
    },
    {
      time: '09:22 AM',
      title: 'Medication Administered',
      description:
        'IV Epinephrine (0.5mg) administered as per ACLS protocols.',
    },
  ],
  integrity: ['HIPAA Compliant storage', 'Immutable audit trail', 'Encryption at rest'],
};

export const firstAidSteps = [
  'Ensure the patient is lying on a flat surface and is breathing normally.',
  'Loosen any tight clothing around the neck or waist to assist blood flow.',
  'Keep the patient warm and do not give them anything to drink.',
];

export const navigationWaypoints = [
  { label: 'Current Location', distance: '0m', type: 'origin' },
  { label: 'Turn right on 3rd Ave', distance: '120m', type: 'turn' },
  { label: 'Enter Main Hospital Building', distance: '80m', type: 'destination' },
  { label: 'Room 402 — Emergency Dept', distance: 'arrived', type: 'arrived' },
];

export const liveVitals = {
  patient: 'Marcus Thorne',
  room: '402',
  heartRate: { value: 95, trend: 'up', status: 'elevated' },
  bloodPressure: { value: '140/90', trend: 'stable', status: 'elevated' },
  spo2: { value: 92, trend: 'down', status: 'low' },
  temperature: { value: 38.4, trend: 'up', status: 'elevated' },
};
