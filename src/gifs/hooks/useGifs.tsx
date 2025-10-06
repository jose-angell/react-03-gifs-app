import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";


//const gifsCache: Record<string,Gif[]> = {};

export const useGifs = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifsList, setGifsList] = useState<Gif[]>([]);
    const gifsCache = useRef<Record<string,Gif[]>>({});  
    const handleTermClicked = async (term: string) => {
       if(gifsCache.current[term]){
        setGifsList(gifsCache.current[term]);
        return;
       }
       const gifs = await getGifsByQuery(term);
       setGifsList(gifs);
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

      gifsCache.current[term] = gifs;
    }
  return {
    gifsList,
    previousTerms,
    handleTermClicked,
    handleSearch,
  }
}
