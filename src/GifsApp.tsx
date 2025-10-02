import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"


export const GifsApp = () => {
  return (
    <>
    {/* Header */}
    <CustomHeader title="Buscador de Gifs"  description="Descubre y comparte el Gif perfecto"/>
    {/* Search */}
    <SearchBar placeholder="Busca lo que quieras"/>
    {/* Busquedas previas */}
    <PreviousSearches searches={['Goku', 'Dragon Ball Z', 'Naruto']} />
    {/* Gisf */}
    <GifList gifs={mockGifs} />
    </>
  )
}
