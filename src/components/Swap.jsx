'use client';
import React, { useState, useEffect } from 'react';
import styles from './swap.module.css';
import { Input, Popover, Radio, Modal, message } from 'antd';
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import tokenList from '../tokenList.json';
import axios from 'axios';

const Swap = () => {
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(tokenList[3]);
  const [tokenTwo, setTokenTwo] = useState(tokenList[4]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [prices, setPrices] = useState(null);

  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2));
    } else {
      setTokenTwoAmount(null);
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two.address, one.address);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
    } else {
      setTokenTwo(tokenList[i]);
    }
    setIsOpen(false);
  }

  async function fetchPrices(one, two) {
    const res = await fetch('/api/moralisPrice', {
      params: { addressOne: one, addressTwo: two },
    });
    setPrices(res.data);
  }

  useEffect(() => {
    fetchPrices(tokenList[0].address, tokenList[1].address);
  }, []);

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className={styles.modalContent}>
          {tokenList?.map((e, i) => {
            return (
              <div
                className={styles.tokenChoice}
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className={styles.tokenLogo} />
                <div className={styles.tokenChoiceNames}>
                  <div className={styles.tokenName}>{e.name}</div>
                  <div className={styles.tokenTicker}>{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      <div className={styles.swapPage}>
        <div className={styles.tradeBox}>
          <div className={styles.tradeBoxHeader}>
            <h4>Swap</h4>
            <Popover
              content={settings}
              title="Settings"
              trigger="click"
              placement="bottomRight"
            >
              <SettingOutlined className={styles.cog} />
            </Popover>
          </div>
          <div className={styles.inputs}>
            <Input
              placeholder="0"
              value={tokenOneAmount}
              onChange={changeAmount}
            />
            <Input placeholder="0" value={tokenTwoAmount} />
            <div className={styles.switchButton} onClick={switchTokens}>
              <ArrowDownOutlined className={styles.switchArrow} />
            </div>
            <div className={styles.assetOne} onClick={() => openModal(1)}>
              <img
                src={tokenOne.img}
                alt="assetOneLogo"
                className={styles.assetLogo}
              />
              {tokenOne.ticker}
              <DownOutlined />
            </div>
            <div className={styles.assetTwo} onClick={() => openModal(2)}>
              {' '}
              <img
                src={tokenTwo.img}
                alt="assetOneLogo"
                className={styles.assetLogo}
              />
              {tokenTwo.ticker}
              <DownOutlined />
            </div>
          </div>
          <div
            className={styles.swapButton}
            // disabled={!tokenOneAmount || !isConnected}
            // onClick={fetchDexSwap}
          >
            Swap
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
