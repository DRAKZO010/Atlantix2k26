import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_qogm9lg';
const TEMPLATE_ID = 'template_0vchqqr';
const PUBLIC_KEY = 'yXoInUtWoCeIT20b5';

export function initEmailJS(): void {
  emailjs.init({ publicKey: PUBLIC_KEY });
}

interface EmailPayload {
  memberName: string;
  memberEmail: string;
  regId: string;
  teamLead: string;
  techEvent: string;
  nonTechEvent: string;
  totalFee: number;
  passUrl: string;
  qrUrl: string;
}

export async function sendReceiptEmail(payload: EmailPayload): Promise<void> {
  const templateParams = {
    to_name: payload.memberName,
    to_email: payload.memberEmail,
    reg_id: payload.regId,
    team_lead: payload.teamLead,
    event_name: payload.techEvent,
    additional_event: payload.nonTechEvent,
    total_fee: payload.totalFee,
    pass_link: payload.passUrl,
    qr_code: payload.qrUrl,
    venue: 'Park College of Engineering and Technology, Kaniyur, Coimbatore',
    event_date: 'January 15-16, 2026',
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
}
