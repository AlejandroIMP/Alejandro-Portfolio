
import { useTranslations } from "../../i18n/utils";
import { useState } from "react";
import type { FormEvent } from "react";

interface Props {
  lang: "en" | "es";
}

export default function Contact({lang}: Props) {
  const t = useTranslations(lang);
  const [responseMessage, setResponseMessage] = useState("");

  async function handleSumbit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      setResponseMessage(t("section.contact.form.success"));
    } else {
      setResponseMessage(t("section.contact.form.error"));
    }
  }

  return(
    <section
      className="item__card slide-in flex flex-col justify-center items-center gap-10 mb-10 h-lvh"
      id="contact"
    >
      <h2
        className="text-xl md:text-5xl font-medium mb-10 hover-underline-animation left"
      >
        {t("section.contact.title")}
      </h2>
      <form
        onSubmit={handleSumbit}
        id="contactForm"
        className="flex flex-col gap-10 text-lg mt-5 border border-gray-300 p-5 rounded-lg w-full"
      >
        <fieldset className="flex items-center gap-2">
          <label className="w-24" htmlFor="name">{t("section.contact.form.name")}:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="font-light w-full p-3 border border-gray-300 rounded-lg"
          />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <label className="w-24" htmlFor="email">{t("section.contact.form.email")}:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="font-light w-full p-3 border border-gray-300 rounded-lg"
          />
        </fieldset>
        <fieldset className="flex items-center gap-2">
          <label className="w-24" htmlFor="message"
            >{t("section.contact.form.message")}:</label
          >
          <textarea
            id="message"
            name="message"
            required
            className="font-light w-full p-3 border border-gray-300 rounded-lg"
          ></textarea>
        </fieldset>
        <button className="border">
          <span id="btnText">{t("section.contact.form.submit")}</span>

          <svg
            id="loader"
            className="hidden animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </button>
      </form>
      {responseMessage && (
        <p
          id="responseMessage"
          className="text-lg text-center mt-5 p-3 border border-gray-300 rounded-lg"
        >
          {responseMessage}
        </p>
      )}
    </section>
  )
}
