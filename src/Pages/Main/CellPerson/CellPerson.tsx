import { Card } from "@blueprintjs/core";
import { FC, ReactElement } from "react";
import style from "./CellPerson.module.css";

type CellPersonProps = {
  title: ReactElement;
  onClick: () => void;
};

const CellPerson: FC<CellPersonProps> = ({ title, onClick }) => {
  return (
    <Card interactive onClick={onClick} className={style.card}>
      {title}
    </Card>
  );
};

export default CellPerson;
