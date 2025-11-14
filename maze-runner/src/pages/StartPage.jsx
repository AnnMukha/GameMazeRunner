import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

export default function StartPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleStart = () => {
    navigate(`/user/${id}/menu`);
  };

  return (
    <div className="start-screen">
      <div className="start-screen__overlay" />

      <div className="start-screen__content">
        <div className="start-logo">
          <h1 className="start-logo__title">MAZE RUNNER</h1>
          <p className="start-logo__subtitle">Мандрівник у лабіринті</p>
        </div>

        <p className="start-screen__text">
          Вирушай у неоновий кам&apos;яний лабіринт.  
          Знайди шлях крізь темряву, уникай пасток і встигни до порталу.
        </p>

        <Button text="▶ Start adventure" onClick={handleStart} />
      </div>
    </div>
  );
}