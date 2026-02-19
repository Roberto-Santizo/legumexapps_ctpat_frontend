import { StyleSheet } from "@react-pdf/renderer";

const GRAY_BG = "#e2e8f0";
const BLUE_TEXT = "#1a56db";
const BLACK = "#000000";
const GRAY_LIGHT = "#f7fafc";

export const ctpatPdfStyles = StyleSheet.create({
  // ─── Page ──────────────────────────────────────────────────────────────────
  page: {
    paddingTop: 20,
    paddingBottom: 60,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 8,
    fontFamily: "Helvetica",
  },

  // ─── Fixed Header ──────────────────────────────────────────────────────────
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 6,
    marginBottom: 10,
  },
  headerLogo: {
    width: 80,
    height: 36,
    objectFit: "contain",
  },
  headerCenter: {
    flexDirection: "column",
    alignItems: "center",
  },
  headerCenterBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: 7,
    color: "#333333",
  },

  // ─── Fixed Footer ──────────────────────────────────────────────────────────
  pageFooter: {
    position: "absolute",
    bottom: 16,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 7,
    color: "#555555",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 5,
  },

  // ─── Section Title ─────────────────────────────────────────────────────────
  sectionTitle: {
    backgroundColor: GRAY_BG,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    padding: 4,
    marginBottom: 6,
    fontSize: 9,
  },

  // ─── Generic Table ─────────────────────────────────────────────────────────
  table: {
    borderWidth: 1,
    borderColor: BLACK,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BLACK,
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
  },
  tableCellLast: {
    flex: 1,
    padding: 3,
  },
  tableCellBold: {
    fontFamily: "Helvetica-Bold",
  },
  tableCellBlue: {
    color: BLUE_TEXT,
  },
  tableCellSpan2: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
  },
  tableCellSpan2Last: {
    flex: 2,
    padding: 3,
  },

  // ─── Images ────────────────────────────────────────────────────────────────
  imageGroupTitle: {
    backgroundColor: GRAY_BG,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    padding: 4,
    marginBottom: 6,
    marginTop: 8,
    fontSize: 9,
  },
  imageRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  imageWrapper: {
    width: "33%",
    paddingRight: 4,
    alignItems: "center",
  },
  imagePdf: {
    width: "100%",
    height: 110,
    objectFit: "cover",
  },
  imageCaption: {
    fontSize: 7,
    textAlign: "center",
    marginTop: 2,
    fontFamily: "Helvetica-Oblique",
  },

  // ─── Driver Table ──────────────────────────────────────────────────────────
  driverSectionTitle: {
    backgroundColor: GRAY_BG,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    padding: 4,
    marginBottom: 6,
    fontSize: 8,
  },
  driverTable: {
    borderWidth: 1,
    borderColor: BLACK,
  },
  driverRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BLACK,
  },
  driverRowLast: {
    flexDirection: "row",
  },
  driverCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
  },
  driverCellLast: {
    flex: 1,
    padding: 3,
  },
  driverCellSpan2: {
    flex: 2,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
  },
  driverCellSpan2Last: {
    flex: 2,
    padding: 3,
  },
  driverCellCenter: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
    alignItems: "center",
    textAlign: "center",
  },
  driverLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  driverValue: {
    color: BLUE_TEXT,
    fontSize: 8,
  },
  driverSubLabel: {
    fontSize: 7,
    color: "#555555",
  },
  driverLicenseImage: {
    width: 80,
    height: 55,
    objectFit: "contain",
    marginTop: 2,
  },

  // ─── Checklist ─────────────────────────────────────────────────────────────
  checklistMainHeader: {
    backgroundColor: GRAY_BG,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    padding: 4,
    marginBottom: 8,
    fontSize: 9,
  },
  checklistGroupTitle: {
    backgroundColor: GRAY_BG,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    padding: 3,
    marginTop: 8,
    marginBottom: 2,
    fontSize: 8,
  },
  checklistTable: {
    borderWidth: 1,
    borderColor: BLACK,
  },
  checklistRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BLACK,
  },
  checklistRowLast: {
    flexDirection: "row",
  },
  checklistConditionCell: {
    flex: 4,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
  },
  checklistYCell: {
    width: 18,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },
  checklistNCell: {
    width: 18,
    padding: 3,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
  },

  // ─── Observations ──────────────────────────────────────────────────────────
  obsTable: {
    borderWidth: 1,
    borderColor: BLACK,
    marginTop: 4,
  },
  obsRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: BLACK,
  },
  obsRowLast: {
    flexDirection: "row",
  },
  obsConditionCell: {
    flex: 3,
    borderRightWidth: 1,
    borderRightColor: BLACK,
    padding: 3,
    fontFamily: "Helvetica-Bold",
  },
  obsDataCell: {
    flex: 2,
    padding: 3,
    color: BLUE_TEXT,
  },

  // ─── Final Signatures ──────────────────────────────────────────────────────
  signaturesTitle: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 9,
  },
  signaturesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  signatureBox: {
    width: "45%",
    alignItems: "center",
  },
  signatureImg: {
    width: "100%",
    height: 70,
    objectFit: "contain",
    backgroundColor: GRAY_LIGHT,
  },
  signatureLabel: {
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginTop: 6,
    fontSize: 8,
  },
  signatureEmpty: {
    width: "100%",
    height: 70,
    backgroundColor: GRAY_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 7,
    color: "#888888",
    borderWidth: 1,
    borderColor: "#cccccc",
  },
});
