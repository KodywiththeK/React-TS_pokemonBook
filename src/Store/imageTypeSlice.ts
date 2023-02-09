import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { POKEMON_IMAGE_TYPE } from '../Constants'

export type PokemonImageKeyType = typeof POKEMON_IMAGE_TYPE[keyof typeof POKEMON_IMAGE_TYPE]

export interface ImageTypeState {
  type: PokemonImageKeyType // 이미지 타입에 대한 정보
}

const initialState: ImageTypeState = {
  type: POKEMON_IMAGE_TYPE.OFFICIAL_ARTWORK
}

export const imageTypeSlice = createSlice({
  name: 'imageType',
  initialState,
  reducers: {
    changeImageType: (state, action:PayloadAction<ImageTypeState>) => {
      state.type = action.payload.type
    }
  },
})

// Action creators are generated for each case reducer function
export const changeImageType = imageTypeSlice.actions.changeImageType

export const imageTypeReducer = imageTypeSlice.reducer