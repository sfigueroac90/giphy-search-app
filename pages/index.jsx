import { initial } from 'lodash'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Footer from '/components/Footer'

export default function Home(intialData) {

  const [formInputs,setFormInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState('cats')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setSearchResults(intialData.catGiphys.data)
  }, [intialData])

  const hanldeInputs = (event) => {
    let {name, value} = event.target
    setFormInputs({ ...formInputs,[name]:value})
  }

  const search = async (event) => {
    event.preventDefault()
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchItem}&api_key=Zshhtm5u272pFshU03ZmVdi4d5LEScdM&limit=6`)
    giphys = await giphys.json()
    console.log(giphys)
    setSearchResults(giphys.data)
    setSearchTerm(formInputs.searchItem)

  }

 

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
        <meta name="description" content={intialData.catGiphys.data.map((each,index)=> each.title + ' ')}></meta>
      </Head>

      <h1>Giphy Search App</h1>

      <div className="logo-container">
        <Image
            src="/assets/images/logo-explora.png"
            alt="logo"
            objectFit="contain"
            width={200}
            height={200}
        />
      </div>

      <form 
        onChange={hanldeInputs}
        onSubmit={search}>
        <input name="searchItem" type="text"></input>
        <button type="submit">Search</button>
      </form>

      <h1>Search Results for: {searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {searchResults.map((each,index) =>{
          return(
            <div className="card" key = {index}>
              <h3>{each.title}</h3>

              <div className="img-container">
                <Image
                  src={each.images.original.url} 
                  alt={each.title}
                  width={300}
                  height={200}
                  objectFit="contain"
                  
                  />

              </div>


            </div>
          )
          })
        }
      </div>
      <Footer />
    </div>     
  )
}


export async function getStaticProps() {
  let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=Zshhtm5u272pFshU03ZmVdi4d5LEScdM&limit=10')
  catGiphys = await catGiphys.json()
  return { props : {catGiphys:catGiphys}}
}