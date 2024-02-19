import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storagePerson } from "../../storage/storagePersons";
import { Person, TimeStampType } from "../../types/person";
import { Button, ButtonGroup, H2, H5, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import styles from "./PersonInfo.module.css";

const PersonInfo: FC = () => {
  const params = useParams();

  const [person, setPerson] = useState<Person | undefined>();

  const isSleep = storagePerson.getIsSleep(Number(params.id));

  useEffect(() => {
    setPerson(storagePerson.getPerson(Number(params.id)));
  }, [params]);

  const handleAddTimestamp = (type: TimeStampType) => () => {
    const newPerson = storagePerson.addTimestamp(
      new Date(),
      type,
      Number(params.id)
    );
    if (newPerson) {
      setPerson(newPerson);
    }
  };

  return (
    <div className={styles.wrapper}>
      <H2>{person?.name}</H2>
      <H5>
        Сейчас: <Icon icon={isSleep ? IconNames.MOON : IconNames.FLASH}></Icon>
      </H5>
      <ButtonGroup>
        <Button
          text="Продленние сна"
          onClick={handleAddTimestamp(TimeStampType.SleepExtension)}
          disabled={!isSleep}
          icon={IconNames.ANNOTATION}
        />
        <Button
          text="Проснулась"
          onClick={handleAddTimestamp(TimeStampType.WokeUp)}
          disabled={!isSleep}
          icon={IconNames.FLASH}
        />
        <Button
          text="Уснула"
          onClick={handleAddTimestamp(TimeStampType.FellAsleep)}
          disabled={isSleep}
          icon={IconNames.MOON}
        />
      </ButtonGroup>
    </div>
  );
};

export default PersonInfo;
