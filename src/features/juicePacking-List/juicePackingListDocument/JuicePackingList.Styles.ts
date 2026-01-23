import { StyleSheet } from "@react-pdf/renderer";

export const packingListTableStyles = StyleSheet.create({
  /* ===============================================================
     PAGE & GENERAL - Márgenes seguros para impresión
  ================================================================ */
  page: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 30,
    fontSize: 8,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  /* ===============================================================
     COMPANY HEADER SECTION
  ================================================================ */
  companyHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#2c5282",
  },

  companyInfo: {
    flexDirection: "column",
    width: "65%",
  },

  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: "#1a365d",
  },

  companyAddress: {
    fontSize: 8,
    marginBottom: 2,
    color: "#4a5568",
  },

  companyPhone: {
    fontSize: 8,
    color: "#4a5568",
  },

  logoContainer: {
    width: "25%",
    height: 55,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  logo: {
    width: 90,
    height: 50,
    objectFit: "contain",
  },

  /* ===============================================================
     TITLE
  ================================================================ */
  titleContainer: {
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 6,
    backgroundColor: "#2c5282",
    borderRadius: 3,
  },

  title: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#FFFFFF",
    letterSpacing: 2,
  },

  /* ===============================================================
     CONTAINER INFO HEADER - 4 COLUMNAS
  ================================================================ */
  containerInfoSection: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#cbd5e0",
    borderRadius: 3,
    overflow: "hidden",
  },

  containerInfoRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e0",
    minHeight: 18,
  },

  containerInfoRowLast: {
    flexDirection: "row",
    minHeight: 18,
  },

  // Celda de etiqueta izquierda (25%)
  infoLabelCellLeft: {
    width: "25%",
    backgroundColor: "#f7fafc",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: "#cbd5e0",
    justifyContent: "center",
  },

  // Celda de valor izquierda (25%)
  infoValueCellLeft: {
    width: "25%",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: "#cbd5e0",
    justifyContent: "center",
  },

  // Celda de etiqueta derecha (25%)
  infoLabelCellRight: {
    width: "25%",
    backgroundColor: "#f7fafc",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: "#cbd5e0",
    justifyContent: "center",
  },

  // Celda de valor derecha (25%) - sin borde derecho
  infoValueCellRight: {
    width: "25%",
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: "center",
  },

  infoLabelText: {
    fontSize: 6.5,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    color: "#2d3748",
  },

  infoValueText: {
    fontSize: 6.5,
    color: "#1a202c",
  },

  /* ===============================================================
     TABLE STRUCTURE
  ================================================================ */
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2c5282",
    borderRadius: 3,
    overflow: "hidden",
  },

  /* ===============================================================
     TABLE HEADER
  ================================================================ */
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#2c5282",
    minHeight: 26,
  },

  // Celda de encabezado con sub-header "PESO"
  pesoHeaderContainer: {
    flexDirection: "column",
    width: "14%",
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
  },

  pesoHeaderTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    paddingVertical: 2,
  },

  pesoSubHeaders: {
    flexDirection: "row",
    flex: 1,
  },

  pesoSubHeaderCell: {
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: "#FFFFFF",
    paddingVertical: 2,
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
    justifyContent: "center",
  },

  pesoSubHeaderCellLast: {
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: "#FFFFFF",
    paddingVertical: 2,
    justifyContent: "center",
  },

  /* ===============================================================
     TABLE HEADER CELLS
  ================================================================ */
  headerCell: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: "#FFFFFF",
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
    justifyContent: "center",
  },

  headerCellNoBorder: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: "#FFFFFF",
    paddingVertical: 3,
    paddingHorizontal: 2,
    justifyContent: "center",
  },

  /* ===============================================================
     COLUMN WIDTHS - Distribución equilibrada para formato vertical
  ================================================================ */
  colFecha: {
    width: "7%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colProducto: {
    width: "22%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colTicket: {
    width: "6%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colCodigo: {
    width: "9%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colTotalCajas: {
    width: "7%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colPesoBruto: {
    width: "7%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colPesoNeto: {
    width: "7%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colCantidadBotellas: {
    width: "8%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colTipoEmpaque: {
    width: "10%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colTemp: {
    width: "6%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
    fontSize: 5.5,
  },

  colBestBy: {
    width: "11%",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 1,
    fontSize: 5.5,
  },

  /* ===============================================================
     TABLE DATA ROWS
  ================================================================ */
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    minHeight: 16,
    alignItems: "center",
    backgroundColor: "#f7fafc",
  },

  /* ===============================================================
     GROUP HEADER (WALMART, etc.)
  ================================================================ */
  groupHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2c5282",
    backgroundColor: "#edf2f7",
    minHeight: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  groupHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    width: "100%",
    paddingVertical: 4,
    color: "#2c5282",
    letterSpacing: 1,
  },

  /* ===============================================================
     TOTAL ROW (per group)
  ================================================================ */
  totalRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#2c5282",
    backgroundColor: "#e2e8f0",
    minHeight: 18,
    alignItems: "center",
    marginBottom: 8,
  },

  totalLabelCell: {
    textAlign: "right",
    paddingRight: 8,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: "#2d3748",
    borderRightWidth: 1,
    borderRightColor: "#cbd5e0",
    paddingVertical: 4,
  },

  totalValueCell: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: "#2d3748",
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderRightColor: "#cbd5e0",
  },

  totalValueCellNoBorder: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: "#2d3748",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },

  emptyCell: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderRightColor: "#cbd5e0",
  },

  emptyCellNoBorder: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },

  /* ===============================================================
     SUMA TOTAL ROW (grand total)
  ================================================================ */
  sumaTotalRow: {
    flexDirection: "row",
    backgroundColor: "#2c5282",
    minHeight: 22,
    alignItems: "center",
  },

  sumaTotalLabelCell: {
    textAlign: "right",
    paddingRight: 8,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    color: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
    paddingVertical: 5,
  },

  sumaTotalValueCell: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
  },

  sumaTotalValueCellNoBorder: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
});