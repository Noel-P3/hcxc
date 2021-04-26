export interface IAuthContext {
  id: number;
  USER: string;
  roleNombre: string;
  rutaAvatarDefault: string;
  tipoComprobante: ICompaniaComprobante[];
  onCambioColorCompania: ({
    r,
    g,
    b,
    a,
  }: {
    r: number;
    g: number;
    b: number;
    a: number;
  }) => void;
  onActualizarLoginState: (
    userId: number,
    tokenActual?: string,
    isLogIn?: boolean
  ) => void;
  dashBoardTipoGrafico: IAGlobalDashBoardTipoGrafico[];
  dashBoardOpcionGrafico: IAGlobalDashBoardOpcionGrafico[];
  companiaSeleccionada: {
    companiaId: number;
    utilizaCentroCosto: boolean;
    cantidadUsuarios: number;
    companiaLogo: string;
    companiaNombre: string;
    eMail: string;
    telefono: string;
    direccion: string;
    rnc: string;
    catalogo: IContabilidadCatalogo[];
    centroCostos: IContabilidadCentroCosto[];
    centroCostoProyectos: IContabilidadCentroCostoProyecto[];
    centroCostoSubProyectos: IContabilidadCentroCostoSubProyecto[];
    bancos: IBancoCuenta[];
    monedas: ICompaniaMoneda[];
    almacenes: IInventarioAlmacen[];
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface IAGlobalEvento {
  id?: Number;
  fecha?: string;
  tipoDocumento?: string;
  documento?: string;
  estadoAnterior?: string;
  estadoActual?: string;
  usuario?: string;
}

export interface IAGlobalDashBoardOpcionGrafico {
  id: number;
  tipoGraficoId: number;
  accesoId: number;
  rutaAPI: string;
  nombre: string;
}

export interface IAGlobalDashBoardTipoGrafico {
  id: number;
  nombre: string;
}

export interface IBancoCuenta {
  id?: number;
  companiaId: number;
  nombre: string;
  cuentaBancaria: string;
  monedaId: number;
  cuentaId: number;
  cuentaPrimaId: number;
  rnc: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;
  telefono4?: string;
  direccion?: string;
  noPermiteSobregiro: boolean;
  isInactivo: boolean;
  cuenta: string;
  cuentaNombre: string;
  monedaNombre: string;
  cuentaPrima: string;
  cuentaPrimaNombre: string;
}

export interface IBancoDeposito {
  [index: string]:
    | number
    | string
    | boolean
    | undefined
    | ICuenta[]
    | IBancoDepositoRecibo[]
    | IAGlobalEvento;
  id?: number;
  codigo?: number;
  companiaId: number;
  bancoCuentaId?: number;
  monedaId?: number;
  conciliacionId?: number;
  conciliacionCodigo?: number;
  tasa: number;
  centroCostoId?: number;
  centroCostoProyectoId?: number;
  centroCostoSubProyectoId?: number;
  fecha: string;
  observacion?: string;
  total: number;
  totalTasa: number;
  isAnulado: boolean;
  bancoCuentaCuentaBancaria?: string;
  bancoCuentaNombre?: string;
  monedaNombre?: string;
  centroCostoNombre?: string;
  centroCostoProyectoNombre?: string;
  centroCostoSubProyectoNombre?: string;
  cuentas: ICuenta[];
  recibos: IBancoDepositoRecibo[];
  evento?: IAGlobalEvento;
}

export interface IBancoDepositoRecibo {
  id?: number;
  depositoId?: number;
  reciboId?: number;
  monto: number;
  tasa: number;
  montoDepositar: number;
  reciboCodigo: number;
  reciboFecha: string;
  centroCostoId?: number;
  centroCostoNombre?: string;
  centroCostoProyectoId?: number;
  centroCostoProyectoNombre?: string;
  centroCostoSubProyectoId?: number;
  centroCostoSubProyectoNombre?: string;
  monedaId: number;
  monedaNombre: string;
  eliminar: boolean;
}

export interface IBusqueda {
  collection: string;
  index?: number;
  propiedad?: string;
  where?: string;
  order?: string;
  listadoManual?: any[];
}

export interface IContabilidadCatalogo {
  id?: number;
  companiaId: number;
  nivel: number;
  nombre: string;
  cuenta: string;
  cuentaControl?: string;
  cuentaControlId?: number;
  cuentaControlNombre?: string;
  tipoCuentaId: number;
  isControl: boolean;
  isInactivo: boolean;
}

export interface ICompania {
  id: number;
  nombre: string;
  cantidadUsuarios: number;
  utilizaCentroCosto: boolean;
  logo?: string;
  icono?: string;
  selectivoPor: number;
  propinaPor: number;
  rnc?: string;
  telefono?: string;
  direccion?: string;
  eMail?: string;
  r: number;
  g: number;
  b: number;
  a: number;
  comprobantes: ICompaniaComprobante[];
  modulos: ICompaniaModulo[];
  monedas: ICompaniaMoneda[];
}

export interface ICompaniaComprobante {
  [index: string]: number | string | boolean | undefined;
  id: number;
  companiaId: number;
  fechaInicio: string;
  fechaFin: string;
  serie: string;
  secuenciaDesde: number;
  secuenciaHasta: number;
  reposicion: number;
  tipoNcfId: number;
  digitos: number;
  secuenciaActual: number;
  isInactivo: boolean;
  tipoNcfNombre: string;
  grupo: number;
  eliminar?: boolean;
}

export interface ICompaniaModulo {
  id: number;
  companiaId: number;
  moduloId: number;
  companiaNombre: string;
  moduloNombre: string;
  eliminar?: boolean;
}

export interface ICompaniaMoneda {
  [index: string]: number | string | boolean | undefined;
  id?: number;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
  cuentaCxCId: number;
  cuentaCxCPrimaId: number;
  cuentaCajaId: number;
  cuentaCajaPrimaId: number;
  cuentaCxPId: number;
  cuentaCxPPrimaId: number;
  companiaNombre: string;
  cuentaCxC: string;
  cuentaCxCNombre: string;
  cuentaCxCPrima: string;
  cuentaCxCPrimaNombre: string;
  cuentaCaja: string;
  cuentaCajaNombre: string;
  cuentaCajaPrima: string;
  cuentaCajaPrimaNombre: string;
  cuentaCxP: string;
  cuentaCxPNombre: string;
  cuentaCxPPrima: string;
  cuentaCxPPrimaNombre: string;
  eliminar?: boolean;
}

export interface IContabilidadCentroCosto {
  id?: number;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
}

export interface IContabilidadCentroCostoProyecto {
  id?: number;
  centroCostoId: number;
  centroCostoNombre: string;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
}

export interface IContabilidadCentroCostoSubProyecto {
  id?: number;
  centroCostoId: number;
  centroCostoNombre: string;
  centroCostoProyectoId: number;
  centroCostoProyectoNombre: string;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
}

export interface IContabilidadRepEntradaDiario {
  id?: number;
  tipo: string;
  codigo?: string;
  companiaId: number;
  fecha: Date;
  concepto: string;
  destinatario?: string;
  cuentaId: number;
  cuenta: string;
  cuentaNombre: string;
  centroCostoId: number;
  centroCostoNombre: string;
  centroCostoProyectoId: number;
  centroCostoProyectoNombre: string;
  centroCostoSubProyectoId: number;
  centroCostoSubProyectoNombre: string;
  debito: number;
  credito: number;
}

export interface IDashBoardGraficoUsuarioCompania {
  id?: number;
  companiaId: number;
  usuarioId: number;
  opcionGraficoId: number;
  data1?: string;
  data2?: string;
  data3?: string;
  data4?: string;
  data5?: string;
  data6?: string;
  data7?: string;
  data8?: string;
  data9?: string;
  data10?: string;
  accesoId: number;
  nombre: string;
  rutaAPI: string;
}

export interface IEntradaDiario {
  id?: number;
  tipo: string;
  codigo?: string;
  companiaId: number;
  fecha: Date;
  concepto: string;
  destinatario?: string;
  cuentas: ICuenta[];
}

export interface ICuenta {
  id?: number;
  cuentaId: number;
  cuenta: string;
  cuentaNombre: string;
  centroCostoId?: number;
  centroCostoNombre?: string;
  centroCostoProyectoId?: number;
  centroCostoProyectoNombre?: string;
  centroCostoSubProyectoId?: number;
  centroCostoSubProyectoNombre?: string;
  debito: number;
  credito: number;
  eliminar?: boolean;
}

export interface ICxCClienteGrupo {
  id?: number;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
}

export interface ICxCFactura {
  id?: number;
  codigo?: number;
  companiaId: number;
  fecha: Date;
  fechaVence: Date;
  tipoNcfId: number;
  ncf: string;
  tipoIngresoId: number;
  monedaId: number;
  vendedorId: number;
  cotizacionId: number;
  tasa: number;
  isCredito: boolean;
  atencion: string;
  observacion: string;
  isAnulado: boolean;
  tipoAnulacionId: number;
  almacenId: number;
  centroCostoId: number;
  centroCostoNombre: string;
  centroCostoProyectoId: number;
  centroCostoProyectoNombre: string;
  centroCostoSubProyectoId: number;
  centroCostoSubProyectoNombre: string;
  clienteId: number;
  clienteDestinatario: string;
  clienteRncCedula: string;
  clienteDireccion: string;
  bruto: number;
  descuento: number;
  neto: number;
  itbis: number;
  selectivo: number;
  otrosImpuestos: number;
  propina: number;
  total: number;
  totalTasa: number;
  pendiente: number;
  devolucionEfectivo: number;
  ncfVence: Date;
  isPagado: boolean;
  cuentaCxCId: number;
  cuentaCxC: string;
  cuentaCxCNombre: string;
  cuentaCxCPrimaId: number;
  cuentaCxCPrima: string;
  cuentaCxCPrimaNombre: string;
  cuentaCajaId: number;
  cuentaCaja: string;
  cuentaCajaNombre: string;
  cuentaCajaPrimaId: number;
  cuentaCajaPrima: string;
  cuentaCajaPrimaNombre: string;
  cuentaDescuentoId: number;
  cuentaDescuento: string;
  cuentaDescuentoNombre: string;
  cuentaItbisId: number;
  cuentaItbis: string;
  cuentaItbisNombre: string;
  cuentaPropinaId: number;
  cuentaPropina: string;
  cuentaPropinaNombre: string;
  cuentaSelectivoId: number;
  cuentaSelectivo: string;
  cuentaSelectivoNombre: string;
  cuentaOtrosImpuestosId: number;
  cuentaOtrosImpuestos: string;
  cuentaOtrosImpuestosNombre: string;
  cuentas: [
    {
      id?: number;
      notaCreditoId?: number;
      cuentaId: number;
      cuenta: string;
      cuentaNombre: string;
      centroCostoId: number;
      centroCostoNombre: string;
      centroCostoProyectoId: number;
      centroCostoProyectoNombre: string;
      centroCostoSubProyectoId: number;
      centroCostoSubProyectoNombre: string;
      debito: number;
      credito: number;
    }
  ];
  productos: [
    {
      id?: number;
      notaCreditoId?: number;
      productoId: number;
      almacenId: number;
      productoNombre: string;
      cantidad: number;
      costo: number;
      precio: number;
      bruto: number;
      descuentoPor: number;
      descuento: number;
      neto: number;
      itbis: number;
      selectivo: number;
      otrosImpuestos: number;
      propina: number;
      total: number;
      totalTasa: number;
      itbisPor: number;
      isServicio: boolean;
      eliminar: boolean;
      cuentaCostoId: number;
      cuentaCosto: string;
      cuentaCostoNombre: string;
      cuentaIngresoId: number;
      cuentaIngreso: string;
      cuentaIngresoNombre: string;
      cuentaInventarioId: number;
      cuentaInventario: string;
      cuentaInventarioNombre: string;
    }
  ];
}

export interface ICxCRecibo {
  id: number;
  codigo: number;
  companiaId: number;
  clienteId: number;
  monedaId: number;
  medioPagoId: number;
  tasa: number;
  centroCostoId: number;
  centroCostoProyectoId: number;
  centroCostoSubProyectoId: number;
  fecha: string;
  observacion: string;
  montoRecibido: number;
  montoRetItbis: number;
  montoRetIsr: number;
  total: number;
  totalTasa: number;
  totalOtraMoneda: number;
  pendiente: number;
  pendienteOtraMoneda: number;
  isPagoOtraMoneda: boolean;
  isPagado: boolean;
  isAnulado: boolean;
  monedaAplicarId: number;
  depositoId: number;
  banco: string;
  documento: string;
  tipoReferencia: string;
  clienteRncCedula: string;
  monedaNombre: string;
  medioPagoNombre: string;
  monedaAplicarNombre: string;
  depositoCodigo: number;
  centroCostoNombre: string;
  centroCostoProyectoNombre: string;
  centroCostoSubProyectoNombre: string;
}

export interface IInventarioAlmacen {
  id?: number;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
}

export interface IInventarioEntradaAlmacen {
  id: number;
  codigo: number;
  companiaId: number;
  fecha: Date;
  observacion: string;
  isAnulado: boolean;
  almacenId: number;
  total: number;
  centroCostoId: number;
  centroCostoNombre: string;
  centroCostoProyectoId: number;
  centroCostoProyectoNombre: string;
  centroCostoSubProyectoId: number;
  centroCostoSubProyectoNombre: string;
  cuentas: [
    {
      id?: number;
      notaCreditoId?: number;
      cuentaId: number;
      cuenta: string;
      cuentaNombre: string;
      centroCostoId: number;
      centroCostoNombre: string;
      centroCostoProyectoId: number;
      centroCostoProyectoNombre: string;
      centroCostoSubProyectoId: number;
      centroCostoSubProyectoNombre: string;
      debito: number;
      credito: number;
    }
  ];
  productos: [
    {
      id: number;
      salidaAlmacenId: number;
      productoId: number;
      cantidad: number;
      costo: number;
      total: number;
      almacenId: number;
      eliminar: boolean;
      cuentaCostoId: number;
      cuentaCosto: string;
      cuentaCostoNombre: string;
      cuentaInventarioId: number;
      cuentaInventario: string;
      cuentaInventarioNombre: string;
    }
  ];
}

export interface IInventarioSalidaAlmacen {
  id?: number;
  codigo?: number;
  companiaId: number;
  fecha: string;
  observacion: string;
  isAnulado: boolean;
  almacenId: number;
  almacenNombre: string;
  total: number;
  centroCostoId?: number;
  centroCostoNombre?: string;
  centroCostoProyectoId?: number;
  centroCostoProyectoNombre?: string;
  centroCostoSubProyectoId?: number;
  centroCostoSubProyectoNombre?: string;
  cuentas: ICuenta[];
  productos: IInventarioSalidaAlmacenProducto[];
  evento?: IAGlobalEvento;
}

export interface IInventarioSalidaAlmacenProducto {
  id: number;
  salidaAlmacenId: number;
  productoId: number;
  cantidad: number;
  costo: number;
  total: number;
  almacenId: number;
  productoReferencia: string;
  productoNombre: string;
  productoUnidadMedida: string;
  cuentaIngresoId: number;
  cuentaIngreso: string;
  cuentaIngresoNombre: string;
  cuentaInventarioId: number;
  cuentaInventario: string;
  cuentaInventarioNombre: string;
  cuentaCostoId: number;
  cuentaCosto: string;
  cuentaCostoNombre: string;
  eliminar?: boolean;
}

export interface IInventarioConduceAlmacen {
  id?: number;
  codigo?: number;
  companiaId: number;
  fecha: string;
  observacion: string;
  isAnulado: boolean;
  almacenId: number;
  almacenNombre: string;
  total: number;
  centroCostoId?: number;
  centroCostoNombre?: string;
  centroCostoProyectoId?: number;
  centroCostoProyectoNombre?: string;
  centroCostoSubProyectoId?: number;
  centroCostoSubProyectoNombre?: string;
  cuentas: ICuenta[];
  productos: IInventarioSalidaAlmacenProducto[];
  evento?: IAGlobalEvento;
}

export interface IInventarioConduceAlmacenProducto {
  id: number;
  conduceAlmacenId: number;
  productoId: number;
  cantidad: number;
  costo: number;
  total: number;
  almacenId: number;
  productoReferencia: string;
  productoNombre: string;
  productoUnidadMedida: string;
  cuentaIngresoId: number;
  cuentaIngreso: string;
  cuentaIngresoNombre: string;
  cuentaInventarioId: number;
  cuentaInventario: string;
  cuentaInventarioNombre: string;
  cuentaCostoId: number;
  cuentaCosto: string;
  cuentaCostoNombre: string;
  eliminar?: boolean;
}

export interface IInventarioLiquidacionAduanal {
  id?: number;
  codigo?: number;
  companiaId: number;
  monedaId: number;
  almacenId: number;
  suplidorId: number;
  centroCostoId?: number;
  centroCostoNombre?: string;
  centroCostoProyectoId?: number;
  centroCostoProyectoNombre?: string;
  centroCostoSubProyectoId?: number;
  centroCostoSubProyectoNombre?: string;
  fecha: string;
  fechaLlegada: string;
  tasa: number;
  colecturia?: string;
  acto?: number;
  planilla?: number;
  declaracion?: number;
  liquidacion?: number;
  conocimientoEmbarque?: string;
  detalle?: number;
  consolidado?: number;
  numeroBL?: string;
  manifiesto?: string;
  deposito?: number;
  documento?: string;
  regimen?: string;
  observacion: string;
  montoFOB: number;
  montoSeguro: number;
  montoFlete: number;
  montoOtros: number;
  montoCIF: number;
  montoGravamen: number;
  montoSelectivo: number;
  montoITBIS: number;
  montoGastos: number;
  montoArt52: number;
  montoMultas: number;
  montoLiquidacion: number;
  isAnulado: boolean;
  isCerrado: boolean;
  almacenNombre: string;
  suplidorNombre: string;
  monedaNombre: string;
  cuentas?: ICuenta[];
  furgones?: IInventarioLiquidacionAduanalFurgon[];
  gastos?: IInventarioLiquidacionAduanalGasto[];
  productos: IInventarioLiquidacionAduanalProducto[];
  evento?: IAGlobalEvento;
}

export interface IInventarioLiquidacionAduanalFurgon {
  id?: number;
  liquidacionId?: number;
  numero?: number;
  serial?: string;
  tipo?: string;
  cargaBultos?: number;
  pesoBruto?: number;
  eliminar?: boolean;
}

export interface IInventarioLiquidacionAduanalGasto {
  id?: number;
  liquidacionId?: number;
  tipoGastoId: number;
  monto: number;
  tipoGastoNombre: string;
  eliminar?: boolean;
}

export interface IInventarioLiquidacionAduanalProducto {
  id?: number;
  liquidacionId?: number;
  productoId: number;
  cantidad: number;
  montoFOBUnitario: number;
  montoFOB: number;
  montoSeguro: number;
  montoFlete: number;
  montoOtros: number;
  montoCIF: number;
  montoGravamen: number;
  montoSelectivo: number;
  montoITBIS: number;
  montoGastos: number;
  montoArt52: number;
  montoMultas: number;
  porcientoLiberado: number;
  costeUnitario: number;
  productoReferencia: string;
  productoNombre: string;
  productoUnidadMedida: string;
  cuentaIngresoId: number;
  cuentaIngreso: string;
  cuentaIngresoNombre: string;
  cuentaInventarioId: number;
  cuentaInventario: string;
  cuentaInventarioNombre: string;
  cuentaCostoId: number;
  cuentaCosto: string;
  cuentaCostoNombre: string;
  eliminar?: boolean;
}

export interface IInventarioTransferenciaAlmacen {
  id?: number;
  codigo?: number;
  companiaId: number;
  fecha: string;
  observacion: string;
  isAnulado: boolean;
  almacenOrigenId: number;
  almacenDestinoId: number;
  almacenOrigenNombre: string;
  almacenDestinoNombre: string;
  productos: IInventarioTransferenciaAlmacenProducto[];
  evento?: IAGlobalEvento;
}

export interface IInventarioTransferenciaAlmacenProducto {
  id?: number;
  transferenciaAlmacenId?: number;
  productoId: number;
  cantidad: number;
  almacenOrigenId?: number;
  almacenDestinoId?: number;
  almacenOrigenNombre?: string;
  almacenDestinoNombre?: string;
  productoReferencia: string;
  productoNombre: string;
  productoUnidadMedida: string;
  eliminar?: boolean;
}

export interface IInventarioLiquidacionAduanalTipoGasto {
  id?: number;
  companiaId: number;
  nombre: string;
  isInactivo: boolean;
  evento?: IAGlobalEvento;
}

export interface IModulo {
  id: number;
  nombre: string;
  icono: string;
  accesos: IModuloAcceso[];
}

export interface IModuloAcceso {
  id: number;
  moduloId: number;
  nombre: string;
  link?: string;
  icono?: string;
  orden?: number;
  moduloNombre: string;
  moduloIcono: string;
}

export interface INominaEmpleado {
  id?: number;
  companiaId?: number;
  departamentoId: number;
  cuentaCobrarId?: number;
  nombre: string;
  cedula?: string;
  pasaporte?: string;
  tipoPago: number;
  direccion?: string;
  telefono1?: string;
  telefono2?: string;
  telefono3?: string;
  telefono4?: string;
  estadoCivil?: string;
  fechaNacimiento?: string;
  fechaGraduado?: string;
  sexo?: string;
  eMail?: string;
  idiomas?: string;
  fechaEntrada: string;
  fechaSalida?: string;
  sueldoMensual: number;
  foto?: string;
  posicion?: string;
  contacto?: string;
  bancoCuenta?: string;
  bancoNombre?: string;
  isExtranjero: boolean;
  isCancelado: boolean;
  departamentoNombre: string;
  cuentaCobrarCuenta?: string;
  cuentaCobrarNombre?: string;
}

export interface INominaEmpleadoRenglonVariable {
  id?: number;
  companiaId?: number;
  fecha: string;
  empleadoId: number;
  renglonId: number;
  monto: number;
  renglonNombre: string;
  calculo: string;
  cuentaId?: number;
  cuenta?: string;
  cuentaNombre?: string;
  isAplicaAFP: boolean;
  isAplicaARS: boolean;
  isAplicaISR: boolean;
  isAplicaRiesgoLaboral: boolean;
  isAplicaInfotep: boolean;
  isAplicaRegalia: boolean;
  empleadoNombre: string;
}

export interface INominaRenglon {
  id?: number;
  companiaId?: number;
  nombre: string;
  calculo: string;
  cuentaId?: number;
  isAplicaAFP: boolean;
  isAplicaARS: boolean;
  isAplicaISR: boolean;
  isAplicaRiesgoLaboral: boolean;
  isAplicaInfotep: boolean;
  isAplicaRegalia: boolean;
  isInactivo: boolean;
  cuentaNombre?: string;
  cuenta?: string;
}

export interface IUsuario {
  id: number;
  realm?: string;
  username?: string;
  password?: string;
  email: string;
  emailVerified?: boolean;
  verificationToken?: string;
  imagen?: string;
  roleId?: number;
  roleNombre?: string;
}

export interface IUsuarioAcceso {
  id: number;
  usuarioId: number;
  accesoId: number;
  companiaId: number;
  accesoNombre: string;
  accesoLink?: string;
  accesoIcono?: string;
  accesoOrden?: number;
  moduloId: number;
  moduloNombre: string;
  moduloIcono?: string;
}

export interface IUsuarioCompania {
  id: number;
  companiaId: number;
  usuarioId: number;
  companiaNombre: string;
  companiaIcono: string;
  companiaLogo: string;
  companiaPropinaPor: number;
  companiaSelectivoPor: number;
  rnc?: string;
  telefono?: string;
  direccion?: string;
  eMail?: string;
  utilizaCentroCosto: boolean;
  cantidadUsuarios: number;
  r: number;
  g: number;
  b: number;
  a: number;
}
