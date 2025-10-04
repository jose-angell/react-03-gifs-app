import { useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";



export const useGifs = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifsList, setGifsList] = useState<Gif[]>([]);
    const handleTermClicked = async (term: string) => {
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
    }
  return {
    gifsList,
    previousTerms,
    handleTermClicked,
    handleSearch,
  }
}
