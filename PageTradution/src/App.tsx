import { useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import Header from './components/header'
import Footer from './components/footer'
import Banner from './components/banner'
import { languageOption } from './utils/languageOptions'


function App() {

  const {i18n} = useTranslation()
  const [country, setCountry] = useState(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {

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
  },[]);


  useEffect(() => {
    
     const currentCountry = languageOption.filter(App=>App.name==country ?  country : "Tanzania")

     console.log(currentCountry, country)

     currentCountry[0]   ? i18n.changeLanguage(currentCountry[0].value) : i18n.changeLanguage("en")
  },[])

  return (
    <main >
        <Header/>
        <Banner/>
        <Footer/>
   
    </main>
  )
}

export default App
