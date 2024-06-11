import { useState } from "react";
import { toast, Zoom } from "react-toastify";
import styles from "./styles.module.css";
import { Loader, LOADER_SIZES } from "../../components/Loader";
import { URL_API } from "../../services";

export const ContactForm = () => {
  const [who, setWho] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexName = /^[a-zA-ZñÑ\s]+$/;

  const notify = ({ message, kind = "success" }: any = {}) => {
    const options: any = {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    };
    const notifyKinds: any = {
      success: toast.success,
      error: toast.error,
    };
    notifyKinds[kind](message || "Peticion completada!", options);
  };

  const composeAlertMessage = () => {
    const alerts = [];
    if (!email) alerts.push("tu correo de contacto,");
    if (!who)
      alerts.push(
        "decirme quien eres o a quien o que organizacion representas,"
      );
    if (!message) alerts.push("escribir tu mensaje,");

    if (alerts.length >= 2) {
      alerts[alerts.length - 1] = alerts[alerts.length - 1].replace(",", "");
      alerts[alerts.length - 2] = alerts[alerts.length - 2].replace(",", " y");
    }
    return alerts.join(" ");
  };

  const onClickSendButton = (e: any) => {
    e.preventDefault();
    console.log("sending!");
    let abort = false;
    if (!email || !who || !message) {
      notify({
        message: `Mmmm 🤔, creo que se te olvido ${composeAlertMessage()} 🙈`,
        kind: "error",
      });
      abort = true;
    }
    if (email && !regexEmail.test(email)) {
      notify({
        message:
          "Si..., esta tu correo, pero creo que no es un correo valido 🤷‍♂️",
        kind: "error",
      });
      abort = true;
    }

    for (let name of who.split(" ")) {
      if (name && !regexName.test(name)) {
        notify({
          message: "Estas seguro que escribiste bien a quien representas?",
          kind: "error",
        });
        abort = true;
      }
    }

    if (abort) return;
    setSending(true);
    fetch(`${URL_API}/users/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ who, email, message }),
    }).then((response) => {
      setSending(false);
      if (!response.ok) {
        notify({
          message: `Algo ha salido mal`,
          kind: "error",
        });
        return;
      }
      notify({
        message: `Bien!, tu mensaje ha sido enviado.`,
      });
    });
  };

  return (
    <form className={styles.email_form} action="" onSubmit={onClickSendButton}>
      <input
        type="text"
        value={who}
        placeholder="¿Quien eres o a quién representas?"
        onChange={(e: any) => setWho(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        placeholder="Tu correo de contacto"
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />
      <textarea
        value={message}
        placeholder="Cuentame más"
        onChange={(e: any) => setMessage(e.target.value)}
        required
      ></textarea>
      <button disabled={sending} onClick={onClickSendButton}>
        {!sending ? "Enviar mensaje" : <Loader {...{ size: LOADER_SIZES.L }} />}
      </button>
    </form>
  );
};
