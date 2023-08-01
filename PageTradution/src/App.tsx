import { useEffect} from 'react'
import {useTranslation} from 'react-i18next'

const languageOption = [
  {
    name:"Angola",
    value:"pt",
  },
  {
    name:"Tanzania",
    value:"en",
  },
  {
    name:"França",
    value:"fr",
  }
]

function App() {

  const {t,i18n} = useTranslation()


  useEffect(() => {
    
     const coutry = languageOption.filter(App=>App.name=="Tanzania")

     console.log(coutry)

    coutry[0]   ? i18n.changeLanguage(coutry[0].value) : i18n.changeLanguage("pt")
  },[])

  return (
    <div >
      <header className="">
        <h1>{t("welcome")}</h1>
        <h2>{t("whereYouCan")}</h2>
      </header>
    </div>
  )
}

export default App
