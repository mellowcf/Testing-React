import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('renders the list of star wars characters and cycles through pages', async () => {
   mockGetData.mockResolvedValueOnce({ 
        id:1,
        next:'https://swapi.co/api/people/?page=2',
        results:[
        {
            name:'Luke Skywalker',url:'test'
        }]})

  const { getByText } = render(<StarWarsCharacters />);
 
  
  const nextButton = getByText(/Next/i);
  const previousButton = getByText(/Previous/i);
  fireEvent.change(nextButton);
  fireEvent.change(previousButton);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  
  await wait(() =>  expect(getByText(/luke/i)))
});

test('test test', () => {});