export interface Guest {
    id: string;
    name: string;
    surname: string;
    phone: string;
    invitedBy: "Noivo" | "Noiva" | "Ambos";
    hasCompanion: boolean;
    type: "Amigos" | "Padrinhos" | "Familiar";
    confirmed: boolean;
    createdAt: string;
  }
  