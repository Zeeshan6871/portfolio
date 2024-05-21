// import { Container, ContainerSucces } from "./styles";
// import { useForm, ValidationError } from "@formspree/react";
// import { toast, ToastContainer } from "react-toastify";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useEffect, useState } from "react";
// import validator from "validator";

// export function Form() {
//   const [state, handleSubmit] = useForm("xknkpqry"); // Ensure this ID is correct for your Formspree form
//   const [validEmail, setValidEmail] = useState(false);
//   const [isHuman, setIsHuman] = useState(false);
//   const [message, setMessage] = useState("");

//   function verifyEmail(email: string) {
//     if (validator.isEmail(email)) {
//       setValidEmail(true);
//     } else {
//       setValidEmail(false);
//     }
//   }

//   function handleRecaptcha(value: string | null) {
//     if (value) {
//       setIsHuman(true);
//     } else {
//       setIsHuman(false);
//     }
//   }

//   useEffect(() => {
//     if (state.succeeded) {
//       toast.success("Email successfully sent!", {
//         position: toast.POSITION.BOTTOM_LEFT,
//         pauseOnFocusLoss: false,
//         closeOnClick: true,
//         hideProgressBar: false,
//         toastId: "succeeded",
//       });
//     }
//   }, [state.succeeded]);

//   if (state.succeeded) {
//     return (
//       <ContainerSucces>
//         <h3>Thanks for getting in touch!</h3>
//         <button
//           onClick={() => {
//             window.scrollTo({ top: 0, behavior: "smooth" });
//           }}
//         >
//           Back to the top
//         </button>
//         <ToastContainer />
//       </ContainerSucces>
//     );
//   }

//   return (
//     <Container>
//       <h2>Get in touch using the form</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Email"
//           id="email"
//           type="email"
//           name="email"
//           onChange={(e) => {
//             verifyEmail(e.target.value);
//           }}
//           required
//         />
//         <ValidationError prefix="Email" field="email" errors={state.errors} />
//         <textarea
//           required
//           placeholder="Send a message to get started."
//           id="message"
//           name="message"
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//         />
//         <ValidationError
//           prefix="Message"
//           field="message"
//           errors={state.errors}
//         />

//         <button type="submit" disabled={!validEmail}>
//           Submit
//         </button>
//       </form>
//       <ToastContainer />
//     </Container>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import { Container, ContainerSucces } from "./styles";
import { toast, ToastContainer } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import emailjs, { EmailJSResponseStatus } from "emailjs-com";

interface FormState {
  succeeded: boolean;
  errors: { field?: string; message: string }[];
}

export function Form() {
  const [state, setState] = useState<FormState>({
    succeeded: false,
    errors: [],
  });
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  function verifyEmail(email: string) {
    if (validator.isEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  useEffect(() => {
    emailjs.init("djKZmCYVQPFpE1eD-");
    if (state.succeeded) {
      toast.success("Email successfully sent!", {
        position: toast.POSITION.BOTTOM_LEFT,
        pauseOnFocusLoss: false,
        closeOnClick: true,
        hideProgressBar: false,
        toastId: "succeeded",
      });
    }
  }, [state.succeeded]);

  const getData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (formRef.current) {
        emailjs
          .sendForm(
            "service_uzx3j5z",
            "template_zem8ozw",
            formRef.current,
            "djKZmCYVQPFpE1eD-"
          )
          .then(
            (result: EmailJSResponseStatus) => {
              console.log(result.text);
              formRef.current?.reset();
              setValidated(false);
              setSubmit(true);
              setState({ ...state, succeeded: true });
            },
            (error) => {
              console.log(error.text);
              setState({ ...state, errors: [{ message: error.text }] });
            }
          );
      }
    }
    setValidated(true);
    submit ? setSubmit(false) : setSubmit(true);
  };

  if (state.succeeded) {
    return (
      <ContainerSucces>
        <h3>Thanks for getting in touch!</h3>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Back to the top
        </button>
        <ToastContainer />
      </ContainerSucces>
    );
  }

  return (
    <Container>
      <h2>Get in touch using the form</h2>
      <form ref={formRef} onSubmit={getData}>
        <input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={(e) => {
            verifyEmail(e.target.value);
          }}
          required
        />
        {state.errors.some((error) => error.field === "email") && (
          <p>Email is invalid.</p>
        )}
        <textarea
          required
          placeholder="Send a message to get started."
          id="message"
          name="message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        {state.errors.some((error) => error.field === "message") && (
          <p>Message is required.</p>
        )}
        {/* Uncomment and use your actual site key for reCAPTCHA
        <ReCAPTCHA
          sitekey="6Lfj9NYfAAAAAP8wPLtzrsSZeACIcGgwuEIRvbSg"
          onChange={() => {
            setIsHuman(true);
          }}
        ></ReCAPTCHA>
        */}
        <button type="submit" disabled={!validEmail}>
          Submit
        </button>
      </form>
      <ToastContainer />
    </Container>
  );
}
