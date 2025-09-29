import React, { useEffect, useState } from 'react';
import { Good } from './types/Good';
import { getAll, get5First, getRedGoods } from './api/goods';

type Props = {
  sortBy: string;
};

const GoodsListComponent: React.FC<Props> = ({ sortBy }) => {
  const [goods, setGoods] = useState<Good[]>([]);

  useEffect(() => {
    if (!sortBy) {
      return;
    }

    const fetchGoods = async () => {
      switch (sortBy) {
        case 'all':
          setGoods(await getAll());
          break;
        case 'first-five':
          setGoods(await get5First());
          break;
        case 'red':
          setGoods(await getRedGoods());
          break;

        default:
          setGoods([]);
          break;
      }
    };

    fetchGoods();
  }, [sortBy]);

  return (
    <ul>
      {goods.map(good => (
        <li key={good.id} data-cy="good" style={{ color: good.color }}>
          {good.name}
        </li>
      ))}
    </ul>
  );
};

export const GoodsList = React.memo(GoodsListComponent);
