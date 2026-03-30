export interface Consultar {
  identificacion: string;
}

export interface CedulaConsultada {
  cedula: string;
  genero: string;
  nombre: string;
  conyuge: string;
  success: boolean;
  profesion: string;
  estadoCivil: string;
  instruccion: string;
  nombreMadre: string;
  nombrePadre: string;
  nacionalidad: string;
  calleDomicilio: string;
  lugarDomicilio: string;
  fechaCedulacion: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  condicionCedulado: string;
  numeracionDomicilio: string;
  fechaInscripcionGenero: string;
  lugarInscripcionGenero: string;
  fechaInscripcionDefuncion: string;
}

export interface PlanInformation {
  soporte: string;
  description: string;
}

export interface Plan {
  id: number;
  name: string;
  price: string; 
  limit_consultas: number;
  duration_days: number;
  information: PlanInformation;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  plan_id: number;
  consultas_disponibles: number;
  fecha_inicio: string;
  fecha_vencimiento: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  plan: Plan; 
}