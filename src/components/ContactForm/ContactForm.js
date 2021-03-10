import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import s from '../ContactForm/ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const submitForm = e => {
    e.preventDefault();
    onSubmit({ name, number });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.list} onSubmit={submitForm}>
      <label className={s.label} htmlFor={nameInputId}>
        Name
          <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          id={nameInputId}
        />
      </label>
      <label className={s.label} htmlFor={numberInputId}>
        Number
          <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          id={numberInputId}
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
        </button>
    </form>
  );

}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

