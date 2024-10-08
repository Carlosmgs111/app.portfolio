import styles from "./styles.module.css";
import { GitHubSVG, LinkedInSVG, WhatsAppLogoSVG } from "../../icons";
import { ContactForm } from "../../components/ContactForm";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.section}>
        <h3>Mis redes</h3>
        <div className={styles.contact_icons}>
          <a
            className={styles.contact_icon}
            href="https://github.com/Carlosmgs111"
            target="_blank"
          >
            <GitHubSVG></GitHubSVG>
          </a>
          <a
            className={styles.contact_icon}
            href="https://www.linkedin.com/in/cmgs111/"
            target="_blank"
          >
            <LinkedInSVG></LinkedInSVG>
          </a>
          <a
            className={styles.contact_icon}
            href="https://api.whatsapp.com/send?phone=573196917820"
            target="_blank"
          >
            <WhatsAppLogoSVG></WhatsAppLogoSVG>
          </a>
        </div>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.section}>
        <h3>¡Contáctame!</h3>
        <ContactForm></ContactForm>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.section}>
        <h3>Sobre este sitio</h3>
        <a
          className={styles.contact_button}
          href="https://github.com/Carlosmgs111/app.portfolio"
          target="_blank"
        >
          <i className="fa-brands fa-github-alt"></i>&nbsp;&nbsp;Github
        </a>
      </div>
    </footer>
  );
};
