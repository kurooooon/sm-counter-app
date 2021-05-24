import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { Lottery } from "../../pages/api/lottery";

export const SlotStatus = {
  None: "none",
  Reach: "reach",
  BigHit: "bigHit",
} as const;

export const BigHitStatus = {
  None: "None",
  Normal: "normal",
  Super: "super",
} as const;

export interface SlotState {
  id: number;
  bigHitStatus: string;
  status: string;
  lottery: string;
  currentCount: number;
}

const adapter = createEntityAdapter<SlotState>();

export const lotteryAdded = createAsyncThunk(
  "slot/lotteryAdded",
  async (count: number) => {
    const { lottery }: Lottery = await fetch("/api/lottery").then((res) =>
      res.json()
    );
    return {
      lottery,
      count,
    };
  }
);

export const slice = createSlice({
  name: "slot",
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(lotteryAdded.fulfilled, (state, action) => {
      const { lottery, count } = action.payload;
      const id = state.ids.length
        ? (state.ids[state.ids.length - 1] as number) + 1
        : 0;
      const status =
        lottery[0] === lottery[2]
          ? lottery[1] === lottery[2]
            ? SlotStatus.BigHit
            : SlotStatus.Reach
          : SlotStatus.None;
      const bigHitStatus =
        status === SlotStatus.BigHit
          ? parseInt(lottery[0], 10) % 2 === 0
            ? BigHitStatus.Normal
            : BigHitStatus.Super
          : BigHitStatus.None;
      adapter.addOne(state, {
        id,
        lottery,
        status,
        bigHitStatus,
        currentCount: count + 1,
      });
    });
  },
});

const slotReducer = slice.reducer;
export { slotReducer };

export const selectCurrent = createSelector(
  (state: RootState) => state.slot,
  (state) => state.entities[state.ids.length - 1]
);

export const selectHistories = createSelector(
  (state: RootState) => state.slot,
  (state) => Object.values(state.entities).reverse().splice(1)
);

export const { selectEntities: selectLotteries } = adapter.getSelectors(
  (state: RootState) => state.slot
);
