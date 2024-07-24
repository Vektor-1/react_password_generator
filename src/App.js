import React, { useState } from 'react';
import './App.css';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { COPY_Fail, COPY_SUCCESS } from './message';

const App = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify('To generate a password, you must select at least one checkbox', true);
    } else {
      let characterList = '';
      if (includeNumbers) characterList += numbers;
      if (includeUpperCase) characterList += upperCaseLetters;
      if (includeLowerCase) characterList += lowerCaseLetters;
      if (includeSymbols) characterList += specialCharacters;

      setPassword(createPassword(characterList));
      notify('Password generated successfully');
    }
  };

  const createPassword = (characterList) => {
    let password = '';
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCopyPassword = () => {
    if (password === '') {
      notify(COPY_Fail, true);
    } else {
      copyToClipboard(password);
      notify(COPY_SUCCESS);
    }
  };

  return (
      <div className="App">
        <div className="container">
          <div className="generator">
            <h2 className="generator__header">Password Generator</h2>
            <div className="generator__password">
              <h3 className="password-display">{password || 'Your password will appear here'}</h3>
              <button className="copy__btn" onClick={handleCopyPassword}>
                <i className="far fa-clipboard"></i> Copy
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="password-length">Password Length</label>
              <input
                  className="pw"
                  type="number"
                  id="password-length"
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                  min="8"
                  max="32"
              />
            </div>
            <div className="form-group">
              <label htmlFor="uppercase-letters">
                <input
                    type="checkbox"
                    id="uppercase-letters"
                    checked={includeUpperCase}
                    onChange={(e) => setIncludeUpperCase(e.target.checked)}
                />
                Add Uppercase Letters
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="lowercase-letters">
                <input
                    type="checkbox"
                    id="lowercase-letters"
                    checked={includeLowerCase}
                    onChange={(e) => setIncludeLowerCase(e.target.checked)}
                />
                Add Lowercase Letters
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="include-numbers">
                <input
                    type="checkbox"
                    id="include-numbers"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="include-symbols">
                <input
                    type="checkbox"
                    id="include-symbols"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>
            </div>
            <button onClick={handleGeneratePassword} className="generator__btn">
              Generate Password
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
  );
};

export default App;
