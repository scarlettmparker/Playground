import React from "react";
import styles from "./three.module.css";
import Scene from "../../components/three/scene";

const Three: React.FC = () => {
  return (
    <>
      <div className={styles.threescene}>
        <Scene></Scene>
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default Three;