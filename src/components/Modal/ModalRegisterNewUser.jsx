import { emailLinkSend, emailLinkActionCodeSettings } from '../../firebase/auth';

export const ModalRegisterNewUser = () => {
  emailLinkSend('rusak.alexander2017@yandex.ru', emailLinkActionCodeSettings());
  console.log(emailLinkActionCodeSettings());
};
