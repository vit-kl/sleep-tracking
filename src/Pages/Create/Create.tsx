import { FC, useState } from "react";
import styles from "./Create.module.css";
import { Button, InputGroup, Intent } from "@blueprintjs/core";
import { storagePerson } from "../../storage/storagePersons";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../constants/routing";

const Create: FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleChangeName = (value: string) => {
    setName(value);
  };

  const handleCreatePerson = () => {
    const id = storagePerson.calcId();
    storagePerson.createPerson(name, id);

    const route = `${RoutePaths.Person}/${id}`;
    navigate(route, { relative: "path" });
  };

  return (
    <div className={styles.wrapper}>
      <InputGroup
        placeholder="Введите Имя"
        value={name}
        onValueChange={handleChangeName}
      />
      <Button
        intent={Intent.PRIMARY}
        text="Создать"
        onClick={handleCreatePerson}
        disabled={!name}
      />
    </div>
  );
};

export default Create;
