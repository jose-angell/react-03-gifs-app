import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";



describe('SearchBar', () => {
    test('should render searchbarr correctly', () => {
        const {container} = render(<SearchBar onQuery={() => {}}/>);
        expect(container).toMatchSnapshot();
    });
    test('should call onQuery with the corrct value after 700ms', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'test'}});
        //await new Promise(resolve => setTimeout(resolve, 750));
        await waitFor(() => { // tiene el mismo efecto que el timeout
    
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');

        });

    });
    test('should call only once whith the last value (debounce)',async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 't'}});
        fireEvent.change(input, {target: {value: 'te'}});
        fireEvent.change(input, {target: {value: 'tes'}});
        fireEvent.change(input, {target: {value: 'test'}});
        await waitFor(() => { 
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test');
        });
    });
    test('should call onQuery when button clicked with the input value', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'test'}});
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');

    });
    test('should the input has the correct placeholder value', () => {
        const value = 'Buscar gifs';
        render(<SearchBar placeholder={value} onQuery={() => {}}/>);
        expect(screen.getByPlaceholderText(value)).toBeDefined();
    })
})