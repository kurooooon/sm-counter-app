import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  increment,
  decrement,
  reset,
  asyncIncrement,
} from "../store/reducers/counter";
import {
  BigHitStatus,
  lotteryAdded,
  selectCurrent,
  selectHistories,
  selectLotteries,
  SlotStatus,
} from "../store/reducers/slot";

const IndexPage = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter);
  const lotteries = useSelector(selectLotteries);
  const [superCount, normalCount] = useMemo(() => {
    let superCount = 0;
    let normalCount = 0;
    Object.values(lotteries).forEach((lottery) => {
      if (lottery?.bigHitStatus === BigHitStatus.Super) {
        superCount++;
      }
      if (lottery?.bigHitStatus === BigHitStatus.Normal) {
        normalCount++;
      }
    });
    return [superCount, normalCount];
  }, [lotteries]);
  const current = useSelector(selectCurrent);
  const histories = useSelector(selectHistories);

  const onClickInc = () => {
    dispatch(increment());
    dispatch(lotteryAdded(count));
  };
  const onClickAsyncInc = async () => {
    await dispatch(asyncIncrement());
    dispatch(lotteryAdded(count));
  };
  const onClickDec = () => count > 0 && dispatch(decrement());
  const onClickReset = () => dispatch(reset());

  useEffect(() => {
    if (current?.status === SlotStatus.BigHit) {
      dispatch(reset());
    }
  }, [current]);

  return (
    <div>
      <h1>Counter App</h1>
      <h3>{count}</h3>
      <h2>{`確変: ${superCount} | 通常: ${normalCount}`}</h2>
      <h1>{current ? current.lottery : "-"}</h1>
      <button onClick={onClickInc}>+1</button>
      <button onClick={onClickReset}>reset</button>
      <button onClick={onClickDec}>-1</button>
      <button onClick={onClickAsyncInc}>async +1</button>
      {histories ? (
        <ul>
          {histories.map((item) => {
            return (
              <li
                key={item?.id}
              >{`[${item?.lottery}] ${item?.status} ${item?.currentCount}回転`}</li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default IndexPage;
