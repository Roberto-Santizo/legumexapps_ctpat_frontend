// packingList.styles.ts
import { StyleSheet } from '@react-pdf/renderer';

const BORDER_COLOR = '#000000';
const BORDER_WIDTH = 1;

export const packingListDocumentSyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
  },

  // ===============================
  // Encabezado (Header Grid)
  // ===============================
  headerGrid: {
    flexDirection: 'row',
    marginBottom: 5,
    // El contenedor tiene el borde exterior completo
    borderWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
  },

  logoCell: {
    width: '30%',
    borderRightWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 5,
    height: 50,
  },

  formatCell: {
    width: '40%',
    borderRightWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },

  annexCell: {
    width: '60%',
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  
  // Fila interna del header (Packing List / Version)
  headerSubRow: {
    flexDirection: 'row',
    height: 25,
    borderTopWidth: BORDER_WIDTH, // Solo borde arriba para separar de la fila anterior
    borderColor: BORDER_COLOR,
  },

  packingListCell: {
    width: '40%',
    borderRightWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  versionCell: {
    width: '60%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },

  // ===============================
  // Tabla datos generales
  // ===============================
  // Contenedor general para los datos
  generalDataContainer: {
    borderTopWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    marginBottom: 10,
  },
  dataRow: {
    flexDirection: 'row',
  },

dataCellLabel: {
    width: '13%', // Etiqueta
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  dataCellValue: {
    width: '17%', // Valor
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
  },


dataCellLabelWide: {
    width: '10%', // Etiqueta más angosta
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },

dataCellValueWide: {
    width: '30%', 
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
  },

dataCellProduct: {
    width: '30%', // Igual que ValueWide
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
  },

dataCellNoBorder: {
    width: '17%', 
    padding: 3,
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
  },

  // ===============================
  // Tabla principal (Productos)
  // ===============================
  table: {
    width: '100%',
    marginTop: 10,
    // ESTRATEGIA GRID: La tabla pone borde ARRIBA e IZQUIERDA
    borderTopWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
  },
  tableRow: {
    flexDirection: 'row',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
  },

  // CELDAS DE TABLA
  // TODAS las columnas deben tener borderRight y borderBottom
  // NINGUNA debe tener borderTop o borderLeft (ya lo pone la tabla o la celda anterior)

  colFecha: {
    width: '11%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    textAlign: 'center',
  },

  colProducto: {
    width: '15%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
  },

  colSmall: {
    width: '10%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    textAlign: 'center',
  },

  colMedium: {
    width: '10%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    textAlign: 'right',
  },
  
  colPresentacion: {
    width: '12%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  colTemp: {
    width: '7%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    textAlign: 'center',
  },

  // Totals
  colTotalLabel: {
    width: '56%',
    padding: 3,
    textAlign: 'right',
    fontWeight: 'bold',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH, // Importante para cerrar la tabla abajo
    borderColor: BORDER_COLOR,
  },

  colTotalLabelWithPoGrn: {
    width: '56%', // Ajustar según tus columnas extra
    padding: 3,
    textAlign: 'right',
    fontWeight: 'bold',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
  },
});