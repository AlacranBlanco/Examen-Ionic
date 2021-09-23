export interface Announcements {
    id?:          number;
    aviso?:       string;
    tipoUsuario?: string;
    fecha?:       Date;
    imagen?:      string;
    titulo?:      string;
    creado?:      Date;
    update?:      Date | null;
}

