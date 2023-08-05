
import { Outlet } from "react-router-dom";
import React from 'react';
import { AppBar, Container } from '@mui/material';
import Header from './Header'; // Remplacez './Header' par le chemin vers votre composant Header
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const styles = {
  appBar: {
    display: 'flex',
    justifyContent: 'flex-start', // Aligner l'AppBar à gauche
    alignItems: 'center', // Aligner les éléments verticalement au centre
    height: '64px', // Réglez la hauteur souhaitée pour l'AppBar
    backgroundColor: '#1074BD', // Couleur de fond de l'AppBar
    paddingLeft: '24px', // Espacement à gauche pour le contenu de l'AppBar
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Prend toute la hauteur de l'écran
  },
  content: {
    flexGrow: 1, // Le contenu prend toute la hauteur disponible (remplit l'espace entre l'en-tête et le pied de page)
  },
};

const Layout = () => {
  return (
    <div style={styles.layout}>
      <AppBar position='static' style={styles.appBar}>
        <Container maxWidth="xl">
          <Header />
        </Container>
      </AppBar>
      <div style={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
