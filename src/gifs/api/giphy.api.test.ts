import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";


describe('giphyApi', () => {
    test('should be configured correctly',() => {
        const params = giphyApi.defaults.params;
        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(params.lang).toBe('es');
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);
        // toBe para evaluar tipos primitivos
        // toEqual para evaluar objetos o arrays
        // toStrictEqual para evaluar objetos o arrays y que no tengan propiedades adicionales
        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
        })
    })
})