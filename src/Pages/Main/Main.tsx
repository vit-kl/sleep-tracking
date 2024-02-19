import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CellPerson from "./CellPerson/CellPerson";
import { RoutePaths } from "../constants/routing";
import { EntityTitle, Text } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import styles from "./Main.module.css";
import { storagePerson } from "../../storage/storagePersons";
import { Person } from "../../types/person";

const Main: FC = () => {
  const navigate = useNavigate();

  const persons = storagePerson.getPersons();

  const handleCreatePerson = () => {
    navigate(RoutePaths.Create);
  };

  const handleOpenPerson = (person: Person) => () => {
    const route = `${RoutePaths.Person}/${person.id}`;
    navigate(route);
  };

  return (
    <div className={styles.wrapper}>
      <CellPerson
        title={
          <EntityTitle
            icon={IconNames.NEW_PERSON}
            heading={Text}
            title={"Создать"}
          />
        }
        onClick={handleCreatePerson}
      />
      {persons?.map((person) => (
        <CellPerson
          key={person.id}
          title={
            <EntityTitle
              icon={IconNames.PERSON}
              heading={Text}
              title={person.name}
            />
          }
          onClick={handleOpenPerson(person)}
        />
      ))}
    </div>
  );
};

export default Main;
