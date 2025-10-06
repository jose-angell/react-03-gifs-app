import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter';
import { getGifsByQuery } from "./get-gifs-by-query.action";
// import { Gif } from '../interfaces/gif.interface';
// import { gifsMock } from '../../../tests/mocks/gifs.data';

import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from '../../../tests/mocks/giply.response.data';

describe('getGifsByQuery',  () => {
    let mock = new AxiosMockAdapter(giphyApi);
    beforeEach(() => {
        // mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    });
    // test('should return a list of gifs', async () => {
    //     const gifs = await getGifsByQuery('One Punch');
    //     const [gif1] = gifs;
    //     //console.log(gifs);
    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //     })
    // })
    test('should retutrn a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock)
        const gifs = await getGifsByQuery('goku');
        expect(gifs.length).toBe(10);
        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        })
    });

    test('should retutrn an empty list of gifs if query is empty', async () => {
        //.onGet('/search').reply(200, giphySearchResponseMock)
        mock.restore();
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);
        
    });
    test('should handle error when the API returns an error', async () => {
        const consolErrorSpy =  vi.spyOn(console, 'error').mockImplementation(() => {
            // do nothing
        });
        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request',
            }
        });
        const gifs = await getGifsByQuery('goku');
        expect(gifs.length).toBe(0);
        expect(consolErrorSpy).toHaveBeenCalled();
        expect(consolErrorSpy).toHaveBeenCalledTimes(1);
        expect(consolErrorSpy).toHaveBeenCalledWith(expect.anything());
    })
})