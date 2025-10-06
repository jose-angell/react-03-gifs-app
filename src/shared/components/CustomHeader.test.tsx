import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";


describe('CustomHeader', () => {
    const title = 'Test Title';
    test('should render the litle correctly', () => {
        render(<CustomHeader title={title} />);
        expect(screen.getByText(title)).toBeDefined();
        expect(screen.getByText(title)).not.toBeNull();
    })
    test('should render the description when provide', () => {
        const description = 'Test Description';
        render(<CustomHeader title={title} description={description} />);
        //expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
        expect(screen.getByText(description)).not.toBeNull();
    })
    test('should not render the description when not provided', () => {
        const {container} = render(<CustomHeader title={title} />);
        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);
        const p = divElement?.querySelector('p');
        expect(p).toBeNull();
    })    
});