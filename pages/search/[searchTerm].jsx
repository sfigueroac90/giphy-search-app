import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Footer from '/components/Footer'
import Image from "next/image"

export default function Search (initialData){
    const router = useRouter()
    const searchTerm = router.query.searchTerm;
    return(
        <>
            <Head>
                <title>Search result for: {searchTerm}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css"/>
            </Head>
            <h1>Search results for: {router.query.searchTerm}</h1>
            <p> Ir a <Link href="/">home</Link></p>

            <p> Share {' '} 
                <Link
                href="/search/[pid]"
                as={`/search/${searchTerm}`}>
                <a> 
                    {`http://localhost:3000/search/${searchTerm}`}
                </a>
                </Link>
            </p>

            <div className="giphy-search-results-grid">
                {initialData.giphys.map((each, index) => {
                    return(
                        <div key={index}>
                        <h3>{each.title}</h3>
                        <Image
                  src={each.images.original.url} 
                  alt={each.title}
                  width={300}
                  height={200}
                  objectFit="contain"
                  
                  />
                        </div>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm
  let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Zshhtm5u272pFshU03ZmVdi4d5LEScdM&limit=6`)
  giphys = await giphys.json()
  return {props: {giphys: giphys.data}}  
}