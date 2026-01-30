// packingList.styles.ts
import { StyleSheet } from '@react-pdf/renderer';

const BORDER_COLOR = '#cbd5e0';
const BORDER_WIDTH = 1;
const PRIMARY_COLOR = '#2c5282';
const HEADER_BG = '#2c5282';
const HEADER_TEXT = '#FFFFFF';
const LABEL_BG = '#f7fafc';
const LABEL_TEXT = '#2d3748';
// const ALT_ROW_BG = '#f7fafc';

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
    borderWidth: BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
  },

  logoCell: {
    width: '30%',
    borderRightWidth: BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
    padding: 5,
    height: 50,
  },

  formatCell: {
    width: '40%',
    borderRightWidth: BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
    padding: 5,
    backgroundColor: LABEL_BG,
    color: LABEL_TEXT,
  },

  annexCell: {
    width: '60%',
    padding: 5,
    backgroundColor: LABEL_BG,
    color: LABEL_TEXT,
  },
  
  // Fila interna del header (Packing List / Version)
  headerSubRow: {
    flexDirection: 'row',
    height: 25,
    borderTopWidth: BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
  },

  packingListCell: {
    width: '40%',
    borderRightWidth: BORDER_WIDTH,
    borderColor: HEADER_TEXT,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: HEADER_BG,
    color: HEADER_TEXT,
  },
  versionCell: {
    width: '60%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: HEADER_BG,
    color: HEADER_TEXT,
  },

  // ===============================
  // Tabla datos generales
  // ===============================
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
    width: '13%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    backgroundColor: LABEL_BG,
    fontWeight: 'bold',
    color: LABEL_TEXT,
  },

  dataCellValue: {
    width: '17%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
  },

  dataCellLabelWide: {
    width: '10%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    backgroundColor: LABEL_BG,
    fontWeight: 'bold',
    color: LABEL_TEXT,
  },

  dataCellValueWide: {
    width: '30%', 
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
  },

  dataCellProduct: {
    width: '30%',
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
    borderTopWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
  },

  tableRow: {
    flexDirection: 'row',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: HEADER_BG,
    color: HEADER_TEXT,
  },

  // CELDAS DE TABLA

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
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    backgroundColor: '#e2e8f0',
    color: LABEL_TEXT,
  },

  colTotalLabelWithPoGrn: {
    width: '56%',
    padding: 3,
    textAlign: 'right',
    fontWeight: 'bold',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    backgroundColor: '#e2e8f0',
    color: LABEL_TEXT,
  },

  // ===============================
  // Tabla de Totales (Resumen por Producto)
  // ===============================

  totalsSection: {
    marginTop: 14,
  },

  totalsTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: PRIMARY_COLOR,
  },

  totalsTable: {
    width: '100%',
    borderTopWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderColor: PRIMARY_COLOR,
  },

  totalsHeaderRow: {
    flexDirection: 'row',
    backgroundColor: HEADER_BG,
    color: HEADER_TEXT,
  },

  totalsRow: {
    flexDirection: 'row',
  },

  totalsColProduct: {
    width: '40%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
  },

  totalsColSmall: {
    width: '20%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    textAlign: 'center',
  },

  totalsColMedium: {
    width: '20%',
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BORDER_COLOR,
    padding: 3,
    textAlign: 'right',
  },
});