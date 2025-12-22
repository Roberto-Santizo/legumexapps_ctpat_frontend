// packingList.styles.ts
import { StyleSheet } from '@react-pdf/renderer';

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
  // Encabezado
  // ===============================
  headerGrid: {
    border: '1px solid black',
    flexDirection: 'row',
    marginBottom: 5,
  },
  logoCell: {
    width: '30%',
    borderRight: '1px solid black',
    padding: 5,
    height: 50,
  },
  formatCell: {
    width: '40%',
    borderRight: '1px solid black',
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  annexCell: {
    width: '60%',
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  packingListCell: {
    width: '40%',
    borderRight: '1px solid black',
    padding: 5,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  versionCell: {
    width: '60%',
    padding: 5,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },

  // ===============================
  // Tabla datos generales
  // ===============================
  dataRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
  },
  dataCellLabel: {
    width: '15%',
    borderRight: '1px solid black',
    padding: 3,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  dataCellValue: {
    width: '15%',
    borderRight: '1px solid black',
    padding: 3,
  },
  dataCellLabelWide: {
    width: '10%',
    borderRight: '1px solid black',
    padding: 3,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  dataCellValueWide: {
    width: '25%',
    borderRight: '1px solid black',
    padding: 3,
  },
  dataCellProduct: {
    width: '30%',
    borderRight: '1px solid black',
    padding: 3,
  },
  dataCellNoBorder: {
    width: '15%',
    padding: 3,
  },

  // ===============================
  // Tabla principal
  // ===============================
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
  },

  // Columnas
  colFecha: {
    width: '11%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colProducto: {
    width: '15%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
  },
  colSmall: {
    width: '10%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colMedium: {
    width: '10%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    textAlign: 'right',
  },
  colPresentacion: {
    width: '12%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colTemp: {
    width: '7%',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    textAlign: 'center',
  },

  // Totals
  colTotalLabel: {
    width: '56%',
    padding: 3,
    textAlign: 'right',
    fontWeight: 'bold',
    borderRightWidth: 1,
  },
  // Totals with PO / GRN
  colTotalLabelWithPoGrn: {
    width: '56%',
    padding: 3,
    textAlign: 'right',
    fontWeight: 'bold',
    borderRightWidth: 1,
  },
});
