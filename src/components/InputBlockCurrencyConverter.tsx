import './InputBlockCurrencyConverter.scss';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SetState, InputBlockCurrencyConverterItem } from '../types';
import { FAST_CHOICE_CURRENCY_ARR } from '../constants';

const InputBlockCurrencyConverter = (
  props: InputBlockCurrencyConverterItem,
) => {
  const {
    handlerAmountChange,
    amount,
    inputFocused,
    setInputFocused,
    inputShortCurrency,
    setInputShortCurrency,
    inputValue,
    setInputValue,
    currencySymbolsNames,
  } = props;

  const inputRef = useRef<any>();
  const isFocused = useRef<any>();

  const [filteredSymbolsNames, setFilteredSymbolsNames] =
    useState<string[][]>(currencySymbolsNames);

  const fastChoiceCurrency = (presetCurrency: string) => () =>
    setInputShortCurrency(presetCurrency);

  const handlerChangeCurrency =
    (
      setInputFocused: SetState<boolean>,
      setInputValue: SetState<string>,
      setInputShortCurrency: SetState<string>,
      item: string[],
    ) =>
    (): void => {
      setInputFocused(false);
      setInputValue(item[1]);
      setInputShortCurrency(item[0]);
    };

  const searchIconAppear =
    (setInputValue: SetState<string>, ref: any) => (): void => {
      setInputValue('');
      ref.current.focus();
    };

  const onMouseDownClear = (setInputValue: SetState<string>) => () =>
    setInputValue('');

  const inputValueHandler =
    (setInputValue: SetState<string>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setInputValue(event.target.value);

  const filterCurrency = (
    inputValue: string,
    setFilteredArr: SetState<string[][]>,
  ): void => {
    setFilteredArr(
      currencySymbolsNames.filter((item: string[]) =>
        item[1].toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );
  };

  const onFocus = (setInput: SetState<boolean>) => () => setInput(true);
  const onBlur = (setInput: SetState<boolean>) => setInput(false);

  useMemo(() => {
    filterCurrency(inputValue, setFilteredSymbolsNames);
  }, [inputValue]);

  useEffect(() => {
    document.addEventListener('click', (event: MouseEvent): void => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        onBlur(setInputFocused);
      }
    });
  }, []);

  return (
    <div className="inputMainContainer">
      <div className="currencySearch tooltip" ref={inputRef}>
        {inputFocused ? (
          <>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <FontAwesomeIcon
              onClick={searchIconAppear(setInputValue, isFocused)}
              icon={faXmark}
            />
          </>
        ) : (
          <div>{inputShortCurrency}</div>
        )}
        <input
          ref={isFocused}
          className={inputFocused ? 'inputIsFocused' : ''}
          onFocus={onFocus(setInputFocused)}
          value={inputValue}
          onChange={inputValueHandler(setInputValue)}
          onMouseDown={onMouseDownClear(setInputValue)}
        />
        {!inputFocused && inputValue && (
          <span className="tooltiptext">{inputValue}</span>
        )}
        {inputFocused && (
          <div>
            {filteredSymbolsNames.length ? (
              filteredSymbolsNames.sort().map((item: string[]) => (
                <div
                  className="selectedCurrency"
                  onClick={handlerChangeCurrency(
                    setInputFocused,
                    setInputValue,
                    setInputShortCurrency,
                    item,
                  )}
                  key={`f_${item[0]}`}>
                  <span>{item[0]}</span>
                  <span>{item[1]}</span>
                </div>
              ))
            ) : (
              <div className="selectedCurrencyNoItems">No items</div>
            )}
          </div>
        )}
      </div>
      <div className="currencyValue">
        <input
          value={amount}
          onChange={handlerAmountChange}
          className="amountInput"
        />
      </div>
      <div className="fastCurrency">
        {FAST_CHOICE_CURRENCY_ARR.map((presetCurrency: string) => (
          <div
            onClick={fastChoiceCurrency(presetCurrency)}
            key={`fast_currency_${presetCurrency}`}>
            {presetCurrency}
          </div>
        ))}
      </div>
    </div>
  );
};

export { InputBlockCurrencyConverter };
