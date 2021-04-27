const Temperature = ({ mainTemp, feelsLike }) => {
  return <p>
    <b>Température : </b>{mainTemp}&deg;C - (ressentie {feelsLike}&deg;C)
  </p>
}

export default Temperature
