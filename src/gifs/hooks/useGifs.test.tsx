import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest"
import { useGifs } from "./useGifs";
import { act } from "react";
import * as gifActions from "../actions/get-gifs-by-query.action";



describe('useGifs', () => {
    test('should return default values and methods', () => {
         const {result} = renderHook(() => useGifs());
         expect(result.current.gifsList.length).toBe(0);
         expect(result.current.previousTerms.length).toBe(0);
         expect(result.current.handleSearch).toBeDefined();
         expect(result.current.handleTermClicked).toBeDefined();
    });
    test('should return a list of gifs', async () => {
        const {result} = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('goku');
        })
        expect(result.current.gifsList.length).toBe(10);
    });
    test('should return a list of gifs when handleTermClicked is called', async() => {
        const {result} = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleTermClicked('goku');
        });
        expect(result.current.gifsList.length).toBe(10);
    });
    test('should return a list of gifs from cache', async() => {
        const {result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('goku');
        });
        expect(result.current.gifsList.length).toBe(10);
        vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(new Error('This is a custom error'));
        await act(async () => {
            await result.current.handleSearch('goku');
        });
        expect(result.current.gifsList.length).toBe(10);
    });
    test('should not return more than 8 previous terms', async () => {
        const {result} = renderHook(() => useGifs());
         vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);
        await  act( async () => {
            await result.current.handleSearch('goku1');
        });
        await  act( async () => {
            await result.current.handleSearch('goku2');
        });
        await  act( async () => {
            await result.current.handleSearch('goku3');
        });
        await  act( async () => {
            await result.current.handleSearch('goku4');
        });
        await  act( async () => {
            await result.current.handleSearch('goku5');
        });
        await  act( async () => {
            await result.current.handleSearch('goku6');
        });
        await  act( async () => {
            await result.current.handleSearch('goku7');
        });
        await  act( async () => {
            await result.current.handleSearch('goku8');
        });
        await  act( async () => {
            await result.current.handleSearch('goku9');
        });
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual(
            [
            'goku9', 'goku8',
            'goku7', 'goku6',
            'goku5', 'goku4',
            'goku3', 'goku2'
            ]);
    });
})