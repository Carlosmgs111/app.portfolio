import styles from "./styles.module.css";

export function SettingsDashboard({
  float,
  switchFloat,
  settingsDashboard,
  switchSettingsDashboard,
}: any) {
  return (
    <div className={styles.container}>
      <section
        className={`${styles.dashboard} ${
          settingsDashboard ? styles.show : ""
        }`}
        onClick={switchSettingsDashboard}
      >
        <i className={`fa-solid fa-caret-left ${styles.hide_button}`} />
        <form>
          <label>Flotante: </label>
          <label className={`switch ${styles.switch}`}>
            <input
              className={styles.input}
              checked={float}
              type="checkbox"
              name="based-on"
              onChange={switchFloat}
            ></input>
            <span
              className={`${styles.slider} ${styles.round} fa-solid fa-circle-dot`}
            ></span>
          </label>
        </form>
      </section>
    </div>
  );
}
