import { Guest } from "../@types";

export const mockGuests: Guest[] = [
  {
    id: "1",
    name: "João",
    surname: "Silva",
    phone: "11999998888",
    invitedBy: "Noiva",
    hasCompanion: true,
    type: "Amigos",
    confirmed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Maria",
    surname: "Oliveira",
    phone: "11888887777",
    invitedBy: "Noivo",
    hasCompanion: false,
    type: "Padrinhos",
    confirmed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Carlos",
    surname: "Pereira",
    phone: "11911112222",
    invitedBy: "Ambos",
    hasCompanion: true,
    type: "Familiar",
    confirmed: true,
    createdAt: new Date().toISOString(),
  },
];