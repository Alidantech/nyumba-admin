import { SxProps, Theme } from "@mui/material/styles";

interface GlobalStyles {
  evolvingCommunityCard: SxProps<Theme> | undefined;
  partnersSection: SxProps<Theme> | undefined;
  footerTop: SxProps<Theme> | undefined;
  footerBottom: SxProps<Theme> | undefined;
  appBar: SxProps<Theme>;
  navLinks: SxProps<Theme>;
  mainContainer: SxProps<Theme>;
  card: SxProps<Theme>;
  cardContainer: SxProps<Theme>;
  defiCard: SxProps<Theme>;
  defiCardImage: SxProps<Theme>;
  defiCardTitle: SxProps<Theme>;
  defiCardDescription: SxProps<Theme>;
  defiCardButton: SxProps<Theme>;
  evolvingCommunitySection: SxProps<Theme>;
  partnerCard: SxProps<Theme>;
  footer: SxProps<Theme>;
}

export const globalStyles: GlobalStyles = {
  appBar: {
    padding: "10 20px",
    background: "none",
    backgroundColor: "fffffff0",
    backdropFilter: "blur(10px)",
    boxShadow: "1px 1px 1px rgba(0,0,0,0.1)",
    // borderBottom: "1px solid #33333310",
  },
  navLinks: {
    display: {
      xs: "none",
      md: "flex",
    },
    justifyContent: "space-between",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "18px",

  },
  mainContainer: {
    padding: "40px 20px",
    textAlign: "center",
    maxWidth: "xl",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "none",
    border: "1px solid",
    borderColor: "primary.main",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "40px",
    minHeight: "400px",
    alignItems: "center",
  },
  defiCard: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    color: "#FFFFFF",
    width: "300px",
    textAlign: "left",
  },
  defiCardImage: {
    width: "100%",
    borderRadius: "10px",
  },
  defiCardTitle: {
    marginTop: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  defiCardDescription: {
    marginBottom: "20px",
  },
  defiCardButton: {
    textAlign: "center",
  },
  evolvingCommunitySection: {
    color: "#FFFFFF",
    padding: "40px 20px",
    textAlign: "center",
  },
  evolvingCommunityCard: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    color: "#FFFFFF",
    width: "200px",
    margin: "20px",
    textAlign: "left",
  },
  partnersSection: {
    color: "#FFFFFF",
    padding: "40px 20px",
    textAlign: "center",
  },
  partnerCard: {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
    width: "200px",
    margin: "20px",
    textAlign: "left",
  },
  footer: {
    padding: "20px",
    textAlign: "center",
  },
  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",
  },
  footerBottom: {
    borderTop: "1px solid #333",
    padding: "10px 0",
  },
};
