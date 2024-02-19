import { Navbar, Alignment, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC } from "react";
import { ReactComponent as MainLogo } from "../../images/MainIcon.svg";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../Pages/constants/routing";
import styles from "./Header.module.css";

const Header: FC = () => {
  const navigate = useNavigate();

  //   const handleGoToCreate = () => {
  //     navigate(RoutePaths.Create);
  //   };

  const handleGoToMain = () => {
    navigate(RoutePaths.Main);
  };

  return (
    <Navbar className={styles.header}>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <MainLogo width={45} height={45} />
        </Navbar.Heading>
        <Navbar.Divider />
        <Button
          className="bp5-minimal"
          icon={IconNames.HOME}
          text="Главная"
          onClick={handleGoToMain}
        />
        {/* <Button
          className="bp5-minimal"
          icon={IconNames.NEW_PERSON}
          text="Создать"
          onClick={handleGoToCreate}
        /> */}
      </Navbar.Group>
    </Navbar>
  );
};

export default Header;
