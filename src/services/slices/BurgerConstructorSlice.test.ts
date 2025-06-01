
import {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder
} from './BurgerConstructorSlice';

import burgerConstructorSlice from './BurgerConstructorSlice';

import { TConstructorIngredient } from '@utils-types';

describe('Constructor slice tests ', () => {
  const ingredient1: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const ingredient2: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const bun: TConstructorIngredient = {
    id: '3',
    _id: '3',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };
  it('addIngredient should add ingredient into constructor', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String) 
    });
  });
  it('addIngredient should add bun into constructor', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('removeIngredient should remove ingredient from constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  it('moveUpIngredient should MOVE UP ingredient within constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveUpIngredient(1) 
    );
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('moveDownIngredient should MOVE DOWN ingredient within constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(
      initialState,
      moveDownIngredient(0) 
    );
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  it('clearOrder should clear constructor', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false,
      error: null
    };

    const newState = burgerConstructorSlice.reducer(initialState, clearOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});