import React, { useState } from 'react';

export default function AddUserForm() {
const [showForm, setShowForm] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [groupes, setGroupes] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [tel, setTel] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code here to submit the form data to the server
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label  htmlFor="prenom">Prénom:
        <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} /></label>
        
      </div>
      <div>
        <label htmlFor="nom">Nom:
        <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} /></label>
       
      </div>
      <div>
        <label htmlFor="email">Email:
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        
      </div>
      <div>
        <label htmlFor="groupes">Groupes:
        <input type="text" id="groupes" value={groupes} onChange={(e) => setGroupes(e.target.value)} /></label>
        
      </div>
      <div>
        <label htmlFor="adresse">Adresse:
        <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} /></label>
        
      </div>
      <div>
        <label htmlFor="ville">Ville:
        <input type="text" id="ville" value={ville} onChange={(e) => setVille(e.target.value)} /></label>
        
      </div>
      <div>
        <label htmlFor="pays">Pays:
        <input type="text" id="pays" value={pays} onChange={(e) => setPays(e.target.value)} /></label>
        
      </div>
      <div>
        <label htmlFor="codePostal">Code Postal:
        <input type="text" id="codePostal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} /></label>
       
      </div>
      <div>
        <label htmlFor="tel">Téléphone:
        <input type="tel" id="tel" value={tel} onChange={(e) => setTel(e.target.value)} /></label>
        
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
}

