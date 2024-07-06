import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IPokemonInfo {
  image: string;
  name: string;
  id: number;
  types: string[];
  height: number;
  weight: number;
  baseExp: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  specialAttack: number;
  specialDefense: number;
}

const initialState: IPokemonInfo = {
  image: "",
  name: "name",
  id: 0,
  types: [],
  height: 0,
  weight: 0,
  baseExp: 0,
  hp: 0,
  attack: 0,
  defense: 0,
  speed: 0,
  specialAttack: 0,
  specialDefense: 0,
};

export const pokemonSlice = createSlice({
  name: "poke",
  initialState,
  reducers: {
    setPoke: (state, action: PayloadAction<Partial<IPokemonInfo>>) => {
      const {
        image,
        name,
        id,
        types,
        height,
        weight,
        baseExp,
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      } = action.payload;

      if (image !== undefined) state.image = image;
      if (name !== undefined) state.name = name;
      if (id !== undefined) state.id = id;
      if (types !== undefined) state.types = types;
      if (height !== undefined) state.height = height;
      if (weight !== undefined) state.weight = weight;
      if (baseExp !== undefined) state.baseExp = baseExp;
      if (hp !== undefined) state.hp = hp;
      if (attack !== undefined) state.attack = attack;
      if (defense !== undefined) state.defense = defense;
      if (speed !== undefined) state.speed = speed;
      if (specialAttack !== undefined) state.specialAttack = specialAttack;
      if (specialDefense !== undefined) state.specialDefense = specialDefense;
    },
  },
});

export const { setPoke } = pokemonSlice.actions;
export default pokemonSlice.reducer;
