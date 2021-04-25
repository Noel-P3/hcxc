export default function MensajesError(mensajeOriginal) {
    if (mensajeOriginal.toLowerCase().indexOf("Authorization Required".toLocaleLowerCase()) !== -1) {
        localStorage.removeItem('infoUsuario');
        localStorage.removeItem('usuarioTokens');
        localStorage.removeItem('companiaSeleccionada');
        localStorage.removeItem('companiasAcceso');
        localStorage.removeItem('accesos');
        localStorage.removeItem('menu');
        localStorage.removeItem('loginState');
        window.location.reload(true);

        return 'Sesión cerrada. Debe volver a iniciar sesión.';
    }
    
    if (
        (mensajeOriginal.indexOf("Failed to fetch") !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("ConnectionError".toLocaleLowerCase()) !== -1)
    ) return 'Error de comunicación. Refresque y si el error persiste comunique el caso a info@clickteckrd.com';

    if (mensajeOriginal.indexOf("User already exists") !== -1) return 'Este nombre de usuario ya se está usando. Por favor utilice otro.';

    if (mensajeOriginal.indexOf("login failed") !== -1) return 'Email y contraseña no validos.';

    if (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaOrdenProductoProducto".toLocaleLowerCase()) !== -1) {
        return 'El producto ya existe.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("Invalid current password".toLocaleLowerCase()) !== -1) {
        return 'Contraseña actual incorrecta.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_CxCFactura_Ncf".toLocaleLowerCase()) !== -1) {
        return 'Número de comprobante fiscal ya existe.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("FK_ContabilidadCatalogo_ContabilidadTipoCuenta".toLocaleLowerCase()) !== -1) {
        return 'El tipo de cuenta indicado no es valido. Solo se admiten cuentas entre 1 - 6.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoReferencia".toLocaleLowerCase()) !== -1) {
        return 'La referencia del producto ya existe.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("FK_TallerMecanicaOrden_TallerMecanicaVehiculo".toLocaleLowerCase()) !== -1) {
        return 'El vehiculo tiene ordenes registradas. Elimine las ordenes o inactive el vehículo.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_ColegioPadreEstudiante".toLocaleLowerCase()) !== -1) {
        return 'Ya existe el estudiante indicado.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_ColegioEstudianteMatricula".toLocaleLowerCase()) !== -1) {
        return 'Ya existe la matricula indicada.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_ColegioCursoMateria".toLocaleLowerCase()) !== -1) {
        return 'Ya existe la materia indicada.'
    }

    if (
        (mensajeOriginal.toLowerCase().indexOf("IX_ContabilidadCatalogoCuenta".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioEntradaAlmacenCuenta_Cuenta".toLocaleLowerCase()) !== -1)
    ) {
        return 'Ya existe la cuenta indicada.'
    }

    if ((mensajeOriginal.toLowerCase().indexOf("FK_ContabilidadEjercicioContableCerradoCuenta_ContabilidadCatalogo".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("FK_ContabilidadEntradaDiarioManualCuenta_ContabilidadCatalogo".toLocaleLowerCase()) !== -1)) {
        return 'Esta cuenta tiene movimiento, para eliminarla debe quitar los movimientos que le afectan.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_ContabilidadEjercicioContableCerradoAnoMes".toLocaleLowerCase()) !== -1) {
        return 'El periodo contable indicado ya tiene un cierre de ejercicio contable, debe seleccionar otro periodo o eliminar el que existe para volver a generarlo.'
    }

    if (
        (mensajeOriginal.toLowerCase().indexOf("IX_ContabilidadEntradaDiarioDocumento".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioEntradaAlmacen_codigo".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaOrdenDocumento".toLocaleLowerCase()) !== -1)
    ){
        return 'Número de documento ya existe, por favor indique otro número.'
    }

    if (
        (mensajeOriginal.toLowerCase().indexOf("IX_BancoCuenta_CuentaBancaria".toLocaleLowerCase()) !== -1)
    ) {
        return 'Ya existe el documento indicado.'
    }

    if (
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoCodigoBarra_CodigoBarra".toLocaleLowerCase()) !== -1)
    ) {
        return 'Ya existe el número de cuenta.'
    }

    if (
        (mensajeOriginal.toLowerCase().indexOf("IX_BancoCuenta_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_CompaniaMoneda_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ContabilidadCentroCostoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ContabilidadCentroCostoProyectoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ContabilidadCentroCostoSubProyectoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_CxCClienteNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_CxCClienteGrupoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_CxCVendedor_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_CxPSuplidorGrupo_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_CxPSuplidor_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_CxPSuplidor_RncCedula".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaAreaNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaAreaEstadosServicioNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaOrdenTipoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaMecanico".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ColegioEstudianteNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ColegioProfesorNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ColegioPadreNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ColegioMateriaNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ColegioCursoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioGrupoProductoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoUnidadMedida_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoUnidadMedida_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoPrecio_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoGrupoNombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoTipoInventario_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioProductoSubGrupo_Nombre".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_InventarioAlmacen_Nombre".toLocaleLowerCase()) !== -1)
    ) {
        return 'Ya existe el nombre indicado.'
    }

    if (
        (mensajeOriginal.toLowerCase().indexOf("IX_CxCClienteRnc".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ColegioProfesorCedula".toLocaleLowerCase()) !== -1) ||
        (mensajeOriginal.toLowerCase().indexOf("IX_ColegioPadreCedulaRnc".toLocaleLowerCase()) !== -1)
    ) {
        return 'Ya existe el RNC / Cédula indicado.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaVehiculoPlaca".toLocaleLowerCase()) !== -1) {
        return 'Ya existe el número de placa.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_TallerMecanicaAreaEstadosServicioOrden".toLocaleLowerCase()) !== -1) {
        return 'Número de orden repetido.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_CxPFactura_Ncf".toLocaleLowerCase()) !== -1) {
        return 'El número de NCF de este suplidor ya fue registrado.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("IX_CxPFactura_Codigo".toLocaleLowerCase()) !== -1) {
        return 'El número de factura de este suplidor ya fue registrado.'
    }

    if (mensajeOriginal.toLowerCase().indexOf("UNQ1_ORDEN_TRABAJO_SERIALES".toLocaleLowerCase()) !== -1){
        return 'No es posible insertar un serial ya utilizado anteriormente en otro documento...'
    }
}