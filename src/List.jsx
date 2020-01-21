import React, { useEffect, useRef, useState } from 'react';
import styles from './List.module.scss';

const generateColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + color.padStart(6, '0');
};

const totalCount = 1000;

const initData = [...Array(50)].map(generateColor);

const List = () => {
  const listRef = useRef();

  const [loading, setLoading] = useState(false);

  const [data, updateData] = useState(initData);

  const update = () => {
    if (data.length >= totalCount) return;

    setLoading(true);

    setTimeout(() => {
      const newData = [
        ...data,
        ...[...Array(50)].map(generateColor),
      ];

      updateData(newData);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry], _observer) => {
      if (entry.isIntersecting) {
        _observer.unobserve(entry.target);
        update();
      }
    }, {
      rootMargin: '0px 0px 750px 0px',
    });

    const lastNode = listRef.current.lastElementChild;
    observer.observe(lastNode);
  }, [data]);

  return (
    <>
      <ul ref={listRef} className={styles.list}>
        {data.map((item, idx) => (
          <li key={idx} className={styles.item} style={{ background: item }}>{idx}</li>
        ))}
      </ul>

      {loading && <div>Loading...</div>}
    </>
  );
};

export default List;
