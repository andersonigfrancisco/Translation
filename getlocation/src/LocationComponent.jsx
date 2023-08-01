import  { useState, useEffect } from 'react';

export const LocationComponent = () => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {

            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
            const response = await fetch(url);
            const data = await response.json();
            setCountry(data.address.country);
          } catch (error) {
            setError('Erro ao obter a localização do usuário');
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocalização não suportada pelo navegador');
    }
  },);

  return (
    <div>
      {latitude && longitude ? (
        <div>
          Latitude: {latitude}<br />
          Longitude: {longitude}<br />
          País: {country}
        </div>
      ) : (
        <div>{error || 'Obtendo localização...'}</div>
      )}
    </div>
  );
};
