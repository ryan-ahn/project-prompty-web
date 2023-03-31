/**
 * Author : Ryan
 * Date : 2023-03-25
 * Desc : global
 */

import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

//NOTE style reset & global style
export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }
  body {
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
    letter-spacing: -0.05em;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
    font-family: 'Noto Sans KR', sans-serif;
  }
  textarea {
    border: none;
    outline: none;
    font-family: 'Noto Sans KR', sans-serif;
    overflow: auto;
    resize: none;
  }
  ul {
    list-style: none;
  }
  li {
    list-style-type : none;
  }
  :focus{
    outline: none;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-webkit-keyframes fadeout {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
  }
`;
