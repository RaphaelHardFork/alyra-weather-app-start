import React from "react"
import { useState, useEffect } from "react"

// Importation components
import Icon from './Icon'
import Description from './Description'
import Temperature from './Temperature'
import Humidity from './Humidity'
import Wind from './Wind'

const WeatherApp = ({ city }) => {
  // variables d'état
  const [conditions, setConditions] = useState({})
  const [description, setDescription] = useState("")
  const [iconID, setIconID] = useState("")
  const [location, setLocation] = useState("")


  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric&lang=fr`
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Météo untrouvable")
        }
        return response.json()
      })
      .then((data) => {
        setLocation(`${data.name}, ${data.sys.country}`)
        setConditions({
          feelsLike: Math.round(data.main.feels_like),
          mainTemp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          wind: data.wind[0] //Ne marche pas
        })
        setDescription(data.weather[0].description)
        setIconID(data.weather[0].icon)
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [city])
  let { feelsLike, mainTemp, humidity, wind } = conditions
  return (
    <>
      {!!location && (
        <section className="text-center">
          <Icon iconID={iconID} />
          <h2 className="mb-4">Conditions météo à {location}</h2>
          <Description description={description} />
          <Temperature mainTemp={mainTemp} feelsLike={feelsLike} />
          <Humidity humidity={humidity} />
          <Wind wind={wind} /> {/*Ne marche pas*/}
        </section>
      )}
    </>
  )
}

export default WeatherApp
