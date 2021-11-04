export interface ILoginState {
  usuarioId?: number;
  username?: string;
  usuarioRolId?: number;
  usuarioRolNombre?: string;
  idDepartLabo?: number;
  companiasConAcceso: ICompaniasConAcceso[];
  companiaSeleccionada: {
    id?: number;
    idConsorcio?: number;
    nombre?: string;
    direccion?: string;
    telefono?: string;
    fax?: string;
    rnc?: string;
    email?: string;
    contacto?: string;
  };
}

export interface ICompaniasConAcceso {
  id?: number;
  companiaId?: number;
  companiaNombre?: string;
}

export interface IInventarioAlmacen {
  id?: number;
  almacenId?: number;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
}

export interface IProduccionParametros {
  id?: number;
  companiaId?: number;
  almacenId?: number;
  almacenNombre?: string;
}

export interface ICredenciales {
  loggin: string;
  clave: string;
}

export interface ILogin {
  idUsuario: number;
  nombre: string;
  tipo: number;
  roleNombre: string;
  idDepartLabo: number;
  companias: [
    {
      id: number;
      companiaId: number;
      companiaNombre: string;
    }
  ];
}


export interface ICompaniasConAcceso {
  id?: number;
  companiaId?: number;
  companiaNombre?: string;
}

export interface ICompaniasConsultarLogin {
  ID: number;
  ID_COMPANIA: number;
  ID_CONSORCIO: number;
  NOMBRE_COMPANIA: string;
  DIRECCION_COMPANIA: string;
  TELEFONO_COMPANIA: string;
  FAX_COMPANIA: string;
  RNC_COMPANIA: string;
  EMAIL_COMPANIA: string;
  CONTACTO_COMPANIA: string;
  almacenes: {
    ID_ALMACEN: number;
    DESCRIPCION: string;
    ID_CONSORCIO: number;
    ID_COMPANIA: number;
    UBICACION: string;
    PRINCIPAL: string;
    ID: number;
    ISINACTIVO: boolean;
  }[];
  parametrosProduccion: IProduccionParametros;
}

export interface IFACTURA {
  ID: number | null,
  CODIGO: number | null,
  ID_CLIENTE: number | null,
  CLIENTE: string | null,
  ID_ALMACEN: number | null,
  ALMACEN: string | null,
  ID_VENDEDOR: number | null,
  VENDEDOR: string | null,
  FECHA: Date,
  BRUTO: number | null,
  DESCUENTO: number | null,
  NETO: number | null,
  TOTAL: number | null,
  PAGADO: number | null,
  PENDIENTE: number | null,
  productos: IFACTURA_DETALLE[];
}

export interface IFACTURA_DETALLE {
  ID: number;
  ITEM: number;
  ID_CLIENTE: number;
  DESCRIPCION: string;
  UNIDAD: string;
  CANTIDAD: number;
  PRECIO_UNITARIO: number;
  TOTAL: number;
  MONTO_BRUTO: number;
  ITBIS: string;
  MONTO_ITBIS: number;
  CONTROL: number;
  ID_PRODUCTO: number;
  REFERENCIA: string;
  ID_CUENTA: string;
  FECHA: string;
  DEV_CODIGO?: number | null;
  DESCUENTOPOR: number;
  DESCUENTO: number;
  NETO: number;
  COSTO: number;
  DES_MANUAL?: string | null;
  UTILIDAD_MONTO: number;
  UTILIDAD: number;
  ISFINALIZADO: number;
  ELIMINAR?: boolean;
}

export interface IESTUDIO {
  id: number;
  codigo: number;
  companiaId: number;
  consorcioId: number;
  descripcion: string | null;
  observacion: string | null;
  idDepartLabo: number;
  departamento: number;
  isInactivo: number;
  productos: IESTUDIO_DETALLE[];
}

export interface IESTUDIO_DETALLE {
  id: number;
  idEstudio: number;
  idProducto: number
  referencia: string | null;
  descripcion: string | null;
  cantidad: number;
}