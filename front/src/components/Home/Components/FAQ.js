import React from 'react';
import Collapsable from './faq/Collapsable';

const FAQ = () => {
  return (
    <>
      <div className="faq-container">
        <div className="faq-wrapper">
          <p className="home-title" style={{ textAlign: 'center' }}>
            FAQ
          </p>
          <p className="home-subtitle">Συχνές ερωτήσεις</p>
        </div>
        <div className="faq-wrapper">
          <Collapsable
            title="Για πόσο καιρό είναι αυτό το online course?"
            content="Για πάντα! Εφόσον το αγοράσεις θα έχεις πρόσβαση για πάντα και στο course και στο Facebook Group."
          />
          <Collapsable
            title="Τι είναι το Pre-Vulture;"
            content="Το Pre-Vulture θα σου μάθει πως να φτάσεις στο 10/10 χαρούμενος, πως να φτάσεις στην νοητική αφθονία χωρίς να κυνηγάς τα αποτελέσματα και να είσαι θύμα των καταστάσεων. Να γίνεις κυρίαρχος του εαυτού σου και να αγαπήσεις τον εαυτό σου όπως ακριβώς είναι"
          />
          <Collapsable title="Τι είναι το The Vulture;" content="Coming soon..." />
          <Collapsable
            title="Αν αγοράσω ένα πλάνο τώρα, μπορώ να κάνω αναβάθμιση αργότερα;"
            content="Φυσικά! Η τιμή θα αφαιρεθεί από αυτά που έχεις επενδύσει ήδη σε οποιοδήποτε παραπάνω πλάνο."
          />
          <Collapsable
            title="Τι γίνεται αν δεν δουλέψει;"
            content="Δεν είναι quick fix! ΠΡΕΠΕΙ να λάβεις μαζική δράση. Δεν είναι ένα πρόγραμμα που θα σου προσφέρει πληροφορίες αλλά θα σου δώσει ένα πλάνο για δράση καταλαβαίνοντας βασικά concepts."
          />
          <Collapsable
            title="Αν δεν είναι τελικά για εμένα μπορώ να ζητήσω τα χρήματά μου πίσω;"
            content="Ναι, αν δεν μείνεις ευχαριστημένος από το πρόγραμμα, θα πάρεις τα χρήματά σου πίσω και θα κρατήσεις το course που έχεις επιλέξει."
          />
        </div>
      </div>
    </>
  );
};

export default FAQ;
