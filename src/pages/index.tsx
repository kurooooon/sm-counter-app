import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  increment,
  decrement,
  reset,
  asyncIncrement,
} from "../store/reducers/counter";

const IndexPage = () => {
  const dispatch = useDispatch();
  const count = useSelector<RootState, number>((state) => state.counter);

  const onClickInc = () => dispatch(increment());
  const onClickAsyncInc = () => dispatch(asyncIncrement());
  const onClickDec = () => count > 0 && dispatch(decrement());
  const onClickReset = () => dispatch(reset());

  return (
    <div>
      <h1>Counter App</h1>
      {count}
      <button onClick={onClickInc}>+1</button>
      <button onClick={onClickAsyncInc}>async +1</button>
      <button onClick={onClickDec}>-1</button>
      <button onClick={onClickReset}>reset</button>
    </div>
  );
};

export default IndexPage;
