import css from 'styled-jsx/css';

export default css.global`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html,
  body {
    font-family: 'Montserrat', sans-serif;
    color: #000;
  }

  input,
  select {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    padding: 5px 7px;
    margin: 1rem 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
  }

  h2 {
    font-size: 1.5rem;
  }

  form {
    padding: 1rem;
  }

  form > * {
    display: flex;
    align-items: center;
  }
`;
