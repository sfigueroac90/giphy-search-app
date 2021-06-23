import { initial } from 'lodash'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home(intialData) {

  const [formInputs,setFormInputs] = useState({})

  useEffect(() => {
    console.log(intialData);
  }, [])

  const hanldeInputs = (event) => {
    let {name, value} = event.target
    setFormInputs({ ...formInputs,[name]:value})
  }

  const search = (event) => {
    event.preventDefault()
    console.log(formInputs.searchItem)
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>Giphy Search App</h1>

      <form 
        onChange={hanldeInputs}
        onSubmit={search}>
        <input name="searchItem" type="text"></input>
        <button>Search</button>
      </form>

      <div class="giphy-search-results-grid">
        {intialData.catGiphys.data.map((each,index) =>{
          return(
            <div key = {index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          )
          })
        }
      </div>
    </div>     
  )
}


export async function getStaticProps() {
  let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=Zshhtm5u272pFshU03ZmVdi4d5LEScdM&limit=10')
  catGiphys = await catGiphys.json()
  return { props : {catGiphys:catGiphys}}
}