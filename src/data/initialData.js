export const DEMO_EMAIL = 'giselle.souza@email.com';
export const DEMO_PASSWORD = '12345678';

export const SPECIALTIES = [
  'Cardiologia',
  'Clínica Geral',
  'Dermatologia',
  'Oftalmologia',
  'Ortopedia',
  'Neurologia',
  'Pediatria',
  'Ginecologia',
];

export const MONTHS_PT = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export const MONTHS_SHORT_PT = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

export function formatDateLong(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  return `${String(day).padStart(2, '0')} de ${MONTHS_SHORT_PT[month - 1]} de ${year}`;
}

export function formatTimeDisplay(timeStr) {
  if (!timeStr) return '';
  return timeStr.replace(':', 'h');
}

export function parseDateParts(isoDate) {
  if (!isoDate) return { day: '--', monthShort: '---', year: '----', monthIndex: 0 };
  const [year, month, day] = isoDate.split('-').map(Number);
  return {
    day: String(day).padStart(2, '0'),
    dayNum: day,
    monthShort: MONTHS_SHORT_PT[(month || 1) - 1],
    monthIndex: (month || 1) - 1,
    year: String(year),
    yearNum: year,
  };
}

export function getInitials(name = 'Usuário') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function createInitialUserData(name = 'Giselle Souza', email = DEMO_EMAIL) {
  return {
    profile: {
      name,
      email,
      roleDescription: '48 anos · Titular / gerenciador familiar',
      bloodType: 'O+',
      allergies: 'Nenhuma informada',
      phone: '(11) 99932-1020',
    },
    dependents: [
      {
        id: 'dep-1',
        name: 'Sr. Carlos',
        relation: 'Pai · paciente acompanhado',
      },
    ],
    preferences: {
      advanceNotice: '1 dia antes',
      push: true,
      whatsapp: false,
      calendarSync: true,
      locationPermission: true,
    },
    upcomingAppointments: [
      {
        id: 'apt-1',
        specialty: 'Oftalmologia',
        doctor: 'Dra. Ana Ribeiro',
        clinic: 'Clínica Visão',
        patient: name,
        patientType: 'titular',
        date: '2026-10-21',
        time: '10:00',
        address: 'Rua Domingos de Morais, 2187 · Vila Mariana, São Paulo',
        status: 'Confirmada',
        synced: true,
        attachments: [
          {
            id: 'att-1',
            name: 'guia_oftalmo.pdf',
            type: 'PDF',
            size: '480 KB',
            dataUrl:
              'data:text/plain;charset=utf-8,' +
              encodeURIComponent(
                'MedFEI Saúde+ - guia_oftalmo.pdf (Dra. Ana Ribeiro - 21/10/2026 10h00)'
              ),
          },
        ],
      },
      {
        id: 'apt-2',
        specialty: 'Dermatologia',
        doctor: 'Dra. Marina Costa',
        clinic: 'Clínica Pele & Saúde',
        patient: name,
        patientType: 'titular',
        date: '2026-10-23',
        time: '14:30',
        address: 'Rua Vergueiro, 1350 · Vila Mariana, São Paulo',
        status: 'Confirmada',
        synced: true,
        attachments: [
          {
            id: 'att-2',
            name: 'guia_encaminhamento_dermato.pdf',
            type: 'PDF',
            size: '540 KB',
            dataUrl:
              'data:text/plain;charset=utf-8,' +
              encodeURIComponent(
                'MedFEI Saúde+ - guia_encaminhamento_dermato.pdf (Dra. Marina Costa - 23/10/2026 14h30)'
              ),
          },
        ],
      },
      {
        id: 'apt-3',
        specialty: 'Cardiologia',
        doctor: 'Dr. André Lima',
        clinic: 'Instituto Coração',
        patient: 'Sr. Carlos',
        patientType: 'familiar',
        date: '2026-10-26',
        time: '10:00',
        address: 'Av. Paulista, 1842 · Bela Vista, São Paulo',
        status: 'Confirmada',
        synced: true,
        attachments: [
          {
            id: 'att-3',
            name: 'pedido_ecocardiograma_carlos.pdf',
            type: 'PDF',
            size: '610 KB',
            dataUrl:
              'data:text/plain;charset=utf-8,' +
              encodeURIComponent(
                'MedFEI Saúde+ - pedido_ecocardiograma_carlos.pdf (Dr. André Lima - 26/10/2026 10h00)'
              ),
          },
        ],
      },
    ],
    historyAppointments: [
      {
        id: 'hist-1',
        specialty: 'Dermatologia',
        doctor: 'Dra. Marina Costa',
        clinic: 'Clínica Pele & Saúde',
        patient: name,
        patientType: 'titular',
        date: '2026-04-23',
        time: '14:30',
        address: 'Rua Vergueiro, 1350 · São Paulo',
        status: 'Consulta realizada',
        attachments: [
          {
            id: 'hatt-1',
            name: 'guia_dermatologia.jpg',
            type: 'JPG',
            size: '640 KB',
            dataUrl:
              'data:text/plain;charset=utf-8,' +
              encodeURIComponent('MedFEI Saúde+ - guia_dermatologia.jpg'),
          },
          {
            id: 'hatt-2',
            name: 'laudo_dermatologia.pdf',
            type: 'PDF',
            size: '980 KB',
            dataUrl:
              'data:text/plain;charset=utf-8,' +
              encodeURIComponent('MedFEI Saúde+ - laudo_dermatologia.pdf'),
          },
        ],
      },
      {
        id: 'hist-2',
        specialty: 'Cardiologia',
        doctor: 'Dr. André Lima',
        clinic: 'Instituto Coração',
        patient: 'Sr. Carlos',
        patientType: 'familiar',
        date: '2026-03-12',
        time: '11:00',
        address: 'Av. Paulista, 1842 · Bela Vista, São Paulo',
        status: 'Consulta realizada',
        attachments: [
          {
            id: 'hatt-3',
            name: 'eletrocardiograma_carlos.pdf',
            type: 'PDF',
            size: '750 KB',
            dataUrl:
              'data:text/plain;charset=utf-8,' +
              encodeURIComponent('MedFEI Saúde+ - eletrocardiograma_carlos.pdf'),
          },
        ],
      },
      {
        id: 'hist-3',
        specialty: 'Oftalmologia',
        doctor: 'Dra. Ana Ribeiro',
        clinic: 'Clínica Visão',
        patient: name,
        patientType: 'titular',
        date: '2026-02-04',
        time: '09:30',
        address: 'Rua Domingos de Morais, 2187 · Vila Mariana, São Paulo',
        status: 'Consulta realizada',
        attachments: [
          {
            id: 'hatt-4',
            name: 'receita_oftalmologia.pdf',
            type: 'PDF',
            size: '420 KB',
            dataUrl:
              'data:text/plain;charset=utf-8,' +
              encodeURIComponent('MedFEI Saúde+ - receita_oftalmologia.pdf'),
          },
        ],
      },
    ],
  };
}
