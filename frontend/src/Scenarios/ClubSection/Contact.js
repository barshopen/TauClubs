import React from 'react';

// TODO relocate
const data = {
  owner: 'Ben Mitchell',
  text: 'Bar is well known chess teacher who won a gold medal at the TAU chess 1.',
  email: 'Jeramie_Zulauf@gmail.com',
};
function Contact() {
  return (
    <>
      {data.owner}
      {data.text}
      {data.email}
    </>
  );
}

export default Contact;
