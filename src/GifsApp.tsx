import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"


export const GifsApp = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifsList, setGifsList] = useState<Gif[]>([]);
    const handleTermClicked = (term: string) => {
        console.log({term})

    };
    const handleSearch = async (query: string = '') => {
      const term = query.trim().toLowerCase();
      if(term.length === 0) return;
      if(previousTerms.includes(term)) return;
      setPreviousTerms((prev) => {
        const newTerms = [term, ...prev];
        return newTerms.slice(0,6)
      });
      const gifs = await getGifsByQuery(term);
      setGifsList(gifs);
    }
  return (
    <>
    {/* Header */}
    <CustomHeader title="Buscador de Gifs"  description="Descubre y comparte el Gif perfecto"/>
    {/* Search */}
    <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch}/>
    {/* Busquedas previas */}
    <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked}/>
    {/* Gisf */}
    <GifList gifs={gifsList} />
    </>
  )
}
